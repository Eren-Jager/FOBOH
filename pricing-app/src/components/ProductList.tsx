import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Product } from "../types";
import { Button, InputBase } from "@mui/material";
import loadIcon from "../assets/load.svg";
import "./styles.css";

interface Column {
  id: "title" | "sku" | "category";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "sku", label: "SKU", minWidth: 100 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Props {
  selectedProducts: Product[];
  priceHeader: string;
  operator: "increase" | "decrease";
  getSelectedProducts: () => void;
  adjustmentType: "fixed" | "dynamic";
  adjustmentValue: number;
  setAdjustmentValue: (value: number) => void;
}

export default function ProductList({
  selectedProducts,
  priceHeader,
  operator,
  getSelectedProducts,
  adjustmentType,
  adjustmentValue,
  setAdjustmentValue,
}: Props) {
  const operaterToDisplay = `${operator === "increase" ? "+" : "-"} ${
    adjustmentType === "fixed" ? "$" : "%"
  }`;
  const getCalculatedValue = (row: Product) => {
    let newPrice;
    const basePrice = Number(row[priceHeader]);
    newPrice =
      operator === "increase"
        ? adjustmentType === "fixed"
          ? basePrice + adjustmentValue
          : basePrice + (adjustmentValue / 100) * basePrice
        : adjustmentType === "fixed"
        ? basePrice - adjustmentValue
        : basePrice - (adjustmentValue / 100) * basePrice;
    return Number(newPrice).toFixed(2);
  };
  return (
    <>
      <Button
        variant="outlined"
        style={{
          color: "#563FE3",
          border: "none",
          textTransform: "none",
          alignSelf: "end",
        }}
        onClick={() => getSelectedProducts()}
        endIcon={<img src={loadIcon} alt="load" />}
      >
        {" "}
        Refresh New Price Table{" "}
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "400",
                    color: "grey",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="right"
                style={{ minWidth: 170, fontWeight: "400", color: "grey" }}
              >
                {priceHeader === "globalWholesalePrice"
                  ? "Global Wholesale Price"
                  : priceHeader}
              </TableCell>
              <TableCell
                align="right"
                style={{ width: 150, fontWeight: "400", color: "grey" }}
              >
                Adjustment
              </TableCell>
              <TableCell
                align="right"
                style={{ minWidth: 170, fontWeight: "400", color: "grey" }}
              >
                New Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProducts.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.sku}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ border: "0.5px solid rgb(240 240 240 / 50%)" }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell
                    align="right"
                    style={{ border: "0.5px solid rgb(240 240 240 / 50%)" }}
                  >
                    {row[priceHeader]}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      border: "0.5px solid #08822A",
                      backgroundColor: "#F4FFF7",
                    }}
                  >
                    <InputBase
                      className="AmountInput"
                      sx={{ ml: 1, gap: 1 }}
                      startAdornment={
                        <div style={{ width: 35, marginTop: 2 }}>
                          {operaterToDisplay}
                        </div>
                      }
                      type="number"
                      value={adjustmentValue === 0 ? "" : adjustmentValue}
                      onChange={(e) => {
                        const value = Math.max(0, Number(e.target.value));
                        setAdjustmentValue(value);
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ border: "0.5px solid rgb(240 240 240 / 50%)" }}
                  >
                    {getCalculatedValue(row)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
