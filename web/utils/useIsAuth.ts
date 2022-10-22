import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import React from "react";
import axiosService from "./axios";

export const useIsAuth = () => {
  const { data, isLoading } = useQuery(["user-info"], () =>
    axiosService("user/info", { method: "GET" }).then((res) => res.data)
  );
  React.useEffect(() => {
    if (!isLoading && !data?.data) Router.replace("/login?next=/");
    if (Router.pathname === "/login") Router.push("/");
  }, [isLoading, data, Router]);
};
