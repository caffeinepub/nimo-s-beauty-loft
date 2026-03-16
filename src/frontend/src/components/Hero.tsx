import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useSiteSettings } from "../hooks/useQueries";

const WA_BOOK = `https://wa.me/254700000000?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment")}`;

export default function Hero() {
  const { data: settings } = useSiteSettings();
  const tagline = settings?.heroTagline ?? "Where Beauty Meets Luxury";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-20 right-0 w-[55%] h-full rounded-l-[3rem] overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/assets/generated/hero-beauty.dim_1200x700.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-light/80 via-cream-light/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-lg"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-4">
            ✦ Nairobi's Premier Beauty Loft
          </span>
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold leading-tight text-foreground mb-6">
            {tagline}
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Lash extensions, nail artistry, and luxury beauty services tailored
            to make you feel effortlessly radiant.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href={WA_BOOK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              data-ocid="hero.primary_button"
            >
              <Button
                size="lg"
                className="btn-accent rounded-full px-8 text-base shadow-rosegold"
              >
                Book Appointment
              </Button>
            </motion.a>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              data-ocid="hero.secondary_button"
            >
              <Button
                size="lg"
                variant="outline"
                className="btn-outline-primary rounded-full px-8 text-base"
              >
                Shop Wigs ✨
              </Button>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
