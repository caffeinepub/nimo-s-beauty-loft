import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  placeholderBg?: string;
}

const PRODUCTS: Record<string, Product[]> = {
  wigs: [
    {
      id: "wig-1",
      name: "Glueless Lace Front Wig",
      image: "/assets/generated/gallery-wig-1.dim_600x600.jpg",
      description: "Silky straight, natural look, easy wear",
      category: "Wigs",
    },
    {
      id: "wig-2",
      name: "Curly Headband Wig",
      image: "/assets/generated/instagram-post-2.dim_400x400.jpg",
      description: "Gorgeous curls, no glue needed",
      category: "Wigs",
    },
    {
      id: "wig-3",
      name: "Wavy Body Wig",
      image: "/assets/generated/instagram-post-5.dim_400x400.jpg",
      description: "Bouncy waves, full volume",
      category: "Wigs",
    },
  ],
  jewellery: [
    {
      id: "jew-1",
      name: "Gold Necklace",
      image: "/assets/generated/jewellery-necklace-gold.dim_600x600.jpg",
      description: "Bold, elegant, unforgettable gold chain",
      category: "Jewellery",
    },
    {
      id: "jew-2",
      name: "Silver Necklace",
      image: "/assets/generated/jewellery-necklace-silver.dim_600x600.jpg",
      description: "Delicate silver chain with pendant",
      category: "Jewellery",
    },
    {
      id: "jew-3",
      name: "Pearly Necklace",
      image: "/assets/generated/jewellery-necklace-pearly.dim_600x600.jpg",
      description: "Classic lustrous pearl string necklace",
      category: "Jewellery",
    },
    {
      id: "jew-4",
      name: "Gold Ring",
      image: "/assets/generated/jewellery-ring-gold.dim_600x600.jpg",
      description: "Stunning gold ring with intricate design",
      category: "Jewellery",
    },
    {
      id: "jew-5",
      name: "Silver Ring",
      image: "/assets/generated/jewellery-ring-silver.dim_600x600.jpg",
      description: "Elegant minimalist silver ring",
      category: "Jewellery",
    },
    {
      id: "jew-6",
      name: "Anklet",
      image: "/assets/generated/jewellery-anklet.dim_600x600.jpg",
      description: "Delicate charm anklet, gold & silver",
      category: "Jewellery",
    },
    {
      id: "jew-7",
      name: "Earrings",
      image: "/assets/generated/jewellery-earrings.dim_600x600.jpg",
      description: "Dangling gold and pearl earrings",
      category: "Jewellery",
    },
    {
      id: "jew-8",
      name: "Nose Ring",
      image: "/assets/generated/jewellery-nosering.dim_600x600.jpg",
      description: "Tiny elegant gold nose stud",
      category: "Jewellery",
    },
  ],
  totes: [
    {
      id: "tote-1",
      name: "Classic Canvas Tote",
      image: "/assets/generated/product-tote-bag.dim_500x500.jpg",
      description: "Carry everything in style",
      category: "Tote Bags",
    },
    {
      id: "tote-2",
      name: "Printed Tote Bag",
      image: "/assets/generated/totebag-printed.dim_600x600.jpg",
      description: "Vibrant African print design",
      category: "Tote Bags",
    },
    {
      id: "tote-3",
      name: "Mini Tote",
      image: "/assets/generated/totebag-mini.dim_600x600.jpg",
      description: "Compact, cute, multiple colours",
      category: "Tote Bags",
    },
  ],
  tattoos: [
    {
      id: "tat-1",
      name: "Floral Sleeve Set",
      image: "/assets/generated/product-fake-tattoos.dim_500x500.jpg",
      description: "Delicate floral art for arms",
      category: "Fake Tattoos",
    },
    {
      id: "tat-2",
      name: "Butterfly Tattoos",
      image: "/assets/generated/tattoo-butterfly.dim_600x600.jpg",
      description: "Whimsical colorful butterflies",
      category: "Fake Tattoos",
    },
    {
      id: "tat-3",
      name: "Star Tattoos",
      image: "/assets/generated/tattoo-star.dim_600x600.jpg",
      description: "Elegant gold and black star designs",
      category: "Fake Tattoos",
    },
  ],
  gels: [
    {
      id: "gel-1",
      name: "Rose & Shea Shower Gel",
      image: "/assets/generated/product-shower-gel.dim_500x500.jpg",
      description: "Moisturising, floral-scented luxury",
      category: "Shower Gels",
    },
    {
      id: "gel-2",
      name: "Mango Butter Shower Gel",
      image: "/assets/generated/showergel-mango-butter.dim_600x600.jpg",
      description: "Tropical sweetness, silky skin",
      category: "Shower Gels",
    },
    {
      id: "gel-3",
      name: "Lavender Dream Gel",
      image: "/assets/generated/showergel-lavender-dream.dim_600x600.jpg",
      description: "Calming, soothing, divine",
      category: "Shower Gels",
    },
  ],
  soaps: [
    {
      id: "soap-1",
      name: "Goat Milk Soap",
      image: "/assets/generated/soap-goat-milk.dim_600x600.jpg",
      description: "Creamy, nourishing, naturally gentle",
      category: "Asante Soaps",
    },
    {
      id: "soap-2",
      name: "Tamarind Soap",
      image: "/assets/generated/soap-tamarind.dim_600x600.jpg",
      description: "Deep cleanse with tamarind extract",
      category: "Asante Soaps",
    },
    {
      id: "soap-3",
      name: "Papaya Soap",
      image: "/assets/generated/soap-papaya.dim_600x600.jpg",
      description: "Brightening, glow-boosting papaya",
      category: "Asante Soaps",
    },
    {
      id: "soap-4",
      name: "Honey & Turmeric Soap",
      image: "/assets/generated/soap-honey-turmeric.dim_600x600.jpg",
      description: "Anti-blemish golden glow formula",
      category: "Asante Soaps",
    },
  ],
};

