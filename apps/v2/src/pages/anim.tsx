import React from "react";

import styled from "styled-components";
import { useViewportScroll, useTransform, motion } from "framer-motion";

const FirstAndSecond: React.FC = () => {
  const { scrollYProgress } = useViewportScroll();

  const frameOpacity = useTransform(scrollYProgress, [0.196, 0.198], [0, 1]);
  const frameScale = useTransform(
    scrollYProgress,
    [0.558, 0.627],
    [0.511, 0.8]
  );

  return (
    <Sticky className="second">
      <First />

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          borderRadius: "4px",
          border: "4px solid #fff",
          opacity: frameOpacity,
          scale: frameScale,
        }}
      />
    </Sticky>
  );
};

const Footer: React.FC = () => {
  return (
    <div>
      <h1>Footer</h1>
    </div>
  );
};

const Header: React.FC = () => {
  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0.188, 0.198], ["0%", "-100%"]);

  return <Container style={{ y }} />;
};

export const Container = styled(motion.header)`
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0;
  z-index: 9999;
`;

const First: React.FC = () => {
  const { scrollYProgress } = useViewportScroll();
  const firstRadius = useTransform(
    scrollYProgress,
    [0.198, 0.264, 0.558, 0.627],
    [0, 4, 4, 0]
  );
  const firstScale = useTransform(
    scrollYProgress,
    [0.198, 0.264, 0.558, 0.627],
    [1, 0.511, 0.511, 1]
  );
  const leftSideHeight = useTransform(
    scrollYProgress,
    [0, 0.058],
    ["20vh", "100vh"]
  );
  const rightSideScale = useTransform(
    scrollYProgress,
    [0.047, 0.093],
    [0, 0.511]
  );
  const rightSideY = useTransform(
    scrollYProgress,
    [0.047, 0.093],
    ["58vh", "0vh"]
  );
  const offsetY = useTransform(
    scrollYProgress,
    [0.328, 0.397, 0.461, 0.53],
    ["0%", "-100%", "-100%", "-200%"]
  );

  return (
    <Sticky
      className="first"
      style={{
        borderRadius: firstRadius,
        scale: firstScale,
      }}
    >
      <motion.div
        className="offset"
        style={{
          y: offsetY,
        }}
      >
        <div className="a">
          <motion.div
            className="left-side"
            style={{
              height: leftSideHeight,
            }}
          />
          <div className="right-side">
            <motion.div
              className="right-image"
              style={{
                y: rightSideY,
                scale: rightSideScale,
              }}
            />
          </div>
        </div>

        <div className="b" />
        <div className="c" />
      </motion.div>
    </Sticky>
  );
};

const Main = styled.main`
  .first {
    background: red;
    overflow: hidden;

    .offset {
      width: 100%;
      height: 100%;
    }

    .a {
      background: #f5f1ea;
      height: 100%;
      display: flex;
      align-items: flex-end;

      .left-side {
        width: 50%;
        height: 100%;
        background: #7dbb91;
      }
      .right-side {
        width: 50%;
        height: 100%;

        .right-image {
          background: #7dbb91;
          width: 100%;
          height: 100%;
        }
      }
    }
    .b {
      width: 100%;
      height: 100%;
      background: #582534;
    }
    .c {
      width: 100%;
      height: 100%;
      background: #0a7397;
    }
  }
  .second {
    background: green;
  }
  .third {
    background: yellow;
  }
  .fourth {
    background: blue;
  }
`;

export const Section = styled.div`
  position: relative;
`;

export const Sticky = styled(motion.div)`
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
`;

function App() {
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Main style={{ height: "1610vh" }}>
      <Header />

      <Section style={{ height: "72.7%" }}>
        <FirstAndSecond />
      </Section>

      <Section style={{ height: "9.7%" }}>
        <Sticky className="third" />
      </Section>

      <Section style={{ height: "10.1%" }}>
        <Sticky className="fourth" />
      </Section>

      <Footer />
    </Main>
  );
}

export default App;
