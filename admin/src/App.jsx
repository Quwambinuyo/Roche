import React from "react";
import AdminRoutes from "./routes/AdminRoutes";
import ResetScrollOnRouteChange from "./components/ui/ResetScrollOnRouteChange";

const App = () => {
  return (
    <div>
      <ResetScrollOnRouteChange />
      <AdminRoutes />
    </div>
  );
};

export default App;
