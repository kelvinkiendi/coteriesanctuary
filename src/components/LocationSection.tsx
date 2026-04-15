import { motion } from "framer-motion";
import { MapPin, Clock, Car, ExternalLink } from "lucide-react";

const LocationSection = () => (
  <section id="contact" className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Find Us</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Visit Our Sanctuary
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full aspect-[4/3] rounded-sm overflow-hidden shadow-elegant"
        >
          <iframe
            title="COTERIE Nail Sanctuary Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d36.78!3d-1.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShujaah+Mall+Kilimani!5e0!3m2!1sen!2ske!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
              <MapPin size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-primary mb-1">Address</h3>
              <p className="font-body text-foreground/70">Shujaah Mall, Opposite Adlife Plaza</p>
              <p className="font-body text-foreground/70">Kilimani, Nairobi</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Near Yaya Centre</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
              <Clock size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-primary mb-1">Operating Hours</h3>
              <p className="font-body text-foreground/70">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="font-body text-foreground/70">Sun: 11:00 AM – 5:00 PM</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
              <Car size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-primary mb-1">Parking</h3>
              <p className="font-body text-foreground/70">Ample parking available at Shujaah Mall</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Shujaah+Mall+Kilimani+Nairobi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-dark transition-colors shadow-gold"
          >
            <ExternalLink size={16} />
            Get Directions
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default LocationSection;
