import { mockProducts } from "@/lib/constants";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductList() {
  return (
    <ul className="space-y-3 lg:hidden">
      {mockProducts.map((product) => (
        <li key={product.sku}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
