import * as React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  user?: User;
}

export const Layout = ({ user, children }: LayoutProps) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
};