const ALL_PRODUCTS_FLAT = Object.values(PRODUCTS).flat();

function ProductCard({
  product,
  globalIdx,
}: { product: Product; globalIdx: number }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image || "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (globalIdx % 3) * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xs product-card"
      data-ocid={`products.item.${globalIdx + 1}`}
    >
      <div className="aspect-square overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: product.placeholderBg ?? "oklch(0.94 0.015 320)",
            }}
          >
            <span className="text-4xl opacity-60">
              {product.category === "Jewellery"
                ? "💎"
                : product.category === "Tote Bags"
                  ? "👜"
                  : product.category === "Fake Tattoos"
                    ? "🎨"
                    : product.category === "Shower Gels"
                      ? "🧴"
                      : product.category === "Asante Soaps"
                        ? "🧼"
                        : "✨"}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">
          {product.category}
        </p>
        <h3 className="font-playfair font-semibold text-sm text-foreground mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {product.description}
        </p>
        <Button
          size="sm"
          className="btn-accent w-full rounded-full gap-1.5 text-xs"
          onClick={handleAdd}
          data-ocid={`product.add_button.${globalIdx + 1}`}
        >
          <ShoppingBag size={12} /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

function ProductGrid({ category }: { category: string }) {
  const list = PRODUCTS[category] ?? [];
  const baseIdx = ALL_PRODUCTS_FLAT.findIndex((p) => p.id === list[0]?.id);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {list.map((p, i) => (
        <ProductCard key={p.id} product={p} globalIdx={baseIdx + i} />
      ))}
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="section-lilac py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-rosegold mb-3">
            Shop Now
          </span>
          <h2 className="font-playfair text-4xl font-bold text-foreground">
            Our Products
          </h2>
          <p className="mt-3 text-muted-foreground">
            Wigs, jewellery, beauty essentials & more — curated for queens. No
            prices shown; order via WhatsApp.
          </p>
        </motion.div>

        <Tabs defaultValue="wigs" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="flex justify-start md:justify-center gap-1 bg-white/70 rounded-full p-1 mb-8 w-max md:w-fit mx-auto shadow-xs">
              {[
                ["wigs", "Wigs"],
                ["jewellery", "Jewellery"],
                ["totes", "Tote Bags"],
                ["tattoos", "Fake Tattoos"],
                ["gels", "Shower Gels"],
                ["soaps", "Asante Soaps"],
              ].map(([value, label]) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="rounded-full px-4 whitespace-nowrap"
                  data-ocid="products.tab"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {["wigs", "jewellery", "totes", "tattoos", "gels", "soaps"].map(
            (cat) => (
              <TabsContent key={cat} value={cat}>
                <ProductGrid category={cat} />
              </TabsContent>
            ),
          )}
        </Tabs>
      </div>
    </section>
  );
}
