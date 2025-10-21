// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5", // light grey
      paper: "#ffffff",   // white cards
    },
    primary: {
      main: "#616161",    // medium grey
    },
    secondary: {
      main: "#9e9e9e",    // lighter grey
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  shape: { borderRadius: 10 },
});

export default theme;
