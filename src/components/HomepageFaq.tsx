import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { getFaqs } from "@/lib/api";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'ring-2 ring-primary/20' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex justify-between items-center bg-card hover:bg-muted/30 transition-colors text-left focus:outline-none"
      >
        <span className="font-semibold text-lg text-foreground pr-8 leading-snug">{question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-foreground' : ''}`} 
        />
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <div 
          className="text-muted-foreground leading-relaxed pt-3 border-t border-border/30 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: answer }} 
        />
      </div>
    </div>
  );
};

const HomepageFaq = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs
  });

  // Only show first 4 FAQs on homepage
  const displayFaqs = faqs?.slice(0, 4) || [];

  if (!isLoading && (!faqs || faqs.length === 0)) return null;

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">Questions?</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 mb-12">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-secondary/50 animate-pulse rounded-xl border border-border/50"></div>
              ))
            ) : (
              displayFaqs.map((faq: any) => (
                <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))
            )}
          </div>

          <div className="text-center">
            <Link to="/faq">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFaq;
