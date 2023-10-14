import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "./isLogin";

const PrivateRoutes = (component, ...rest) => {
  return isLogin() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
