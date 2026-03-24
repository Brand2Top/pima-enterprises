import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  count: number;
}

const CategoryCard = ({ title, image, count }: CategoryCardProps) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(title)}`}
      className="group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer block"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-primary-foreground mb-1">
          {title}
        </h3>
        <p className="font-sans text-sm text-primary-foreground/70">
          {count} product {count > 1 ? 's' : ''}
        </p>
      </div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-lg transition-colors duration-300" />
    </Link>
  );
};

export default CategoryCard;
