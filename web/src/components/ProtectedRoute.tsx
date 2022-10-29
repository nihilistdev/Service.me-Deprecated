import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAppContextProvider } from "./AuthProvider";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppContextProvider();
  console.log(user);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
