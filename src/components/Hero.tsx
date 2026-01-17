import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-luggage.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="PIMA Enterprises luxury luggage collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block mb-4 font-sans text-sm uppercase tracking-widest text-gold-light animate-fade-in">
            Premium Collection 2024
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Travel in
            <span className="block text-gradient-gold">Timeless Style</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover handcrafted luggage and bags designed for the modern traveler. 
            Quality that lasts a lifetime.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" variant="hero">
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="heroOutline">
              View Bestsellers
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
