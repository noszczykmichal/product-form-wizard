import ProductCard from "@/components/Products/ProductCard/ProductCard";
import ProductFooter from "../ProductFooter/Product Footer";
import { Product } from "@/lib/types";

export default function ProductList({
  products,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <>
      <ul className="space-y-3 lg:hidden">
        {products.map((product) => (
          <li key={product.sku}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <ProductFooter
        page={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </>
  );
}
