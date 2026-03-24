import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const { data: apiCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const dynamicNavLinks = apiCategories
    ? apiCategories.map(c => ({ name: c.name, href: `/shop?category=${encodeURIComponent(c.name)}` }))
    : [];

  const navLinks = [
    { name: "Shop All", href: "/shop" },
    ...(apiCategories && apiCategories.length > 0 ? dynamicNavLinks : []),
    { name: "FAQ", href: "/faq" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {settings?.site_logo && (
              <img src={settings.site_logo} alt={settings.site_name || "Logo"} className="h-8 md:h-10 w-auto object-contain rounded" />
            )}
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground">
              {settings?.site_name ? settings.site_name.split(' ')[0] : 'PIMA'}
            </span>
            <span className="hidden sm:inline font-sans text-xs uppercase tracking-widest text-muted-foreground">
              {settings?.site_name && settings.site_name.includes(' ') ? settings.site_name.substring(settings.site_name.indexOf(' ') + 1) : 'Enterprises'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/checkout")}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-3 font-sans text-base font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
