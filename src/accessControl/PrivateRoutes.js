import { resolveTo } from "@remix-run/router";
import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { isLogin } from "./isLogin";

const PrivateRoutes = (component, ...rest) => {
  return isLogin() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" {...alert("로그인 후 이용 가능해요.")} />
  );
};

export default PrivateRoutes;
