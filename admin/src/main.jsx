import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SettingsProvider } from "./context/SettingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
