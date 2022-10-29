import * as React from "react";

export type ThemeContextProps = {
  theme?: string;
  setTheme?: (...args: any[]) => void;
};

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => undefined,
});

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
};

export type ThemeProviderProps = {
  initialTheme?: string;
  children: React.ReactNode;
};

const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<string>(
    getInitialTheme || undefined
  );

  const rawSetTheme = (rawTheme?: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme || "light");

    localStorage.setItem("theme", rawTheme || "light");
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
export default ThemeProvider;
