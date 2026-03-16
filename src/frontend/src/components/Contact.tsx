import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useSiteSettings } from "../hooks/useQueries";

const WA_NUMBER = "2540112096201";
const EMAIL = "maryannewairimu68@gmail.com";

export default function Contact() {
  const { data: settings } = useSiteSettings();
  const igHandle = settings?.instagramHandle ?? "nimosbeautyloft";

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to get in touch")}`;
  const igUrl = `https://instagram.com/${igHandle}`;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <section id="contact" className="section-lilac py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-3">
            Get In Touch
          </span>
          <h2 className="font-playfair text-4xl font-bold text-foreground">
            Contact Us
          </h2>
          <p className="mt-3 text-muted-foreground">
            Book an appointment, ask about our products, or just say hi!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: social links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-xs hover:shadow-lilac transition-shadow group"
              data-ocid="contact.primary_button"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#25D366" }}
              >
                <SiWhatsapp size={22} color="white" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-rosegold transition-colors">
                  Chat on WhatsApp
                </p>
                <p className="text-sm text-muted-foreground">+254 0112096201</p>
              </div>
            </a>

            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-xs hover:shadow-lilac transition-shadow group"
              data-ocid="contact.link"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-pink-400 to-purple-500">
                <SiInstagram size={22} color="white" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-rosegold transition-colors">
                  Instagram
                </p>
                <p className="text-sm text-muted-foreground">@{igHandle}</p>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-xs hover:shadow-lilac transition-shadow group"
              data-ocid="contact.link"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-lilac-light">
                <Mail size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-rosegold transition-colors">
                  Email
                </p>
                <p className="text-sm text-muted-foreground">{EMAIL}</p>
              </div>
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-7 shadow-xs flex flex-col gap-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                required
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                required
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                placeholder="How can we help you?"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                required
                data-ocid="contact.textarea"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="btn-accent w-full rounded-full mt-1"
              data-ocid="contact.submit_button"
            >
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
