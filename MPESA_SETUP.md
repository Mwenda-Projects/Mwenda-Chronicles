# M-Pesa Integration Setup Guide

This guide explains how to set up M-Pesa STK Push payments for TheMwenda Chronicles blog.

## Prerequisites

1. A Safaricom Developer Account
2. A registered Paybill or Till Number (for production)
3. Vercel account for deployment

## Step 1: Create Safaricom Developer Account

1. Go to [Safaricom Developer Portal](https://developer.safaricom.co.ke)
2. Click "Sign Up" and create an account
3. Verify your email address

## Step 2: Create an App

1. Log in to the developer portal
2. Go to "My Apps" → "Create New App"
3. Fill in:
   - App Name: "TheMwenda Chronicles"
   - Select "Lipa Na M-Pesa Sandbox" for testing
4. Note down your:
   - **Consumer Key**
   - **Consumer Secret**

## Step 3: Get Sandbox Test Credentials

For testing, use these sandbox credentials:
- **Shortcode**: 174379 (Safaricom test shortcode)
- **Passkey**: bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919

Test Phone Numbers (Sandbox):
- 254708374149
- 254795000660

## Step 4: Configure Vercel Environment Variables

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
MPESA_CALLBACK_URL=https://your-domain.vercel.app/api/mpesa/callback
MPESA_ENVIRONMENT=sandbox
```

## Step 5: Test the Integration

1. Deploy to Vercel
2. Go to your Support page
3. Click on any support tier
4. Enter a sandbox test phone number
5. Check the Vercel function logs for the STK Push response

## Step 6: Go Live (Production)

When ready for production:

### 6.1 Apply for Daraja API Production Access

1. Log in to Safaricom Developer Portal
2. Go to "Go Live" section
3. Fill in business details
4. Submit required documents:
   - Business registration certificate
   - KRA PIN certificate
   - ID copies of directors

### 6.2 Get Production Credentials

After approval, you'll receive:
- Production Consumer Key
- Production Consumer Secret
- Your registered Shortcode (Paybill/Till)
- Production Passkey

### 6.3 Update Environment Variables

Update your Vercel environment variables:

```env
MPESA_CONSUMER_KEY=production_consumer_key
MPESA_CONSUMER_SECRET=production_consumer_secret
MPESA_SHORTCODE=your_paybill_or_till
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
MPESA_ENVIRONMENT=production
```

## API Endpoints

### POST /api/mpesa/stk-push

Initiates an STK Push request.

**Request Body:**
```json
{
  "phoneNumber": "254712345678",
  "amount": 650,
  "accountReference": "TheMwendaChronicles-Supporter",
  "transactionDesc": "Support: Supporter tier"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "STK Push sent successfully",
  "checkoutRequestId": "ws_CO_123456789",
  "merchantRequestId": "12345-67890-1"
}
```

### POST /api/mpesa/callback

Receives payment confirmation from Safaricom. This is called automatically by M-Pesa after payment.

## Troubleshooting

### "Invalid Access Token"
- Check your Consumer Key and Secret
- Ensure they match the environment (sandbox/production)

### "Bad Request - Invalid PhoneNumber"
- Phone number must be in format: 254XXXXXXXXX
- Must be 12 digits total

### "The initiator information is invalid"
- Check your Shortcode and Passkey match
- Ensure you're using the correct environment

### STK Push not received on phone
- Verify phone number is correct
- Check if using sandbox with sandbox test numbers only
- In production, ensure phone has M-Pesa registered

## Security Best Practices

1. **Never expose API keys** in frontend code
2. **Validate callback requests** - implement signature verification
3. **Use HTTPS** for callback URLs
4. **Log all transactions** for reconciliation
5. **Implement idempotency** to prevent double charging

## Extending the Integration

### Store Payments in Database

In `api/mpesa/callback.ts`, you can add database storage:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// In the callback handler:
await supabase.from('payments').insert({
  checkout_request_id: paymentDetails.checkoutRequestId,
  amount: paymentDetails.amount,
  phone_number: paymentDetails.phoneNumber,
  receipt_number: paymentDetails.mpesaReceiptNumber,
  created_at: new Date().toISOString(),
});
```

### Send Email Confirmations

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'TheMwenda Chronicles <noreply@yourdomain.com>',
  to: 'recipient@example.com',
  subject: 'Thank you for your support!',
  html: `<p>We received your payment of KES ${amount}. Thank you!</p>`,
});
```

## Support

For Safaricom Daraja API support:
- Developer Portal: https://developer.safaricom.co.ke
- Support Email: apisupport@safaricom.co.ke
