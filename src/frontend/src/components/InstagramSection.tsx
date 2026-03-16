import { motion } from "motion/react";
import { SiInstagram } from "react-icons/si";
import { useSiteSettings } from "../hooks/useQueries";

const IG_URL = "https://www.instagram.com/nimos_.loft?igsh=bm14cnYwczlrYjQ0";
const HANDLE = "Nimos_.loft";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Murang%27a%2C+Kenya";

const DEFAULT_POSTS = 0n;
const DEFAULT_FOLLOWERS = 0n;
const DEFAULT_FOLLOWING = 0n;

export default function InstagramSection() {
  const { data: settings } = useSiteSettings();

  const posts = settings?.instagramPosts ?? DEFAULT_POSTS;
  const followers = settings?.instagramFollowers ?? DEFAULT_FOLLOWERS;
  const following = settings?.instagramFollowing ?? DEFAULT_FOLLOWING;

  const formatCount = (n: bigint) => {
    const num = Number(n);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const stats = [
    { label: "Posts", value: formatCount(posts) },
    { label: "Followers", value: formatCount(followers) },
    { label: "Following", value: formatCount(following) },
  ];

  return (
    <section id="instagram" className="py-24 section-cream">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-lilac relative overflow-hidden"
        >
          {/* IG gradient bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045)",
            }}
          />

          <div className="flex flex-col items-center text-center gap-5">
            {/* Profile picture */}
            <div className="relative">
              <div
                className="w-28 h-28 rounded-full p-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="/assets/uploads/file_0000000036b8722fb9194c8981db234a-1.png"
                    alt="@Nimos_.loft"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white"
                style={{
                  background: "linear-gradient(135deg, #833ab4, #fcb045)",
                }}
              >
                <SiInstagram size={14} color="white" />
              </div>
            </div>

            {/* Handle */}
            <h3 className="font-playfair text-2xl font-bold text-foreground">
              @{HANDLE}
            </h3>

            {/* Stats */}
            <div className="flex gap-10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-bold text-foreground text-lg">{s.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="text-sm text-foreground leading-relaxed space-y-1 max-w-sm">
              <p className="font-semibold text-base">Nimo's Beauty Loft🌼</p>
              <p>Lashes •Wigs •Nails •Brows •Beauty &amp; Body Care.</p>
              <p>Making you glow with style &amp; confidence✨️</p>
              <p>DM to Book / Shop🫧</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors inline-block"
                data-ocid="instagram.map_marker"
              >
                📍 Murang'a, Kenya
              </a>
            </div>

            {/* Follow button */}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 mt-1"
              style={{
                background:
                  "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
              }}
              data-ocid="instagram.primary_button"
            >
              <SiInstagram size={15} /> Follow on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
