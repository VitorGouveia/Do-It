import React, { useEffect, useRef } from "react";
import type { NextPage } from "next";
import { useContextSelector, useContext } from "use-context-selector";
import Link from "next/link";

import { ThemeContext } from "../context/theme";
import { ScrollContext } from "../context/scroll";

import { Header } from "../components/header";
import { Section } from "../components/section";

import styles from "./home.module.scss";

function opacityForBlock(sectionProgress: number, blockNo: number) {
  const progress = sectionProgress - blockNo;

  if (progress >= 0 && progress < 1) {
    return 1;
  }

  return 0.2;
}

const Home: NextPage = () => {
  const { scrollY } = useContext(ScrollContext);
  const refContainer = useRef<HTMLDivElement>(null);

  const numOfPages = 3;
  let progress = 0;

  const { current: elementContainer } = refContainer;

  if (elementContainer) {
    const { clientHeight, offsetTop } = elementContainer;

    const screenH = window.innerHeight;
    const halfH = screenH / 2;

    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;

    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages));
  }

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
      localStorage.setItem("@notely:run-animation", "true");
    };

    window.addEventListener("beforeunload", reloadCallback);

    localStorage.setItem("@notely:run-animation", "false");
    return () => {
      window.removeEventListener("beforeunload", reloadCallback);
    };
  }, [setTheme, theme]);

  return (
    <main>
      <Header />

      <Section className={styles.heroSection}>
        <header className={styles.heading}>
          <h1>
            Notes management
            <br /> made simple
          </h1>

          <p className={styles.description}>
            Notely is a simple notes app to suit all your needs
          </p>
        </header>

        <span className={styles.createdBy}>
          Built with ❤️ by{" "}
          <a href="https://github.com/VitorGouveia">VitorGouveia</a>
        </span>
      </Section>

      <Link href="/app">
        <a>
          <button>go to homepage</button>
        </a>
      </Link>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div ref={refContainer}>
        <div className="skills">
          <div
            className="skillText"
            style={{ opacity: opacityForBlock(progress, 0) }}
          >
            We know our tools inside out. Our team has contributed 284 commits
            to
          </div>
          <span
            className="skillText"
            style={{ opacity: opacityForBlock(progress, 1) }}
          >
            React Native core, powering thousands of apps worldwide.
          </span>
          <span
            className="skillText"
            style={{ opacity: opacityForBlock(progress, 2) }}
          >
            {"We're"} maintaining some of the most popular open-source projects,
            with over 28 million downloads.
          </span>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </main>
  );
};

export default Home;
