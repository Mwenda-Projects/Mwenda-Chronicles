import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email },
      });

      if (error) throw error;

      setEmail("");
      toast({
        title: "Welcome aboard! 🎉",
        description: data.message || "You've successfully subscribed to our newsletter.",
      });
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6 shadow-soft"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-card-foreground">
          Newsletter
        </h3>
      </div>
      <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
        Get weekly inspiration delivered straight to your inbox. No spam, just good vibes.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
          {isLoading ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
