import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const FooterSection = () => (
  <footer className="bg-primary text-primary-foreground pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-2xl font-bold tracking-[0.15em] mb-4">COTERIE</h3>
          <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
            Where Beauty Meets Sanctuary. Kilimani's premier destination for nail artistry and self-care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-gold">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Services", "Gallery", "Products", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-gold">Studio Hours</h4>
          <div className="font-body text-sm text-primary-foreground/60 space-y-1">
            <p>Mon – Sat: 9 AM – 7 PM</p>
            <p>Sunday: 11 AM – 5 PM</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-gold">Contact</h4>
          <div className="space-y-3">
            <a href="tel:+254700000000" className="flex items-center gap-2 font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors">
              <Phone size={14} /> +254 700 000 000
            </a>
            <a href="mailto:hello@coterie.co.ke" className="flex items-center gap-2 font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors">
              <Mail size={14} /> hello@coterie.co.ke
            </a>
            <div className="flex items-start gap-2 font-body text-sm text-primary-foreground/60">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>Shujaah Mall, Opp. Adlife Plaza, Kilimani, Nairobi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-primary-foreground/10 pt-8 mb-8">
        <div className="max-w-md mx-auto text-center">
          <h4 className="font-heading font-semibold mb-3 text-gold">Stay in the Loop</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold"
            />
            <button className="px-5 py-2.5 bg-accent text-accent-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-dark transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8">
        <p className="font-body text-xs text-primary-foreground/40">
          © 2026 COTERIE Nail Sanctuary. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-gold transition-colors">
            <Instagram size={18} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-gold transition-colors">
            <Facebook size={18} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-gold transition-colors font-body text-sm font-bold">
            TT
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
