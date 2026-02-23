"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Layers, Calendar, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const NavItems = ({ setOpen }: { setOpen: (open: boolean) => void }) => (
    <>
        <Link
            href="/programs"
            className="flex items-center gap-2 transition-all hover:text-foreground text-foreground/60 hover:-translate-y-px"
            onClick={() => setOpen(false)}
        >
            <Layers className="w-4 h-4" />
            Programs
        </Link>
        <Link
            href="/calendar"
            className="flex items-center gap-2 transition-all hover:text-foreground text-foreground/60 hover:-translate-y-px"
            onClick={() => setOpen(false)}
        >
            <Calendar className="w-4 h-4" />
            Timeline
        </Link>
    </>
);

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container flex h-16 items-center px-6 md:px-12 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="mr-8 flex items-center space-x-2 group">
                    <div className="bg-primary text-primary-foreground rounded-lg p-1.5 transition-transform group-hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M12 2v20" />
                            <path d="m4.93 4.93 14.14 14.14" />
                            <path d="M2 12h20" />
                            <path d="m19.07 4.93-14.14 14.14" />
                        </svg>
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        OSS Opps
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1">
                    <NavItems setOpen={setOpen} />
                </nav>

                {/* Desktop Right Side  */}
                <nav className="hidden md:flex items-center space-x-4">
                    <ThemeToggle />

                    <Link
                        href="/submit"
                        className="flex items-center gap-2 text-sm font-semibold bg-primary/5 hover:bg-primary/10 text-primary px-4 py-2 rounded-full transition-all border border-primary/10"
                    >
                        <Plus className="w-4 h-4" />
                        Submit Program
                    </Link>
                </nav>

                {/* Mobile Menu */}
                <div className="flex md:hidden flex-1 justify-end">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-xl"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">
                                    Toggle menu
                                </span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-[300px] sm:w-[400px]"
                        >
                            <SheetHeader className="text-left pb-6 border-b">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-lg p-1.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4"
                                        >
                                            <path d="M12 2v20" />
                                            <path d="m4.93 4.93 14.14 14.14" />
                                            <path d="M2 12h20" />
                                            <path d="m19.07 4.93-14.14 14.14" />
                                        </svg>
                                    </div>
                                    OSS Opps
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col space-y-6 mt-8">
                                <NavItems setOpen={setOpen} />

                                {/* Mobile Toggle */}
                                <div className="pt-4 border-t flex justify-center">
                                    <ThemeToggle />
                                </div>

                                {/* Mobile Submit */}
                                <div className="pt-4 border-t">
                                    <Link
                                        href="/submit"
                                        className="flex items-center justify-center gap-2 text-sm font-semibold bg-primary text-primary-foreground px-4 py-3 rounded-2xl transition-all shadow-lg shadow-primary/20"
                                        onClick={() =>
                                            setOpen(false)
                                        }
                                    >
                                        <Plus className="w-4 h-4" />
                                        Submit Program
                                    </Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}