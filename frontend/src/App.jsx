import React from "react";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/Layout/ScrollToTop";

const App = () => {
  return (
    <div className="bg-primary ">
      <ScrollToTop />
      <AppRoutes />
    </div>
  );
};

export default App;
