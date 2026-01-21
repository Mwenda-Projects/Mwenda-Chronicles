import { motion } from "framer-motion";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="mb-8 font-heading text-4xl font-bold text-foreground md:text-5xl">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none font-body text-muted-foreground">
            <p className="text-lg">Last updated: December 2024</p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Information We Collect
            </h2>
            <p>
              When you subscribe to our newsletter, we collect your email address. 
              When you use our contact form, we collect your name, email, and message content.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              How We Use Your Information
            </h2>
            <p>
              We use your email address to send you our newsletter updates and respond to your inquiries. 
              We do not sell or share your personal information with third parties.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Newsletter Subscription
            </h2>
            <p>
              You can unsubscribe from our newsletter at any time by clicking the unsubscribe link 
              included in every email we send.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Cookies
            </h2>
            <p>
              We use essential cookies to ensure our website functions properly. 
              We do not use tracking cookies for advertising purposes.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:mwendantony28@gmail.com" className="text-primary hover:text-accent">
                mwendantony28@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
