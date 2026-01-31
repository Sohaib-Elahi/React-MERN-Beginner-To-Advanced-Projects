import useFinanceStore from "../../store/financeStore";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown,  Wallet, Target } from "lucide-react";


export default function StatsCards() {
    const balance = useFinanceStore((state) => state.getBalance());
    const predictedBalance = useFinanceStore((state) => state.getPredictedBalance());
    const savingsRate = useFinanceStore((state) => state.getSavingsRate());
    const transactions = useFinanceStore((state) => state.transactions);

    const monthIncome = transactions
                        .filter((t) => t.type === "income")
                        .reduce((sum, t) => sum + t.amount, 0);

    const monthExpenses = transactions
                        .filter((t) => t.type === "expense")
                        .reduce((sum, t) => sum + t.amount, 0);

    const stats = [
        {
            label: "Current Balance",
            value: `$${balance.toLocaleString("en-US", {minimumFractionDigits: 2})}`,
            change: `${balance >= 0 ? "+" : ""}${balance.toFixed(2)}`,
            trend: balance >= 0 ? "up" : "down",
            icon: Wallet,
        },
        {
            label: "Predicted (30d)",
            value: `$${predictedBalance.toLocaleString("en-US", {minimumFractionDigits: 2})}`,
            change: `${predictedBalance - balance >= 0 ? "+" : ""}${(predictedBalance - balance).toFixed(2)}`,
            trend: predictedBalance >= balance ? "up" : "down",
            icon: TrendingUp,
        },
        {
            label: "Savings Rate",
            value: `$${savingsRate.toFixed(1)}`,
            change: savingsRate >= 20 ? "Excellent" : savingsRate >= 10 ? "Good" : "Improve",
            trend: savingsRate >= 20 ? "up" : "down",
            icon: Target,
        },
        {
            label: "Monthly Expenses",
            value: `$${monthExpenses.toLocaleString("en-US", {minimumFractionDigits: 2})}`,
            change: `${monthIncome - monthExpenses >= 0 ? "+" : "-"}$${(Math.abs(monthIncome - monthExpenses)).toFixed(2)}`,
            trend: monthIncome - monthExpenses >= 0 ? "up" : "down",
            icon: TrendingDown,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={stat.label}
                        initial = {{opacity: 0, y: 20}}
                        animate = {{opacity: 1, y: 0}}
                        transition={{delay: i * 0.1}}
                        className="notion-card p-5"
                    >
                        <div className="flex items-center justify-between">
                            <div className="rounded-notion bg-notion-surface p-2">
                                <Icon className="h-4 w-4 text-notion-accent"/>
                            </div>
                            <span
                                className={`text-xs font-medium
                                    ${stat.trend === "up" ? "text-notion-success" : "text-notion-danger"}`}
                            >
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                                <p className="text-xs text-notion-textLight">
                                    {stat.label}
                                </p>
                                <p className="mt-1 text-2xl font-semibold text-notion-text">
                                    {stat.value}
                                </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}