import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.css";
import App from "./App.jsx";
import { store } from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext";
import { CountryProvider } from "./context/CountryContext.jsx";
import CartContext from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <CountryProvider>
            <CartContext>
              <App />
            </CartContext>
          </CountryProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
