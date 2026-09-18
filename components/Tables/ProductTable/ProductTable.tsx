import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TABLE_HEADERS } from "@/lib/constants";
import { mockProducts } from "@/lib/constants";
import { formatGrossPrice } from "@/lib/utils";

export default function ProductTable() {
  return (
    <Table className="">
      <TableHeader className="bg-gray-50 ">
        <TableRow>
          {TABLE_HEADERS.map((header, i) => (
            <TableHead
              key={i}
              className="text-sm leading-normal font-medium text-muted-foreground px-4"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockProducts.map((product) => (
          <TableRow key={product.sku}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {product.sku}
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>
              {formatGrossPrice(product.netPrice, 23, product.currency)}
            </TableCell>
            <TableCell>
              <Badge variant={product.available ? "outline" : "destructive"}>
                {product.available ? "Dostępny" : "Niedostępny"}
              </Badge>
            </TableCell>
            <TableCell>{product.stockQuantity ?? "—"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
