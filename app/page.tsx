import ProductCatalog from "@/components/Products/ProductCatalog/ProductCatalog";

export default function Home() {
  return (
    <main className="flex w-full justify-center">
      <section className="py-28 w-full px-10 flex flex-col items-center">
        <ProductCatalog />
      </section>
    </main>
  );
}
