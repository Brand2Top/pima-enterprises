import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getFaqs } from "@/lib/api";

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
        {/* Render HTML answers safely */}
        <div 
          className="text-muted-foreground leading-relaxed pt-3 border-t border-border/30 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: answer }} 
        />
      </div>
    </div>
  );
};

const Faq = () => {
  const { data: faqs, isLoading, isError } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shrink-0 shadow-sm border border-border/30">
                <MessageCircleQuestion className="h-8 w-8 text-foreground" />
            </div>
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Support Center</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Find quick answers to common questions about our products, shipping, returns, and more.
            </p>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-[84px] bg-secondary/30 animate-pulse rounded-xl border border-border/50 flex items-center px-6">
                     <div className="h-5 bg-secondary/50 rounded-md w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : isError || !faqs || faqs.length === 0 ? (
              <div className="text-center py-16 bg-secondary/20 rounded-2xl border border-border/50 shadow-sm">
                <p className="text-muted-foreground font-medium text-lg">No FAQs available at the moment.</p>
                <p className="text-sm text-muted-foreground mt-2">Please check back later or contact support directly.</p>
              </div>
            ) : (
              <div className="space-y-4 shadow-sm pb-8">
                {faqs.map((faq: any, idx: number) => (
                  <div 
                    key={faq.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <FaqItem question={faq.question} answer={faq.answer} />
                  </div>
                ))}
              </div>
            )}
            
            {/* Contact fallback block */}
            {!isLoading && faqs && faqs.length > 0 && (
                <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <p className="text-muted-foreground">
                        Still have questions? 
                        <a href="mailto:hello@pima.pk" className="text-foreground font-semibold hover:text-accent transition-colors ml-2 underline underline-offset-4">
                            Contact Us
                        </a>
                    </p>
                </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
