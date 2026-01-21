import { motion } from "framer-motion";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";

const Terms = () => {
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
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none font-body text-muted-foreground">
            <p className="text-lg">Last updated: December 2024</p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using TheMwenda Chronicles, you accept and agree to be bound by 
              these Terms of Service.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Use of Content
            </h2>
            <p>
              All content on this blog is for informational purposes only. You may share our content 
              with proper attribution and a link back to the original post.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Intellectual Property
            </h2>
            <p>
              All content, including text, images, and graphics, is the property of TheMwenda Chronicles 
              unless otherwise noted. Unauthorized reproduction is prohibited.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              User Conduct
            </h2>
            <p>
              When using our contact form or newsletter subscription, you agree to provide accurate 
              information and not to use our services for any unlawful purpose.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Disclaimer
            </h2>
            <p>
              The information provided on this blog is for general informational purposes only. 
              We make no warranties about the completeness, reliability, or accuracy of this information.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the website 
              constitutes acceptance of any changes.
            </p>
            
            <h2 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              Contact
            </h2>
            <p>
              For questions about these Terms, contact us at{" "}
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

export default Terms;
