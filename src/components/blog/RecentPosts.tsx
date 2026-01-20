import { motion } from "framer-motion";
import { PostCard } from "./PostCard";
import { recentPosts } from "@/data/posts";

export function RecentPosts() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Recent Stories
        </h2>
        <p className="mt-2 font-body text-muted-foreground">
          Fresh perspectives on mindful living and everyday inspiration
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {recentPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={{
              ...post,
              slug: `/post/${post.slug}`
            }}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
