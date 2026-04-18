import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductsSection from "@/components/ProductsSection";
import ScrollToTop from "@/components/ScrollToTop";

const Shop = () => {
  useEffect(() => {
    document.title = "Shop | COTERIE";
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <ProductsSection />
      <ScrollToTop />
    </div>
  );
};

export default Shop;
