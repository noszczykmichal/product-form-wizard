import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/lib/types";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className="space-y-3 lg:hidden">
      {products.map((product) => (
        <li key={product.sku}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
