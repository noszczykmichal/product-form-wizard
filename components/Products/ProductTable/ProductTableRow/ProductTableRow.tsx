import { TableRow, TableCell } from "@/components/ui/table";
import { Product } from "@/lib/types";
import { formatGrossPrice } from "@/lib/utils";
import ProductStatusBadge from "@/components/Products/ProductStatusBadge/ProductStatusBadge";

export default function ProductTableRow({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <TableRow className={className}>
      <TableCell className="text-sm text-foreground font-medium px-4">
        {product.productName}
      </TableCell>
      <TableCell className="text-muted-foreground px-4 text-xs">
        {product.sku}
      </TableCell>
      <TableCell className="px-4 text-muted-foreground">
        {product.category}
      </TableCell>
      <TableCell className="px-4 font-medium text-foreground">
        {formatGrossPrice(product.netPrice, product.vatRate, product.currency)}
      </TableCell>
      <TableCell className="px-4">
        <ProductStatusBadge available={product.available} />
      </TableCell>
      <TableCell className="px-4">{product.stockQuantity ?? "—"}</TableCell>
    </TableRow>
  );
}
