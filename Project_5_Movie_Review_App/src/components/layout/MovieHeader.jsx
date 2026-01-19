import { Film, Search, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function MovieHeader({ onOpenSearch }){
    return (
        <header className="flex items-center justify-between py-6">
            <motion.div
                className="flex items-center justify-between py-6"
                initial = {{ opacity: 0, y: -10 }}
                animate = {{ opacity: 1, y: 0 }}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent/20">
                    <Film className="h-6 w-6 text-brand-accent"/>
                </div>
                <div>
                    <h1 className="text-lg font-semibold tracking-tight sm:text-sm">
                        Movieverse
                    </h1>
                    <p className="text-xs text-slate-400 sm:text-sm">
                        Discover, track and rate your favorite movies.
                    </p>
                </div>
            </motion.div>
            <motion.div
                className="flex items-center gap-3"
                initial = {{ opacity:0, x:10}}
                animate = {{ opacity:1, x:0}}
            >
                <Button
                    variant="outline"
                    className="hidden items-center gap-2 border-slate-700 bg-slate-900/40
                    text-xs text-slate-200 hover:bg-slate-900 sm:flex"
                >
                    <Star className="h-4 w-4 text-yellow-400"/>
                        Watchlist
                </Button>
                <Button
                    className = "flex items-center gap-2 bg-brand-accent text-xs font-medium text-white hover:bg-rose-600 sm:text-sm"
                    onClick = {onOpenSearch}
                >   
                    <Search className="h-4 w-4"/>
                        Search
                </Button>
            </motion.div>
        </header>
    );
}