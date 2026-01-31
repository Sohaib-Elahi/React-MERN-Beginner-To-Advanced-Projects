import useFinanceStore from "../store/financeStore";
import { CreditCard, Trash2, TrendingDown } from "lucide-react";
import { Progress } from "./ui/progress";
import { useState } from "react";
import AddDebtModal from "./modal/AddDebtModal";


export default function DebtsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debts = useFinanceStore((state) => state.debts);
  const deleteDebt = useFinanceStore((state) => state.deleteDebt);

    const formatCurrency = (amount) => {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", 
        }).format(amount);
    };

    const calculateProgress = (paid, total) => {
        return Math.min((paid / total) * 100, 100);
    };

    const totalDebt = debts.reduce((sum, debt) => sum + debt.totalAmount, 0);
    const totalPaid = debts.reduce((sum, debt) => sum + debt.paidAmount, 0);
    const totalRemaining = totalDebt - totalPaid;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-notion-text">
                    Debts 
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-mediumt
                    text-white transition-colors hover:bg-blue-700"
                >
                    + Add Debt
                </button>
                {debts.length > 0 && (
                    <div className="text-right">
                        <p className="text-sm text-notion-textLight">
                            Total Remaining 
                        </p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {formatCurrency(totalRemaining)}
                        </p>
                    </div>
                )}
            </div>
            
            <div className="space-y-3">
                {debts.length > 0 ? (
                    debts.map((debt) => {
                        const progress = calculateProgress(
                            debt.paidAmount,
                            debt.totalAmount, 
                        );
                        const remaining = debt.totalAmount - debt.paidAmount;

                        return (
                            <div
                                key={debt.id}
                                className="rounded-lg border border-notion-border bg-notion-card p-5 transition-colors hover:bg-notion-cardHover"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg
                                         bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                            <CreditCard className="h-5 w-5"/>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-notion-text">
                                                {debt.name}
                                            </h3>
                                            <p className="text-xs text-notion-textLight">
                                                {debt.interestRate}% APR 
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteDebt(debt.id)}
                                    className="rounded-lg p-2 text-notion-textLight transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                                >   
                                    <Trash2 className="h-4 w-4"/>
                                </button>
                            

                                <div className="space-y-3">
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            <p className="text-sm text-notion-textLight">
                                                Paid Amount 
                                            </p>
                                            <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                                {formatCurrency(debt.paidAmount)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                                <p className="text-sm text-notion-textLight"> 
                                                    Remaining
                                                </p>
                                                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                                                    {formatCurrency(remaining)}
                                                </p>
                                        </div>
                                    </div>

                                    <Progress value={progress} className="h-2"/>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-notion-textLight">
                                            {progress.toFixed(1)}% paid off
                                        </span>
                                        <span className="text-sm font-medium text-notion-text">
                                            Total: {formatCurrency(debt.totalAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    
                ) : (
                    <div className="flex h-48 items-center justify-center rounded-lg border
                                    border-dashed border-notion-border">
                        <div className="text-center">   
                            <TrendingDown className="mx-auto mb-2 h-8 w-8 text-notion-textLight"/>
                            <p className="text-sm text-notion-textLight">
                                No debts tracked. Great job staying debt-free!
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <AddDebtModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    )
}   