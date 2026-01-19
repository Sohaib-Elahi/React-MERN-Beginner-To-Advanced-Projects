import { getImageUrl } from "@/lib/tmdb";
import { motion } from "framer-motion";
import { Star } from "lucide-react";


export function MovieCard({ movie, onClick }) {
    const poster = getImageUrl(movie.poster_path ?? movie.backdrop_path)

    return (
        <motion.div
            className="group relative flex w-40 flex-col overflow-hidden rounded-2xl
            bg-slate-900/80 text-left shadow-lg shadow-black/40 transition-transform hover:translate-y-1 hover:shadow-xl md:w-44"
            onClick = {onClick}
            whileHover={{ scale: 1.03 }}
        >   
            <div className="relative h-56 w-full overflow-hidden">
                {poster ? (
                    <img 
                    src={poster} 
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />  
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs text-slate-400">
                        No Image
                    </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80
                via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] text-yellow-400">
                        <Star className="h-3 w-3"/>
                        <span>{movie.vote_average?.toFixed(1)}</span>
                    </div>
                </div>
                

                <div className="flex flex-1 flex-col gap-1 p-2.5">
                    <p className="line-clamp-1 text-xs font-semibold sm:text-sm">
                        {movie.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                        {(movie.release_date ?? "").slice(0, 4) || "—" }
                    </p>
                </div>
            </div>
        </motion.div>
    );
}