import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";
import { submitCheckout } from "@/lib/api";

const Checkout = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse shipping options from settings
  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', cost: Number(settings?.delivery_cost_standard) },
    { id: 'fast', name: 'Fast Delivery', cost: Number(settings?.delivery_cost_fast) },
    { id: 'sameday', name: 'Same Day Delivery', cost: Number(settings?.delivery_cost_sameday) }
  ].filter(option => option.cost > 0);

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]?.id || 'standard');
  const activeShippingCost = shippingOptions.find(o => o.id === selectedShipping)?.cost || 0;
  const activeShippingName = shippingOptions.find(o => o.id === selectedShipping)?.name || 'Standard Delivery';

  const finalTotal = totalPrice + activeShippingCost;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        customer: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        },
        items: items.map(item => ({
          product_id: Number(item.id),
          quantity: item.quantity
        })),
        shipping_method: activeShippingName,
        shipping_cost: activeShippingCost
      };

      const response = await submitCheckout(payload);

      const stateToPass = {
        orderId: response?.order_id || '',
        customer: payload.customer,
        items: items.map(i => ({ ...i })),
        totalPrice: totalPrice,
        shippingCost: activeShippingCost,
        shippingMethod: activeShippingName,
        grandTotal: finalTotal
      };

      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. We will contact you shortly.",
      });
      navigate(`/order-success?order_id=${response?.order_id || ''}`, { state: stateToPass });
    } catch (error: any) {
      toast({
        title: "Failed to place order",
        description: error.response?.data?.message || "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="font-sans text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <Link
            to="/shop"
            className="inline-flex items-center font-sans text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-secondary/30 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-sans font-medium text-foreground">
                        {item.name}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground">
                        {item.category}
                      </p>
                      <p className="font-sans font-semibold text-foreground mt-1">
                        PKR {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-sans w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between mb-2">
                  <span className="font-sans text-muted-foreground">Subtotal</span>
                  <span className="font-sans font-medium">
                    PKR {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-sans text-muted-foreground">Shipping ({activeShippingName})</span>
                  <span className="font-sans font-medium text-foreground">
                    PKR {activeShippingCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-sans font-semibold text-lg">Total</span>
                  <span className="font-sans font-bold text-lg">
                    PKR {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Form */}
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Shipping Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+92 XXX XXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="font-sans font-semibold text-foreground mb-4">Delivery Method</h3>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <div 
                        key={option.id}
                        onClick={() => setSelectedShipping(option.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex justify-between items-center ${
                          selectedShipping === option.id 
                            ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                            : 'border-border/50 hover:border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedShipping === option.id ? 'border-accent' : 'border-muted-foreground'
                          }`}>
                            {selectedShipping === option.id && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                          </div>
                          <div>
                            <p className="font-sans font-medium text-foreground">{option.name}</p>
                          </div>
                        </div>
                        <p className="font-sans font-semibold text-foreground">PKR {option.cost.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-sans text-sm text-muted-foreground mb-4">
                    Payment: Cash on Delivery (COD)
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
