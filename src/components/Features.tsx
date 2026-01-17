import { Truck, Shield, RefreshCw, Award } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹5,000",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "100% secure checkout",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Handcrafted excellence",
    },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-foreground/10 mb-4">
                <feature.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-sans font-semibold text-primary-foreground mb-1">
                {feature.title}
              </h3>
              <p className="font-sans text-sm text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
