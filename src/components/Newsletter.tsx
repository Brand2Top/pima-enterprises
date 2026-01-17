import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block mb-3 font-sans text-sm uppercase tracking-widest text-accent">
            Stay Updated
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join the PIMA Family
          </h2>
          <p className="font-sans text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and travel inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 bg-secondary border-border focus:border-accent"
            />
            <Button type="submit" size="lg" className="h-12">
              Subscribe
            </Button>
          </form>
          <p className="font-sans text-xs text-muted-foreground mt-4">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
