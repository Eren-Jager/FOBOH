import React, { useState } from "react";
import { PricingProfile } from "../types";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import bulb from "../assets/Vector.png";
import "./styles.css";
import ProductList from "./ProductList";
import { getProductsBySKUs, submitPricingProfile } from "../services/api";

interface Props {
  selectedProductIndex: number[];
  products: any;
}

const PriceAdjustmentForm = ({ selectedProductIndex, products }: Props) => {
  const [adjustmentType, setAdjustmentType] = useState<"fixed" | "dynamic">(
    "fixed"
  );
  const [adjustmentValue, setAdjustmentValue] = useState(0);
  const [operator, setOperator] = useState<"increase" | "decrease">("increase");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const handleSubmit = async () => {
    const profile: PricingProfile = {
      profileId: "profile-id",
      products: selectedProducts,
      adjustmentType: adjustmentType,
      adjustmentValue: adjustmentValue,
      operatorIndicator: operator,
      priceHeader: "globalWholesalePrice",
    };
    const response = await submitPricingProfile(profile);
  };

  const getSelectedProducts = async () => {
    const selectedSKUs = selectedProductIndex.map(
      (index) => products[index].sku
    );
    const response = await getProductsBySKUs(selectedSKUs);
    setAdjustmentValue(0);
    setSelectedProducts(response);
  };

  return (
    <div className="PriceAdjustmentSection">
      <div style={{ maxWidth: 300, marginBottom: 10 }}>
        <Typography
          variant="caption"
          style={{ color: "grey", fontWeight: "lighter" }}
        >
          {" "}
          Based On{" "}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
          <Select value="globalWholesalePrice">
            <MenuItem key="1" value="globalWholesalePrice">
              Global Wholesale Price
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <FormControl style={{ marginBottom: 10 }}>
        <FormLabel style={{ fontSize: "0.8rem" }}>
          Set Price Adjustment Mode
        </FormLabel>
        <RadioGroup
          value={adjustmentType}
          onChange={(e) =>
            setAdjustmentType(e.target.value as "fixed" | "dynamic")
          }
          row
        >
          <FormControlLabel
            value="fixed"
            control={
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
            }
            label="Fixed ($)"
          />
          <FormControlLabel
            value="dynamic"
            control={
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
            }
            label="Dynamic (%)"
          />
        </RadioGroup>
      </FormControl>
      <FormControl style={{ marginBottom: 10 }}>
        <FormLabel style={{ fontSize: "0.8rem" }}>
          Set Price Adjustment Increment Mode
        </FormLabel>
        <RadioGroup
          value={operator}
          onChange={(e) =>
            setOperator(e.target.value as "increase" | "decrease")
          }
          row
        >
          <FormControlLabel
            value="increase"
            control={
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
            }
            label="Increase +"
          />
          <FormControlLabel
            value="decrease"
            control={
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
            }
            label="Decrease -"
          />
        </RadioGroup>
      </FormControl>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <img src={bulb} alt="bulb" />
        <Typography
          variant="caption"
          style={{ color: "#A26306", fontWeight: "lighter" }}
        >
          The adjusted price will be calculated from{" "}
          <b>Global Wholesale Price</b> selected above
        </Typography>
      </div>
      <ProductList
        selectedProducts={selectedProducts}
        getSelectedProducts={getSelectedProducts}
        priceHeader="globalWholesalePrice"
        operator={operator}
        adjustmentType={adjustmentType}
        adjustmentValue={adjustmentValue}
        setAdjustmentValue={setAdjustmentValue}
      />
      <Button
        className="Button"
        style={{
          marginTop: 20,
          alignSelf: "end",
          borderRadius: 20,
          width: 100,
          height: 40,
        }}
        onClick={handleSubmit}
        variant="contained"
        disabled={selectedProducts.length === 0 || adjustmentValue === 0}
      >
        Next
      </Button>
    </div>
  );
};

export default PriceAdjustmentForm;
