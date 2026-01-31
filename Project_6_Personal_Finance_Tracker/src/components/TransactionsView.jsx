import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import useFinanceStore from "../store/financeStore";

export default function TransactionsView() {
    const transactions = useFinanceStore((state) => state.transactions);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-notion-text">
                All Transactions
            </h2>

            <div className="space-y-2">
                {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between rounded-lg border border-notion-border bg-notion-card p-4 transition-colors hover:bg-notion-cardHover"
                        >   
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg
                                        ${
                                            transaction.type === 'income'
                                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                        }`}
                                >
                                    {transaction.type === "income" ? (
                                        <TrendingUp  className="h-5 w-5"/>
                                    ) : (
                                        <TrendingDown  className="h-5 w-5"/>
                                    )}
                                </div>

                                <div>
                                    <p className="font-medium text-notion-text">
                                        {transaction.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-notion-textLight">
                                        <span>{formatDate(transaction.date)}</span>
                                        <span>•</span>
                                        <span className="rounded-full bg-notion-bg px-2 py-0.5">
                                            {transaction.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span
                                    className={`text-lg font-semibold ${
                                        transaction.type === "income"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                                >
                                    {transaction.type === 'income' ? "+" : "-"}
                                    {formatCurrency(transaction.amount)}
                                </span>
                                <button
                                    onClick={() => deleteTransaction(transaction.id)}
                                    className="rounded-lg p-2 text-notion-textLight transition-colors  hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-notion-border">
                        <p className="text-sm text-notion-textLight">
                            No transaction yet. Add your first transaction!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}