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
      { name: "Regular Polish Application", price: "800" },
      { name: "Gel Polish Application", price: "1000" },
      { name: " ", price: " " },
    ],
  },
  {
    title: "Overlays on Natural Nails",
    items: [
      { name: "Gel Overlay", price: "3000" },
      { name: "Acrylic Overlay", price: "4000" },
      { name: "Polygel Overlay", price: "3500" },
    ],
  },
  {
    title: "Manicures",
    items: [
      { name: "Coterie Classic Manicure", price: "2000" },
      { name: "Coterie Signature Manicure", price: "2800" },
      { name: "Coterie Pamper Manicure", price: "3500" },
    ],
  },
  {
    title: "Pedicures",
    items: [
      { name: "Coterie Classic Pedicure", price: "2300" },
      { name: "Coterie Signature Pedicure", price: "3800" },
      { name: "Coterie Pamper Pedicure", price: "4500" },
    ],
  },
  {
    title: "Gents Manicures",
    items: [
      { name: "Coterie Classic Gents Manicure", price: "2000" },
      { name: "Coterie Signature Gents Manicure", price: "2500" },
      { name: "Coterie Pamper Gents Manicure", price: "3500" },
    ],
  },
  {
    title: "Gents Pedicures",
    items: [
      { name: "Coterie Classic Gents Pedicure", price: "2000" },
      { name: "Coterie Signature Gents Pedicure", price: "3500" },
      { name: "Coterie Pamper Gents Pedicure", price: "4500" },
    ],
  },
  {
    title: "Stick-Ons",
    items: [
      { name: "Pre- Shaped Stick-Ons", price: "3000" },
      { name: " ", price: " " },
    ],
  },
  {
    title: "Tip Extensions",
    items: [
      { name: "Short Tip Extensions", price: "5500" },
      { name: "Medium Tip Extensions", price: "5000" },
      { name: "Long Tip Extensions", price: "4500" },
      { name: "XL Tip Extensions", price: "6000" },
      { name: "Stiletto Tip Extensions", price: "6500" },
      { name: "Coffin Tip Extensions", price: "6500" },
      { name: "Almond Tip Extensions", price: "6000" },
    ],
  },
  {
    title: "Nail Moulding & Sculpting",
    items: [
      { name: "Acrylic Sculpting", price: "5500" },
      { name: "Gel Sculpting", price: "5000" },
      { name: "Acrylic Moulding", price: "4500" },
    ],
  },
  {
    title: "Infills / Refills",
    items: [
      { name: "Acrylic Infill", price: "3000" },
      { name: "Gel Infill", price: "3000" },
    ],
  },
  {
    title: "Feet Extensions",
    items: [
      { name: "Toes Acrylic Feet Extensions", price: "4000" },
      { name: "Toes Gel Feet Extensions", price: "3500" },
    ],
  },
  {
    title: "Feet Infills / Refills",
    items: [
      { name: "Feet Acrylic Refill", price: "3000" },
      { name: "Feet Gel Refill", price: "3000" },
    ],
  },
  {
    title: "Soak-Offs / Removals",
    items: [
      { name: "Gel Soak-Off", price: "400" },
      { name: "Acrylic Removal", price: "700" },
      { name: "Extension Removal", price: "500" },
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
                    Kshs {item.price}
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
