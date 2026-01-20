import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
const navLinks = [{
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
}];
export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };
  return <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            The<span className="text-primary">Mwenda Chronicles</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => <Link key={link.name} to={link.path} className="link-underline font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </Link>)}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <AnimatePresence>
            {isSearchOpen && <motion.form initial={{
            width: 0,
            opacity: 0
          }} animate={{
            width: 200,
            opacity: 1
          }} exit={{
            width: 0,
            opacity: 0
          }} transition={{
            duration: 0.2
          }} onSubmit={handleSearch}>
                <Input type="search" placeholder="Search articles..." className="h-9" autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </motion.form>}
          </AnimatePresence>
          <Button variant="ghost" size="icon" onClick={() => isSearchOpen && !searchQuery ? setIsSearchOpen(false) : setIsSearchOpen(!isSearchOpen)} aria-label="Toggle search">
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button variant="hero" size="sm">
            Subscribe
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: "auto",
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.2
      }} className="border-t border-border md:hidden">
            <div className="container py-4">
              <form onSubmit={handleSearch} className="mb-4">
                <Input type="search" placeholder="Search articles..." className="w-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </form>
              <nav className="flex flex-col gap-3">
                {navLinks.map(link => <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className="font-body text-base font-medium text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>)}
              </nav>
              <Button variant="hero" className="mt-4 w-full">
                Subscribe
              </Button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}