import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { BaseProduct } from "../types";
import { Typography } from "@mui/material";
import imageSrc from "../assets/wine-bottles.png";

interface Props {
  rows: BaseProduct[];
  selectedProductsIndex: number[];
  setSelectedProductsIndex: (selectedProductsIndex: number[]) => void;
}

export default function ProductSelectionTable({
  rows,
  selectedProductsIndex,
  setSelectedProductsIndex,
}: Props) {
  const handleClick = (id: number) => {
    const selectedIndex = selectedProductsIndex.indexOf(id);
    const newSelected = [...selectedProductsIndex];

    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedProductsIndex(newSelected);
  };

  const isSelected = (id: number) => selectedProductsIndex.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="medium"
          sx={{ width: "auto" }}
        >
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(index);
              return (
                <TableRow
                  hover
                  onClick={() => handleClick(index)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.sku}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    padding="checkbox"
                    style={{ borderBottom: "none" }}
                  >
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <img
                        src={imageSrc}
                        alt="wine bottles"
                        style={{ width: 30, height: 30 }}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {row.title}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography variant="body2" sx={{ color: "grey" }}>
                            SKU {row.sku} |
                          </Typography>
                          <Typography variant="body2">
                            12 x 375ML Can Case
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="caption"
        sx={{
          color: "grey",
          visibility: selectedProductsIndex.length > 0 ? "" : "hidden",
          fontWeight: "lighter",
        }}
      >
        You’ve selected {selectedProductsIndex.length} Product
        {selectedProductsIndex.length > 1 ? "s" : ""}, these will be added to
        Profile
      </Typography>
    </Box>
  );
}
