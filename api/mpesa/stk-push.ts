import type { VercelRequest, VercelResponse } from "@vercel/node";

// Use the names that match your Vercel Dashboard / .env file
const {
  VITE_MPESA_CONSUMER_KEY,
  VITE_MPESA_CONSUMER_SECRET,
  VITE_MPESA_PASSKEY,
  VITE_MPESA_SHORTCODE,
  VITE_MPESA_CALLBACK_URL,
  VITE_MPESA_ENVIRONMENT = "sandbox"
} = process.env;

interface STKPushRequest {
  phoneNumber: string;
  amount: number;
  accountReference?: string;
  transactionDesc?: string;
}

// 1. Helper: Get OAuth Token
async function getAccessToken(): Promise<string> {
  if (!VITE_MPESA_CONSUMER_KEY || !VITE_MPESA_CONSUMER_SECRET) {
    throw new Error("M-Pesa credentials missing in environment variables");
  }

  const auth = Buffer.from(`${VITE_MPESA_CONSUMER_KEY}:${VITE_MPESA_CONSUMER_SECRET}`).toString("base64");
  const url = VITE_MPESA_ENVIRONMENT === "production"
    ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!response.ok) throw new Error("Failed to fetch M-Pesa access token");
  const data = await response.json();
  return data.access_token;
}

// 2. Helper: Format Phone Number to 254...
function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, ""); // Remove non-digits
  if (cleaned.startsWith("0")) cleaned = "254" + cleaned.slice(1);
  if (cleaned.startsWith("7") || cleaned.startsWith("1")) cleaned = "254" + cleaned;
  return cleaned;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { phoneNumber, amount, accountReference, transactionDesc }: STKPushRequest = req.body;

    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: "Phone and Amount are required" });
    }

    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${VITE_MPESA_SHORTCODE}${VITE_MPESA_PASSKEY}${timestamp}`).toString("base64");
    const formattedPhone = formatPhoneNumber(phoneNumber);

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
        Amount: Math.floor(amount), // M-Pesa requires whole numbers
        PartyA: formattedPhone,
        PartyB: VITE_MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: VITE_MPESA_CALLBACK_URL,
        AccountReference: accountReference || "MwendaChronicles",
        TransactionDesc: transactionDesc || "Support",
      }),
    });

    const result = await stkResponse.json();
    return res.status(200).json(result);

  } catch (error: any) {
    console.error("STK Push Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}