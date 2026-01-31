import { X, Target } from "lucide-react";
import useFinanceStore from "../../store/financeStore";
import { useState } from "react";

export default function AddGoalModal({ isOpen, onClose }) {
  const addGoal = useFinanceStore((state) => state.addGoal);

  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.targetAmount ||
      !formData.currentAmount ||
      !formData.deadline
    ) {
      return;
    }

    addGoal({
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      deadline: formData.deadline,
    });

    setFormData({
      name: "",
      targetAmount: "",
      currentAmount: "",
      deadline: "",
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
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-notion-text">
              Add Financial Goal
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
              Goal Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Emergency Fund, Vacation"
              className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-notion-text">
                Target Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData({ ...formData, targetAmount: e.target.value })
                }
                placeholder="5000"
                className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-notion-text">
                Current Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.currentAmount}
                onChange={(e) =>
                  setFormData({ ...formData, currentAmount: e.target.value })
                }
                placeholder="1000"
                className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-notion-text">
              Target Deadline
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 font-medium text-notion-text transition-colors hover:bg-notion-cardHover"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
