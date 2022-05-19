import { memo, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

type ScrollContextProps = {
  scrollY: number;
};

export const ScrollContext = createContext<ScrollContextProps>({
  scrollY: 0,
});

type ScrollProviderProps = {
  children: React.ReactNode;
};

export const ScrollProvider: React.FC<ScrollProviderProps> = memo(
  ({ children }) => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = useCallback(() => {
      setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
      document.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      return () => document.addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
      <ScrollContext.Provider value={{ scrollY }}>
        {children}
      </ScrollContext.Provider>
    );
  }
);
