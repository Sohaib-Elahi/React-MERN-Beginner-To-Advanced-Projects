import { format, subMonths, startOfMonth } from "date-fns";
import useFinanceStore from "../../store/financeStore";
import { LineChart, Line,XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SpendingChart() {

    const transactions = useFinanceStore((state) => state.transactions);

    // Generate Last 6 months Data

    const data = Array.from({ length: 6}, (_, i) => {
        const month = subMonths(new Date(), 5 - i);
        const monthStart = startOfMonth(month);
        const monthLabel = format(monthStart, "MMM");

        const monthTransactions = transactions.filter(
         (t) => format(new Date(t.date), "MMM yyyy") === format(monthStart, "MMM yyyy")
        );

        const income = monthTransactions
                        .filter((t) => t.type === "amount")
                        .reduce((sum, t) => sum + t.amount, 0);
        const expenses = monthTransactions
                        .filter((t) => t.type === "expense")
                        .reduce((sum, t) => sum + t.amount, 0);

        return {month: monthLabel, income, expenses, net: income - expenses};
    });

    return (
        <div className="notion-card p-6">
            <h3 className="text-sm font-semibold text-notion-text">
                Income vs Expenses
            </h3>
            <p className="mt-1 text-xs text-notion-textLight">
                Last 6 months trend
            </p>

            <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e4df"/>
                        <XAxis dataKey="month" stroke="#787774" fontSize={12}/>
                        <YAxis stroke="#787774" fontSize={12}/>
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #e5e4df",
                                borderRadius: "3px",
                                fontSize: "12px",
                            }}
                        />
                        
                        <Line type="monotone" dataKey="income" stroke="#0f7b6c" strokeWidth={2}/> 
                        <Line type="monotone" dataKey="expenses" stroke="#e03e3e" strokeWidth={2}/> 
                        <Line type="monotone" dataKey="net" stroke="#2383e2" strokeWidth={2} strokeDasharray="5 5"/> 
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}