import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { useSiteSettings } from "../hooks/useQueries";

const WA_NUMBER = "2540112096201";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Murang%27a%2C+Kenya";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { data: settings } = useSiteSettings();
  const igHandle = settings?.instagramHandle ?? "nimosbeautyloft";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span
                className="font-parisienne text-2xl text-primary-foreground"
                style={{ color: "oklch(0.85 0.055 320)" }}
              >
                Nimo's
              </span>
              <span className="text-sm font-semibold tracking-widest uppercase text-white/70">
                Beauty Loft
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Your premier beauty destination in{" "}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white transition-colors"
                data-ocid="footer.map_marker"
              >
                Murang'a, Kenya
              </a>
              .
            </p>
            <p className="mt-2 text-sm italic text-white/40">
              You ask, I deliver.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: "#25D366" }}
                aria-label="WhatsApp"
                data-ocid="footer.link"
              >
                <SiWhatsapp size={17} color="white" />
              </a>
              <a
                href={`https://instagram.com/${igHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500 hover:opacity-80 transition-opacity"
                aria-label="Instagram"
                data-ocid="footer.link"
              >
                <SiInstagram size={17} color="white" />
              </a>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 text-xs text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors inline-block"
              data-ocid="footer.map_marker"
            >
              📍 Murang'a, Kenya
            </a>
          </div>
        </div>

        <div className="pt-6 text-xs text-white/40">
          <p>© {year} Nimo's Beauty Loft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
