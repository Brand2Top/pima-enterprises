import { Link, useSearchParams, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Printer, MapPin, Phone, Mail, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const { settings } = useSettings();

    const orderId = searchParams.get("order_id") || location.state?.orderId;
    const orderDetails = location.state;

    if (!orderId && !orderDetails) {
        return <Navigate to="/" replace />;
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16 px-4">
                <div className="container mx-auto max-w-3xl">
                    {/* Success Header - Hide on Print */}
                    <div className="text-center mb-10 print:hidden">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-16 w-16 text-green-500 animate-fade-in" />
                        </div>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                            Order Complete!
                        </h1>
                        <p className="font-sans text-muted-foreground">
                            Thank you for your purchase. We've received your order.
                        </p>
                    </div>

                    {/* Receipt Paper Effect */}
                    <div className="bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden border border-border/50 print:shadow-none print:border-none print:rounded-none">
                        {/* Receipt Header */}
                        <div className="bg-secondary/40 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border">
                            <div>
                                <h2 className="font-display text-2xl font-bold mb-1">
                                    {settings?.site_name || "PIMA Enterprises"}
                                </h2>
                                <p className="font-sans text-sm text-muted-foreground">Official Receipt</p>
                            </div>
                            <div className="mt-4 md:mt-0 text-left md:text-right">
                                <p className="font-sans font-semibold text-lg text-foreground">
                                    Order #{orderId || "Pending"}
                                </p>
                                <p className="font-sans text-sm text-muted-foreground">
                                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            {orderDetails ? (
                                <>
                                    {/* Customer Information */}
                                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                                        <div>
                                            <h3 className="font-sans font-semibold text-foreground mb-3 flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                Shipping Address
                                            </h3>
                                            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                                                <span className="font-medium text-foreground block mb-1">{orderDetails.customer?.name}</span>
                                                {orderDetails.customer?.address?.split(',').map((line: string, i: number) => (
                                                    <span key={i} className="block">{line.trim()}</span>
                                                ))}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-sans font-semibold text-foreground mb-3 flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                Contact Info
                                            </h3>
                                            <div className="space-y-2">
                                                <p className="font-sans text-sm text-muted-foreground flex items-center gap-2 break-all">
                                                    <Mail className="h-3.5 w-3.5 shrink-0" />
                                                    {orderDetails.customer?.email}
                                                </p>
                                                <p className="font-sans text-sm text-muted-foreground flex items-center gap-2">
                                                    <Phone className="h-3.5 w-3.5 shrink-0" />
                                                    {orderDetails.customer?.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="mb-8">
                                        <h3 className="font-display text-lg font-semibold mb-4 border-b border-border pb-2 flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            Order Details
                                        </h3>

                                        <div className="space-y-3">
                                            {/* Table Header */}
                                            <div className="grid grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/50 hidden md:grid">
                                                <div className="col-span-6">Item</div>
                                                <div className="col-span-2 text-center">Qty</div>
                                                <div className="col-span-2 text-right">Price</div>
                                                <div className="col-span-2 text-right">Total</div>
                                            </div>

                                            {/* Items */}
                                            {orderDetails.items?.map((item: any, i: number) => (
                                                <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center py-3 border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors">
                                                    <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                                                        <div className="h-12 w-12 rounded-md bg-secondary overflow-hidden shrink-0 border border-border/50">
                                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="font-sans font-medium text-foreground text-sm">{item.name}</p>
                                                            <p className="font-sans text-xs text-muted-foreground">{item.category}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between md:hidden mt-2 pt-2 border-t border-border/30 w-full">
                                                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                                        <span className="text-xs text-muted-foreground">PKR {Number(item.price)?.toLocaleString()}</span>
                                                        <span className="text-sm font-semibold">PKR {(item.price * item.quantity)?.toLocaleString()}</span>
                                                    </div>

                                                    <div className="col-span-2 text-center text-sm font-medium hidden md:block">
                                                        {item.quantity}
                                                    </div>
                                                    <div className="col-span-2 text-right text-sm text-muted-foreground hidden md:block">
                                                        PKR {Number(item.price)?.toLocaleString()}
                                                    </div>
                                                    <div className="col-span-2 text-right text-sm font-medium text-foreground hidden md:block">
                                                        PKR {(item.price * item.quantity)?.toLocaleString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Totals Summary */}
                                    <div className="border-t border-border pt-6 flex flex-col items-end">
                                        <div className="w-full md:w-1/2 lg:w-1/3 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span className="font-medium text-foreground">PKR {Number(orderDetails.totalPrice)?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm pb-3 border-b border-border">
                                                <span className="text-muted-foreground">Shipping ({orderDetails.shippingMethod || 'Standard'})</span>
                                                <span className="font-medium text-foreground">PKR {Number(orderDetails.shippingCost || 0).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-1">
                                                <span className="font-semibold text-lg text-foreground">Total</span>
                                                <span className="font-bold text-xl text-foreground">PKR {Number(orderDetails.grandTotal || orderDetails.totalPrice).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-4">We've received your order, but couldn't load the receipt details.</p>
                                    <p className="text-sm">Please check your email for the order confirmation.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons - Hide on Print */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print Receipt
                        </Button>
                        <Link to="/shop">
                            <Button size="lg" className="w-full sm:w-auto">
                                Continue Shopping
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
