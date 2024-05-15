import React, { useEffect } from "react";
import { searchProducts, filterProducts } from "../services/api";
import { BaseProduct } from "../types";
import ProductSearch from "./ProductSearch";
import "./styles.css";
import ProductGroupSelection from "./ProductGroupSelection";

interface Props {
  setFilteredProducts: (products: BaseProduct[]) => void;
  productGroup: string;
  setProductGroup: (productGroup: string) => void;
  filterValues: any;
  searchText: string;
  setSearchText: (searchText: string) => void;
  selectedFilters: any;
  setSelectedFilters: (selectedFilters: any) => void;
}

const ProductFilter: React.FC<Props> = ({
  setFilteredProducts,
  productGroup,
  setProductGroup,
  filterValues,
  searchText,
  setSearchText,
  selectedFilters,
  setSelectedFilters,
}) => {
  useEffect(() => {
    if (
      selectedFilters.category ||
      selectedFilters.segment ||
      selectedFilters.brand
    )
      handleFilter();
    else {
      setFilteredProducts([]);
    }
  }, [selectedFilters]);

  const handleSearch = async () => {
    const products = await searchProducts(searchText);
    setFilteredProducts(products);
  };

  const handleFilter = async () => {
    const filters = {
      category: selectedFilters.category,
      segment: selectedFilters.segment,
      brand: selectedFilters.brand,
    };
    const products = await filterProducts(filters);
    setFilteredProducts(products);
  };

  return (
    <div className="ProductFilter">
      <ProductGroupSelection
        productGroup={productGroup}
        setProductGroup={setProductGroup}
      />
      {productGroup !== "All Products" && (
        <ProductSearch
          filterValues={filterValues}
          searchText={searchText}
          setSearchText={setSearchText}
          selectedFilter={selectedFilters}
          setSelectedFilter={setSelectedFilters}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default ProductFilter;
