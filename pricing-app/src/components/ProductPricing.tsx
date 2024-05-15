import React, { useState, useEffect } from "react";
import PriceAdjustmentForm from "./PriceAdjustmentForm";
import ProductFilter from "./ProductFilter";
import {
  getBrands,
  getCategories,
  getProducts,
  getSegments,
} from "../services/api";
import { BaseProduct } from "../types";
import { Divider, Typography } from "@mui/material";
import ProductSelection from "./ProductSelection";

const ProductPricing = () => {
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [filterValues, setFilterValues] = useState({
    category: [],
    segment: [],
    brand: [],
  });
  const [searchText, setSearchText] = useState("");
  const [productGroup, setProductGroup] = useState<string>(
    "Multiple Products" as string
  );
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    segment: "",
    brand: "",
  });
  const [selectedProductsIndex, setSelectedProductsIndex] = useState<number[]>(
    []
  );

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    const fetchFilters = async () => {
      const fetchedCategories = await getCategories();
      const fetchedSegments = await getSegments();
      const fetchedBrands = await getBrands();
      setFilterValues({
        category: (fetchedCategories as any) || [],
        segment: (fetchedSegments as any) || [],
        brand: (fetchedBrands as any) || [],
      });
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    if (productGroup === "All Products") {
      fetchProducts();
    } else setProducts([]);
  }, [productGroup]);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h6">Set Product Pricing</Typography>
      <Typography
        variant="caption"
        style={{ color: "grey", fontWeight: "lighter" }}
      >
        {" "}
        Set Details{" "}
      </Typography>
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
      <ProductFilter
        setFilteredProducts={setProducts}
        productGroup={productGroup}
        setProductGroup={setProductGroup}
        filterValues={filterValues}
        searchText={searchText}
        setSearchText={setSearchText}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <Divider style={{ marginBottom: 20 }} />

      <ProductSelection
        products={products}
        filterValues={selectedFilters}
        searchText={searchText}
        selectedProductsIndex={selectedProductsIndex}
        setSelectedProductsIndex={setSelectedProductsIndex}
      />
      <Divider style={{ marginBottom: 20 }} />
      <PriceAdjustmentForm
        selectedProductIndex={selectedProductsIndex}
        products={products}
      />
    </div>
  );
};

export default ProductPricing;
