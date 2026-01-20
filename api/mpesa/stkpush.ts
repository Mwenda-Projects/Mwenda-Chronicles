import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Explicitly allow POST to stop the 405 error
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const {
    VITE_MPESA_CONSUMER_KEY,
    VITE_MPESA_CONSUMER_SECRET,
    VITE_MPESA_PASSKEY,
    VITE_MPESA_SHORTCODE,
    VITE_MPESA_CALLBACK_URL,
    VITE_MPESA_ENVIRONMENT = "sandbox"
  } = process.env;

  try {
    const { phoneNumber, amount } = req.body;

    // 1. Get Token
    const auth = Buffer.from(`${VITE_MPESA_CONSUMER_KEY}:${VITE_MPESA_CONSUMER_SECRET}`).toString("base64");
    const authUrl = VITE_MPESA_ENVIRONMENT === "production" 
      ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const authRes = await fetch(authUrl, { headers: { Authorization: `Basic ${auth}` } });
    const { access_token } = await authRes.json();

    // 2. STK Push
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${VITE_MPESA_SHORTCODE}${VITE_MPESA_PASSKEY}${timestamp}`).toString("base64");
    const baseUrl = VITE_MPESA_ENVIRONMENT === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";

    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: VITE_MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.floor(amount),
        PartyA: phoneNumber,
        PartyB: VITE_MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: VITE_MPESA_CALLBACK_URL,
        AccountReference: "Mwenda",
        TransactionDesc: "Payment",
      }),
    });

    const data = await stkResponse.json();
    return res.status(200).json({ success: data.ResponseCode === "0", ...data });

  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}