import { useMovieCategory } from "@/hooks/useMovies";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "../movies/MovieCard";
import { Skeleton } from "../ui/skeleton";

export default function CategoryRow({ title, category, onSelectMovie}) {
    const {data: movies, isLoading} = useMovieCategory(category);

    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold sm:text-lg">
                    {title}
                </h3>
                <button
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >   
                    View all
                    <ChevronRight className="h-3 w-3"/>
                </button>
            </div>

            {isLoading ? (
                <div className="flex gap-3 overflow-hidden">
                    {Array.from({length: 6}).map((_, idx) => (
                        <Skeleton 
                            key={idx}
                            className="h-56 w-40 rounded-2xl bg-slate-800/60 md:w-44"
                        
                        />
                    ))}
                </div>
            ) : (
                <motion.div
                    className="flex gap-3 overflow-hidden pb-1"
                    initial = {{ opacity: 0, y: 6 }}
                    animate = {{ opacity: 1, y: 0 }}
                >
                     {movies?.slice(0, 8).map((movie) => (
                        <MovieCard 
                            key={movie.id}
                            movie={movie}
                            onClick={() => onSelectMovie(movie)}
                        /> 
                     ))}
                </motion.div>
            )}
        </section>
    );
}