import { VercelRequest, VercelResponse } from "@vercel/node";

// Use VITE_ prefix to match your .env and Vercel Dashboard
const {
  VITE_MPESA_CONSUMER_KEY,
  VITE_MPESA_CONSUMER_SECRET,
  VITE_MPESA_PASSKEY,
  VITE_MPESA_SHORTCODE,
  VITE_MPESA_CALLBACK_URL,
  VITE_MPESA_ENVIRONMENT = "sandbox"
} = process.env;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { phoneNumber, amount } = req.body;
    
    // 1. Get Access Token
    const auth = Buffer.from(`${VITE_MPESA_CONSUMER_KEY}:${VITE_MPESA_CONSUMER_SECRET}`).toString("base64");
    const tokenUrl = VITE_MPESA_ENVIRONMENT === "production" 
      ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const tokenRes = await fetch(tokenUrl, { headers: { Authorization: `Basic ${auth}` } });
    const { access_token } = await tokenRes.json();

    // 2. Format Data for M-Pesa
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${VITE_MPESA_SHORTCODE}${VITE_MPESA_PASSKEY}${timestamp}`).toString("base64");
    
    // Ensure phone is 254...
    let cleanPhone = phoneNumber.replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) cleanPhone = "254" + cleanPhone.slice(1);

    const baseUrl = VITE_MPESA_ENVIRONMENT === "production" 
      ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";

    const response = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
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
        AccountReference: "MwendaBlog",
        TransactionDesc: "Support"
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}