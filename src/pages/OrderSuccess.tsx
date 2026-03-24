import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center pt-20 pb-12">
                <div className="container mx-auto px-4 text-center max-w-lg">
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 className="h-20 w-20 text-green-500" />
                    </div>
                    <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Order Complete!
                    </h1>
                    <p className="font-sans text-lg text-muted-foreground mb-8">
                        Thank you for shopping with us. Your order has been placed successfully.
                    </p>

                    {orderId && (
                        <div className="bg-secondary/30 p-4 rounded-lg mb-8 inline-block">
                            <span className="font-sans text-sm text-muted-foreground block mb-1">
                                Order Reference
                            </span>
                            <span className="font-sans font-mono font-bold text-xl text-foreground">
                                #{orderId}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
