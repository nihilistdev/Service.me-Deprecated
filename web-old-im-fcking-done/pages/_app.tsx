import type { AppProps } from "next/app";
import "@styles/App.scss";
import React from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@components/ConfigComponent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { IdProvider } from "react-use-id-hook";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryProvider] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryProvider}>
      <AuthProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
