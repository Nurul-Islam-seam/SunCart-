import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ProductDetailsPageProps = {
  params: { id: string };
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    const callbackUrl = `/products/${params.id}`;
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const productId = Number(params.id);
  if (!Number.isFinite(productId)) {
    notFound();
  }

  const product = getProductById(productId);
  if (!product) {
    notFound();
  }

  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-10">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link className="hover:text-slate-900" href="/products">
          Products
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div className="relative h-96 overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {product.category}
            </p>
            <h1 className="font-display text-4xl text-slate-900">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">by {product.brand}</p>
          </div>
          <p className="text-base text-slate-600">{product.description}</p>
          <div className="flex flex-wrap gap-4">
            <span className="rounded-full bg-white/90 px-4 py-2 text-sm text-slate-600">
              Rating: {product.rating.toFixed(1)}
            </span>
            <span className="rounded-full bg-white/90 px-4 py-2 text-sm text-slate-600">
              Stock: {product.stock}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-3xl font-semibold text-slate-900">
              {priceLabel}
            </span>
            <button className="btn btn-primary text-white">Order Now</button>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/90 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Why you will love it</p>
            <ul className="mt-3 list-disc space-y-2 pl-4">
              <li>Curated for summer-ready comfort and style.</li>
              <li>Easy returns within 7 days of delivery.</li>
              <li>Pairs perfectly with your SunCart favorites.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
