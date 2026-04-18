import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollText, ArrowRight } from "lucide-react";

const ServicesTeaser = () => (
  <section id="services" className="py-20 md:py-32 bg-section-cream">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-card rounded-sm p-10 md:p-14 shadow-elegant hover-elegant hover-shimmer"
      >
        <ScrollText className="text-accent mx-auto mb-5" size={36} />
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Our Menu</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Services & Rates
        </h2>
        <p className="font-body text-foreground/60 max-w-xl mx-auto mb-8 leading-relaxed">
          Explore our full menu — manicures, pedicures, extensions, sculpting, and more — with transparent pricing across every category.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-body font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-dark transition-all duration-300 shadow-gold hover:tracking-[0.2em]"
        >
          View Full Price List <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ServicesTeaser;
