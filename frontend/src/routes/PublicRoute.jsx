import React from "react";
import { Navigate } from "react-router-dom";
import { getItem } from "../utils/localStorage";

const PublicRoute = ({ children }) => {
  const authUser = getItem("authUser", null);

  if (authUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
