import { Product } from "@/lib/types";
import ProductStatusBadge from "../ProductStatusBadge/ProductStatusBadge";
import { formatGrossPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-[12px] border bg-white p-3 w-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium text-foreground">
            {product.productName}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.sku}</p>
        </div>
        <ProductStatusBadge available={product.available} />
      </div>

      <dl className="mt-2 grid grid-cols-3 gap-1 rounded-[9px] bg-accent p-3 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Kategoria</dt>
          <dd className="text-foreground font-medium">{product.category}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Cena brutto</dt>
          <dd className="text-foreground font-medium">
            {formatGrossPrice(
              product.netPrice,
              product.vatRate,
              product.currency,
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Magazyn</dt>
          <dd className="text-foreground font-medium">
            {product.stockQuantity ?? "—"}
          </dd>
        </div>
      </dl>
    </article>
  );
}
