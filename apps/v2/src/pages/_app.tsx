import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "../styles/main.scss";

import { ThemeProvider } from "../context/theme";
import { NotesProvider } from "../context/notes";
import { ScrollProvider } from "../context/scroll";

import Inspect from "inspx";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const callback = (event: MouseEvent) => {
      const cursorHighlightElement =
        document.querySelector<HTMLDivElement>(".cursor-highlight")!;

      cursorHighlightElement.style.top = `${event.clientY - 13}px`;
      cursorHighlightElement.style.left = `${event.clientX - 17}px`;
    };

    document.addEventListener("mousemove", callback);

    return () => document.removeEventListener("mousemove", callback);
  }, []);

  return getLayout(
    <ThemeProvider defaultTheme="omni">
      <NotesProvider>
        <ScrollProvider>
          {/* <Inspect> */}
          <Component {...pageProps} />

          <div className="cursor-highlight" />
          {/* </Inspect> */}
        </ScrollProvider>
      </NotesProvider>
    </ThemeProvider>
  );
}
