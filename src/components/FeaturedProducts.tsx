import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { useSettings } from "@/contexts/SettingsContext";

const FeaturedProducts = () => {
  const { settings } = useSettings();
  const featuredProducts = products.slice(0, 6);

  return (
    <section id="shop" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <span className="inline-block mb-3 font-sans text-sm uppercase tracking-widest text-accent">
              {settings?.featured_collection_description || "Best Sellers"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {settings?.featured_collection_title || "Featured Products"}
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 font-sans text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors"
          >
            View All Products →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
