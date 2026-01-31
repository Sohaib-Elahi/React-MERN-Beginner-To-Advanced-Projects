// src/components/dashboard/CategoryBreakdown.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import useFinanceStore from "../../store/financeStore";

export default function CategoryBreakdown() {
  // Get raw data, not the function
  const transactions = useFinanceStore((state) => state.transactions);
  const categories = useFinanceStore((state) => state.categories);

  // Compute breakdown locally instead of calling store function
  const breakdown = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      if (!acc[t.categoryId]) {
        acc[t.categoryId] = { total: 0, count: 0 };
      }
      acc[t.categoryId].total += t.amount;
      acc[t.categoryId].count += 1;
      return acc;
    }, {});

  const data = Object.entries(breakdown).map(([categoryId, data]) => {
    const category = categories.find((c) => c.id === categoryId);
    return {
      name: category?.name || "Unknown",
      value: data.total,
      color: category?.color || "#cccccc",
    };
  });

  return (
    <div className="notion-card p-6">
      <h3 className="text-sm font-semibold text-notion-text">Spending by Category</h3>
      <p className="mt-1 text-xs text-notion-textLight">Current month breakdown</p>

      <div className="mt-6 h-64">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e4df",
                  borderRadius: "3px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-notion-textLight">
            No expense data yet
          </div>
        )}
      </div>
    </div>
  );
}
