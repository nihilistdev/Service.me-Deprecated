import React from "react";

const defaultActions = {
  user: undefined,
  theme: "light",
  setTheme: () => undefined,
};
export const Context = React.createContext<{
  user: User | undefined;
  theme: string;
  setTheme: (...args: any[]) => void;
}>(defaultActions);

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

const AuthContext = ({ user, initialTheme, children }: any) => {
  const [theme, setTheme] = React.useState<string>(
    getInitialTheme || undefined
  );
  const rawSetTheme = (rawTheme: any) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    localStorage.setItem("theme", rawTheme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <Context.Provider value={{ user, theme, setTheme }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContextProvider = () => React.useContext(Context);
export default AuthContext;
