import { Button } from "@/components/ui/button";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Instagram", href: "#instagram" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openCart } = useCart();

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
          <span
            className="font-parisienne text-2xl"
            style={{
              color: scrolled ? "oklch(0.50 0.082 10)" : "oklch(0.97 0.008 55)",
            }}
          >
            Nimo's
          </span>
          <span
            className="text-sm font-semibold tracking-widest uppercase transition-colors"
            style={{
              color: scrolled
                ? "oklch(0.30 0.015 320)"
                : "oklch(0.88 0.010 55)",
            }}
          >
            Beauty Loft
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color: scrolled
                    ? "oklch(0.45 0.020 320)"
                    : "oklch(0.85 0.010 55)",
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2 rounded-full transition-colors hover:bg-white/20"
            aria-label="Open cart"
            data-ocid="nav.cart_button"
          >
            <ShoppingBag
              size={22}
              style={{
                color: scrolled
                  ? "oklch(0.30 0.015 320)"
                  : "oklch(0.97 0.008 55)",
              }}
            />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {itemCount}
              </span>
            )}
          </button>

          <a
            href={`https://wa.me/254112096201?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
            data-ocid="nav.primary_button"
          >
            <Button size="sm" className="btn-accent rounded-full px-5">
              Book Now
            </Button>
          </a>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
            style={{
              color: scrolled
                ? "oklch(0.30 0.015 320)"
                : "oklch(0.97 0.008 55)",
            }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white/97 backdrop-blur-md border-b border-border px-4 pb-5 pt-2">
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
                href={`https://wa.me/254112096201?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment")}`}
                target="_blank"
                rel="noopener noreferrer"
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
