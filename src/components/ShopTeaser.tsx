import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

const ShopTeaser = () => (
  <section id="shop" className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-card rounded-sm p-10 md:p-14 shadow-elegant hover-elegant hover-shimmer"
      >
        <ShoppingBag className="text-accent mx-auto mb-5" size={36} />
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Shop</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Curated Products
        </h2>
        <p className="font-body text-foreground/60 max-w-xl mx-auto mb-8 leading-relaxed">
          Take the COTERIE experience home — cuticle oils, kitchen gloves, magnetic clasps, and more hand-picked essentials.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-body font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-dark transition-all duration-300 shadow-gold hover:tracking-[0.2em]"
        >
          Browse the Shop <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ShopTeaser;
