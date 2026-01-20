import { motion } from "framer-motion";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { Coffee, BookOpen, Camera, Heart } from "lucide-react";
import authorImage from "@/assets/author.png";
import authorImage3 from "@/assets/author-3.jpg";
import post4 from "@/assets/post-4.jpg";
const About = () => {
  return <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mb-12 text-center">
            <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">Hello, I'm Mwenda</h1>
            <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
              Writer, dreamer, and curator of life's quiet moments
            </p>
          </motion.div>

          {/* Author Image */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.1
        }} className="mb-12 overflow-hidden rounded-2xl">
            <img src={post4} alt="Sarah's home office" className="h-64 w-full object-cover md:h-96" />
          </motion.div>

          {/* Story Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
          }} transition={{
          delay: 0.2
        }} className="mb-12 grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
            <img alt="Antony Mwenda" className="mx-auto h-48 w-48 rounded-full object-cover ring-4 ring-primary/20 md:mx-0" src={authorImage3} />
            <div className="space-y-4 font-body text-muted-foreground">
              <p className="text-lg leading-relaxed">Welcome to The Mwenda Chronicles, a space where I share thoughts shaped by experience, curiosity, and intentional living. This blog is a reflection of my journey through ideas, growth, technology, and the quiet lessons found in everyday life.</p>
              <p className="leading-relaxed">After moving through fast-paced routines and constant pressure to keep up, I realized the value of slowing down to think, question, and create with purpose. This blog grew from that shift—a place to document insights, stories, and perspectives that matter beyond the noise.</p>
              <p className="leading-relaxed">Here, you’ll find reflections on personal growth, modern life, innovation, and the moments in between. My approach is simple: live thoughtfully, learn continuously, and leave room for meaning.</p>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="mb-12">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              What I Write About
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
              icon: BookOpen,
              title: "Mindful Living",
              description: "Practical tips for slowing down and living with intention in our fast-paced world."
            }, {
              icon: Camera,
              title: "Slow Travel",
              description: "Stories and guides for exploring the world at a leisurely, meaningful pace."
            }, {
              icon: Heart,
              title: "Wellness",
              description: "Gentle self-care practices for nurturing your mind, body, and spirit."
            }].map((item, index) => <motion.div key={item.title} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4 + index * 0.1
            }} className="rounded-xl border border-border bg-card p-6 text-center shadow-soft">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }} className="mb-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
            <Coffee className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
              Support My Work
            </h2>
            <p className="mx-auto mb-6 max-w-md font-body text-muted-foreground">
              If my words have inspired you or brought a moment of calm to your day, 
              consider supporting my work. Every coffee helps me keep creating content 
              that matters.
            </p>
            <Button variant="support" size="lg">
              <Coffee className="h-5 w-5" />
              Buy Me a Coffee
            </Button>
          </motion.div>

          {/* Newsletter */}
          <div className="mx-auto max-w-md">
            <NewsletterSignup />
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default About;