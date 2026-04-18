import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

const tiers = [1500, 2500, 5000, 7500, 10000];

const waLink = (amount: number) =>
  `https://wa.me/254722365861?text=${encodeURIComponent(
    `Hi COTERIE! I'd like to purchase a gift voucher worth KES ${amount.toLocaleString()}.`
  )}`;

const GiftVouchersSection = () => (
  <section id="vouchers" className="py-20 md:py-32 bg-section-brown text-primary-foreground relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <Gift className="text-accent mx-auto mb-4" size={36} />
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-light mb-3">The Perfect Gift</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Gift Vouchers
        </h2>
        <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Give the gift of indulgence with an open-amount voucher. The recipient chooses any combination
          of nail care services that suits them — up to the value of the voucher.
        </p>
        <p className="font-body text-sm text-gold-light mt-4 tracking-wider">
          Valid for 2 months from purchase
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-5xl mx-auto mb-12">
        {tiers.map((amt, i) => (
          <motion.a
            key={amt}
            href={waLink(amt)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="relative bg-card text-foreground rounded-sm p-6 text-center shadow-elegant hover:shadow-gold transition-all border border-transparent hover:border-accent"
          >
            <Sparkles className="text-accent mx-auto mb-3" size={20} />
            <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Voucher</p>
            <p className="font-heading text-3xl font-bold text-primary mb-3">
              KES {amt.toLocaleString()}
            </p>
            <span className="inline-block px-4 py-2 bg-accent text-accent-foreground font-body text-xs font-bold tracking-widest uppercase rounded-sm">
              Buy via WhatsApp
            </span>
          </motion.a>
        ))}
      </div>

      <div className="max-w-2xl mx-auto bg-card/10 backdrop-blur-sm border border-gold-light/30 rounded-sm p-6 text-center">
        <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">
          <strong className="text-gold-light">Custom amount?</strong> Vouchers are available from
          <span className="text-gold-light"> KES 1,500 to KES 10,000</span>. Message us on WhatsApp to request any value within range.
        </p>
        <a
          href="https://wa.me/254722365861?text=Hi%20COTERIE!%20I%27d%20like%20a%20custom%20gift%20voucher."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2.5 border border-gold-light text-gold-light font-body text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light hover:text-primary transition-colors"
        >
          Request Custom Voucher
        </a>
      </div>
    </div>
  </section>
);

export default GiftVouchersSection;
