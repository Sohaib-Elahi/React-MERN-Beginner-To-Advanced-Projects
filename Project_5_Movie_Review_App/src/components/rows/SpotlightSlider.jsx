import { useMovieCategory } from "@/hooks/useMovies";
import { MovieCard } from "../movies/MovieCard";
import { motion } from "framer-motion";

export default function SpotlightSlider({ title, category, onSelectMovie }) {
    const { data:movies, isLoading } = useMovieCategory(category, ["spotlight"]);
    const spotlight = movies?.slice(0, 8) ?? [];

    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold sm:text-lg">
                    {title}
                </h3>
                <p className="text-[11px] text-slate-400">
                    Curated Selection from TMDB
                </p>
            </div>

            <motion.div
                className="flex gap-4 overflow-y-hidden pb-1"
                initial = {{ opacity: 0, y: 6 }}
                animate = {{ opacity: 1, y: 0 }}
            >

                {isLoading 
                    ? Array.from({ length: 6 }).map((_, idx) => (
                        <div 
                            key={idx}
                            className="h-56 w-40 rounded-3xl bg-slate-800/60 md:w-48"
                        />
                    )) : spotlight.map((movie) => (
                        <div
                            key={movie.id}
                            className="w-48 shrink-0 md:w-56"
                        >

                            <MovieCard 
                                movie={movie}
                                onClick={() => onSelectMovie(movie)}
                            />
                        </div>
                    ))
                }
            </motion.div>
        </section>
    );
}