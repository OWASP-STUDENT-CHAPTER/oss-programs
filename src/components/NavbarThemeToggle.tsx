"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function FloatingThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`
            relative w-11 h-6 rounded-full
            flex items-center
            transition-colors duration-300
            ${isDark
                    ? "bg-neutral-700"
                    : "bg-neutral-300"
                }
        `}
        >

            {/* Track Icons */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-1 w-3 h-3 text-neutral-500 dark:text-neutral-400"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25M12 18.75V21M4.219 4.219l1.591 1.591M18.19 18.19l1.591 1.591M3 12h2.25M18.75 12H21M4.219 19.781l1.591-1.591M18.19 5.81l1.591-1.591M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
                />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute right-1 w-3 h-3 text-neutral-500 dark:text-neutral-400"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9 9 0 1112.998 2.25 7.5 7.5 0 0021.75 15z"
                />
            </svg>

            {/* Sliding Knob */}
            <div
                className={`
                absolute w-5 h-5 rounded-full
                bg-white dark:bg-neutral-900
                shadow-sm
                transition-transform duration-300
                ${isDark ? "translate-x-5" : "translate-x-1"}
            `}
            />

        </button>
    );
}