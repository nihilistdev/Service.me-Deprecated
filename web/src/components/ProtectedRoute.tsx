import { isAuth } from "@utils/isAuth";
import * as React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }

  return children;
};
