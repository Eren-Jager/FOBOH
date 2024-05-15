import * as React from "react";
import "./styles.css";
import {
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { BaseProduct } from "../types";
import ProductSelectionTable from "./ProductSelectionTable";

interface Props {
  products: BaseProduct[];
  searchText: string;
  filterValues: any;
  selectedProductsIndex: number[];
  setSelectedProductsIndex: (selectedProductsIndex: number[]) => void;
}

export default function ProductSelection({
  products,
  searchText,
  filterValues,
  selectedProductsIndex,
  setSelectedProductsIndex,
}: Props) {

  const handleGroupSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (value === "Select All") {
      setSelectedProductsIndex(products.map((product, index) => index));
    }
    if (value === "Deselect All") {
      setSelectedProductsIndex([]);
    }
  };
  return (
    <div className="SelectionSection">
      <Typography
        variant="caption"
        style={{ color: "grey", fontWeight: "lighter" }}
      >
        Showing {products.length} Results {searchText && `for ${searchText}`}{" "}
        {filterValues.category && <Chip label={filterValues.category} />}{" "}
        {filterValues.segment && <Chip label={filterValues.segment} />}{" "}
        {filterValues.brand && <Chip label={filterValues.brand} />}
      </Typography>
      {products.length > 0 && (
        <>
          <FormControl>
            <RadioGroup value="" onChange={handleGroupSelection} row>
              <FormControlLabel
                value="Deselect All"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Deselect All"
              />
              <FormControlLabel
                value="Select All"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Select All"
              />
            </RadioGroup>
          </FormControl>
          <ProductSelectionTable
            rows={products}
            selectedProductsIndex={selectedProductsIndex}
            setSelectedProductsIndex={setSelectedProductsIndex}
          />
        </>
      )}
    </div>
  );
}
