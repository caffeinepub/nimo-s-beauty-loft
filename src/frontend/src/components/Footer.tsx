import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { useSiteSettings } from "../hooks/useQueries";

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
  const waNumber = (settings?.whatsappNumber ?? "+254700000000")
    .replace("+", "")
    .replace(/\s/g, "");
  const igHandle = settings?.instagramHandle ?? "nimosbeautyloft";
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

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
              Where beauty meets luxury. Your premiere beauty destination in
              Nairobi.
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
                href={`https://wa.me/${waNumber}`}
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
            <p className="mt-5 text-xs text-white/40">Nairobi, Kenya</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Nimo's Beauty Loft. All rights reserved.</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
