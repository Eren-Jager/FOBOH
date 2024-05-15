import React from "react";

import ProductPricing from "./components/ProductPricing";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#08822A",
    },
  },

  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <ProductPricing />
      </div>
    </ThemeProvider>
  );
};

export default App;
