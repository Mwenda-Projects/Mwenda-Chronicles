import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Method Validation
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

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

    // Safety check for input
    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: "Missing phoneNumber or amount" });
    }

    // 2. Get OAuth Token
    const auth = Buffer.from(`${VITE_MPESA_CONSUMER_KEY}:${VITE_MPESA_CONSUMER_SECRET}`).toString("base64");
    const authUrl = VITE_MPESA_ENVIRONMENT === "production" 
      ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const authRes = await fetch(authUrl, { 
      headers: { Authorization: `Basic ${auth}` } 
    });
    
    const authData = await authRes.json();
    const access_token = authData.access_token;

    if (!access_token) {
      throw new Error("Failed to generate M-Pesa access token. Check your Keys.");
    }

    // 3. Generate Timestamp (YYYYMMDDHHmmss) 
    // We use a manual string construction to ensure it's always the correct format
    const date = new Date();
    const timestamp = 
      date.getFullYear().toString() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    // 4. Generate Password
    const password = Buffer.from(`${VITE_MPESA_SHORTCODE}${VITE_MPESA_PASSKEY}${timestamp}`).toString("base64");
    
    const baseUrl = VITE_MPESA_ENVIRONMENT === "production" 
      ? "https://api.safaricom.co.ke" 
      : "https://sandbox.safaricom.co.ke";

    // 5. Initiate STK Push
    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${access_token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        BusinessShortCode: VITE_MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.floor(amount),
        PartyA: phoneNumber, // The 254... number from your cleaned frontend
        PartyB: VITE_MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: VITE_MPESA_CALLBACK_URL,
        AccountReference: "MwendaSupport",
        TransactionDesc: "Support Payment",
      }),
    });

    const data = await stkResponse.json();

    // Log the response for Vercel Dashboard debugging
    console.log("M-Pesa Response:", data);

    return res.status(200).json({ 
      success: data.ResponseCode === "0", 
      ...data 
    });

  } catch (error: any) {
    console.error("STK Push Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}