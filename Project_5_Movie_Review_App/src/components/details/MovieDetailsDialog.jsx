
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CalendarDays, Clock } from "lucide-react";
import { getImageUrl } from "../../lib/tmdb";

export function MovieDetailsDialog({ movie, onClose }) {
  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/95 shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
          >
            <div className="relative h-56 w-full overflow-hidden">
              {movie.backdrop_path && (
                <img
                  src={getImageUrl(movie.backdrop_path, "w780")}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-slate-100 hover:bg-black"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-5">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {movie.title}
                </h2>
                <p className="mt-1 text-xs text-slate-200 sm:text-sm">
                  {movie.tagline || movie.overview?.slice(0, 80)}
                </p>
              </div>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-[2fr,1fr]">
              <div className="space-y-2 text-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-brand-accent">
                  Overview
                </p>
                <p className="text-sm text-slate-200">{movie.overview}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>
                    {movie.vote_average?.toFixed(1)} / 10
                    <span className="text-slate-400">
                      {" "}
                      ({movie.vote_count} votes)
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-400" />
                  <span>{movie.release_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Runtime: N/A (extend with /movie/{movie.id} details)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
