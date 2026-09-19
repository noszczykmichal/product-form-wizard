"use client";

import { useState } from "react";

import { Product } from "@/lib/types";
import { mockProducts } from "@/lib/constants";
import Header from "@/components/Header/Header";
import ProductTable from "@/components/Products/ProductTable/ProductTable";
import ProductList from "@/components/Products/ProductList/ProductList";

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  return (
    <>
      <Header />
      <ProductTable products={products} />
      <ProductList products={products} />
    </>
  );
}
