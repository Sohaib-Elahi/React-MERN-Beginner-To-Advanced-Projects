import useFinanceStore from "../../store/financeStore";
import { motion } from "framer-motion";
import { Search, Plus, Command } from "lucide-react";


export default function Header( {onCommandOpen} ) {
    const balance = useFinanceStore((state) => state.getBalance());

    return (
        <header className="flex h-14 items-center justify-between border-b border-notion-border bg-notion-bg px-6">
            <button
                onClick={onCommandOpen}
                className="flex items-center gap-2 rounded-notion border border-notion-border bg-notion-surface
                px-3 py-1.5 text-sm text-notion-textLight transition-all hover:border-notion-accent/50"
            >
                <Search className="h-3.5 w-3.5"/>
                <span>Search or add transaction...</span>
                <kbd className="ml-auto flex items-center gap-0.5 rounded border border-notion-border
                bg-notion-bg px-1.5 py-0.5 text-xs">
                    <Command className="h-2.5 w-2.5"/>
                </kbd>
            </button>

            <motion.div
                initial = {{ scale: 0.9, opacity: 0}}
                animate = {{scale: 1, opacity: 1}}
                className="flex items-center gap-6"
            >

                <div className="text-right">
                    <p className="text-xs text-notion-textLight">
                        Current Balance
                    </p>
                    <p className={`text-lg font-semibold 
                        ${balance >= 0 ? "text-notion-success" : "text-notion-danger"}`}>
                            ${balance.toLocaleString("en-US", {minimumFractionDigits : 2})}
                    </p>
                </div>

                <motion.div
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={onCommandOpen}
                    className="flex items-center gap-2 rounded-notion bg-notion-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-notion-accent/90"
                >
                    <Plus className="h-4 w-4"/>
                    Add Transaction
                </motion.div>
            </motion.div>
        </header>
    );
}