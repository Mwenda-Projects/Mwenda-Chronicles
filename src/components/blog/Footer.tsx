import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const footerLinks = {
  explore: [{
    name: "Home",
    path: "/"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Categories",
    path: "/categories"
  }, {
    name: "Contact",
    path: "/contact"
  }, {
    name: "Support",
    path: "/support"
  }],
  categories: [{
    name: "Lifestyle",
    path: "/categories/lifestyle"
  }, {
    name: "Travel",
    path: "/categories/travel"
  }, {
    name: "Wellness",
    path: "/categories/wellness"
  }, {
    name: "Productivity",
    path: "/categories/productivity"
  }],
  legal: [{
    name: "Privacy Policy",
    path: "/privacy"
  }, {
    name: "Terms of Service",
    path: "/terms"
  }]
};
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
export function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-4 inline-block">
              <span className="font-heading text-2xl font-bold text-foreground">
                The<span className="text-primary">Mwenda</span>
              </span>
            </Link>
            <p className="mb-6 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
              A lifestyle blog dedicated to mindful living, slow travel, and finding joy in the everyday moments that make life beautiful.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(social => <a key={social.label} href={social.href} aria-label={social.label} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                  <social.icon className="h-4 w-4" />
                </a>)}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold text-foreground">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map(link => <li key={link.name}>
                  <Link to={link.path} className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold text-foreground">
              Categories
            </h4>
            <ul className="space-y-2">
              {footerLinks.categories.map(link => <li key={link.name}>
                  <Link to={link.path} className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold text-foreground">
              Get in Touch
            </h4>
            <p className="mb-4 font-body text-sm text-muted-foreground">
              Based in Nairobi, Kenya
            </p>
            <a className="inline-flex items-center gap-2 font-body text-sm text-primary transition-colors hover:text-accent" href="mailto:mwendantony28@gmail.com">
              <Mail className="h-4 w-4" />
              mwendantony28@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-body text-sm text-muted-foreground">
            © {currentYear} TheMwenda Chronicles. From The House of Mwenda
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map(link => <Link key={link.name} to={link.path} className="font-body text-xs text-muted-foreground transition-colors hover:text-primary">
                {link.name}
              </Link>)}
          </div>
        </div>
      </div>
    </footer>;
}