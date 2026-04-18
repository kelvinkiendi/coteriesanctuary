import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onBookNow: () => void;
}

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Packages", href: "/packages", route: true },
    { label: "Vouchers", href: "#vouchers" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute?: boolean) => {
    if (isRoute) {
      // Let the browser navigate via the anchor; just close the menu.
      setMobileOpen(false);
      return;
    }
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-elegant py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-heading text-2xl md:text-3xl font-bold tracking-[0.2em] text-primary"
        >
          COTERIE
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href, l.route)}
              className="font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onBookNow}
            className="ml-4 px-6 py-2.5 bg-accent text-accent-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-dark transition-colors shadow-gold"
          >
            Book Now
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onBookNow}
            className="px-4 py-2 bg-accent text-accent-foreground font-body font-semibold text-xs tracking-wider uppercase rounded-sm"
          >
            Book
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href, l.route)}
                className="font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors py-2"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
