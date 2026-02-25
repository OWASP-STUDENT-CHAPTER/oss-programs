"use client";

import { useEffect, useState } from "react";
import { ProgramCard } from "@/components/ProgramCard";
import { getBookmarks } from "@/lib/bookmarks";
import { ComputedProgram } from "@/lib/programs";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BookmarkedPrograms({
    programs,
}: {
    programs: ComputedProgram[];
}) {

    const [filtered, setFiltered] = useState<ComputedProgram[]>([]);

    useEffect(() => {
        const bookmarks = getBookmarks();

        const saved = programs.filter(program =>
            bookmarks.includes(program.slug)
        );

        setFiltered(saved);
    }, [programs]);

    if (!filtered.length) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                <h2 className="text-xl font-semibold">
                    No saved programs yet
                </h2>

                <p className="text-muted-foreground max-w-md">
                    Browse programs and bookmark the ones you're interested in to view them here.
                </p>

                <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                    See All Programs
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.map((program, index) => (
                <ProgramCard
                    key={program.slug}
                    program={program}
                    index={index}
                />
            ))}

            {/* CTA Card */}
            <Link
                href="/programs"
                className="flex items-center justify-center rounded-2xl border border-dashed hover:border-primary transition-all group min-h-[180px]"
            >
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    Explore More Programs
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>

        </div>

    );
}