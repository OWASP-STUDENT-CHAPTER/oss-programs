"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookmarks } from "@/lib/bookmarks";
import { cn } from "@/lib/utils";

export function FloatingSavedButton() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        const load = () => {
            const bookmarks = getBookmarks();
            setCount(bookmarks.length);
        };

        load();

        window.addEventListener("bookmarkUpdated", load);

        return () => {
            window.removeEventListener("bookmarkUpdated", load);
        };

    }, []);

    if (!count) return null;

    return (
        <Link
            href="/bookmarks"
            className={cn(
                "fixed bottom-5 right-5 z-50",
                "flex items-center gap-2",
                "px-3 py-2 rounded-full",
                "bg-background/80 backdrop-blur-md",
                "border shadow-sm",
                "hover:shadow-md hover:border-primary/30",
                "transition-all duration-200"
            )}
        >
            <Bookmark className="w-4 h-4" />
            <span className="text-sm font-medium">
                {count}
            </span>
        </Link>
    );
}