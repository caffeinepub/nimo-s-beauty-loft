import { motion } from "motion/react";
import { useGalleryImages } from "../hooks/useQueries";

const STATIC_GALLERY = [
  { url: "/assets/generated/gallery-1.dim_600x800.jpg", caption: "Glam look" },
  { url: "/assets/generated/gallery-2.dim_600x800.jpg", caption: "Nail art" },
  {
    url: "/assets/generated/wig-glueless-1.dim_600x600.jpg",
    caption: "Silky straight",
  },
  {
    url: "/assets/generated/service-lashes.dim_600x400.jpg",
    caption: "Lash set",
  },
  {
    url: "/assets/generated/wig-glueless-2.dim_600x600.jpg",
    caption: "Honey curls",
  },
  {
    url: "/assets/generated/service-nails.dim_600x400.jpg",
    caption: "Nail art",
  },
  {
    url: "/assets/generated/wig-headband-1.dim_600x600.jpg",
    caption: "Headband wig",
  },
  {
    url: "/assets/generated/jewellery-1.dim_600x600.jpg",
    caption: "Rose gold set",
  },
];

export default function Gallery() {
  const { data: backendImages } = useGalleryImages();
  const images =
    backendImages && backendImages.length > 0
      ? backendImages.map((g) => ({ url: g.imageUrl, caption: g.caption }))
      : STATIC_GALLERY;

  return (
    <section id="gallery" className="section-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-3">
            Our Work
          </span>
          <h2 className="font-playfair text-4xl font-bold text-foreground">
            Gallery
          </h2>
          <p className="mt-3 text-muted-foreground">
            A glimpse into the beauty we create every day.
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, idx) => (
            <motion.div
              key={img.url}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-xs group"
              data-ocid={`gallery.item.${idx + 1}`}
            >
              <div className="relative">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-medium">
                    {img.caption}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
