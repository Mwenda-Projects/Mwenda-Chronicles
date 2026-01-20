import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { featuredPosts } from "@/data/posts";

export function FeaturedCarousel() {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {featuredPosts.map((post, index) => (
              <CarouselItem key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/9] md:aspect-[21/9]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <span className="mb-3 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">
                        {post.category}
                      </span>
                      <h2 className="mb-3 font-heading text-2xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
                        {post.title}
                      </h2>
                      <p className="mb-4 max-w-2xl font-body text-sm text-primary-foreground/80 md:text-base">
                        {post.excerpt}
                      </p>
                      <div className="mb-4 flex items-center gap-4 text-xs text-primary-foreground/70 md:text-sm">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <Link to={`/post/${post.slug}`}>
                        <Button variant="hero" size="lg" className="group">
                          Read Article
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 hidden md:flex" />
          <CarouselNext className="right-4 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
