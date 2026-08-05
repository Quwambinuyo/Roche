import React from "react";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/Layout/ScrollToTop";
import ResetScrollOnRouteChange from "./components/Layout/ResetScrollOnRouteChange";

const App = () => {
  return (
    <div className="bg-primary ">
      <ScrollToTop />
      <ResetScrollOnRouteChange />
      <AppRoutes />
    </div>
  );
};

export default App;
