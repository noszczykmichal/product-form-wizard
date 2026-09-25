import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { TABLE_HEADERS } from "@/lib/constants";
import { Product } from "@/lib/types";
import { PAGE_SIZE } from "@/lib/constants";
import ProductTableRow from "@/components/Products/ProductTable/ProductTableRow/ProductTableRow";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="hidden lg:block bg-card">
      <Table>
        <TableHeader className="bg-gray-50 ">
          <TableRow>
            {TABLE_HEADERS.map((header, i) => (
              <TableHead
                key={i}
                className="leading-normal text-sm font-medium text-muted-foreground px-4"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductTableRow key={product.sku} product={product} />
          ))}
          {products.length > 0 &&
            Array.from({ length: PAGE_SIZE - products.length }).map((_, i) => {
              return (
                <ProductTableRow
                  key={i}
                  product={products[0]}
                  className="invisible"
                />
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
