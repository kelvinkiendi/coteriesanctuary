import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import voucher1 from "@/assets/voucher-1.jpg";
import voucher2 from "@/assets/voucher-2.jpg";
import voucher3 from "@/assets/voucher-3.jpg";
import voucher4 from "@/assets/voucher-4.jpg";
import voucher5 from "@/assets/voucher-5.jpg";

const tiers = [
  { amount: 1500, image: voucher1, label: "Petite" },
  { amount: 2500, image: voucher2, label: "Classic" },
  { amount: 5000, image: voucher3, label: "Signature" },
  { amount: 7500, image: voucher4, label: "Indulgence" },
  { amount: 10000, image: voucher5, label: "Grand" },
];

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
        {tiers.map((tier, i) => (
          <motion.a
            key={tier.amount}
            href={waLink(tier.amount)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group hover-elegant hover-shimmer relative bg-card text-foreground rounded-sm overflow-hidden shadow-elegant border border-transparent hover:border-accent block"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={tier.image}
                alt={`${tier.label} gift voucher`}
                loading="lazy"
                width={512}
                height={384}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-card/90 backdrop-blur-sm rounded-sm">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-accent font-semibold">
                  {tier.label}
                </p>
              </div>
              <Sparkles
                className="absolute top-3 right-3 text-gold-light drop-shadow-md transition-all duration-500 group-hover:rotate-12 group-hover:scale-125"
                size={18}
              />
            </div>

            {/* Body */}
            <div className="p-5 text-center">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">
                Voucher
              </p>
              <p className="font-heading text-2xl md:text-3xl font-bold text-primary mb-3">
                KES {tier.amount.toLocaleString()}
              </p>
              <span className="inline-block w-full px-4 py-2 bg-accent text-accent-foreground font-body text-[11px] font-bold tracking-widest uppercase rounded-sm transition-all duration-300 group-hover:bg-gold-dark group-hover:tracking-[0.2em]">
                Buy via WhatsApp
              </span>
            </div>
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
          className="inline-block mt-4 px-6 py-2.5 border border-gold-light text-gold-light font-body text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light hover:text-primary transition-all duration-300 hover:tracking-[0.2em]"
        >
          Request Custom Voucher
        </a>
      </div>
    </div>
  </section>
);

export default GiftVouchersSection;
