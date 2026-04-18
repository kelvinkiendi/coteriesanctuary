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
      { name: "", price: "" },
    ],
  },
// ... keep existing code
  {
    title: "Stick-Ons",
    items: [
      { name: "Pre- Shaped Stick-Ons", price: "3000" },
      { name: "", price: "" },
    ],
  },
  {
    title: "Tip Extensions",
    items: [
      { name: "Clear Acrylic Tips ", price: "4000" },
      { name: "Colored Acrylic Tips", price: "4500" },
      { name: "Acrylic Ombre Tips", price: "5500" },
      { name: "Red Bottoms Tips ", price: "5500" },
      { name: "", price: "" },
      { name: "Extra Long Tips Addictional ", price: "2000" },
      { name: "", price: "" },
    ],
  },
// ... keep existing code
  {
    title: "Feet Extensions",
    items: [
      { name: "Toes Acrylic Feet Extensions", price: "4000" },
      { name: "Toes Gel Feet Extensions", price: "3500" },
      { name: "Toes Nail Reconstruction", price: "1000" },
      { name: "Toes Ingrown Removal", price: "1000" },
    ],
  },
// ... keep existing code
  {
    title: "Add-Ons",
    items: [
      { name: "French Tip Add-On", price: "1000" },
      { name: "Chrome / Cat Eye Finish (full set)", price: "1000" },
      { name: "Rhinestones / Gems(per nail)", price: "150" },
      { name: "Nail Art is charged separately depending on the art", price: "" },
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
                    {item.price && item.price.trim() !== "" ? `Kshs ${item.price}` : ""}
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
