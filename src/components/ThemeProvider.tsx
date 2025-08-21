// components/ThemeProvider.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Mode = "light" | "dark" | "system";

interface ThemeContextType {
  /* The *resolved* theme actually in use (“light” | “dark”) */
  theme: "light" | "dark";
  /* The user’s saved preference (“light” | “dark” | “system”) */
  mode: Mode;
  /* Change mode explicitly */
  // eslint-disable-next-line no-unused-vars
  setMode: (m: Mode) => void;
  /* Convenience toggle: light ↔ dark, system stays system */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

/* ————————————————————————— Utility ————————————————————————— */
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

/* ————————————————————————— Provider ————————————————————————— */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("system");
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window === "undefined" ? "light" : getSystemTheme(),
  ); // SSR guard

  /* read saved preference on mount */
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Mode | null;
    if (saved) setMode(saved);
  }, []);

  /* whenever mode changes, resolve theme & write class */
  useEffect(() => {
    const apply = (resolved: "light" | "dark") => {
      setTheme(resolved);
      document.documentElement.classList.toggle("dark", resolved === "dark");
    };

    if (mode === "system") {
      /* 1. apply initial system theme */
      apply(getSystemTheme());
      /* 2. watch for OS changes */
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => apply(mql.matches ? "dark" : "light");
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    } else {
      apply(mode);
    }
  }, [mode]);

  /* write preference to localStorage (skip “system”) */
  useEffect(() => {
    if (mode === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", mode);
  }, [mode]);

  /* helpers */
  const toggleTheme = () =>
    setMode((prev) =>
      prev === "system" ? "dark" : prev === "dark" ? "light" : "dark",
    );

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ———————————————————— Prevent flash of wrong theme ————————————————————
   Place the snippet below in <head> of app/layout.tsx *before* Tailwind CSS.
   It runs before React hydration.
-------------------------------------------------------------------------- */
/*
<script dangerouslySetInnerHTML={{
  __html: `
    (function () {
      try {
        var m = localStorage.getItem('theme');
        if (m === 'dark' || (!m && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      } catch (_) {}
    })();
  `,
}} />
*/
