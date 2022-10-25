import { useAuth } from "@components/ConfigComponent";
import Router from "next/router";
import React from "react";

export const useIsAuth = () => {
  const [state, dispatch] = useAuth();
  React.useEffect(() => {
    if (state.id === 0) Router.replace("/login?next=/");
    if (Router.pathname === "/login" && state.id !== 0) Router.push("/");
  }, [state, Router]);
};
