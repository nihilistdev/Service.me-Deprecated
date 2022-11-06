import * as React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
};
