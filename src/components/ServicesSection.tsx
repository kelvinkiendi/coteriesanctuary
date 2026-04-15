import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const services = [
  { name: "Classic Manicure", price: "1,500", duration: "45 min" },
  { name: "Gel Manicure", price: "2,500", duration: "60 min" },
  { name: "Luxury Spa Manicure", price: "3,500", duration: "75 min", popular: true },
  { name: "Classic Pedicure", price: "2,000", duration: "60 min" },
  { name: "Gel Pedicure", price: "3,000", duration: "75 min" },
  { name: "Luxury Spa Pedicure", price: "4,500", duration: "90 min", popular: true },
  { name: "Nail Art (per nail)", price: "200", duration: "—" },
  { name: "Acrylic Full Set", price: "4,500", duration: "90 min" },
  { name: "Acrylic Fill-In", price: "2,500", duration: "60 min" },
];

interface ServicesSectionProps {
  onBookService: (service: string) => void;
}

const ServicesSection = ({ onBookService }: ServicesSectionProps) => (
  <section id="services" className="py-20 md:py-32 bg-section-cream">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Our Services</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Indulge in Excellence
        </h2>
        <p className="font-body text-foreground/60 max-w-xl mx-auto">
          Each service is performed with precision and care, using only premium products in a pristine environment.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative bg-card rounded-sm p-6 shadow-elegant hover:shadow-gold transition-all duration-300 group ${
              s.popular ? "ring-2 ring-accent" : ""
            }`}
          >
            {s.popular && (
              <span className="absolute -top-3 right-4 bg-accent text-accent-foreground font-body text-xs font-bold px-3 py-1 rounded-sm tracking-wider uppercase">
                Popular
              </span>
            )}
            <h3 className="font-heading text-lg font-semibold text-primary mb-2">{s.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-4">
              <Clock size={14} />
              <span>{s.duration}</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="font-heading text-2xl font-bold text-accent">
                KES {s.price}
              </p>
              <button
                onClick={() => onBookService(s.name)}
                className="px-4 py-2 border border-accent text-accent font-body text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
