import { Suspense } from "react";
import ProductCatalog from "@/components/Products/ProductCatalog/ProductCatalog";
import ProductCatalogSkeleton from "@/components/Products/ProductCatalogSkeleton/ProductCatalogSkeleton";

export default function Home() {
  return (
    <main className="flex w-full justify-center">
      <section className="py-6 lg:py-28 w-full px-4 flex flex-col items-center">
        <Suspense fallback={<ProductCatalogSkeleton />}></Suspense>
        <ProductCatalog />
      </section>
    </main>
  );
}
