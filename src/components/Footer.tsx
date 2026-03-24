import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.46.33-5.06 1.97-6.9 1.54-1.74 3.9-2.73 6.25-2.61.01 1.34-.01 2.68.01 4.02-1.08-.09-2.18.2-3.03.85-.92.7-1.44 1.83-1.46 2.99-.02 1.13.43 2.23 1.25 3.01.88.84 2.16 1.25 3.39 1.05 1.48-.24 2.58-1.45 2.87-2.93.1-1.41.06-2.85.06-4.27V.02h-.03z" />
  </svg>
);

const Footer = () => {
  const { settings } = useSettings();
  const quickLinks = [
    { name: "Shop All", href: "/shop" },
    { name: "Suitcases", href: "/shop?category=Suitcases" },
    { name: "Briefcases", href: "/shop?category=Briefcases" },
    { name: "Backpacks", href: "/shop?category=Backpacks" },
    { name: "Travel Bags", href: "/shop?category=Travel Bags" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              {settings?.site_name ? settings.site_name.split(' ')[0] : 'PIMA'} <span className="text-gold">{settings?.site_name && settings.site_name.includes(' ') ? settings.site_name.substring(settings.site_name.indexOf(' ') + 1) : 'Enterprises'}</span>
            </h3>
            <p className="font-sans text-sm text-primary-foreground/70 mb-6">
              {settings?.site_description || "Crafting premium luggage and bags since 1995. Quality, style, and durability for the modern traveler."}
            </p>
            <div className="flex gap-4">
              {(!settings || settings.facebook_link) && (
                <a href={settings?.facebook_link || "#"} target={settings?.facebook_link ? "_blank" : "_self"} rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {(!settings || settings.insta_link) && (
                <a href={settings?.insta_link || "#"} target={settings?.insta_link ? "_blank" : "_self"} rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {(!settings || settings.tiktok_link) ? (
                <a href={settings?.tiktok_link || "#"} target={settings?.tiktok_link ? "_blank" : "_self"} rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <TikTokIcon className="h-5 w-5" />
                </a>
              ) : (
                <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="font-sans text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {["Track Order", "Returns & Exchanges", "Shipping Info", "FAQs", "Size Guide"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-sans text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-primary-foreground/70 whitespace-pre-line">
                  {settings?.contact_address || "123 Business District,\nKarachi, Pakistan 75500"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a href={`tel:${settings?.contact_phone?.replace(/\s+/g, '') || "+923001234567"}`} className="font-sans text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  {settings?.contact_phone || "+92 300 1234567"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a href={`mailto:${settings?.contact_email || "hello@pima.pk"}`} className="font-sans text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  {settings?.contact_email || "hello@pima.pk"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} {settings?.site_name || "PIMA Enterprises"}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-sans text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-sans text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
