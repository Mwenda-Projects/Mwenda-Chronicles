import type { VercelRequest, VercelResponse } from "@vercel/node";

const {
  VITE_MPESA_CONSUMER_KEY,
  VITE_MPESA_CONSUMER_SECRET,
  VITE_MPESA_PASSKEY,
  VITE_MPESA_SHORTCODE,
  VITE_MPESA_CALLBACK_URL,
  VITE_MPESA_ENVIRONMENT = "sandbox"
} = process.env;

// Helper: Formats phone to 254XXXXXXXXX
const formatPhone = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, ""); 
  if (cleaned.startsWith("0")) cleaned = "254" + cleaned.slice(1);
  if (cleaned.startsWith("7") || cleaned.startsWith("1")) cleaned = "254" + cleaned;
  if (cleaned.startsWith("+")) cleaned = cleaned.substring(1);
  return cleaned;
};

// Helper: Get OAuth Token
async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${VITE_MPESA_CONSUMER_KEY}:${VITE_MPESA_CONSUMER_SECRET}`).toString("base64");
  const url = VITE_MPESA_ENVIRONMENT === "production" 
    ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`M-Pesa Auth Failed: ${errText}`);
  }
  const data = await res.json();
  return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Fixes the 405 error by explicitly allowing POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  try {
    const { phoneNumber, amount } = req.body;
    
    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: "Phone number and amount are required" });
    }

    const token = await getAccessToken();
    
    // Generate Timestamp (YYYYMMDDHHmmss) using East Africa Time (UTC+3) logic
    const date = new Date();
    const t = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${date.getFullYear()}${t(date.getMonth() + 1)}${t(date.getDate())}${t(date.getHours())}${t(date.getMinutes())}${t(date.getSeconds())}`;
    
    const password = Buffer.from(`${VITE_MPESA_SHORTCODE}${VITE_MPESA_PASSKEY}${timestamp}`).toString("base64");
    const cleanPhone = formatPhone(phoneNumber);

    const baseUrl = VITE_MPESA_ENVIRONMENT === "production" 
      ? "https://api.safaricom.co.ke" 
      : "https://sandbox.safaricom.co.ke";

    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: VITE_MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.floor(amount), 
        PartyA: cleanPhone,
        PartyB: VITE_MPESA_SHORTCODE,
        PhoneNumber: cleanPhone,
        CallBackURL: VITE_MPESA_CALLBACK_URL,
        AccountReference: "MwendaSupport",
        TransactionDesc: "Coffee Support",
      }),
    });

    const result = await stkResponse.json();
    
    // Log the result to Vercel logs for debugging
    console.log("M-Pesa Response:", result);

    return res.status(200).json(result);

  } catch (error: any) {
    console.error("Critical M-Pesa Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}