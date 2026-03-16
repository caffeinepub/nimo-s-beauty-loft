import { motion } from "motion/react";
import { useSiteSettings } from "../hooks/useQueries";

const DEFAULT_ABOUT = `Nimo's Beauty Loft was born from a deep love of beauty, self-care, and the art of making every client feel like royalty. Founded by Nimo — a passionate beauty artist with years of experience — the loft is a serene escape where luxury meets affordability.

We believe every woman deserves to look and feel her absolute best. Whether you're here for stunning lash extensions, intricate nail art, perfectly shaped brows, or to find your dream wig, we pour our heart into every service.

At Nimo's, you're not just a client — you're family. Welcome to your beauty sanctuary in Murang'a, Kenya.`;

export default function About() {
  const { data: settings } = useSiteSettings();
  const aboutText = settings?.aboutText || DEFAULT_ABOUT;
  const paragraphs = aboutText.split("\n\n");

  return (
    <section id="about" className="section-lilac py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-4">
              Our Story
            </span>
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">
              A Loft Built on Love &amp; Luxury
            </h2>
            <div className="space-y-4">
              {paragraphs.map((para) => (
                <p
                  key={para.slice(0, 30)}
                  className="text-muted-foreground leading-relaxed text-base"
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative max-w-sm w-full">
              <div className="bg-white rounded-3xl p-10 shadow-lilac relative">
                <span className="font-parisienne text-7xl text-primary/30 absolute -top-4 left-6 leading-none select-none">
                  &ldquo;
                </span>
                <p className="font-playfair text-xl italic text-foreground leading-relaxed mt-6">
                  You ask, I deliver.
                </p>
                <p className="mt-4 text-sm text-muted-foreground font-medium">
                  — The Nimo&apos;s Promise
                </p>
              </div>
              <div
                className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.72 0.075 320 / 0.25) 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
