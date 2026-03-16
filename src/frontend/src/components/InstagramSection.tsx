import { motion } from "motion/react";
import { SiInstagram } from "react-icons/si";
import { useSiteSettings } from "../hooks/useQueries";

const PLACEHOLDER_COLORS = [
  "oklch(0.85 0.045 320)",
  "oklch(0.80 0.060 10)",
  "oklch(0.88 0.030 55)",
  "oklch(0.78 0.055 320)",
  "oklch(0.83 0.040 10)",
  "oklch(0.87 0.035 320)",
];

export default function InstagramSection() {
  const { data: settings } = useSiteSettings();
  const handle = settings?.instagramHandle ?? "nimosbeautyloft";
  const instaUrl = `https://instagram.com/${handle}`;

  return (
    <section className="section-cream py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <SiInstagram size={28} className="text-rosegold mx-auto mb-3" />
          <h2 className="font-playfair text-3xl font-bold text-foreground">
            Follow Along
          </h2>
          <p className="mt-2 text-muted-foreground">
            Stay updated with our latest looks on Instagram{" "}
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rosegold hover:underline"
              data-ocid="instagram.link"
            >
              @{handle}
            </a>
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {PLACEHOLDER_COLORS.map((color) => (
            <motion.a
              key={color}
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              className="aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
              style={{ background: color }}
              data-ocid="instagram.link"
              aria-label="View on Instagram"
            >
              <SiInstagram size={22} color="white" opacity={0.7} />
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-rosegold text-rosegold font-semibold text-sm hover:bg-rosegold hover:text-white transition-colors"
            data-ocid="instagram.primary_button"
          >
            <SiInstagram size={16} /> Follow @{handle}
          </a>
        </div>
      </div>
    </section>
  );
}
