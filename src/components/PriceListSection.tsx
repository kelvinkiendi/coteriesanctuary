import { motion } from "framer-motion";

interface PriceItem {
  name: string;
  price: string;
}

interface Category {
  title: string;
  items: PriceItem[];
}

const categories: Category[] = [
  {
    title: "Application & Polish",
    items: [
      { name: "Regular Polish Application", price: "TBD" },
      { name: "Gel Polish Application", price: "TBD" },
      { name: "French Polish Add-On", price: "TBD" },
    ],
  },
  {
    title: "Overlays on Natural Nails",
    items: [
      { name: "Gel Overlay", price: "TBD" },
      { name: "Acrylic Overlay", price: "TBD" },
      { name: "Builder Gel Overlay", price: "TBD" },
    ],
  },
  {
    title: "Manicures",
    items: [
      { name: "Classic Manicure", price: "TBD" },
      { name: "Gel Manicure", price: "TBD" },
      { name: "Luxury Spa Manicure", price: "TBD" },
    ],
  },
  {
    title: "Pedicures",
    items: [
      { name: "Classic Pedicure", price: "TBD" },
      { name: "Gel Pedicure", price: "TBD" },
      { name: "Luxury Spa Pedicure", price: "TBD" },
    ],
  },
  {
    title: "Gents Manicures",
    items: [
      { name: "Classic Gents Manicure", price: "TBD" },
      { name: "Deluxe Gents Manicure", price: "TBD" },
    ],
  },
  {
    title: "Gents Pedicures",
    items: [
      { name: "Classic Gents Pedicure", price: "TBD" },
      { name: "Deluxe Gents Pedicure", price: "TBD" },
    ],
  },
  {
    title: "Stick-Ons",
    items: [
      { name: "Press-On Stick-Ons", price: "TBD" },
      { name: "Premium Stick-On Set", price: "TBD" },
    ],
  },
  {
    title: "Tip Extensions",
    items: [
      { name: "Short Tip Extensions", price: "TBD" },
      { name: "Medium Tip Extensions", price: "TBD" },
      { name: "Long Tip Extensions", price: "TBD" },
    ],
  },
  {
    title: "Nail Molding & Sculpting",
    items: [
      { name: "Acrylic Sculpting", price: "TBD" },
      { name: "Gel Sculpting", price: "TBD" },
      { name: "Custom Mold Design", price: "TBD" },
    ],
  },
  {
    title: "Infills / Refills",
    items: [
      { name: "Acrylic Infill", price: "TBD" },
      { name: "Gel Infill", price: "TBD" },
    ],
  },
  {
    title: "Feet Extensions",
    items: [
      { name: "Acrylic Feet Extensions", price: "TBD" },
      { name: "Gel Feet Extensions", price: "TBD" },
    ],
  },
  {
    title: "Feet Infills / Refills",
    items: [
      { name: "Feet Acrylic Refill", price: "TBD" },
      { name: "Feet Gel Refill", price: "TBD" },
    ],
  },
  {
    title: "Soak-Offs / Removals",
    items: [
      { name: "Gel Soak-Off", price: "TBD" },
      { name: "Acrylic Removal", price: "TBD" },
      { name: "Extension Removal", price: "TBD" },
    ],
  },
];

interface Props {
  onBookService: (service: string) => void;
}

const PriceListSection = ({ onBookService }: Props) => (
  <section id="services" className="py-20 md:py-32 bg-section-cream">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Price List</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Our Services & Rates
        </h2>
        <p className="font-body text-foreground/60 max-w-xl mx-auto">
          Transparent pricing across our full menu. Each service performed with precision in a pristine, sterilized environment.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="bg-card rounded-sm p-6 shadow-elegant hover-elegant hover-shimmer border border-transparent hover:border-accent/40"
          >
            <h3 className="font-heading text-lg font-bold text-primary mb-4 pb-3 border-b border-border">
              {cat.title}
            </h3>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-3">
                  <button
                    onClick={() => onBookService(item.name)}
                    className="text-left font-body text-sm text-foreground/80 hover:text-accent transition-colors"
                  >
                    {item.name}
                  </button>
                  <span className="font-heading text-sm font-semibold text-accent whitespace-nowrap">
                    KES {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <p className="text-center font-body text-xs text-muted-foreground mt-10">
        Prices subject to update. Tap a service name to book it instantly.
      </p>
    </div>
  </section>
);

export default PriceListSection;
