import ProductCard from "@/components/Products/ProductCard/ProductCard";
import { Product } from "@/lib/types";
import { PAGE_SIZE } from "@/lib/constants";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <>
      <ul className="space-y-3 lg:hidden ">
        {products.map((product) => (
          <li key={product.sku}>
            <ProductCard product={product} />
          </li>
        ))}
        {Array.from({ length: PAGE_SIZE - products.length }).map((_, i) => (
          <li key={`placeholder-${i}`} aria-hidden className="invisible">
            <ProductCard product={products[0]} />
          </li>
        ))}
      </ul>
    </>
  );
}
