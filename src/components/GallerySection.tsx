import { motion } from "framer-motion";
import nailArt1 from "@/assets/nail-art-1.jpg";
import nailArt2 from "@/assets/nail-art-2.jpg";
import nailArt3 from "@/assets/nail-art-3.jpg";
import heroImg from "@/assets/hero-nails.jpg";

const images = [
  { src: nailArt1, alt: "Elegant nail art designs including French tips and floral patterns", span: "col-span-2 row-span-2" },
  { src: nailArt2, alt: "Professional nail technician applying brown and gold gel polish", span: "" },
  { src: nailArt3, alt: "Rose gold acrylic nails holding champagne glass", span: "" },
  { src: heroImg, alt: "Luxury nude and gold gel manicure on silk fabric", span: "col-span-2" },
];

const GallerySection = () => (
  <section id="gallery" className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">Gallery</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          Our Artistry
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`overflow-hidden rounded-sm ${img.span}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
