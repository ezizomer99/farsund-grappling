"use client";

import { createTheme } from "@mui/material/styles";

// Custom color palette for Farsund Grappling
// #30364F - Navbar/Footer (dark blue-gray)
// #ACBAC4 - Background gradient (soft gray-blue)
// #E1D9BC - Cards/content boxes (warm beige)
// #F0F0DB - Accent/highlights (light cream)

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#30364F", // Dark blue-gray - navbar/footer
      light: "#4a5268", // Lighter variant
      dark: "#1f2435", // Darker variant
      contrastText: "#F0F0DB",
    },
    background: {
      default: "transparent", // Transparent to allow background image to show
      paper: "#E1D9BC", // Cards/content boxes
    },
    text: {
      primary: "#30364F", // Dark blue-gray for text
      secondary: "#4a5268", // Slightly lighter for secondary text
    },
    // Custom colors accessible via theme
    grey: {
      50: "#F0F0DB", // Light cream accent
      100: "#E1D9BC", // Warm beige
      200: "#d4ccb0", // Slightly darker beige
      // 300: "#ACBAC4", // Background gradient
      400: "#8a9ba7",
      500: "#6b7c8a",
      600: "#4a5268",
      700: "#30364F",
      800: "#1f2435",
      900: "#13161f",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto), system-ui, -apple-system, sans-serif",
    h1: {
      fontFamily:
        "var(--font-oswald), var(--font-roboto), system-ui, sans-serif",
      fontSize: "3.75rem", // 60px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      "@media (max-width:600px)": {
        fontSize: "2.5rem", // 40px
      },
    },
    h2: {
      fontFamily:
        "var(--font-oswald), var(--font-roboto), system-ui, sans-serif",
      fontSize: "3rem", // 48px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      "@media (max-width:600px)": {
        fontSize: "2rem", // 32px
      },
    },
    h3: {
      fontFamily:
        "var(--font-oswald), var(--font-roboto), system-ui, sans-serif",
      fontSize: "2rem", // 32px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0.01em",
    },
    h4: {
      fontFamily:
        "var(--font-oswald), var(--font-roboto), system-ui, sans-serif",
      fontSize: "1.5rem", // 24px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0.01em",
    },
    h5: {
      fontFamily:
        "var(--font-oswald), var(--font-roboto), system-ui, sans-serif",
      fontSize: "1.25rem", // 20px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily:
        "var(--font-oswald), var(--font-roboto), system-ui, sans-serif",
      fontSize: "1rem", // 16px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontFamily:
        "var(--font-oswald), var(--font-roboto), system-ui, sans-serif",
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  ] as const,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "all 0.3s ease",
        },
        contained: {
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "1rem",
          paddingRight: "1rem",
          "@media (min-width:600px)": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
        },
      },
    },
  },
});

export default theme;
