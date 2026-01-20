import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Coffee, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "./NewsletterSignup";
import authorImage from "@/assets/author.png";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const categories = [{
  name: "Lifestyle",
  count: 12,
  slug: "/categories?filter=lifestyle"
}, {
  name: "Travel",
  count: 8,
  slug: "/categories?filter=travel"
}, {
  name: "Wellness",
  count: 10,
  slug: "/categories?filter=wellness"
}, {
  name: "Productivity",
  count: 6,
  slug: "/categories?filter=productivity"
}, {
  name: "Home & Decor",
  count: 5,
  slug: "/categories?filter=home-decor"
}];
const popularPosts = [{
  title: "10 Morning Habits for a Calmer Day",
  slug: "/post/productive-mornings"
}, {
  title: "The Art of Slow Living",
  slug: "/post/slow-living"
}, {
  title: "Coastal Wanderings: A Photo Essay",
  slug: "/post/coastal-wanderings"
}];
const socialLinks = [{
  icon: Instagram,
  href: "https://instagram.com/mwendahub",
  label: "Instagram"
}, {
  icon: XIcon,
  href: "https://x.com/MwendaHub",
  label: "X"
}, {
  icon: TikTokIcon,
  href: "https://tiktok.com/@mwendahub",
  label: "TikTok"
}, {
  icon: FacebookIcon,
  href: "https://facebook.com/MwendaHub",
  label: "Facebook"
}, {
  icon: LinkedInIcon,
  href: "https://linkedin.com/in/mwendahub",
  label: "LinkedIn"
}, {
  icon: Youtube,
  href: "https://youtube.com/@MwendaHub",
  label: "YouTube"
}];
export function Sidebar() {
  return <aside className="space-y-8">
      {/* Author Bio */}
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-4">
          <img alt="Author" className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20" src={authorImage} />
          <div>
            <h3 className="font-heading text-lg font-semibold text-card-foreground">Antony Mwenda</h3>
            <p className="text-sm text-muted-foreground">Writer & Creator</p>
          </div>
        </div>
        <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
          Sharing stories about mindful living, slow travel, and finding beauty in everyday moments. Welcome to my little corner of the internet.
        </p>
        <Link to="/about">
          <Button variant="outline" size="sm" className="w-full">
            Learn More About Me
          </Button>
        </Link>
      </motion.div>

      {/* Buy Me a Coffee */}
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.1
    }} className="overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Coffee className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-card-foreground">
            Support My Work
          </h3>
        </div>
        <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
          If you enjoy my content and find it valuable, consider buying me a coffee! Your support helps me keep creating.
        </p>
        <Link to="/support">
          <Button variant="support" className="w-full">
            <Coffee className="h-4 w-4" />
            Buy Me a Coffee
          </Button>
        </Link>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.2
    }} className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map(category => <li key={category.name}>
              <Link to={category.slug} className="flex items-center justify-between rounded-lg px-3 py-2 font-body text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <span>{category.name}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </Link>
            </li>)}
        </ul>
      </motion.div>

      {/* Popular Posts */}
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.3
    }} className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
          Popular Posts
        </h3>
        <ul className="space-y-3">
          {popularPosts.map((post, index) => <li key={post.slug}>
              <Link to={post.slug} className="group flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <span className="font-body text-sm text-muted-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </span>
              </Link>
            </li>)}
        </ul>
      </motion.div>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Social Links */}
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.5
    }} className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
          Follow Along
        </h3>
        <div className="flex items-center gap-3">
          {socialLinks.map(social => <a key={social.label} href={social.href} aria-label={social.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
              <social.icon className="h-5 w-5" />
            </a>)}
        </div>
      </motion.div>
    </aside>;
}