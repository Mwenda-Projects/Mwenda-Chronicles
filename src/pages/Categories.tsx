import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/blog/Header";
import { Footer } from "@/components/blog/Footer";
import { ArrowRight } from "lucide-react";

import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";
import post4 from "@/assets/post-4.jpg";
import post5 from "@/assets/post-5.jpg";

const categories = [
  {
    name: "Lifestyle",
    description: "Intentional living, slow mornings, and finding joy in the everyday",
    postCount: 12,
    image: post1,
    slug: "/categories/lifestyle",
  },
  {
    name: "Travel",
    description: "Slow travel adventures and discovering hidden gems around the world",
    postCount: 8,
    image: post2,
    slug: "/categories/travel",
  },
  {
    name: "Food & Recipes",
    description: "Simple, nourishing meals and the joy of gathering around the table",
    postCount: 10,
    image: post3,
    slug: "/categories/food",
  },
  {
    name: "Home & Decor",
    description: "Creating calm, beautiful spaces that nurture your well-being",
    postCount: 6,
    image: post4,
    slug: "/categories/home-decor",
  },
  {
    name: "Wellness",
    description: "Self-care rituals, mindfulness practices, and holistic health",
    postCount: 9,
    image: post5,
    slug: "/categories/wellness",
  },
];

const Categories = () => {
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
            Explore Topics
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            Dive into the themes that inspire mindful living and everyday joy
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={category.slug}
                className="group card-hover block overflow-hidden rounded-xl border border-border bg-card shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="mb-1 font-heading text-2xl font-bold text-primary-foreground">
                      {category.name}
                    </h2>
                    <p className="text-sm text-primary-foreground/70">
                      {category.postCount} articles
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-4 font-body text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-accent">
                    Browse Articles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
