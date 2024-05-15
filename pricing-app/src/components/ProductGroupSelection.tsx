import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./styles.css";

export default function ProductGroupSelection({
  productGroup,
  setProductGroup,
}: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductGroup((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel style={{ fontSize: "0.8rem" }}>
        You are creating a Pricing Profile for
      </FormLabel>
      <RadioGroup value={productGroup} onChange={handleChange} row>
        <FormControlLabel
          value="One Product"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 15,
                },
              }}
            />
          }
          label="One Product"
        />
        <FormControlLabel
          value="Multiple Products"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 15,
                },
              }}
            />
          }
          label="Multiple Products"
        />
        <FormControlLabel
          value="All Products"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 15,
                },
              }}
            />
          }
          label="All Products"
        />
      </RadioGroup>
    </FormControl>
  );
}
