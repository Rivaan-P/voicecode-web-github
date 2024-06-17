import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function useThemeTransition() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const md = window.matchMedia("(max-width: 768px)").matches;

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(theme === "light" ? "dark" : "light");
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === "light" ? "dark" : "light");
      });
    });

    transition.ready.then(() => {
      const blur = md ? 2 : 10;
      const duration = md ? 500 : 700;

      document.documentElement.animate(
        {
          clipPath: [`circle(50% at -100% 50%)`, `circle(100% at 50% 50%)`],
          filter: [`blur(${blur}px)`, `blur(0)`],
        },
        {
          duration,
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }, [theme, setTheme]);

  return {
    theme,
    toggleTheme,
  };
}

export function ThemeSwitcherButton() {
  const { toggleTheme, theme } = useThemeTransition();
  const mounted = useIsMounted();

  if (!mounted) return null;
  return (
    <button
      className="rounded-xl bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800"
      type="button"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Moon className="transition-all" />
      ) : (
        <Sun className="transition-all" />
      )}
    </button>
  );
}

export default ThemeSwitcherButton;
