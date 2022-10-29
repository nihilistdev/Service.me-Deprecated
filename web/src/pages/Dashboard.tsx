import { isAuth } from "@utils/isAuth";
import * as React from "react";
import { Layout } from "../components/Layout";

interface DashboardProps {}

export const Dashboard = ({}: DashboardProps) => {
  isAuth();
  return <Layout>Hello</Layout>;
};
