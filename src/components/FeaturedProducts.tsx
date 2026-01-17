import ProductCard from "./ProductCard";
import briefcaseImg from "@/assets/product-briefcase.jpg";
import suitcaseImg from "@/assets/product-suitcase.jpg";
import laptopBagImg from "@/assets/product-laptop-bag.jpg";
import duffleImg from "@/assets/product-duffle.jpg";
import backpackImg from "@/assets/product-backpack.jpg";

const FeaturedProducts = () => {
  const products = [
    {
      name: "Executive Leather Briefcase",
      price: 12999,
      image: briefcaseImg,
      category: "Briefcases",
      isNew: true,
    },
    {
      name: "Voyager Hardshell Suitcase",
      price: 18499,
      originalPrice: 22999,
      image: suitcaseImg,
      category: "Suitcases",
    },
    {
      name: "Cambridge Laptop Bag",
      price: 8999,
      image: laptopBagImg,
      category: "Laptop Bags",
      isNew: true,
    },
    {
      name: "Heritage Weekender Duffle",
      price: 15999,
      image: duffleImg,
      category: "Travel Bags",
    },
    {
      name: "Urban Pro Backpack",
      price: 9499,
      originalPrice: 11999,
      image: backpackImg,
      category: "Backpacks",
    },
    {
      name: "Classic Leather Satchel",
      price: 7999,
      image: laptopBagImg,
      category: "Laptop Bags",
    },
  ];

  return (
    <section id="shop" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <span className="inline-block mb-3 font-sans text-sm uppercase tracking-widest text-accent">
              Best Sellers
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Featured Products
            </h2>
          </div>
          <a
            href="#all-products"
            className="mt-4 md:mt-0 font-sans text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors"
          >
            View All Products →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.name}
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
