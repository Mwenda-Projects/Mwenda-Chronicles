import { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Clean M-Pesa STK Push Backend
 * Ensure your Vercel Dashboard has these variables prefixed with VITE_
 */
const {
  VITE_MPESA_CONSUMER_KEY,
  VITE_MPESA_CONSUMER_SECRET,
  VITE_MPESA_PASSKEY,
  VITE_MPESA_SHORTCODE,
  VITE_MPESA_CALLBACK_URL,
  VITE_MPESA_ENVIRONMENT = "sandbox"
} = process.env;

// Helper: Standardize phone to 2547XXXXXXXX
const formatPhone = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, ""); // Remove non-digits
  if (cleaned.startsWith("0")) cleaned = "254" + cleaned.slice(1);
  if (cleaned.startsWith("7") || cleaned.startsWith("1")) cleaned = "254" + cleaned;
  return cleaned;
};

// Helper: Get OAuth Token from Safaricom
async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${VITE_MPESA_CONSUMER_KEY}:${VITE_MPESA_CONSUMER_SECRET}`).toString("base64");
  const url = VITE_MPESA_ENVIRONMENT === "production" 
    ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) throw new Error("M-Pesa auth failed. Check your Consumer Key/Secret.");
  const data = await res.json();
  return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  try {
    const { phoneNumber, amount } = req.body;
    if (!phoneNumber || !amount) return res.status(400).json({ error: "Missing phone/amount" });

    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
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
        Amount: Math.floor(amount), // Must be a whole number
        PartyA: cleanPhone,
        PartyB: VITE_MPESA_SHORTCODE,
        PhoneNumber: cleanPhone,
        CallBackURL: VITE_MPESA_CALLBACK_URL,
        AccountReference: "MwendaSupport",
        TransactionDesc: "Coffee Support",
      }),
    });

    const result = await stkResponse.json();
    return res.status(200).json(result);

  } catch (error: any) {
    console.error("M-Pesa Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}