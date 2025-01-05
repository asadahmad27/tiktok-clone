import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouting = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    // If no access token is found, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If access token is present, render the children components
  return children;
};

export default PrivateRouting;
