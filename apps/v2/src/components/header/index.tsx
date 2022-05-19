import { memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { nanoid } from "nanoid";

import { DefaultGradientColoring } from "../logo";
const Logo = dynamic(() => import("../logo"));

import styles from "./styles.module.scss";

type HeaderProps = {};

type Page = {
  id: string;
  title: string;
  href: string;
};

const pages: Page[] = [
  {
    id: nanoid(),
    title: "Pricing",
    href: "/pricing",
  },
];

export const Header: React.FC<HeaderProps> = memo(() => {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navbar}>
        <Link href="/">
          <a>
            <Logo size={24}>
              <DefaultGradientColoring />
            </Logo>
          </a>
        </Link>

        <ul className={styles.pages}>
          {pages.map(({ id, title, href }) => (
            <li key={id}>
              <Link href={href}>
                <a>
                  <strong>{title}</strong>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
});
