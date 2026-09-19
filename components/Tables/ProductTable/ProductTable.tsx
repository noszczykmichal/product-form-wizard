import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import ProductStatusBadge from "@/components/ui/ProductStatusBadge/ProductStatusBadge";
import { TABLE_HEADERS } from "@/lib/constants";
import { mockProducts } from "@/lib/constants";
import { formatGrossPrice } from "@/lib/utils";

export default function ProductTable() {
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
          {mockProducts.map((product) => (
            <TableRow key={product.sku}>
              <TableCell className="text-sm text-foreground font-medium px-4">
                {product.name}
              </TableCell>
              <TableCell className="text-muted-foreground px-4 text-xs">
                {product.sku}
              </TableCell>
              <TableCell className="px-4 text-muted-foreground">
                {product.category}
              </TableCell>
              <TableCell className="px-4 font-medium text-foreground">
                {formatGrossPrice(
                  product.netPrice,
                  product.vat,
                  product.currency,
                )}
              </TableCell>
              <TableCell className="px-4">
                <ProductStatusBadge available={product.available} />
              </TableCell>
              <TableCell className="px-4">
                {product.stockQuantity ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="bg-gray-50" colSpan={6}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
