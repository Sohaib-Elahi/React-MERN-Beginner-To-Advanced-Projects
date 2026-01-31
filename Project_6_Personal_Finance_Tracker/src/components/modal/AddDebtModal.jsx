import useFinanceStore from "../../store/financeStore";
import { useState } from "react";
import { X, CreditCard } from "lucide-react";

export default function AddDebtModal({isOpen, onClose}) {
    const addDebt = useFinanceStore((state) => state.addDebt);

  const [formData, setFormData] = useState({
    name: "",
    totalAmount: "",
    paidAmount: "",
    interestRate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.totalAmount ||
      !formData.paidAmount ||
      !formData.interestRate
    ) {
      return;
    }

    addDebt({
      name: formData.name,
      totalAmount: parseFloat(formData.totalAmount),
      paidAmount: parseFloat(formData.paidAmount),
      interestRate: formData.interestRate,
    });

    setFormData({
      name: "",
      totalAmount: "",
      paidAmount: "",
      interestRate: "",
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
              <CreditCard className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-notion-text">
              Add Debt
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
              Debt Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Credit Card, Student Loan"
              className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-notion-text">
                Total Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.totalAmount}
                onChange={(e) =>
                  setFormData({ ...formData, totalAmount: e.target.value })
                }
                placeholder="10000"
                className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-notion-text">
                Paid So Far
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.paidAmount}
                onChange={(e) =>
                  setFormData({ ...formData, paidAmount: e.target.value })
                }
                placeholder="1000"
                className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text placeholder:text-notion-textLight focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-notion-text">
              Interest Rate (APR %)
            </label>
            <input
                type="number"
                step="0.01"
                value={formData.interestRate}
                onChange={(e) =>
                    setFormData({...formData, interestRate: e.target.value})
                }
                placeholder="18.5"
              className="w-full rounded-lg border border-notion-border bg-notion-bg px-4 py-2.5 text-notion-text
              placeholder:text-notion-textLight focus:border-orange-500 focus:outline-non focus:ring-2 focus:ring-orange-500/20"
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
              Add Debt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}