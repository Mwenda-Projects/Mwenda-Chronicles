import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
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
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
            Search Articles
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            Find stories about mindful living, travel, and everyday inspiration
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="mx-auto mb-12 max-w-2xl"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, category, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 pl-12 pr-24 text-lg"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-16 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </motion.form>

        {query.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="mb-8 text-center text-muted-foreground">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{query}"
            </p>

            {searchResults.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={{
                      ...post,
                      slug: `/post/${post.slug}`,
                    }}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No articles found matching your search.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try different keywords or browse our categories.
                </p>
                <Link
                  to="/categories"
                  className="mt-4 inline-block text-primary hover:text-accent"
                >
                  Browse categories →
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {!query.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="py-12 text-center"
          >
            <p className="text-muted-foreground">
              Start typing to search through our articles
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
