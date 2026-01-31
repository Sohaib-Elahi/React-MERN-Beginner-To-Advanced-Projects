import { useFinanceStore } from "../store/financeStore";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export default function RecentTransactions() {
  const transactions = useFinanceStore((state) => state.transactions);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

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
    });
  };

  return (
    <div className="rounded-xl border border-notion-border bg-notion-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-notion-text">
          Recent Transactions
        </h3>
        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-notion-cardHover"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-notion-text">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-notion-textLight">
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <span
                className={`text-sm font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))
        ) : (
          <div className="flex h-32 items-center justify-center text-sm text-notion-textLight">
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
}
