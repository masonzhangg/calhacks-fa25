"use client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#8c52ff" },
    secondary: { main: "#C17BC1" },
    background: { default: "#fafafa" },
  },
  typography: {
    fontFamily: "Inter, system-ui, Arial, sans-serif",
  },
});

export const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
