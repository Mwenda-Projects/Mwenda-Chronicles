import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { posts } from "@/data/posts";

const categoryInfo: Record<string, { name: string; description: string }> = {
  lifestyle: {
    name: "Lifestyle",
    description: "Intentional living, slow mornings, and finding joy in the everyday",
  },
  travel: {
    name: "Travel",
    description: "Slow travel adventures and discovering hidden gems around the world",
  },
  food: {
    name: "Food & Recipes",
    description: "Simple, nourishing meals and the joy of gathering around the table",
  },
  "home-decor": {
    name: "Home & Decor",
    description: "Creating calm, beautiful spaces that nurture your well-being",
  },
  wellness: {
    name: "Wellness",
    description: "Self-care rituals, mindfulness practices, and holistic health",
  },
  productivity: {
    name: "Productivity",
    description: "Tips and strategies for getting things done mindfully",
  },
  "food-lifestyle": {
    name: "Food & Lifestyle",
    description: "Where culinary experiences meet intentional living",
  },
};

export default function CategoryPosts() {
  const { category } = useParams<{ category: string }>();
  const info = categoryInfo[category || ""] || { name: category, description: "" };
  
  const filteredPosts = posts.filter((post) => {
    const postCategory = post.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
    return postCategory.includes(category || "") || category?.includes(postCategory.split("-")[0]);
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12 md:py-16">
        <Link
          to="/categories"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All Categories
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
            {info.name}
          </h1>
          <p className="max-w-2xl font-body text-lg text-muted-foreground">
            {info.description}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
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
              No articles found in this category yet.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-primary hover:text-accent"
            >
              Browse all articles →
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
