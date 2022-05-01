import type { NextPage } from "next";
import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import Link from "next/link";

import { ThemeContext } from "../context/theme";

const Home: NextPage = () => {
  const theme = useContextSelector(ThemeContext, (context) => context.theme);
  const setTheme = useContextSelector(
    ThemeContext,
    (context) => context.setTheme
  );

  useEffect(() => {
    if (localStorage.getItem("@notely:run-animation") === "true") {
      setTheme({
        theme: "colorblind",
      });

      const styleSheet = document.styleSheets[0];

      styleSheet.insertRule(`
        * {
          transition: all 1s;
        }
      `);

      setTimeout(() => {
        setTheme({
          theme,
        });
      }, 2000);
    }

    const reloadCallback = () => {
      console.log("reloadeddwadawdwadwadawdaw");
      localStorage.setItem("@notely:run-animation", "true");
    };

    window.addEventListener("beforeunload", reloadCallback);

    localStorage.setItem("@notely:run-animation", "false");
    return () => {
      window.removeEventListener("beforeunload", reloadCallback);
    };
  }, [setTheme, theme]);

  return (
    <div>
      <h1>bruh</h1>
      <button>bruh</button>
      <br />

      <Link href="/app">
        <a>
          <button>go to homepage</button>
        </a>
      </Link>
    </div>
  );
};

export default Home;
