import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme({
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          strokeWidth: 4, // Increase the thickness of the stroke
        },
      },
    },
  },
});

const ProgressCircle = () => {
  return (
    <ThemeProvider theme={theme}>
      <CircularProgress
        variant="determinate"
        value={90}
        color="primary" // Set color to your desired progress color
        size="100%" // Set size
      />
    </ThemeProvider>
  );
};

export default ProgressCircle;
