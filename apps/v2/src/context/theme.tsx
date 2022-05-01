import { memo, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

/**
 * name of the theme
 */
type Theme = string;

type SetProps = {
  theme: Theme;
};

type ThemeContextProps = {
  theme: Theme;
  defaultTheme: Theme;

  setTheme: (props: SetProps) => void;
  setDocumentTheme: (props: Theme) => void;
};

export const ThemeContext = createContext({} as ThemeContextProps);

type ThemeProviderProps = {
  defaultTheme?: Theme;
  children: React.ReactNode;
};

const localStorageThemeKey = "@notely:theme";

export const ThemeProvider: React.FC<ThemeProviderProps> = memo(
  ({ children, defaultTheme = "light" }) => {
    const [theme, setTheme] = useState(defaultTheme);

    // useEffect(() => {
    //   const localTheme = localStorage.getItem(localStorageThemeKey);

    //   if (!localTheme) {
    //     return;
    //   }

    //   setTheme(localTheme);
    // }, []);

    const setDocumentTheme = useCallback((theme: Theme) => {
      const html = document.querySelector("html");

      if (!html) {
        return;
      }

      html.setAttribute("data-theme", theme);
    }, []);

    const setStorageTheme = useCallback((theme: Theme) => {
      localStorage.setItem(localStorageThemeKey, theme);
    }, []);

    // prettier-ignore
    const set = useCallback(({ theme }: SetProps) => {
      setTheme(theme);
      setDocumentTheme(theme);
      setStorageTheme(theme)
    }, [setDocumentTheme, setStorageTheme]);

    useEffect(() => {
      setDocumentTheme(theme);
    }, [setDocumentTheme, theme]);

    return (
      <ThemeContext.Provider
        value={{ theme, setTheme: set, defaultTheme, setDocumentTheme }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
);
