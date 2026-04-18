import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import heroImg from "@/assets/hero-nails.jpg";

interface HeroSectionProps {
  onBookNow: () => void;
}

const HeroSection = ({ onBookNow }: HeroSectionProps) => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-hero-gradient" />
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Beautifully manicured nails with gold accents at COTERIE nail sanctuary"
        width={1920}
        height={1080}
        className="w-full h-full object-cover opacity-30 mix-blend-overlay"
      />
    </div>
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

    <div className="relative container mx-auto px-4 pt-24 pb-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-body text-sm md:text-base tracking-[0.4em] uppercase text-gold-light mb-6"
      >
        Sterilized. Serene. Yours.
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-wide"
      >
        Welcome to{" "}
        <span className="text-gold-gradient">COTERIE</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-heading text-xl md:text-2xl text-primary-foreground/80 italic mb-8 max-w-2xl mx-auto"
      >
        Nairobi's Quiet Luxury Nail Sanctuary
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex items-center justify-center gap-2 text-gold-light font-body text-sm md:text-base mb-10"
      >
        <MapPin size={16} />
        <span>Shujaah Mall, Opp. Adlife Plaza, Kilimani</span>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBookNow}
        className="px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-base tracking-widest uppercase rounded-sm shadow-gold hover:bg-gold-dark transition-colors"
      >
        Book Your Session
      </motion.button>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
