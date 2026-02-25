"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { toggleBookmark, isBookmarked } from "@/lib/bookmarks";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
    slug: string;
    initialState?: boolean;
    size?: "sm" | "md" | "lg";
}

export function BookmarkButton({
    slug,
    initialState = false,
    size = "md",
}: BookmarkButtonProps) {
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        setBookmarked(isBookmarked(slug));
    }, [slug]);

    const handleBookmark = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const newState = toggleBookmark(slug);
        setBookmarked(newState);
    };

    const sizeStyles = {
        sm: "w-7 h-7",
        md: "w-8 h-8",
        lg: "w-10 h-10",
    };

    return (
        <button
            onClick={handleBookmark}
            className={cn(
                "rounded-full flex items-center justify-center transition-all",
                sizeStyles[size],
                bookmarked
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/5 hover:bg-primary/10"
            )}
        >
            <Bookmark
                className={cn(
                    "w-4 h-4 transition-all",
                    bookmarked && "fill-current"
                )}
            />
        </button>
    );
}