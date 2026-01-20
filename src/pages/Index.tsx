import { Header } from "@/components/blog/Header";
import { FeaturedCarousel } from "@/components/blog/FeaturedCarousel";
import { RecentPosts } from "@/components/blog/RecentPosts";
import { Sidebar } from "@/components/blog/Sidebar";
import { Footer } from "@/components/blog/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FeaturedCarousel />
      
      <main className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] xl:gap-12">
          <RecentPosts />
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
