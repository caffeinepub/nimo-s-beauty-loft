import { Star } from "lucide-react";
import { motion } from "motion/react";
import type { Testimonial } from "../backend.d";
import { useTestimonials } from "../hooks/useQueries";

const STATIC_TESTIMONIALS = [
  {
    id: "1",
    clientName: "Amina K.",
    avatarInitials: "AK",
    rating: 5,
    review:
      "Nimo is absolutely amazing! My lashes have never looked so perfect. The vibe in the loft is so warm and welcoming — I always leave feeling like a queen!",
  },
  {
    id: "2",
    clientName: "Fatuma R.",
    avatarInitials: "FR",
    rating: 5,
    review:
      "Ordered the Silky Straight wig and it arrived so quickly! Great quality and the price is unbeatable. Will definitely order again — already eyeing the Honey Curls!",
  },
  {
    id: "3",
    clientName: "Zara M.",
    avatarInitials: "ZM",
    rating: 4,
    review:
      "The nail art she does is so detailed and cute. Love coming here for my pamper sessions! Eyebrow shaping was also on point — she really understands face framing.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={
            s <= rating
              ? "fill-rosegold text-rosegold"
              : "fill-muted text-muted"
          }
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: backendTestimonials } = useTestimonials();

  const items =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials.map((t: Testimonial) => ({
          id: t.id.toString(),
          clientName: t.clientName,
          avatarInitials: t.avatarInitials,
          rating: Number(t.rating),
          review: t.review,
        }))
      : STATIC_TESTIMONIALS;

  return (
    <section id="testimonials" className="section-lilac py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-3">
            Kind Words
          </span>
          <h2 className="font-playfair text-4xl font-bold text-foreground">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xs flex flex-col gap-4"
              data-ocid={`testimonials.item.${idx + 1}`}
            >
              <StarRating rating={t.rating} />
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {t.avatarInitials}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {t.clientName}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
