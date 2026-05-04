import ProductCard from "@/components/ProductCard";
import { productList } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          All Products
        </p>
        <h1 className="font-display text-4xl text-slate-900">
          Explore the SunCart collection
        </h1>
        <p className="text-base text-slate-600">
          From beach accessories to skincare, find your perfect summer lineup.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
