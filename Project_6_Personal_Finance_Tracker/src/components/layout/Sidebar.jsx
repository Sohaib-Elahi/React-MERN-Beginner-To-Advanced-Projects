import { motion } from "framer-motion";
import { LayoutDashboard, Receipt, Target, CreditCard, Repeat, Settings } from "lucide-react";


const menuItems = [
    {id: "dashboard", label: "Dashboard", icon: LayoutDashboard},
    {id: "transactions", label: "Transactions", icon: Receipt},
    {id: "goals", label: "Goals", icon: Target},
    {id: "debts", label: "Debts", icon: CreditCard},
    {id: "recurring", label: "Recurring", icon: Repeat},
];

export default function Sidebar({ activeView, onViewChange }) {
    return(
        <aside className="flex w-60 flex-col border-r border-notion-border bg-notion-bg">
            <div className="flex h-14 items-center border-b border-notion-border px-5">
                <h1 className="text-base font-semibold text-notion-text">
                    FinanceTracker
                </h1>
            </div>

            <nav className="flex-1 space-y-1 p-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            whileHover={{ x: 2}}
                            whileTap={{scale: 0.98}}
                            className={`relative flex w-full items-center gap-3 rounded-notion px-3 py-2 text-sm transition-colors 
                                ${
                                    isActive  ? "bg-notion-accent/10 text-notion-accent"
                                              : "text-notion-textLight hover:bg-notion-surface"
                                }`}
                        >

                            <Icon className="h-4 w-4"/>
                            <span className="font-medium">
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-notion bg-notion-accent/10"
                                    transition={{ type: "spring", duration: 0.5 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </nav>
            <div className="border-t border-notion-border p-3">
                <button className="flex w-full items-center gap-3 rounded-notion px-3 py-2 text-sm text-notion-textLight transition-colors hover:bg-notion-surface">
                    <Settings className="h-4 w-4"/>
                    <span className="font-medium">
                        Settings
                    </span>
                </button>
            </div>
        </aside>
    );
}