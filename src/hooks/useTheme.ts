// src/hooks/useTheme.ts
"use client";

import { useContext } from "react";
import { ThemeContext } from "../contexts";

// Custom hook to access the current theme
const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
