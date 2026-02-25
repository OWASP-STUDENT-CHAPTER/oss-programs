const STORAGE_KEY = "oss_bookmarks";

export function getBookmarks(): string[] {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function isBookmarked(slug: string): boolean {
    return getBookmarks().includes(slug);
}

export function toggleBookmark(slug: string): boolean {
    const bookmarks = getBookmarks();

    let updated;

    if (bookmarks.includes(slug)) {
        updated = bookmarks.filter((s) => s !== slug);
    } else {
        updated = [...bookmarks, slug];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return updated.includes(slug);
}