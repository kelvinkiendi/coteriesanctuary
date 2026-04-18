import { motion } from "framer-motion";

interface QuickBookSectionProps {
  onBookNow: () => void;
}

const QuickBookSection = ({ onBookNow }: QuickBookSectionProps) => (
  <section className="py-20 md:py-28 bg-section-cream relative overflow-hidden">
    {/* Decorative */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Ready?</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-4">
          Ready to Pamper Yourself?
        </h2>
        <p className="font-body text-foreground/60 max-w-lg mx-auto mb-10">
          Treat yourself to a luxury nail experience you deserve. Book your appointment at COTERIE today.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookNow}
          className="px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-base tracking-widest uppercase rounded-sm shadow-gold hover:bg-gold-dark transition-colors"
        >
          Book Your Session
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default QuickBookSection;
