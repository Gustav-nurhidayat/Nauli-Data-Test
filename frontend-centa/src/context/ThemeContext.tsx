import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }, []);

  // Tidak melakukan apa-apa karena tema dikunci ke dark
  const toggleTheme = () => {};

  // Tidak melakukan apa-apa karena tema dikunci ke dark
  const setTheme = (_theme: Theme) => {};

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme harus digunakan di dalam ThemeProvider."
    );
  }

  return context;
}