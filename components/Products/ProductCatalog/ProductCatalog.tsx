"use client";

import { useState, useEffect } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Product } from "@/lib/types";
import { mockProducts } from "@/lib/constants";
import Header from "@/components/Header/Header";
import ProductTable from "@/components/Products/ProductTable/ProductTable";
import ProductList from "@/components/Products/ProductList/ProductList";
import ProductFooter from "@/components/Products/ProductFooter/ProductFooter";
import FormDialog from "@/components/AddProduct/FormDialog/FormDialog";
import { PAGE_SIZE } from "@/lib/constants";

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  });

  return (
    <div className="w-full max-w-137.5 lg:max-w-none xl:max-w-2/3">
      <Header itemsCount={products.length} onClick={setIsDialogOpen} />
      <ProductTable products={pageItems} />
      <ProductList products={pageItems} />
      <ProductFooter
        page={currentPage}
        totalPages={totalPages}
        totalItems={products.length}
        onPageChange={setPage}
      />
      <FormDialog open={isDialogOpen} openChange={setIsDialogOpen} />
    </div>
  );
}
