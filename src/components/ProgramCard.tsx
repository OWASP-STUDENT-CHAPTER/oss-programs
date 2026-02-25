"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ComputedProgram } from "@/lib/programs";
import { cn } from "@/lib/utils";
import { Banknote, CircleDot, Clock, XCircle, ArrowRight } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";

interface ProgramCardProps {
    program: ComputedProgram;
    index: number;
}

export function ProgramCard({ program, index }: ProgramCardProps) {
    const statusColors = {
        open: "bg-[var(--status-open)] text-[var(--status-open-fg)] border-[var(--status-open-fg)]/20",
        opening_soon: "bg-[var(--status-upcoming)] text-[var(--status-upcoming-fg)] border-[var(--status-upcoming-fg)]/20",
        closed: "bg-[var(--status-closed)] text-[var(--status-closed-fg)] border-[var(--status-closed-fg)]/20",
        upcoming: "bg-muted text-muted-foreground border-border",
    };

    const StatusIcon = {
        open: CircleDot,
        opening_soon: Clock,
        closed: XCircle,
        upcoming: Clock,
    }[program.status] || CircleDot;

    return (
        <Link
            href={`/programs/${program.slug}`}
            className="block group animate-reveal h-full"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="relative h-full rounded-2xl border bg-card p-5 md:p-6 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-4px] group-hover:border-primary/20 flex flex-col overflow-hidden">
                {/* Subtle decorative glow */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex-1 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-lg md:text-xl leading-tight group-hover:text-primary transition-colors text-balance">
                                {program.name}
                            </h3>

                            <BookmarkButton
                                slug={program.slug}
                                size="sm"
                            />
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed text-pretty">
                            {program.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className={cn("px-2 py-0.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase border outline-none gap-1.5", statusColors[program.status])}
                        >
                            <StatusIcon className="w-3 h-3" />
                            {program.status.replace("_", " ")}
                        </Badge>
                        <Badge variant="secondary" className="px-2 py-0.5 text-[9px] md:text-[10px] font-semibold bg-muted/50 border-none">
                            {program.category}
                        </Badge>
                    </div>
                </div>

                <div className="relative mt-6 pt-4 border-t flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5 mb-0.5">
                            <Banknote className="w-3 h-3" /> Stipend
                        </span>
                        <span className="text-sm font-semibold">
                            {program.stipend.available ? (program.stipend.amount_text || "Available") : "No Stipend"}
                        </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
