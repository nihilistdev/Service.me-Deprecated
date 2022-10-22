import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosService from "./axios";

export const useIsAuth = () => {
  const { data, isLoading } = useQuery(["user-info"], () =>
    axiosService("user/info", { method: "GET" }).then((res) => res.data)
  );
  React.useEffect(() => {
    if (!isLoading && !data?.data) console.error("Not authenticated");
  }, [isLoading, data]);
};
