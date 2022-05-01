import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "../styles/main.scss";

import { ThemeProvider } from "../context/theme";
import { NotesProvider } from "../context/notes";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ThemeProvider defaultTheme="omni">
      <NotesProvider>
        <Component {...pageProps} />
      </NotesProvider>
    </ThemeProvider>
  );
}
