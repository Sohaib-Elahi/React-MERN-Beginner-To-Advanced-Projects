import { motion } from "framer-motion";
import StatsCards from "./StatsCards";
import SpendingChart from "./SpendingChart";
import CategoryBreakdown from "./CategoryBreakdown";


export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-notion-text">
                    Dashboard
                </h2>
                <p className="mt-1 text-sm text-notion-textLight">
                    Overview of your financial health
                </p>
            </div>
            {/* StatsCards */}
            <StatsCards />
            <CategoryBreakdown />
            <div className="grid gap-6 lg:grid-cols-2">
                <SpendingChart />
                {/* Category Breakdown */}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    {/* RecentTransactions */}
                </div>
                {/* GoalsProgress */}
            </div>
        </div>
    );
}