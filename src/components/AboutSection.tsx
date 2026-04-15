import { motion } from "framer-motion";
import { Shield, Sparkles, Car } from "lucide-react";
import studioImg from "@/assets/studio-interior.jpg";

const features = [
  { icon: Shield, title: "Medical-Grade Sterilization", desc: "Every tool is sterilized to the highest standards for your safety." },
  { icon: Sparkles, title: "Premium Products", desc: "We use only top-tier, internationally recognized nail care products." },
  { icon: Car, title: "Convenient Location", desc: "Ample parking at Shujaah Mall, heart of Kilimani." },
];

const AboutSection = () => (
  <section id="about" className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-full h-full border-2 gold-border rounded-sm" />
          <img
            src={studioImg}
            alt="COTERIE nail sanctuary interior with luxury brown velvet seating and gold accents"
            loading="lazy"
            width={1024}
            height={1024}
            className="relative rounded-sm w-full shadow-elegant"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Our Story</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            A Sanctuary for the Discerning
          </h2>
          <p className="font-body text-foreground/70 leading-relaxed mb-6">
            COTERIE was born from a passion for nail artistry and a commitment to creating an exclusive retreat
            where every visit feels like an escape. Nestled in Kilimani's Shujaah Mall, our sanctuary blends
            world-class hygiene standards with an atmosphere of warmth and indulgence.
          </p>
          <p className="font-body text-foreground/70 leading-relaxed mb-10">
            From the moment you step in, you'll experience meticulous care — from our medical-grade sterilization
            protocols to hand-selected premium products that nourish and protect your nails.
          </p>

          <div className="grid gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                  <f.icon size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary mb-1">{f.title}</h3>
                  <p className="font-body text-sm text-foreground/60">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
