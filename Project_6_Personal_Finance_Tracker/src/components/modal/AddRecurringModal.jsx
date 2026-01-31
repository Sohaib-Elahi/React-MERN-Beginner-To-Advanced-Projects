import useFinanceStore from "../../store/financeStore";
import { useState } from "react";
import { X, CreditCard, Repeat } from "lucide-react";

export default function AddRecurringModal({isOpen, onClose}) {
    const addRecurringTransaction = useFinanceStore((state) => state.addRecurringTransaction);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: "expense",
    category: "Subscriptions",
    startDate: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Subscriptions",
    "Salar",
    "Rent",
    "Utilities",
    "Insurance",
    "Loan Payment",
    "Other",
  ]

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) {
      return;
    }

    addRecurringTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      frequency: formData.frequency,
      startDate: formData.startDate,
    });

    setFormData({
       description: "",
      amount: "",
      type: "expense",
      category: "Subscriptions",
      frequency: "monthly",
      startDate: new Date().toISOString().split("T"[0]),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border notion-card border-notion-border p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Repeat className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-notion-text">
              Add Recurring Transaction
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-notion-textLight transition-colors hover:bg-notion-cardHover"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-notion-text">
                Description
            </label>
            <input 
                type="text"
                value={formData.description}
                onChange={(e) => 
                    setFormData({...formData, description: e.target.value})
                }
                placeholder="e.g., Netflix, Monthly Salary"
                className="w-full rounded-lg border border-notion-border bg-notion-bg px-4
                py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-purple-500
                focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="mb-2 block text-sm font-medium text-notion-text">
                    Amount 
                </label>
                <input 
                    type="text" 
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData({...formData, amount: e.target.value})
                    }
                    placeholder="15.99"
                    className="w-full rounded-lg border border-notion-border bg-notion-bg
                    px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-purple-500
                    focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    required
                    />
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium text-notion-text">Type</label>
                <select
                    value={formData.type}
                    onChange={(e) => 
                        setFormData({...formData, type: e.target.value})
                    }
                    className="w-full rounded-lg border border-notion-border bg-notion-bg
                    px-4 py-2.5 text-notion-text focus:border-purple-500 focus:outline-none
                    focus:ring-2 focus:ring-purple-500/20"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>

                </select>
            </div>
          </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-notion-text">Category</label>
                <select
                    value={formData.category}
                    onChange={(e) => 
                        setFormData({...formData, category: e.target.value})
                    }
                    className="w-full rounded-lg border border-notion-border bg-notion-bg
                    px-4 py-2.5 text-notion-text focus:border-purple-500 focus:outline-none
                    focus:ring-2 focus:ring-purple-500/20"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="mb-2 block text-sm font-medium text-notion-text">Frequency</label>
                 <select
                    value={formData.frequency}
                    onChange={(e) => 
                        setFormData({...formData, frequency: e.target.value})
                    }
                    className="w-full rounded-lg border border-notion-border bg-notion-bg
                    px-4 py-2.5 text-notion-text focus:border-purple-500 focus:outline-none
                    focus:ring-2 focus:ring-purple-500/20"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            
            <div>
                <label className="mb-2 block text-sm font-medium text-notion-text">Start Date</label>
                <input 
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                    setFormData({...formData, startDate: e.target.value})
                }
                className="w-full rounded-lg border border-notion-border bg-notion-bg
                    px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-purple-500
                    focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                required
                />
            
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-notion-border bg-notion-bg
                px-4 py-2.5 font-medium text-notion-text transition-colors hover:bg-notion-cardHover"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="flex-1 rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white
                transition-colors hover:bg-purple-700"
            >
                Add Recurring
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}