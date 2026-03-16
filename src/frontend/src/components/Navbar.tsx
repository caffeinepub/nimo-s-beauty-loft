import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-baseline gap-1.5"
          data-ocid="nav.link"
        >
          <span className="font-parisienne text-2xl text-primary">
            Nimo&apos;s
          </span>
          <span className="text-sm font-semibold tracking-widest text-foreground uppercase">
            Beauty Loft
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/254700000000?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
          data-ocid="nav.primary_button"
        >
          <Button size="sm" className="btn-accent rounded-full px-5">
            Book Appointment
          </Button>
        </a>

        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border px-4 pb-5 pt-2">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-base font-medium text-foreground"
                  onClick={() => setIsOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`https://wa.me/254700000000?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.primary_button"
              >
                <Button className="btn-accent w-full rounded-full">
                  Book Appointment
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
