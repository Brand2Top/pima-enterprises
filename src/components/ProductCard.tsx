import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  category,
  isNew,
}: ProductCardProps) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-secondary/50 aspect-square mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        {isNew && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">
            New
          </span>
        )}
        {originalPrice && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-destructive text-destructive-foreground rounded-full">
            Sale
          </span>
        )}
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full shadow-medium">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full" variant="default">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-1">
          {category}
        </p>
        <h3 className="font-sans font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-sans font-semibold text-foreground">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="font-sans text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
