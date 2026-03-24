import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Minus, Plus, ShoppingBag, Heart, Truck, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/api";

const ProductDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const { addToCart } = useCart();
    const { toast } = useToast();

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState<string>("");

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProduct(slug as string),
        enabled: !!slug
    });

    useEffect(() => {
        if (product?.featured_image?.url) {
            setActiveImage(product.featured_image.url);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-background pt-20">
                <Header />
                <div className="container mx-auto px-4 py-8 flex-grow">
                    <div className="animate-pulse flex flex-col md:flex-row gap-8 lg:gap-16">
                        <div className="w-full md:w-1/2 aspect-square bg-secondary/50 rounded-xl"></div>
                        <div className="w-full md:w-1/2 space-y-4 pt-4">
                            <div className="w-24 h-4 bg-secondary/50 rounded"></div>
                            <div className="w-3/4 h-10 bg-secondary/50 rounded"></div>
                            <div className="w-1/4 h-8 bg-secondary/50 rounded"></div>
                            <div className="w-full h-32 bg-secondary/50 rounded mt-8"></div>
                            <div className="w-1/2 h-12 bg-secondary/50 rounded mt-8"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen flex flex-col pt-20 bg-background">
                <Header />
                <div className="container mx-auto px-4 py-32 text-center flex-grow">
                    <h1 className="text-3xl font-display font-bold mb-6 text-foreground">Product Not Found</h1>
                    <p className="text-muted-foreground mb-8">The product you are looking for might have been removed or is temporarily unavailable.</p>
                    <Link to="/shop">
                        <Button size="lg">Return to Shop</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const isOutOfStock = product.stock === 0;
    const hasDiscount = product.discounted_price && product.discounted_price > 0;
    const displayPrice = hasDiscount ? product.discounted_price! : product.price;

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'increase' && selectedQuantity < product.stock) {
            setSelectedQuantity(q => q + 1);
        } else if (type === 'decrease' && selectedQuantity > 1) {
            setSelectedQuantity(q => q - 1);
        }
    };

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        addToCart({
            id: String(product.id),
            name: product.name,
            price: displayPrice,
            image: product.featured_image?.url || '',
            category: product.category?.name || 'Uncategorized',
            quantity: selectedQuantity
        });

        toast({
            title: "Added to Cart",
            description: `${selectedQuantity} x ${product.name} added to your cart.`,
        });
    };

    const allImages = [product.featured_image, ...(product.gallery || [])].filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs */}
                    <div className="flex items-center text-sm text-muted-foreground mb-8">
                        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-border" />
                        <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-border" />
                        <span className="text-foreground font-medium">{product.name}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-secondary/10 rounded-2xl overflow-hidden md:sticky md:top-28 border border-border/50">
                                {activeImage ? (
                                    <img
                                        src={activeImage}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-opacity duration-300 transform hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image Available</div>
                                )}
                                {hasDiscount && !isOutOfStock && (
                                    <span className="absolute top-4 left-4 px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-destructive text-destructive-foreground rounded-full shadow-sm z-10">
                                        Sale
                                    </span>
                                )}
                                {isOutOfStock && (
                                    <span className="absolute top-4 left-4 px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-foreground text-background rounded-full shadow-sm z-10">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {allImages.length > 1 && (
                                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                                    {allImages.map((img) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveImage(img.url)}
                                            className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImage === img.url ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent hover:border-border scale-100 opacity-70 hover:opacity-100'}`}
                                        >
                                            <img src={img.url} alt="Thumbnail view" className="w-full h-full object-cover bg-secondary/20" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col py-2">
                            <div className="mb-3">
                                <Link to={`/shop?category=${encodeURIComponent(product.category?.name || '')}`} className="text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
                                    {product.category?.name || 'Uncategorized'}
                                </Link>
                            </div>

                            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                                {product.name}
                            </h1>

                            {/* Pricing */}
                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                                    <span className="text-xl md:text-2xl mr-1 text-muted-foreground font-medium">PKR</span>
                                    {displayPrice.toLocaleString()}
                                </span>
                                {hasDiscount ? (
                                    <span className="text-lg md:text-xl text-muted-foreground line-through mb-1.5 font-medium">
                                        {product.price.toLocaleString()}
                                    </span>
                                ) : null}
                            </div>

                            {/* Description */}
                            <div className="prose prose-sm md:prose-base text-muted-foreground mb-10 leading-relaxed selection:bg-accent/20">
                                <p>{product.description}</p>
                            </div>

                            <div className="h-px w-full bg-border/50 mb-8" />

                            {/* Add to Cart Actions */}
                            <div className="space-y-8 mb-10">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-foreground uppercase tracking-widest">Quantity</span>
                                        {product.stock > 0 && product.stock <= 5 && (
                                            <span className="text-xs font-bold text-destructive uppercase tracking-widest animate-pulse">
                                                Only {product.stock} left in stock!
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center border-2 border-border/50 rounded-lg w-max bg-background shadow-sm">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleQuantityChange('decrease')}
                                            disabled={selectedQuantity <= 1 || isOutOfStock}
                                            className="h-12 w-12 shrink-0 rounded-none hover:bg-secondary/50 text-foreground"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <div className="w-16 text-center font-semibold text-lg text-foreground">
                                            {isOutOfStock ? 0 : selectedQuantity}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleQuantityChange('increase')}
                                            disabled={selectedQuantity >= product.stock || isOutOfStock}
                                            className="h-12 w-12 shrink-0 rounded-none hover:bg-secondary/50 text-foreground"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        size="lg"
                                        className="flex-1 text-base h-14 font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                                        onClick={handleAddToCart}
                                        disabled={isOutOfStock}
                                    >
                                        <ShoppingBag className="mr-2 h-5 w-5" />
                                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;
