import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const WA_NUMBER = "2540112096201";

const faqs = [
  {
    id: "how-to-book",
    q: "How do I book an appointment?",
    a: "Simply send a WhatsApp DM or call/text +254 0112096201. We'll confirm your slot and guide you through the next steps.",
  },
  {
    id: "which-services",
    q: "Which services can I book?",
    a: "You can book: Nail Services (gel polish, manicure, pedicure), Eyebrow Shaping, and Lash Installs.",
  },
  {
    id: "location",
    q: "Where are you located?",
    a: "We are home-based and mobile in Murang'a, Kenya. We can come to you or you can visit us — just confirm your preferred arrangement when booking.",
  },
  {
    id: "hours",
    q: "What are your working hours?",
    a: "We're available Monday to Saturday, 9am – 8pm. Sundays are rest days.",
  },
  {
    id: "deposit",
    q: "Is a deposit required to book?",
    a: "Yes, a booking deposit of Ksh 200 via M-Pesa is required to confirm your appointment. Booking details and till/number will be shared when you reach out.",
  },
  {
    id: "advance",
    q: "How far in advance should I book?",
    a: "We recommend booking at least 24 hours in advance to secure your preferred time slot. Same-day bookings may be available — just reach out and we'll do our best!",
  },
  {
    id: "cancel",
    q: "What if I need to cancel or reschedule?",
    a: "Please notify us at least 12 hours before your appointment. We'll happily reschedule you. No-shows without notice may forfeit the booking deposit.",
  },
  {
    id: "walkin",
    q: "Can I walk in without booking?",
    a: "Since we are home-based and mobile, walk-ins are not available. All appointments must be booked in advance to ensure we're ready and available for you.",
  },
];

export default function BookingFAQ() {
  const [open, setOpen] = useState<string | null>(null);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment!")}`;

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-3">
            Appointments
          </span>
          <h2 className="font-playfair text-4xl font-bold text-foreground">
            Booking FAQ
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know before booking your appointment.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 mb-10">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-lilac/40 bg-lilac/5 overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 group"
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
              >
                <span className="font-semibold text-foreground group-hover:text-rosegold transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-rosegold transition-transform duration-300 ${
                    open === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === faq.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            Ready to book? Reach out on WhatsApp -- we'd love to have you!
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <Button className="btn-accent rounded-full px-8 gap-2">
              <MessageCircle size={18} />
              Book Now via WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
