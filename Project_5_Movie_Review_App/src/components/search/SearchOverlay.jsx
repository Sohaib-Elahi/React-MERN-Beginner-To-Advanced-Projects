import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useSearchMovies } from "@/hooks/useMovies";
import { MovieCard } from "../movies/MovieCard";
import { Input } from "../ui/input";


export default function SearchOverlay({ open, onClose, onSelectMovie }) {

    const [query, setQuery] = useState("");
    const {data: results, isLoading} = useSearchMovies(query);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md"
                    initial = {{ opacity: 0}}
                    animate = {{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="mx-auto mt-10 flex max-w-4xl flex-col rounded-3xl border border-slate-700 bg-slate-950/95 p-5 shadow-2xl"
                        initial = {{opacity: 0, y: 30}}
                        animate = {{opacity: 1, y: 0}}
                        exit = {{opacity: 0, y: 30}}
                    >  
                            <button
                                onClick={onClose}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                            >
                                <X className="h-4 w-4"/>
                            </button>
                        <div className="mx-1 mt-10 flex max-w-4xl flex-col rounded-3xl border border-slate-700 bg-slate-950/95 p-5 shadow-2xl">
                            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                                <Search className="h-4 w-4 text-slate-400"/>
                                <Input 
                                    className = "border-none bg-transparent p-0 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                                    placeholder = "Search movies, actors, genres..."
                                    value = {query}
                                    onChange ={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>


                        </div>

                        <div className="max-h-[60vh] overflow-y-auto">
                            {isLoading && (
                                <p className="text-xs text-slate-400">
                                    Searching TMDB...
                                </p>
                            )}
                            {!isLoading && query && !results?.lenght && (
                                <p className="text-xs text-slate-400">
                                    No results for "{query}"
                                </p>
                            )}

                            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                {results?.slice(0, 20).map((movie) => (
                                    <MovieCard 
                                        key={movie.id}
                                        movie={movie}
                                        onClick={() => onSelectMovie(movie)}
                                    />
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

}