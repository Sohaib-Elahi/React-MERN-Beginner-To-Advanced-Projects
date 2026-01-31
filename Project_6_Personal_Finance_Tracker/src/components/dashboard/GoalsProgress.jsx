import { useFinanceStore } from "../store/financeStore";
import { Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function GoalsProgress() {
  const goals = useFinanceStore((state) => state.goals);

  const activeGoals = goals.slice(0, 3);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="rounded-xl border border-notion-border bg-notion-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-notion-text">
          Goals Progress
        </h3>
        <Target className="h-5 w-5 text-notion-textLight" />
      </div>

      <div className="space-y-4">
        {activeGoals.length > 0 ? (
          activeGoals.map((goal) => {
            const progress = calculateProgress(
              goal.currentAmount,
              goal.targetAmount
            );

            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-notion-text">
                    {goal.name}
                  </span>
                  <span className="text-xs text-notion-textLight">
                    {progress.toFixed(0)}%
                  </span>
                </div>

                <Progress value={progress} className="h-2" />

                <div className="flex items-center justify-between text-xs text-notion-textLight">
                  <span>{formatCurrency(goal.currentAmount)}</span>
                  <span>{formatCurrency(goal.targetAmount)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex h-32 items-center justify-center text-sm text-notion-textLight">
            No goals set yet
          </div>
        )}
      </div>
    </div>
  );
}
