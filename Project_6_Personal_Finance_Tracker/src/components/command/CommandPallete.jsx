// src/components/command/CommandPalette.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, Calendar } from "lucide-react";
import useFinanceStore from "../../store/financeStore";

export default function CommandPalette({ open, onClose }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const categories = useFinanceStore((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || !selectedCategory) return;

    addTransaction({
      amount: parseFloat(amount),
      description,
      type,
      categoryId: selectedCategory,
    });

    // Reset
    setAmount("");
    setDescription("");
    setSelectedCategory("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-xl -translate-x-1/2"
          >
            <div className="notion-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-notion-border p-4">
                <h3 className="text-sm font-semibold text-notion-text">Quick Add Transaction</h3>
                <button
                  onClick={onClose}
                  className="rounded-notion p-1 text-notion-textLight transition-colors hover:bg-notion-surface"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`flex-1 rounded-notion py-2 text-sm font-medium transition-colors ${
                      type === "expense"
                        ? "bg-notion-danger text-white"
                        : "bg-notion-surface text-notion-textLight"
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`flex-1 rounded-notion py-2 text-sm font-medium transition-colors ${
                      type === "income"
                        ? "bg-notion-success text-white"
                        : "bg-notion-surface text-notion-textLight"
                    }`}
                  >
                    Income
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-notion-textLight">Amount</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-notion-textLight" />
                    <input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="notion-input w-full pl-9"
                      placeholder="0.00"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-notion-textLight">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="notion-input mt-1 w-full"
                    placeholder="Coffee at Starbucks"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-notion-textLight">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="notion-input mt-1 w-full"
                  >
                    <option value="">Select category</option>
                    {categories
                      .filter((c) => c.type === type)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="notion-button w-full bg-notion-accent text-white hover:bg-notion-accent/90"
                >
                  Add Transaction
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
