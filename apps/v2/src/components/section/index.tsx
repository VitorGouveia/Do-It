import type { HTMLAttributes } from "react";

import styles from "./styles.module.scss";

type SectionProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={styles.sectionBackground} {...props}>
      <div className={`${styles.sectionBox} ${className}`}>{children}</div>
    </section>
  );
};
