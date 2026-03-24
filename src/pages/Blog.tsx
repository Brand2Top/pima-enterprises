import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPosts, Post } from "@/lib/api";
import { Button } from "@/components/ui/button";

const BlogCard = ({ post }: { post: Post }) => {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently';

  return (
    <article className="group bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden">
        <img
          src={post.featured_image.url}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-medium text-accent mb-3 uppercase tracking-widest">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-border/30">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-semibold text-foreground hover:text-accent transition-colors gap-1.5 group/btn"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const Blog = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shrink-0 shadow-sm border border-border/30">
              <BookOpen className="h-8 w-8 text-foreground" />
            </div>
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Our Journal</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              Stories & Insights
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Explore the latest trends in luxury travel, adventure stories, and expert gear guides.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card border border-border/50 rounded-2xl overflow-hidden h-[420px] flex flex-col animate-pulse">
                  <div className="aspect-[16/9] bg-secondary/50"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-secondary/50 rounded w-1/4"></div>
                    <div className="h-8 bg-secondary/50 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-secondary/50 rounded w-full"></div>
                      <div className="h-4 bg-secondary/50 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError || !posts || posts.length === 0 ? (
            <div className="text-center py-24 bg-secondary/20 rounded-2xl border border-border/50 max-w-2xl mx-auto">
              <p className="text-muted-foreground font-medium text-lg">No stories found yet.</p>
              <p className="text-sm text-muted-foreground mt-2 mb-8">We're currently dreaming up new adventures. Check back soon!</p>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {posts.map((post, idx) => (
                <div
                  key={post.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
