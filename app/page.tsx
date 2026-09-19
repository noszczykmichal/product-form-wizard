import Header from "@/components/Header/Header";
import ProductTable from "@/components/Tables/ProductTable/ProductTable";
import ProductList from "@/components/ui/ProductList/ProductList";

export default function Home() {
  return (
    <main className="flex w-full justify-center">
      <section className="py-28">
        <Header />
        <ProductTable />
        <ProductList />
      </section>
    </main>
  );
}
