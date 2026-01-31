import useFinanceStore from "../store/financeStore";
import { Target, Trash2, Calendar } from "lucide-react";
import { Progress } from "./ui/progress";
import { current } from "immer";
import AddGoalModal from "./modal/AddGoalModal";
import { useState } from "react";


export default function GoalsView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const goals = useFinanceStore((state) => state.goals);
    const deleteGoal = useFinanceStore((state) => state.deleteGoal);

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
        })
    };

    const calculateProgress = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    const daysRemaining = (deadline) => {
        const diff = new Date(deadline) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-notion-text">
                Financial Goals 
            </h2>
            <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-mediumt
                text-white transition-colors hover:bg-blue-700"
            >
                + Add Goal
            </button>

            <div className="grid gap-4 md:grid-cols-2">
                {goals.length > 0 ? (
                    goals.map((goal) => {
                        const progress = calculateProgress(
                            goal.currentAmount,
                            goal.targetAmount,
                        );

                        const remaining = daysRemaining(goal.deadline);

                        return (
                            <div
                                key={goal.id}
                                className="rounded-lg border border-notion-border bg-notion-card p-6 transition-colors hover:bg-notion-cardHover"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg
                                        bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                <Target className="h-5 w-5"/>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-notion-text"> 
                                                {goal.name}
                                            </h3>
                                            <p className="flex items-center gap-1 text-xs text-notion-textLight">
                                                <Calendar className="h-3 w-3"/>
                                                {remaining > 0
                                                ? `${remaining} days left`
                                                : "Deadline passed" 
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deleteGoal(goal.id)}
                                        className="rounded-lg p-2 text-notion-textLight transition-colors
                                        hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-2xl font-bold text-notion-text">
                                                {formatCurrency(goal.currentAmount)}
                                        </span>
                                        <span className="text-sm text-notion-textLight">
                                                of {formatCurrency(goal.targetAmount)}
                                        </span>
                                    </div>

                                    <Progress value={progress} className="h-2"/>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                            <span className="text-notion-textLight">
                                                {progress.toFixed(1)}% Complete 
                                            </span>
                                            <span className="font-medium text-notion-text">
                                                {formatCurrency(goal.targetAmount - goal.currentAmount)}{" "}
                                                to go 
                                            </span>
                                    </div>

                                    <p className="text-xs text-notion-textLight">
                                        Target: {formatDate(goal.deadline)}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-2 flex h-40 items-center justify-center rounded-lg border border-dashed border-notion-border">
                        <p className="text-sm text-notion-textLight">
                            No goals yet. Set your first financial goal!
                        </p>
                    </div>
                )}
            </div>

            <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    )
}