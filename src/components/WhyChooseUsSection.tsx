import { motion } from "framer-motion";
import { ShieldCheck, Gem, HeartHandshake, Leaf, Crown, Clock3 } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Hospital-Grade Hygiene", desc: "Autoclave-sterilized tools, single-use files, and a meticulously sanitized space — every single time." },
  { icon: Gem, title: "Premium Products Only", desc: "Internationally trusted brands that nourish, protect, and last." },
  { icon: HeartHandshake, title: "Personalized Care", desc: "Unhurried sessions tailored to you — your preferences, your pace, your style." },
  { icon: Leaf, title: "Calm, Curated Sanctuary", desc: "Step away from the noise. Soft textures, warm lighting, and quiet luxury throughout." },
  { icon: Crown, title: "Skilled Nail Artisans", desc: "Trained technicians with an eye for detail and a passion for finish." },
  { icon: Clock3, title: "Respect for Your Time", desc: "Timely starts, prompt service, and a booking experience as polished as your nails." },
];

const WhyChooseUsSection = () => (
  <section className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Why COTERIE</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Why Choose Us
        </h2>
        <p className="font-body text-foreground/60 max-w-xl mx-auto">
          A nail experience defined by safety, artistry, and an atmosphere that feels effortlessly elevated.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="bg-card rounded-sm p-7 shadow-elegant hover-elegant hover-shimmer border border-transparent hover:border-accent/40 group"
          >
            <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:scale-110 transition-all">
              <r.icon className="text-accent group-hover:text-accent-foreground transition-colors" size={22} />
            </div>
            <h3 className="font-heading text-xl font-semibold text-primary mb-2">{r.title}</h3>
            <p className="font-body text-sm text-foreground/60 leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
