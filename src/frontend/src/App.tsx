import {
  CalendarCheck,
  CheckCircle,
  Clock,
  DollarSign,
  Droplets,
  MapPin,
  MessageCircle,
  Phone,
  Settings,
  Shield,
  Snowflake,
  Star,
  Wind,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────

const WHATSAPP_NUMBER = "918141703081";
const CALL_NUMBER = "+918141703081";

const services = [
  {
    icon: Snowflake,
    title: "AC Installation",
    desc: "Expert setup for split and window AC units. New installation with full testing and commissioning.",
  },
  {
    icon: Wrench,
    title: "AC Repair",
    desc: "Fast diagnosis and repair of all AC issues. Same-day service for most problems.",
  },
  {
    icon: Droplets,
    title: "AC Gas Refilling",
    desc: "Refrigerant top-up using genuine gas. Leak check included with every refill.",
  },
  {
    icon: Settings,
    title: "AC Maintenance & Servicing",
    desc: "Comprehensive servicing to keep your AC running efficiently and extend its life.",
  },
  {
    icon: Wind,
    title: "AC Cleaning",
    desc: "Deep cleaning of filters, coils, and drain. Improve air quality and cooling performance.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Fast Service — Same Day Visit",
    desc: "Call before noon and we'll be at your door the same day.",
  },
  {
    icon: Shield,
    title: "Experienced Technicians",
    desc: "Certified professionals with years of hands-on AC repair experience.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Transparent pricing with no hidden charges. Get a quote before work begins.",
  },
  {
    icon: MapPin,
    title: "Doorstep Service",
    desc: "We come to you — no need to transport your AC to a workshop.",
  },
  {
    icon: Star,
    title: "Trusted by Local Customers",
    desc: "Hundreds of happy customers in the area with 5-star reviews.",
  },
];

// ────────────────────────────────────────────────
// Booking Modal
// ────────────────────────────────────────────────

interface BookingForm {
  name: string;
  phone: string;
  address: string;
}

function BookingModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    address: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});

  const validate = () => {
    const e: Partial<BookingForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (!form.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = encodeURIComponent(
      `Hello, I want to book an AC repair service.\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}`,
    );
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(waUrl, "_blank");
    setConfirmed(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setConfirmed(false);
      setForm({ name: "", phone: "", address: "" });
      setErrors({});
    }, 300);
  };

  if (!open) return null;

  return (
    <dialog
      aria-labelledby="modal-title"
      data-ocid="booking.dialog"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-transparent w-full h-full max-w-none max-h-none m-0 p-0 overflow-visible"
      open
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm fade-in w-full h-full border-0 cursor-default"
        onClick={handleClose}
        aria-label="Close dialog"
        tabIndex={-1}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-card rounded-2xl shadow-elevated p-6 slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2
            id="modal-title"
            className="text-lg font-display font-bold text-foreground"
          >
            {confirmed ? "Booking Confirmed!" : "Book a Service"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Close booking dialog"
            data-ocid="booking.close_button"
          >
            <X size={20} />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation State */
          <div
            className="text-center py-6 fade-in"
            data-ocid="booking.success_state"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
            </div>
            <p className="text-foreground font-semibold text-base mb-2">
              Your request has been sent!
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Repairer will contact you in some time.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold transition-smooth hover:brightness-110 active:scale-95"
              data-ocid="booking.confirm_button"
            >
              Back to Home
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onBlur={validate}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth text-sm"
                  data-ocid="booking.name.input"
                  autoComplete="name"
                />
                {errors.name && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="booking.name.field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onBlur={validate}
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth text-sm"
                  data-ocid="booking.phone.input"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="booking.phone.field_error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="booking-address"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Address
                </label>
                <textarea
                  id="booking-address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  onBlur={validate}
                  placeholder="Your full address"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth text-sm resize-none"
                  data-ocid="booking.address.textarea"
                  autoComplete="street-address"
                />
                {errors.address && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="booking.address.field_error"
                  >
                    {errors.address}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-accent text-accent-foreground font-semibold text-sm transition-smooth hover:brightness-110 active:scale-95 mt-2 pulse-glow"
                data-ocid="booking.submit_button"
              >
                Confirm Booking via WhatsApp
              </button>

              <p className="text-center text-xs text-muted-foreground">
                You&apos;ll be redirected to WhatsApp to confirm.
              </p>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}

// ────────────────────────────────────────────────
// Main App
// ────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-subtle">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-2.5"
            aria-label="CoolCare Services home"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Snowflake className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground text-base">
              CoolCare <span className="text-primary">Services</span>
            </span>
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a
              href="#services"
              className="hover:text-foreground transition-smooth"
              data-ocid="nav.services.link"
            >
              Services
            </a>
            <a
              href="#why-us"
              className="hover:text-foreground transition-smooth"
              data-ocid="nav.why_us.link"
            >
              Why Us
            </a>
            <a
              href="#contact"
              className="hover:text-foreground transition-smooth"
              data-ocid="nav.contact.link"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold transition-smooth hover:brightness-110 active:scale-95"
            data-ocid="header.book_service.primary_button"
          >
            <CalendarCheck size={16} />
            Book Service
          </button>

          {/* Mobile call CTA */}
          <a
            href={`tel:${CALL_NUMBER}`}
            className="flex sm:hidden items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-smooth"
            data-ocid="header.call_now.button"
          >
            <Phone size={15} />
            Call Now
          </a>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[oklch(0.35_0.16_220)]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(1 0 0 / 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.6 0.15 170 / 0.2) 0%, transparent 50%)",
          }}
        />

        {/* Hero image — right side, visible on lg+ */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <img
            src="/assets/generated/hero-ac-technician.dim_1200x600.jpg"
            alt="CoolCare Services AC technician at work"
            className="w-full h-full object-cover object-left opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-white border border-accent/30 text-xs font-medium mb-6 slide-up">
              <Zap size={12} className="text-accent" />
              Same-Day Service Available
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4 slide-up-delay-1">
              CoolCare
              <br />
              <span className="text-accent">Services</span>
            </h1>

            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed slide-up-delay-2">
              Fast &amp; Reliable AC Repair at Your Doorstep
            </p>

            <div className="flex flex-col sm:flex-row gap-3 slide-up-delay-3">
              <a
                href={`tel:${CALL_NUMBER}`}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-primary font-semibold text-sm transition-smooth hover:bg-white/90 active:scale-95 shadow-elevated"
                data-ocid="hero.call_now.button"
              >
                <Phone size={18} />
                Call Now
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm transition-smooth hover:brightness-110 active:scale-95"
                data-ocid="hero.whatsapp.button"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 slide-up-delay-4">
              {[
                ["500+", "Happy Customers"],
                ["5★", "Average Rating"],
                ["24/7", "Support"],
              ].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-white font-display font-bold text-xl sm:text-2xl">
                    {val}
                  </div>
                  <div className="text-white/60 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce"
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <title>Scroll down</title>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mt-2">
              Our Services
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base">
              Professional AC solutions for homes and businesses — fast,
              reliable, and affordable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`group bg-card border border-border rounded-2xl p-6 transition-smooth hover:shadow-elevated hover:-translate-y-1 cursor-default slide-up-delay-${Math.min(i + 1, 5)}`}
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                  <svc.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-2">
                  {svc.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {svc.desc}
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="mt-4 text-sm font-medium text-accent hover:text-accent/80 transition-smooth flex items-center gap-1"
                  data-ocid={`services.book.${i + 1}`}
                >
                  Book this service →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────── */}
      <section id="why-us" className="py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Promise
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mt-2">
              Why Choose CoolCare?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base">
              We&apos;re not just technicians — we&apos;re your neighbours who
              care about keeping you cool.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="flex gap-4 bg-card border border-border rounded-2xl p-5 transition-smooth hover:shadow-elevated hover:-translate-y-0.5"
                data-ocid={`why-us.item.${i + 1}`}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <b.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-1">
                    {b.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-12 bg-primary rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-2">
              Ready to get your AC fixed today?
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Available 7 days a week, 9 AM – 9 PM
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${CALL_NUMBER}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm transition-smooth hover:bg-white/90"
                data-ocid="cta.call_now.button"
              >
                <Phone size={16} />
                Call Now
              </a>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm transition-smooth hover:brightness-110"
                data-ocid="cta.book_service.button"
              >
                <CalendarCheck size={16} />
                Book Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mt-2">
              Contact Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {/* Phone */}
            <a
              href={`tel:${CALL_NUMBER}`}
              className="group bg-card border border-border rounded-2xl p-6 text-center transition-smooth hover:shadow-elevated hover:-translate-y-1"
              data-ocid="contact.phone.link"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-smooth">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Phone
              </div>
              <div className="font-display font-bold text-foreground text-base">
                +91-8141703081
              </div>
              <div className="text-accent text-xs mt-1.5 font-medium">
                Tap to call
              </div>
            </a>

            {/* Address */}
            <div
              className="bg-card border border-border rounded-2xl p-6 text-center"
              data-ocid="contact.address.card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Address
              </div>
              <div className="font-medium text-foreground text-sm leading-snug">
                Surat, Gujarat,
                <br />
                India — 395001
              </div>
            </div>

            {/* Hours */}
            <div
              className="bg-card border border-border rounded-2xl p-6 text-center"
              data-ocid="contact.hours.card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Working Hours
              </div>
              <div className="font-medium text-foreground text-sm">
                9 AM – 9 PM
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                7 Days a Week
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-card border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Snowflake className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              CoolCare Services
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-1">
            Fast &amp; Reliable AC Repair at Your Doorstep
          </p>
          <p className="text-muted-foreground text-xs">
            &copy; {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* ── FLOATING BOOK SERVICE BUTTON ───────────────────── */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-4 z-30 flex items-center gap-2 px-5 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm shadow-elevated transition-smooth hover:brightness-110 active:scale-95 pulse-glow"
        aria-label="Book a service"
        data-ocid="floating.book_service.primary_button"
      >
        <CalendarCheck size={18} />
        Book Service
      </button>

      {/* ── BOOKING MODAL ──────────────────────────────────── */}
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
