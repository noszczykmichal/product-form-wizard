"use client";

import { useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Product } from "@/lib/types";
import { mockProducts } from "@/lib/constants";
import Header from "@/components/Header/Header";
import ProductTable from "@/components/Products/ProductTable/ProductTable";
import ProductList from "@/components/Products/ProductList/ProductList";
import { PAGE_SIZE } from "@/lib/constants";

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <Header />
      <ProductTable products={products} />
      <ProductList
        products={pageItems}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={products.length}
        onPageChange={setPage}
      />
    </>
  );
}
