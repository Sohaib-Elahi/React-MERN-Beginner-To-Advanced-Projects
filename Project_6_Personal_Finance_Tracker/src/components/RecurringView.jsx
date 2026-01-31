import useFinanceStore from "../store/financeStore";
import { Repeat, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import AddRecurringModal from "./modal/AddRecurringModal";


export default function RecurringView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
     const recurring = useFinanceStore((state) => state.recurringTransactions);
     const deleteRecurring = useFinanceStore(
        (state) => state.deleteRecurringTransaction   
     );

     const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",  
        }).format(amount);
     };

     const getFrequencyLabel = (frequency) => {
        const labels = {
            daily: "Daily",
            weekly: "Weekly",
            monthly: "Monthly",
            yearly: "Yearly",
        };

        return labels[frequency] || frequency;
     };

     const getNextOccurence = (startDate, frequency) => {
        const start = new Date(startDate);
        const now = new Date();
        let next = new Date(start);

        while (next < now) {
            switch (frequency) {
                case "daily":
                    next.setDate(next.getDate() + 1);
                    break;
                case "weekly":
                    next.setDate(next.getDate() + 7);
                    break;
                case "monthly":
                    next.setMonth(next.getMonth() + 1);
                    break;
                case "yearly":
                    next.setFullYear(next.getFullYear() + 1);
                    break;
            }
        }

        return next.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
     };

     const monthlyTotal = recurring.reduce((sum, item) => {
        const multiplier = {
            daily: 30,
            weekly: 4.33,
            monthly: 1,
            yearly: 1 / 12,
        }[item.frequency];

        return (
            sum + 
            (item.type === "income" ? item.amount : -item.amount) * multiplier
        );
     }, 0);

     return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-notion-text">
                    Recurring Transaction 
                </h2>
                 <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-mediumt
                    text-white transition-colors hover:bg-blue-700"
                >
                    + Add Recurring Expense
                </button>
                {recurring.length > 0 && (
                    <div className="text-right">
                        <p className="text-sm text-notion-textLight">
                            Monthly Impact 
                        </p>
                        <p
                            className={`text-2xl font-bold ${
                                monthlyTotal >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                        >
                                {monthlyTotal >= 0 ? "+" : ""}
                                {formatCurrency(monthlyTotal)}
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                {recurring.length > 0 ? (
                    recurring.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg border border-notion-border bg-notion-card p-4
                            transition-colors hover:bg-notion-cardHover"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg
                                        ${
                                            item.type === 'income'
                                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-purple-100 text-purple-600 dark:bg-green-900/30 dark:text-purple-400"
                                        }`}
                                >   
                                    <Repeat className="h-5 w-5"/>
                                </div>

                                <div>
                                    <p className="font-medium text-notion-text">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-notion-textLight">
                                        <span>{getFrequencyLabel(item.frequency)}</span>
                                        <span>•</span>
                                        <span className="rounded-full bg-notion-bg px-2 py-0.5">
                                            {item.category}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            Next: {getNextOccurence(item.startDate, item.frequency)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p
                                            className={`text-lg font-semibold ${
                                                item.type === 'income'
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                            }`}
                                        >
                                            {item.type === "income" ? "+" : "-"}
                                            {formatCurrency(item.amount)}
                                        </p>

                                        <p className="text-xs text-notion-textLight">
                                            per {item.frequency.replace("ly", " ")}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => deleteRecurring(item.id)}
                                        className="rounded-lg p-2 text-notion-textLight transition-colors hover:bg-red-100
                                        hover:text-red-600 dark:hover:bg-red-900/30"
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                    </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-notion-border">
                        <p className="text-sm text-notion-textLight">
                            No recurring transaction yet. Add subscriptions, salary, or rent!
                        </p>
                    </div>
                )}
            </div>
            <AddRecurringModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
     );
}