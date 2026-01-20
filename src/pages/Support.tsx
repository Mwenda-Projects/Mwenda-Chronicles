import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Heart, Star, Sparkles, Phone } from "lucide-react";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";
import { Button } from "@/components/ui/button";
import { MpesaPaymentForm } from "@/components/MpesaPaymentForm";

const supportTiers = [
  {
    name: "Coffee",
    price: 400,
    priceDisplay: "KES 400",
    description: "Buy me a coffee to fuel my writing sessions",
    icon: Coffee,
    popular: false,
  },
  {
    name: "Supporter",
    price: 650,
    priceDisplay: "KES 650",
    description: "Support my work and get a virtual high-five",
    icon: Heart,
    popular: true,
  },
  {
    name: "Super Fan",
    price: 1300,
    priceDisplay: "KES 1,300",
    description: "Help me create more content and keep the blog running",
    icon: Star,
    popular: false,
  },
  {
    name: "Patron",
    price: 3250,
    priceDisplay: "KES 3,250",
    description: "Become a patron and support my creative journey",
    icon: Sparkles,
    popular: false,
  },
];

export default function Support() {
  const [selectedTier, setSelectedTier] = useState<{ name: string; price: number } | null>(null);

  const handleSupportClick = (tierName: string, price: number) => {
    setSelectedTier({ name: tierName, price });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Coffee className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
            Support My Work
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            If you enjoy my content and find value in what I create, consider supporting me. 
            Your contribution helps me keep writing and sharing stories about mindful living.
          </p>
          
          {/* M-Pesa Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
            <Phone className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Pay securely with M-Pesa
            </span>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {supportTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl border bg-card p-6 shadow-soft ${
                tier.popular ? "border-primary ring-2 ring-primary/20" : "border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <tier.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-semibold text-card-foreground">
                {tier.name}
              </h3>
              <p className="mb-4 text-3xl font-bold text-foreground">{tier.priceDisplay}</p>
              <p className="mb-6 text-sm text-muted-foreground">{tier.description}</p>
              <Button
                variant={tier.popular ? "default" : "outline"}
                className={`w-full ${tier.popular ? "bg-green-600 hover:bg-green-700" : ""}`}
                onClick={() => handleSupportClick(tier.name, tier.price)}
              >
                <Phone className="mr-2 h-4 w-4" />
                Pay with M-Pesa
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom Amount Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-soft"
        >
          <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">
            Custom Amount
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Want to contribute a different amount? Contact me directly!
          </p>
          <Button variant="outline" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-16 max-w-2xl rounded-xl border border-border bg-card p-8 text-center shadow-soft"
        >
          <h2 className="mb-4 font-heading text-2xl font-semibold text-card-foreground">
            Other Ways to Support
          </h2>
          <p className="mb-6 text-muted-foreground">
            Not in a position to contribute financially? No worries! Here are other ways you can support:
          </p>
          <ul className="space-y-3 text-left text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Heart className="mt-0.5 h-4 w-4 text-primary" />
              Share my articles with friends and family
            </li>
            <li className="flex items-start gap-2">
              <Heart className="mt-0.5 h-4 w-4 text-primary" />
              Follow me on social media and engage with posts
            </li>
            <li className="flex items-start gap-2">
              <Heart className="mt-0.5 h-4 w-4 text-primary" />
              Leave comments and feedback on articles
            </li>
            <li className="flex items-start gap-2">
              <Heart className="mt-0.5 h-4 w-4 text-primary" />
              Subscribe to the newsletter for updates
            </li>
          </ul>
        </motion.div>

        {/* How M-Pesa Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <h3 className="mb-4 text-center font-heading text-lg font-semibold text-foreground">
            How M-Pesa Payment Works
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600 font-bold">
                1
              </div>
              <p className="text-sm text-muted-foreground">
                Click "Pay with M-Pesa" and enter your phone number
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600 font-bold">
                2
              </div>
              <p className="text-sm text-muted-foreground">
                Receive an STK Push notification on your phone
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600 font-bold">
                3
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your M-Pesa PIN to complete the payment
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* M-Pesa Payment Modal */}
      <AnimatePresence>
        {selectedTier && (
          <MpesaPaymentForm
            amount={selectedTier.price}
            tierName={selectedTier.name}
            onClose={() => setSelectedTier(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
