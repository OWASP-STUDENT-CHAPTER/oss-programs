import { getPrograms } from "@/lib/programs";
import { BookmarkedPrograms } from "@/components/bookmarked-programs";

export default function SavedProgramsPage() {

    const programs = getPrograms(); // ✅ runs on server

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8 md:py-16 space-y-8">

            <h1 className="text-2xl md:text-3xl font-bold">
                Saved Programs
            </h1>

            <BookmarkedPrograms programs={programs} />

        </div>
    );
}