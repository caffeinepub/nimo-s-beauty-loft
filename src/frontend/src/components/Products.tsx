import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import { Category, useProductsByCategory } from "../hooks/useQueries";

const WA_BASE = "https://wa.me/254700000000";

const STATIC_PRODUCTS: Record<
  string,
  Array<{ name: string; image: string; price: number; description: string }>
> = {
  gluelessWig: [
    {
      name: "Silky Straight Lace Front",
      image: "/assets/generated/wig-glueless-1.dim_600x600.jpg",
      price: 8500,
      description:
        "Sleek, silky straight lace front wig for a natural, flawless look.",
    },
    {
      name: "Honey Curls Glueless",
      image: "/assets/generated/wig-glueless-2.dim_600x600.jpg",
      price: 9200,
      description:
        "Bouncy honey-toned curls that radiate warmth and playful elegance.",
    },
  ],
  headbandWig: [
    {
      name: "Wavy Brown Headband",
      image: "/assets/generated/wig-headband-1.dim_600x600.jpg",
      price: 5500,
      description: "Effortlessly chic wavy headband wig — no glue, no hassle.",
    },
    {
      name: "Sleek Black Bob Headband",
      image: "/assets/generated/wig-headband-2.dim_600x600.jpg",
      price: 4800,
      description: "Modern sleek bob with a stylish headband for instant glam.",
    },
  ],
  jewellery: [
    {
      name: "Rose Gold Crystal Set",
      image: "/assets/generated/jewellery-1.dim_600x600.jpg",
      price: 1200,
      description: "Sparkling crystal necklace and earring set in rose gold.",
    },
    {
      name: "Butterfly Charm Bracelet",
      image: "/assets/generated/jewellery-2.dim_600x600.jpg",
      price: 800,
      description: "Dainty butterfly charms on a delicate rose gold chain.",
    },
    {
      name: "Pearl Elegance Set",
      image: "/assets/generated/jewellery-3.dim_600x600.jpg",
      price: 1500,
      description:
        "Lustrous pearl necklace and earring set for timeless sophistication.",
    },
  ],
};

function formatKES(price: bigint | number) {
  return `KES ${Number(price).toLocaleString("en-KE")}`;
}

function waUrl(productName: string) {
  return `${WA_BASE}?text=${encodeURIComponent(`Hi, I'm interested in ${productName}`)}`;
}

function ProductCard({
  name,
  image,
  price,
  description,
  idx,
}: {
  name: string;
  image: string;
  price: number;
  description: string;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xs product-card"
      data-ocid={`products.item.${idx + 1}`}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-playfair font-semibold text-base text-foreground mb-1">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="text-rosegold bg-lilac-muted font-semibold text-sm"
          >
            {formatKES(price)}
          </Badge>
          <a
            href={waUrl(name)}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`products.primary_button.${idx + 1}`}
          >
            <Button
              size="sm"
              className="btn-accent rounded-full gap-1.5 text-xs"
            >
              <ShoppingBag size={13} /> Buy Now
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function BackendProductList({ category }: { category: Category }) {
  const { data } = useProductsByCategory(category);
  const products: Product[] = data ?? [];
  if (products.length === 0) {
    const key =
      category === Category.gluelessWig
        ? "gluelessWig"
        : category === Category.headbandWig
          ? "headbandWig"
          : "jewellery";
    const staticList = STATIC_PRODUCTS[key] ?? [];
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {staticList.map((p, i) => (
          <ProductCard
            key={p.name}
            name={p.name}
            image={p.image}
            price={p.price}
            description={p.description}
            idx={i}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((p, i) => (
        <ProductCard
          key={p.id.toString()}
          name={p.name}
          image={p.imageUrl}
          price={Number(p.priceKES)}
          description={p.description}
          idx={i}
        />
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
            Wigs &amp; jewellery curated for queens. All prices in Kenyan
            Shillings.
          </p>
        </motion.div>

        <Tabs defaultValue="glueless" className="w-full">
          <TabsList className="flex justify-center gap-1 bg-white/70 rounded-full p-1 mb-8 w-fit mx-auto shadow-xs">
            <TabsTrigger
              value="glueless"
              className="rounded-full px-5"
              data-ocid="products.tab"
            >
              Glueless Wigs
            </TabsTrigger>
            <TabsTrigger
              value="headband"
              className="rounded-full px-5"
              data-ocid="products.tab"
            >
              Headband Wigs
            </TabsTrigger>
            <TabsTrigger
              value="jewellery"
              className="rounded-full px-5"
              data-ocid="products.tab"
            >
              Jewellery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="glueless">
            <BackendProductList category={Category.gluelessWig} />
          </TabsContent>
          <TabsContent value="headband">
            <BackendProductList category={Category.headbandWig} />
          </TabsContent>
          <TabsContent value="jewellery">
            <BackendProductList category={Category.jewellery} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
