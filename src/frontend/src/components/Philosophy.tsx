import { motion } from "motion/react";

const PHILOSOPHY = `Beauty is not a standard — it's a story. At Nimo's Beauty Loft, we believe every woman deserves to feel seen, celebrated, and radiant. From the roots of your hair to the glow of your skin, we craft experiences that honour your unique beauty. In Murang'a and beyond, we show up — with skill, love, and intention. You ask, we deliver.`;

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.018 320) 0%, oklch(0.25 0.020 10) 50%, oklch(0.22 0.015 320) 100%)",
        }}
      />
      {/* Decorative circle */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.075 320) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.57 0.082 10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: "oklch(0.80 0.060 10)" }}
          >
            ✦ Our Philosophy
          </span>

          <div className="relative">
            <span
              className="font-parisienne absolute -top-10 left-1/2 -translate-x-1/2 text-9xl leading-none select-none pointer-events-none"
              style={{ color: "oklch(0.72 0.075 320 / 0.15)" }}
            >
              &ldquo;
            </span>
            <p
              className="font-playfair text-xl sm:text-2xl leading-relaxed relative z-10"
              style={{ color: "oklch(0.92 0.010 55)" }}
            >
              {PHILOSOPHY}
            </p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 mx-auto h-px w-32"
            style={{ background: "oklch(0.80 0.060 10)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 font-playfair text-2xl italic"
            style={{ color: "oklch(0.80 0.060 10)" }}
          >
            You ask, I deliver.
          </motion.p>
          <p
            className="mt-2 text-sm"
            style={{ color: "oklch(0.65 0.020 320)" }}
          >
            — Nimo, Murang'a, Kenya
          </p>
        </motion.div>
      </div>
    </section>
  );
}
