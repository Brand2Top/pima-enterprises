import { useQuery } from "@tanstack/react-query";
import DOMPurify from 'dompurify';
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Share2, Printer, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug as string),
    enabled: !!slug
  });

  const formattedDate = post?.published_at
    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true })
    : 'Recently Published';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Blog link has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-20 bg-background">
        <Header />
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-32 bg-secondary/50 rounded"></div>
            <div className="space-y-4">
              <div className="h-12 w-full bg-secondary/50 rounded"></div>
              <div className="h-12 w-2/3 bg-secondary/50 rounded"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-24 bg-secondary/50 rounded"></div>
              <div className="h-6 w-24 bg-secondary/50 rounded"></div>
            </div>
            <div className="aspect-video w-full bg-secondary/50 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-secondary/50 rounded"></div>
              <div className="h-4 w-full bg-secondary/50 rounded"></div>
              <div className="h-4 w-5/6 bg-secondary/50 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col pt-20 bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center flex-grow">
          <h1 className="text-3xl font-display font-bold mb-6 text-foreground">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The story you are looking for might have been moved or removed.</p>
          <Link to="/blog">
            <Button size="lg">Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-muted-foreground mb-10 max-w-4xl mx-auto">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-border" />
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-border" />
            <span className="text-foreground font-medium truncate">{post.title}</span>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  {formattedDate}
                </div>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 leading-[1.15] tracking-tight animate-fade-in">
                {post.title}
              </h1>

              {/* Large Hero Image */}
              <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-12 shadow-xl border border-border/30">
                <img
                  src={post.featured_image.url}
                  alt={post.title}
                  className="w-full h-full object-cover animate-image-reveal"
                />
              </div>

              {/* Action Toolbar Removed */}
            </header>

            {/* Post Content */}
            <div
              className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                font-serif text-gray-800 dark:text-gray-200
                prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground 
                prose-p:leading-[1.8] 
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:border prose-img:border-border/50
                prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-sans prose-blockquote:italic
                selection:bg-accent/20 animate-fade-in"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content)
              }}
            />

            <footer className="mt-20 pt-10 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link to="/blog">
                <Button variant="outline" className="rounded-full shadow-sm hover:translate-y-[-2px] transition-transform">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Blogs
                </Button>
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 shrink-0 border border-border/30 hover:bg-secondary/50"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 border border-border/30 hover:bg-secondary/50" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
