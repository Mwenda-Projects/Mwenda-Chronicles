import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MpesaPaymentFormProps {
  amount: number;
  tierName: string;
  onClose: () => void;
}

export function MpesaPaymentForm({ amount, tierName, onClose }: MpesaPaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Helper to ensure the API always receives 2547XXXXXXXX
  const formatPhoneNumberForAPI = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, ""); // Remove non-digits
    if (cleaned.startsWith("0")) {
      return "254" + cleaned.slice(1);
    }
    if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
      return "254" + cleaned;
    }
    if (cleaned.startsWith("254")) {
      return cleaned;
    }
    return cleaned;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const formatted = formatPhoneNumberForAPI(phone);
    // Validates that it is exactly 12 digits starting with 2547 or 2541
    return /^254[17]\d{8}$/.test(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      setStatus("error");
      setMessage("Please enter a valid phone number (e.g., 0712345678)");
      return;
    }

    setLoading(true);
    setStatus("pending");
    setMessage("Sending STK Push to your phone...");

    try {
      // Create the 254 version just for the API call
      const apiPhoneNumber = formatPhoneNumberForAPI(phoneNumber);

      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: apiPhoneNumber, 
          amount: amount,
          accountReference: `Mwenda-${tierName.replace(/\s+/g, '')}`,
          transactionDesc: `Support: ${tierName} tier`,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Server error: Check if your API route is correctly deployed on Vercel.");
      }

      if (response.ok && (data.ResponseCode === "0" || data.success)) {
        setStatus("success");
        setMessage("STK Push sent! Please enter your M-Pesa PIN on your phone to complete the payment.");
      } else {
        setStatus("error");
        setMessage(data.CustomerMessage || data.errorMessage || "M-Pesa rejected the request. Try again.");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      setStatus("error");
      setMessage(error.message || "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-auto items-center justify-center rounded-full">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" 
              alt="M-Pesa" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <h2 className="font-heading text-xl font-bold text-card-foreground">
            Pay with M-Pesa
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {tierName} - KES {amount.toLocaleString()}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-card-foreground">
                Check Your Phone!
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {message}
              </p>
              <Button onClick={onClose} className="mt-6 w-full" variant="outline">
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-card-foreground">
                  M-Pesa Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0712345678"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => {
                      // Only allow digits to be typed
                      const val = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(val);
                      if (status === "error") setStatus("idle");
                    }}
                    className="pl-10"
                    disabled={loading}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Standard format: 0712345678 or 0112345678
                </p>
              </div>

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                >
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}

              {status === "pending" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{message}</span>
                </motion.div>
              )}

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total to Pay</span>
                  <span className="font-bold text-card-foreground text-lg">KES {amount.toLocaleString()}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3ebb3d] hover:bg-[#35a835] text-white font-bold h-12"
                disabled={loading || !phoneNumber}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to M-Pesa...
                  </>
                ) : (
                  <>
                    Pay KES {amount.toLocaleString()}
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}