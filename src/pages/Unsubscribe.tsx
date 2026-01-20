import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MailX, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const { data, error } = await supabase.functions.invoke("unsubscribe-newsletter", {
        body: { email },
      });

      if (error) throw error;

      setStatus("success");
      setMessage(data.message || "You've been successfully unsubscribed.");
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Failed to unsubscribe. Please try again.");
    }
  };

  // Auto-unsubscribe if email is in URL
  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      handleUnsubscribe();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            {status === "loading" ? (
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            ) : status === "success" ? (
              <CheckCircle className="h-10 w-10 text-green-500" />
            ) : status === "error" ? (
              <XCircle className="h-10 w-10 text-destructive" />
            ) : (
              <MailX className="h-10 w-10 text-muted-foreground" />
            )}
          </div>

          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
            {status === "success"
              ? "You're Unsubscribed"
              : status === "error"
              ? "Oops!"
              : "Unsubscribe"}
          </h1>

          {status === "idle" && (
            <>
              <p className="mb-8 font-body text-muted-foreground">
                Enter your email address to unsubscribe from our newsletter.
              </p>
              <form onSubmit={handleUnsubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="outline" className="w-full">
                  Unsubscribe
                </Button>
              </form>
            </>
          )}

          {status === "loading" && (
            <p className="font-body text-muted-foreground">
              Processing your request...
            </p>
          )}

          {(status === "success" || status === "error") && (
            <>
              <p className="mb-6 font-body text-muted-foreground">{message}</p>
              {status === "success" && (
                <p className="text-sm text-muted-foreground">
                  We're sorry to see you go. If you change your mind, you can always
                  subscribe again from our homepage.
                </p>
              )}
              {status === "error" && (
                <Button
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="mt-4"
                >
                  Try Again
                </Button>
              )}
            </>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
