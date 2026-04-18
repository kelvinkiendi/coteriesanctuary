import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PriceListSection from "@/components/PriceListSection";
import BookingModal from "@/components/BookingModal";
import ScrollToTop from "@/components/ScrollToTop";

const Services = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");

  useEffect(() => {
    document.title = "Services & Rates | COTERIE";
    window.scrollTo({ top: 0 });
  }, []);

  const openBooking = (service?: string) => {
    setPreselectedService(service || "");
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <PriceListSection onBookService={(s) => openBooking(s)} />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedService={preselectedService}
      />
      <ScrollToTop />
    </div>
  );
};

export default Services;
