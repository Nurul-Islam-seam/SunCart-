import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>{product.category}</span>
          <span>{product.rating.toFixed(1)} rating</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500">by {product.brand}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">
            {priceLabel}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="btn btn-sm btn-primary text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
