import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { productList } from "@/lib/products";

const careTips = [
  {
    title: "Hydrate early",
    description:
      "Start the day with a full bottle before the heat peaks and refresh every hour.",
  },
  {
    title: "SPF always",
    description:
      "Reapply sunscreen every two hours, especially after swimming or sweating.",
  },
  {
    title: "Cool down",
    description:
      "Pack a cooling mist or aloe gel to calm skin after long sun exposure.",
  },
];

const topBrands = ["SunShade", "GlowWave", "Coastline", "BlueCurrent"];

export default function Home() {
  const popularProducts = productList.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-24">
      <section className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-80 w-80 -translate-x-20 -translate-y-32 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-24 translate-y-24 rounded-full bg-primary/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="badge badge-secondary badge-outline px-4 py-3 text-xs font-semibold tracking-[0.2em]">
              Summer Sale 50% OFF
            </span>
            <h1 className="font-display text-4xl leading-tight text-slate-900 md:text-6xl">
              Chase the sun with curated essentials for every golden hour.
            </h1>
            <p className="text-lg text-slate-600">
              Discover summer favorites from cooling skincare to beach-ready
              accessories. Hot deals, bold colors, and everything you need to
              glow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="btn btn-primary text-white" href="/products">
                Shop Hot Deals
              </Link>
              <Link className="btn btn-outline" href="/register">
                Join SunCart
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <span>Free shipping over $50</span>
              <span>New drops weekly</span>
              <span>Beach-tested quality</span>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="animate__animated animate__fadeInUp rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Hot Deals
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                Ocean-ready bundles for every getaway.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Save big on curated sets made for sun-soaked adventures.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "UV Defense",
                  value: "Polarized eyewear",
                },
                {
                  label: "Breeze Wear",
                  value: "Lightweight outfits",
                },
                {
                  label: "Glow Care",
                  value: "After-sun skin",
                },
                {
                  label: "Beach Gear",
                  value: "Totes & towels",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Popular Products
            </p>
            <h2 className="font-display text-3xl text-slate-900">
              Summer favorites in the spotlight
            </h2>
          </div>
          <Link className="btn btn-sm btn-outline" href="/products">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {popularProducts.map((product, index) => (
            <div
              key={product.id}
              className={`animate__animated animate__fadeInUp ${
                index === 1 ? "animate__delay-1s" : index === 2 ? "animate__delay-2s" : ""
              }`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-8 rounded-3xl border border-white/70 bg-white/80 p-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Summer Care Tips
            </p>
            <h2 className="font-display text-3xl text-slate-900">
              Keep your glow going all season
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Small habits make a big difference. Stay hydrated, protect your
              skin, and pack cooling essentials.
            </p>
          </div>
          <div className="grid gap-4">
            {careTips.map((tip) => (
              <div key={tip.title} className="rounded-2xl bg-white/90 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  {tip.title}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Top Brands
            </p>
            <h2 className="font-display text-3xl text-slate-900">
              Trusted by summer lovers
            </h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {topBrands.map((brand) => (
            <div
              key={brand}
              className="rounded-2xl border border-white/70 bg-white/90 px-4 py-6 text-center"
            >
              <p className="text-lg font-semibold text-slate-900">{brand}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Summer approved
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
