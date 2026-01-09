// src/ThemeToggle.jsx
import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../themeContext";

function ThemeToggle({ children }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      {children(isDark, () => setIsDark(!isDark))}
    </ThemeProvider>
  );
}

export default ThemeToggle;
