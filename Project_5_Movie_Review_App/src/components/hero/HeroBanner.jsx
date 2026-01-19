import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { Button } from "../ui/button";
import { useHeroMovies } from "../../hooks/useMovies"
import { getImageUrl } from "@/lib/tmdb";
import { Skeleton } from "../ui/skeleton";


export function HeroBanner( { onSelectMovie } ) {
    
    const {data: movies, isLoading} = useHeroMovies();
    const hero = movies ?.[0];

    if (isLoading || !hero) {
        return (
            <div className="mt-4 grid gap-4 md:grid-cols-[2fr, 1fr]">
                <Skeleton className="h-64 rounded-3xl bg-slate-800/60 md:h-80" /> 
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-8 w-3/4 bg-slate-800/60" />
                    <Skeleton className="h-4 w-full bg-slate-800/60" />
                    <Skeleton className="h-4 w-2/3 bg-slate-800/60" />
                    <Skeleton className="h-10 w-40 bg-slate-800/60" />
                </div>
            </div>
        );
    }

     return (
        <section className="mt-4 grid gap-6 md:grid-cols-[2fr, 1fr]">
            <motion.div
                className="relative h-64 overflow-hidden rounded-3xl md:h-80"
                initial = {{ opacity: 0, scale: 0.98 }}
                animate = {{ opacity: 1, scale: 1 }}
            >
                <img 
                    src={getImageUrl(hero.backdrop_path ?? hero.poster_path, "w780")}
                    alt={hero.title}
                    className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 flex flex-col gap-3">
                        <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                            {hero.title}
                        </h2>
                        <p className="max-w-md text-xs text-slate-200 sm:text-sm">
                            {hero.overview?.slice(0, 140)}...
                        </p>
                        <div className="flex gap-3">
                            <Button
                                size="sm"
                                className = "flex items-center gap-2 bg-white/90 text-xs font-semibold text-black hover:bg-white"
                            >   
                                <Play className="h-4 w-4"/>
                                    Play Trailer
                            </Button>

                            <Button 
                                size = "sm"
                                variant = "outline"
                                className = "flex items-center gap-2 border-slate-700 bg-black/40 text-xs text-slate-100 hover:bg-black/60"
                                onClick = {() => onSelectMovie(hero)}
                            >   
                                <Info className="h-4 w-4"/>
                                More Info
                            </Button>
                        </div>
                    </div>
            </motion.div>


            <motion.div
                className="flex flex-col justify-center gap-2 rounded-3xl border border-slate-800/80 bg-slate-900/50 p-5"    
                initial = {{ opacity: 0, x:10 }}
                animate = {{ opacity: 1, x:0 }}
            
            >   
                <p className="text-xs uppercase tracking-[0.25em] text-brand-accent">
                    Featured Today
                </p>
                <h3 className="text-lg font-semibold sm:text-xl">{hero.title}</h3>
                <p className="text-xs text-slate-300 sm:text-sm">
                    ⭐ {hero.vote_average?.toFixed(1)} | {hero.vote_count} votes
                </p>
            </motion.div>
        </section>
    )
 }

