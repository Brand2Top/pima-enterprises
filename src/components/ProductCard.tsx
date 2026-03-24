import { ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string | number;
  name: string;
  slug?: string;
  price: number;
  originalPrice?: number;
  discounted_price?: number;
  stock?: number;
  image: string;
  category: any;
  isNew?: boolean;
}

const ProductCard = ({
  id,
  name,
  slug,
  price,
  originalPrice,
  discounted_price,
  stock,
  image,
  category,
  isNew,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const isOutOfStock = stock === 0;
  const hasDiscount = typeof discounted_price === 'number' && discounted_price > 0;

  const displayPrice = hasDiscount ? discounted_price : price;
  const displayOriginalPrice = hasDiscount ? price : originalPrice;
  const categoryName = typeof category === 'object' && category?.name ? category.name : category;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({ id: String(id), name, price: displayPrice, image, category: categoryName });
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-secondary/50 aspect-square mb-4">
        <Link to={`/product/${slug || id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {isOutOfStock && (
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-foreground text-background rounded-full">
              Out of Stock
            </span>
          )}
          {!isOutOfStock && isNew && (
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">
              New
            </span>
          )}
          {!isOutOfStock && hasDiscount && (
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-destructive text-destructive-foreground rounded-full">
              Sale
            </span>
          )}
          {!isOutOfStock && !hasDiscount && originalPrice && (
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-destructive text-destructive-foreground rounded-full">
              Sale
            </span>
          )}
        </div>
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full shadow-medium">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full" variant="default" onClick={handleAddToCart} disabled={isOutOfStock}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-1">
          {categoryName}
        </p>
        <Link to={`/product/${slug || id}`}>
          <h3 className="font-sans font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-sans font-semibold text-foreground">
            PKR {displayPrice?.toLocaleString()}
          </span>
          {displayOriginalPrice && (
            <span className="font-sans text-sm text-muted-foreground line-through">
              PKR {displayOriginalPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
