import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Grace M.",
    text: "COTERIE is my absolute favorite spot in Kilimani! The attention to detail is incredible, and I always leave feeling like royalty.",
    rating: 5,
  },
  {
    name: "Aisha K.",
    text: "The hygiene standards here are unmatched. I finally found a salon I can trust completely. My gel manicure lasted over three weeks!",
    rating: 5,
  },
  {
    name: "Lucy W.",
    text: "From the warm welcome to the stunning nail art, every visit is an experience. The spa pedicure is pure heaven.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-32 bg-section-brown">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-light mb-3">Testimonials</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
          What Our Clients Say
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-primary-foreground/10 backdrop-blur-sm rounded-sm p-8 border border-gold/20"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="font-body text-primary-foreground/80 leading-relaxed mb-6 italic">
              "{t.text}"
            </p>
            <p className="font-heading font-semibold text-gold">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
