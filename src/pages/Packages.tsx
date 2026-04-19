import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, Users, Crown, Sparkles, Check } from "lucide-react";

interface Package {
  id: string;
  icon: typeof User;
  name: string;
  tagline: string;
  description: string;
  inclusions: string[];
  duration: string;
  price: string;
}

const packages: Package[] = [
  {
    id: "solo",
    icon: User,
    name: "Solo Package",
    tagline: "Your private escape",
    description:
      "A complete nail sanctuary experience designed for one. Slow down, settle in, and enjoy unhurried care from start to finish.",
    inclusions: [
      "Luxury Spa Manicure",
      "Luxury Spa Pedicure",
      "Hand & foot exfoliation",
      "Hydrating mask treatment",
      "Hot towel finish",
      "Polish of choice (regular or gel)",
    ],
    duration: "Approx. 2 hours",
    price: "7,500",
  },
  {
    id: "couples",
    icon: Users,
    name: "Couples Package",
    tagline: "Shared, side by side",
    description:
      "Two guests, one beautiful ritual. Perfect for partners, mother-and-daughter, or a best-friend treat in our private couples corner.",
    inclusions: [
      "2 × Luxury Spa Manicures",
      "2 × Luxury Spa Pedicures",
      "Welcome refreshments for two",
      "Side-by-side seating",
      "Polish of choice for each guest",
      "Complimentary nail art accent (1 nail each)",
    ],
    duration: "Approx. 2 hours",
    price: "12,500",
  },
  {
    id: "masculine",
    icon: Crown,
    name: "Masculine Package",
    tagline: "Grooming, refined",
    description:
      "A focused grooming session for the modern gentleman — clean, precise, and entirely understated.",
    inclusions: [
      "Gents Manicure (cuticle care + buffing)",
      "Gents Pedicure (callus + heel care)",
      "Hand and foot massage",
      "Matte buff finish",
      "Hot towel treatment",
    ],
    duration: "Approx. 90 minutes",
    price: "5,500",
  },
  {
    id: "custom",
    icon: Sparkles,
    name: "Custom Package",
    tagline: "Built around you",
    description:
      "Choose any combination of services from our menu and we'll bundle it into a personalized experience tailored to your preferences and time.",
    inclusions: [
      "Choose any services from our menu",
      "Personalized scheduling",
      "Optional add-ons (nail art, extensions, treatments)",
      "Group bookings welcome (3+ guests)",
      "Bridal & event styling available",
    ],
    duration: "Flexible",
    price: "From 4,500",
  },
];

const Packages = () => {
  useEffect(() => {
    document.title = "Coterie Packages | COTERIE Nail Sanctuary";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "Curated Coterie packages — solo, couples, masculine, and custom nail spa experiences in Kilimani, Nairobi.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  const bookViaWhatsApp = (pkg: string) =>
    `https://wa.me/254722365861?text=${encodeURIComponent(
      `Hi COTERIE! I'd like to book the ${pkg}.`
    )}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-section-brown text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.25em] uppercase text-gold-light hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-light mb-3">
              Curated Experiences
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Coterie <span className="text-gold-gradient">Packages</span>
            </h1>
            <p className="font-body text-primary-foreground/70 leading-relaxed">
              Thoughtfully bundled treatments for every occasion. Choose the experience that suits your moment —
              or build your own.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Packages */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-sm p-8 shadow-elegant hover:shadow-gold transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center">
                    <pkg.icon className="text-accent" size={26} />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">{pkg.name}</h2>
                    <p className="font-body text-sm italic text-accent">{pkg.tagline}</p>
                  </div>
                </div>

                <p className="font-body text-foreground/70 leading-relaxed mb-6">{pkg.description}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-body text-sm text-foreground/80">
                      <Check className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between pt-5 border-t border-border">
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">{pkg.duration}</p>
                    <p className="font-heading text-2xl font-bold text-accent">
                      {pkg.id === "custom" ? "From Kshs " : "Kshs  "}
                      {pkg.price}
                    </p>
                  </div>
                  <a
                    href={bookViaWhatsApp(pkg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-accent text-accent-foreground font-body text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gold-dark transition-colors shadow-gold"
                  >
                    Book Session
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="font-body text-foreground/60 mb-4">
              Have something specific in mind? We'd love to design it with you.
            </p>
            <a
              href="https://wa.me/254722365861?text=Hi%20COTERIE!%20I%27d%20like%20to%20discuss%20a%20custom%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 border border-accent text-accent font-body font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Chat With Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Packages;
