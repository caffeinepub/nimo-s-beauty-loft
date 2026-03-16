import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const WOMEN = [
  {
    src: "/assets/generated/hero-woman-1.dim_600x800.jpg",
    alt: "African beauty",
  },
  {
    src: "/assets/generated/hero-woman-2.dim_600x800.jpg",
    alt: "Radiant beauty",
  },
  {
    src: "/assets/generated/hero-woman-3.dim_600x800.jpg",
    alt: "Elegant beauty",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.14 0.012 320) 0%, oklch(0.18 0.015 10) 100%)",
      }}
    >
      {/* Three women — large, prominent, visible */}
      <div className="absolute inset-0 flex">
        {WOMEN.map((w, i) => (
          <motion.div
            key={w.alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: i * 0.15, ease: "easeOut" }}
            className="relative flex-1 h-full"
          >
            <img
              src={w.src}
              alt={w.alt}
              className="w-full h-full object-cover object-top"
              loading="eager"
              style={{ opacity: i === 1 ? 1 : 0.85 }}
            />
            {/* Edge fade between panels */}
            {i < 2 && (
              <div
                className="absolute top-0 right-0 w-10 h-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.16 0.013 320 / 0.6))",
                }}
              />
            )}
          </motion.div>
        ))}
        {/* Dark vignette overlay so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.12 0.010 320 / 0.85) 0%, oklch(0.12 0.010 320 / 0.45) 35%, transparent 65%), " +
              "linear-gradient(to top, oklch(0.12 0.010 320 / 0.7) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] uppercase mb-6 px-3 py-1.5 rounded-full border"
            style={{
              color: "oklch(0.80 0.060 10)",
              borderColor: "oklch(0.80 0.060 10 / 0.4)",
            }}
          >
            <MapPin size={11} /> Murang'a, Kenya
          </motion.span>

          <h1
            className="font-parisienne text-7xl sm:text-8xl leading-tight mb-3"
            style={{ color: "oklch(0.97 0.008 55)" }}
          >
            Nimo's
          </h1>
          <h2
            className="font-playfair text-3xl sm:text-4xl font-bold tracking-wide mb-4"
            style={{ color: "oklch(0.97 0.008 55)" }}
          >
            Beauty Loft
          </h2>
          <p
            className="font-playfair text-xl italic mb-3"
            style={{ color: "oklch(0.80 0.060 10)" }}
          >
            You ask, I deliver.
          </p>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: "oklch(0.80 0.015 320)" }}
          >
            Luxury beauty services — wigs, jewellery, eyebrow shaping, and more
            — crafted for every woman in Murang'a.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-ocid="hero.primary_button"
            >
              <Button
                size="lg"
                className="rounded-full px-8 text-base font-semibold"
                style={{
                  backgroundColor: "oklch(0.57 0.082 10)",
                  color: "white",
                }}
              >
                Explore Our World ✨
              </Button>
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-ocid="hero.secondary_button"
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base"
                style={{
                  borderColor: "oklch(0.97 0.008 55 / 0.5)",
                  color: "oklch(0.97 0.008 55)",
                  background: "transparent",
                }}
              >
                Our Services
              </Button>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to top, oklch(var(--background)), transparent)",
        }}
      />
    </section>
  );
}
