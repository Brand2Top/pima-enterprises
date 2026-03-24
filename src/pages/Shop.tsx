import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/lib/api";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const bestsellersParam = searchParams.get("bestsellers");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [showBestsellers, setShowBestsellers] = useState(
    bestsellersParam === "true"
  );

  const { data: apiCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const categoryList = apiCategories && apiCategories.length > 0
    ? apiCategories.map(c => c.name)
    : [];

  const { data: apiProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const allProducts = apiProducts || [];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (showBestsellers) {
      filtered = filtered.filter((p) => p.isBestseller);
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => {
        const catName = typeof p.category === 'object' && p.category?.name ? p.category.name : p.category;
        return catName === selectedCategory;
      });
    }

    return filtered;
  }, [selectedCategory, showBestsellers, allProducts]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  const handleBestsellersToggle = () => {
    const newValue = !showBestsellers;
    setShowBestsellers(newValue);
    if (newValue) {
      searchParams.set("bestsellers", "true");
    } else {
      searchParams.delete("bestsellers");
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setShowBestsellers(false);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center">
              {showBestsellers
                ? "Bestsellers"
                : selectedCategory
                  ? selectedCategory
                  : "Shop All"}
            </h1>
            <p className="font-sans text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
              Discover our premium collection of handcrafted bags and luggage
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-sans text-sm font-medium text-muted-foreground">
                Filters:
              </span>
              <Button
                variant={!selectedCategory && !showBestsellers ? "default" : "outline"}
                size="sm"
                onClick={clearFilters}
              >
                All
              </Button>
              <Button
                variant={showBestsellers ? "default" : "outline"}
                size="sm"
                onClick={handleBestsellersToggle}
              >
                Bestsellers
              </Button>
              {categoryList.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleCategoryChange(
                      selectedCategory === category ? null : category
                    )
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-sans text-lg text-muted-foreground">
                  No products found matching your filters.
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="font-sans text-sm text-muted-foreground mb-8">
                  Showing {filteredProducts.length} products
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard {...product} image={product.featured_image?.url || product.image || ""} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
