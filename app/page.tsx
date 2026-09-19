import ProductCatalog from "@/components/Products/ProductCatalog/ProductCatalog";

export default function Home() {
  return (
    <main className="flex w-full justify-center">
      <section className="py-28">
        <ProductCatalog />
      </section>
    </main>
  );
}
