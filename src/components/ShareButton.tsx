"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
    slug: string;
    name: string;
}

export function ShareButton({ slug, name }: ShareButtonProps) {
    const [shared, setShared] = useState(false);
    const [usedClipboard, setUsedClipboard] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const url = `${window.location.origin}/programs/${slug}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: name,
                    url,
                });
                setUsedClipboard(false);
            } else {
                await navigator.clipboard.writeText(url);
                setUsedClipboard(true);
            }

            if (timerRef.current) clearTimeout(timerRef.current);
            setShared(true);
            timerRef.current = setTimeout(() => setShared(false), 2000);
        } catch (err) {
            // User cancelled the share dialog — ignore
            if (err instanceof Error && err.name !== "AbortError") {
                console.error("Share failed:", err);
            }
        }
    };

    const Icon = shared ? Check : Share2;

    return (
        <button
            onClick={handleShare}
            aria-label={shared ? (usedClipboard ? "Link copied" : "Link shared") : "Share program"}
            className={cn(
                "flex items-center justify-center rounded-full transition-all duration-200",
                "w-9 h-9",
                shared
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-muted hover:bg-muted/70 text-muted-foreground"
            )}
        >
            <Icon
                className={cn(
                    "w-4 h-4 transition-all duration-200"
                )}
            />
        </button>
    );
}
