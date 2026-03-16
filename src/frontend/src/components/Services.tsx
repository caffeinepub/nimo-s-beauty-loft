import { Button } from "@/components/ui/button";
import { Eye, Hand, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { useServices } from "../hooks/useQueries";

const WA_NUMBER = "2540112096201";
const WA_BOOK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment")}`;

const STATIC_SERVICES = [
  {
    name: "Lash Installation",
    description:
      "Wake up to perfectly voluminous, flutter-worthy lashes every day. We offer classic, hybrid, and full-glam volume sets tailored to your eye shape.",
    icon: Sparkles,
    image: "/assets/generated/service-lashes.dim_600x400.jpg",
  },
  {
    name: "Nail Services",
    description:
      "From subtle nude sets to bold nail art masterpieces — gel, acrylic, and press-ons available. Your nails, your canvas.",
    icon: Hand,
    image: "/assets/generated/nail-services.dim_800x600.jpg",
  },
  {
    name: "Eyebrow Shaping",
    description:
      "Expertly sculpted brows that frame your face and elevate your entire look. Threading, waxing, and tinting available.",
    icon: Eye,
    image: "/assets/generated/service-eyebrows.dim_600x400.jpg",
  },
  {
    name: "General Beauty",
    description:
      "Full-face glam, special occasion makeup, skin prep, and all-around pampering services to help you show up as your most radiant self.",
    icon: Star,
    image: "/assets/generated/general-beauty.dim_800x600.jpg",
  },
];

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Hand,
  Eye,
  Star,
};

export default function Services() {
  const { data: backendServices } = useServices();
  const hasBackend = backendServices && backendServices.length > 0;

  return (
    <section id="services" className="section-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-3">
            What We Offer
          </span>
          <h2 className="font-playfair text-4xl font-bold text-foreground">
            Our Services
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hasBackend
            ? backendServices.map((svc, idx) => {
                const Icon = iconMap[svc.iconName] ?? Star;
                return (
                  <ServiceCard
                    key={svc.id.toString()}
                    name={svc.name}
                    description={svc.description}
                    icon={Icon}
                    image={null}
                    index={idx}
                  />
                );
              })
            : STATIC_SERVICES.map((svc, idx) => (
                <ServiceCard
                  key={svc.name}
                  name={svc.name}
                  description={svc.description}
                  icon={svc.icon}
                  image={svc.image}
                  index={idx}
                />
              ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={WA_BOOK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="services.primary_button"
          >
            <Button
              size="lg"
              className="btn-accent rounded-full px-10 shadow-rosegold"
            >
              Book Any Service via WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  name,
  description,
  icon: Icon,
  image,
  index,
}: {
  name: string;
  description: string;
  icon: React.ElementType;
  image: string | null;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lilac transition-shadow product-card"
      data-ocid="services.card"
    >
      {image ? (
        <div className="h-44 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-44 flex items-center justify-center section-lilac">
          <Icon size={40} className="text-primary" />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-playfair font-semibold text-lg text-foreground mb-2">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
