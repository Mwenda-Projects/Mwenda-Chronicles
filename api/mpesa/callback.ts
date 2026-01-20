/**
 * M-Pesa Callback Handler for Vercel
 * 
 * This endpoint receives payment confirmations from Safaricom.
 * You can extend this to:
 * - Store payment records in a database
 * - Send email confirmations
 * - Update user subscription status
 * - Trigger webhooks to other services
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface CallbackMetadataItem {
  Name: string;
  Value?: string | number;
}

interface StkCallback {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata?: {
    Item: CallbackMetadataItem[];
  };
}

interface MpesaCallbackBody {
  Body: {
    stkCallback: StkCallback;
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const callbackData: MpesaCallbackBody = req.body;
    const { stkCallback } = callbackData.Body;

    console.log("M-Pesa Callback Received:", JSON.stringify(stkCallback, null, 2));

    // Check if payment was successful
    if (stkCallback.ResultCode === 0) {
      // Payment successful - extract details
      const metadata = stkCallback.CallbackMetadata?.Item || [];
      
      const paymentDetails = {
        merchantRequestId: stkCallback.MerchantRequestID,
        checkoutRequestId: stkCallback.CheckoutRequestID,
        amount: metadata.find(item => item.Name === "Amount")?.Value,
        mpesaReceiptNumber: metadata.find(item => item.Name === "MpesaReceiptNumber")?.Value,
        transactionDate: metadata.find(item => item.Name === "TransactionDate")?.Value,
        phoneNumber: metadata.find(item => item.Name === "PhoneNumber")?.Value,
      };

      console.log("Payment Successful:", paymentDetails);

      // TODO: Add your business logic here
      // Examples:
      // 1. Store payment in database
      // await db.payments.create({ data: paymentDetails });
      
      // 2. Send confirmation email
      // await sendEmail(paymentDetails.phoneNumber, paymentDetails);
      
      // 3. Update user subscription
      // await updateSubscription(paymentDetails.phoneNumber);

      // Respond to Safaricom
      return res.status(200).json({
        ResultCode: 0,
        ResultDesc: "Success",
      });
    } else {
      // Payment failed
      console.log("Payment Failed:", {
        code: stkCallback.ResultCode,
        description: stkCallback.ResultDesc,
      });

      // Log failed payment for analysis
      // await logFailedPayment(stkCallback);

      return res.status(200).json({
        ResultCode: 0,
        ResultDesc: "Received",
      });
    }
  } catch (error) {
    console.error("Callback Processing Error:", error);
    
    // Always return 200 to Safaricom to prevent retries
    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Received",
    });
  }
}
