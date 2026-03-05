import { getProgramBySlug, getPrograms } from "@/lib/programs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ExternalLinkIcon, MapPinIcon, UsersIcon, CircleDot, Clock, XCircle, User, Globe, Briefcase, Banknote, Timer, TimerOff, CalendarRange, Info } from "lucide-react";

import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { LocalTime } from "@/components/LocalTime";
import { cn } from "@/lib/utils";

import { BookmarkButton } from "@/components/BookmarkButton";

const baseUrl = process.env?.NEXT_PUBLIC_SITE_URL || "https://oss.owasptiet.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const program = getProgramBySlug(slug);

    if (!program) {
        return {
            title: "Program Not Found"
        };
    }

    return {
        title: `${program.name} | OSS Opps`,
        description: program.description,
        openGraph: {
            title: program.name,
            description: program.description,
            url: `${baseUrl}/programs/${slug}`,
            siteName: "OSS Opps",
            images: [
                {
                    url: `${baseUrl}/programs/${slug}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: program.name,
                }
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: program.name,
            description: program.description,
            images: [`${baseUrl}/programs/${slug}/opengraph-image`],
        },
        alternates: {
            canonical: `/programs/${slug}`
        }
    };
}

// Generate static params for static export
export function generateStaticParams() {
    const programs = getPrograms();
    return programs.map((program) => ({
        slug: program.slug,
    }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = getProgramBySlug(slug);

    if (!program) {
        notFound();
    }

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
        <div className="container max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-12 md:space-y-16 animate-reveal">
            <div className="space-y-8">
                <div className="flex items-start justify-between gap-4">

                    {/* LEFT SIDE — Badges */}
                    <div className="flex flex-wrap gap-3 text-sm">
                        <Badge
                            className={cn(
                                "px-3 py-1 font-bold tracking-wider uppercase border outline-none gap-1.5",
                                statusColors[program.status]
                            )}
                        >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {program.status.replace("_", " ")}
                        </Badge>

                        <Badge
                            variant="secondary"
                            className="px-3 py-1 font-semibold bg-muted/50 border-none capitalize"
                        >
                            {program.category}
                        </Badge>
                    </div>

                    {/* RIGHT SIDE — Bookmark */}
                    <BookmarkButton slug={program.slug} size="lg" />

                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance leading-tight">
                        {program.name}
                    </h1>
                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed text-pretty">
                        {program.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button asChild size="lg" className="rounded-xl md:rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all w-full sm:w-auto">
                        <a href={program.links.apply} target="_blank" rel="noopener noreferrer">
                            Apply Now <ExternalLinkIcon className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-xl md:rounded-full px-8 h-14 text-base font-bold border-2 w-full sm:w-auto">
                        <a href={program.links.official} target="_blank" rel="noopener noreferrer">
                            Visit Official Site
                        </a>
                    </Button>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-10 md:gap-12 py-10 md:py-12 border-y border-border/50">
                <div className="space-y-6">
                    <h3 className="font-bold text-xl flex items-center gap-3">
                        <UsersIcon className="w-6 h-6 text-primary" /> Eligibility
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex flex-col gap-1">
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Applicant Type</span>
                            <span className="font-semibold text-lg capitalize">{program.eligibility.type}</span>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Eligible Regions</span>
                            <span className="font-semibold text-lg capitalize">{program.eligibility.regions}</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-xl flex items-center gap-3">
                        <MapPinIcon className="w-6 h-6 text-primary" /> Logistics
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex flex-col gap-1">
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Work Mode</span>
                            <span className="font-semibold text-lg">{program.remote ? 'Remote / Online' : 'On-site'}</span>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5"><Banknote className="w-3.5 h-3.5" /> Stipend Details</span>
                            <span className="font-semibold text-lg">{program.stipend.available ? (program.stipend.amount_text || "Stipend Available") : 'No Stipend Listed'}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <CalendarIcon className="w-8 h-8 text-primary" />
                    </div>
                    Program Timeline
                </h2>

                {program.currentYearDates ? (
                    <div className="rounded-2xl md:rounded-3xl border glass p-6 md:p-12 shadow-xl relative overflow-hidden group">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

                        <h3 className="font-bold text-2xl mb-8 flex items-center gap-2">
                            <span className="text-primary">{program.currentYearDates.year}</span> Cycle
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 relative">
                            <div className="space-y-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5 mb-1"><Timer className="w-3.5 h-3.5" /> Applications Open</span>
                                <LocalTime dateString={program.currentYearDates.applications_open} className="text-xl font-bold text-foreground" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5 mb-1"><TimerOff className="w-3.5 h-3.5" /> Applications Close</span>
                                <LocalTime dateString={program.currentYearDates.applications_close} className="text-xl font-bold text-foreground" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5 mb-1"><CalendarRange className="w-3.5 h-3.5" /> Program Period</span>
                                <div className="flex items-center gap-3">
                                    <LocalTime dateString={program.currentYearDates.program_start} className="text-xl font-bold text-foreground" />
                                    <span className="text-muted-foreground">→</span>
                                    <LocalTime dateString={program.currentYearDates.program_end} className="text-xl font-bold text-foreground" />
                                </div>
                            </div>
                        </div>

                        {program.currentYearDates.notes && (
                            <div className="mt-12 pt-8 border-t border-border/50">
                                <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2 italic">
                                    <Info className="w-4 h-4 text-foreground/80 mt-0.5 shrink-0" />
                                    <span>
                                        <span className="font-bold not-italic text-foreground/80 uppercase tracking-tighter mr-2">Note:</span>
                                        {program.currentYearDates.notes}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-12 text-center rounded-3xl border border-dashed border-border py-20">
                        <p className="text-xl font-medium text-muted-foreground italic">Timeline confirmed for the next cycle soon…</p>
                    </div>
                )}
            </div>

            {program.notes && (
                <div className="space-y-6 pt-8">
                    <h3 className="text-2xl font-bold tracking-tight">Additional Details</h3>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{program.notes}</p>
                    </div>
                </div>
            )}
        </div>
    );
}