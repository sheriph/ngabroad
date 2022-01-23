import { createTheme, adaptV4Theme } from "@mui/material";
import { red } from "@mui/material/colors";

const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#5348dc",
    },
    secondary: {
      main: "#64bb79",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F5F5F5",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

theme.typography.h5 = {
  fontSize: "1.5rem",
  "@media (max-width:600px)": {
    fontSize: "1rem",
  },
};

theme.typography.h4 = {
  fontSize: "2.5rem",
  "@media (max-width:600px)": {
    fontSize: "1.5rem",
  },
};

export default theme;
