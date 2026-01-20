import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Safaricom always sends a POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 2. Safety Check: Ensure body exists
    if (!req.body || !req.body.Body) {
      console.error("Empty callback body received");
      return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" }); 
    }

    const { stkCallback } = req.body.Body;
    console.log(`Callback for ${stkCallback.CheckoutRequestID}: ${stkCallback.ResultDesc}`);

    // 3. Handle Successful Payment (ResultCode 0 is success)
    if (stkCallback.ResultCode === 0) {
      const items = stkCallback.CallbackMetadata.Item;
      
      // Extract values safely
      const amount = items.find((i: any) => i.Name === "Amount")?.Value;
      const receipt = items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
      const phone = items.find((i: any) => i.Name === "PhoneNumber")?.Value;

      console.log(`SUCCESS: Received KES ${amount} from ${phone}. Receipt: ${receipt}`);

      // TODO: Save to your database here!
    } else {
      console.warn(`CANCELLED/FAILED: ${stkCallback.ResultDesc}`);
    }

    // 4. ALWAYS respond with 200/Success to Safaricom
    // Even if the payment failed, you must acknowledge receipt or Safaricom will keep retrying for 24 hours.
    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Success"
    });

  } catch (error: any) {
    console.error("Callback Error:", error.message);
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted with error" });
  }
}