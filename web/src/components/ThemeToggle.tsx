import { HiSun as SunIcon, HiMoon as MoonIcon } from "react-icons/hi";
import * as React from "react";
import { useTheme } from "../../src/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  // const [mounted, setMounted] = useState(false);

  return (
    <button
      className="w-8 h-8 bg-blue-100 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-blue-400 transition-all duration-300 focus:outline-none"
      onClick={() => setTheme!(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <MoonIcon className="text-blue-500 w-5 h-5" />
      ) : (
        <SunIcon className="text-blue-400 w-5 h-5" />
      )}
    </button>
  );
};
