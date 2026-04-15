import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import cuticleImg from "@/assets/products-cuticle.jpg";

const products = [
  { name: "Cuticle Oils", desc: "Nourishing blend for healthy, hydrated cuticles.", price: "800", img: cuticleImg },
  { name: "Shoe Horns", desc: "Elegant, durable shoe horns for everyday convenience.", price: "600", img: cuticleImg },
  { name: "Kitchen Washing Gloves", desc: "Protect your manicure while tackling daily chores.", price: "400", img: cuticleImg },
  { name: "Magnetic Necklace Clasps", desc: "Effortless elegance — fasten necklaces with one hand.", price: "1,200", img: cuticleImg },
];

const ProductsSection = () => {
  const whatsappLink = (productName: string) =>
    `https://wa.me/?text=${encodeURIComponent(`Hi COTERIE! I'm interested in the ${productName}. Could you share more details?`)}`;

  return (
    <section id="products" className="py-20 md:py-32 bg-section-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Shop</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Curated Products
          </h2>
          <p className="font-body text-foreground/60 max-w-xl mx-auto">
            Take the COTERIE experience home with our hand-picked selection of beauty and lifestyle essentials.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-sm overflow-hidden shadow-elegant hover:shadow-gold transition-all duration-300 group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-primary mb-1">{p.name}</h3>
                <p className="font-body text-sm text-foreground/60 mb-3">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-accent">KES {p.price}</span>
                  <a
                    href={whatsappLink(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-accent text-accent font-body text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <MessageCircle size={12} />
                    Inquire
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
