import CategoryCard from "./CategoryCard";
import { useSettings } from "@/contexts/SettingsContext";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

const Categories = () => {
  const { settings } = useSettings();
  const { data: apiCategories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const displayCategories = apiCategories && apiCategories.length > 0
    ? apiCategories.map(c => ({
      title: c.name,
      image: (typeof c.image === 'string' ? c.image : c.image?.url) || "",
      count: c.products_count || 0
    }))
    : [];

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
          {displayCategories.map((category, index) => (
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
