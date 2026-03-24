import CategoryCard from "./CategoryCard";
import briefcaseImg from "@/assets/product-briefcase.jpg";
import suitcaseImg from "@/assets/product-suitcase.jpg";
import laptopBagImg from "@/assets/product-laptop-bag.jpg";
import duffleImg from "@/assets/product-duffle.jpg";
import { useSettings } from "@/contexts/SettingsContext";

const Categories = () => {
  const { settings } = useSettings();
  const categories = [
    { title: "Suitcases", image: suitcaseImg, count: 24 },
    { title: "Briefcases", image: briefcaseImg, count: 18 },
    { title: "Laptop Bags", image: laptopBagImg, count: 15 },
    { title: "Travel Bags", image: duffleImg, count: 21 },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-3 font-sans text-sm uppercase tracking-widest text-accent">
            {settings?.categories_description || "Browse by Category"}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {settings?.categories_title || "Find Your Perfect Bag"}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
