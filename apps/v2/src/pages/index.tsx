import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", "colorblind");

    setTimeout(() => {
      document.querySelector("html")?.setAttribute("data-theme", "omni");
    }, 1200);
  }, []);

  return (
    <div>
      <h1>bruh</h1>
      <button>bruh</button>
    </div>
  );
};

export default Home;
