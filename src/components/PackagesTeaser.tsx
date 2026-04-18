import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Users, Crown, Sparkles, ArrowRight } from "lucide-react";

const teasers = [
  { icon: User, title: "Solo", desc: "A serene escape designed entirely around you." },
  { icon: Users, title: "Couples", desc: "Side-by-side luxury — the perfect shared ritual." },
  { icon: Crown, title: "Masculine", desc: "Refined grooming for the modern gentleman." },
  { icon: Sparkles, title: "Custom", desc: "Curate your own combination, your way." },
];

const PackagesTeaser = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Curated Experiences</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Coterie Packages
        </h2>
        <p className="font-body text-foreground/60 max-w-xl mx-auto">
          Thoughtfully bundled treatments for every occasion — solo escapes, shared moments, and beyond.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {teasers.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="bg-card rounded-sm p-6 text-center shadow-elegant hover:shadow-gold transition-shadow"
          >
            <div className="w-12 h-12 mx-auto rounded-sm bg-accent/10 flex items-center justify-center mb-4">
              <t.icon className="text-accent" size={22} />
            </div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-2">{t.title} Package</h3>
            <p className="font-body text-sm text-foreground/60">{t.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-body font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-dark transition-colors shadow-gold"
        >
          Explore All Packages <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default PackagesTeaser;
