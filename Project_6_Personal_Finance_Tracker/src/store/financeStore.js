import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";
import { startOfMonth, endOfMonth, addMonths, isWithinInterval } from "date-fns";

const useFinanceStore = create(
  persist(
    immer((set, get) => ({
      // Data
      transactions: [],
      recurringTransactions: [],
      goals: [],
      debts: [],
      categories: [
        { id: "income", name: "Income", type: "income", color: "#0f7b6c" },
        { id: "housing", name: "Housing", type: "expense", color: "#e03e3e" },
        { id: "food", name: "Food & Dining", type: "expense", color: "#d9730d" },
        { id: "transport", name: "Transportation", type: "expense", color: "#9065b0" },
        { id: "utilities", name: "Utilities", type: "expense", color: "#2383e2" },
        { id: "entertainment", name: "Entertainment", type: "expense", color: "#ff8c42" },
        { id: "shopping", name: "Shopping", type: "expense", color: "#e255a1" },
        { id: "health", name: "Healthcare", type: "expense", color: "#4daf7c" },
        { id: "savings", name: "Savings", type: "income", color: "#0f7b6c" },
      ],

      // Actions
      addTransaction: (transaction) =>
        set((state) => {
          state.transactions.push({
            id: uuidv4(),
            date: new Date().toISOString(),
            ...transaction,
          });
        }),

      updateTransaction: (id, updates) =>
        set((state) => {
          const index = state.transactions.findIndex((t) => t.id === id);
          if (index !== -1) {
            state.transactions[index] = { ...state.transactions[index], ...updates };
          }
        }),

      deleteTransaction: (id) =>
        set((state) => {
          state.transactions = state.transactions.filter((t) => t.id !== id);
        }),

      addRecurringTransaction: (recurring) =>
        set((state) => {
          state.recurringTransactions.push({
            id: uuidv4(),
            ...recurring,
          });
        }),

      addGoal: (goal) =>
        set((state) => {
          state.goals.push({
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            currentAmount: 0,
            ...goal,
          });
        }),

      updateGoalProgress: (id, amount) =>
        set((state) => {
          const goal = state.goals.find((g) => g.id === id);
          if (goal) {
            goal.currentAmount += amount;
          }
        }),

      addDebt: (debt) =>
        set((state) => {
          state.debts.push({
            id: uuidv4(),
            ...debt,
          });
        }),

      // Computed / Selectors
      getMonthlyTransactions: (month = new Date()) => {
        const start = startOfMonth(month);
        const end = endOfMonth(month);
        return get().transactions.filter((t) =>
          isWithinInterval(new Date(t.date), { start, end })
        );
      },

      getBalance: () => {
        return get().transactions.reduce((acc, t) => {
          return t.type === "income" ? acc + t.amount : acc - t.amount;
        }, 0);
      },

      getPredictedBalance: () => {
        const currentBalance = get().getBalance();
        const recurringSum = get().recurringTransactions.reduce((acc, r) => {
          return r.type === "income" ? acc + r.amount : acc - r.amount;
        }, 0);
        return currentBalance + recurringSum;
      },

      getCategoryBreakdown: () => {
        const expenses = get().transactions.filter((t) => t.type === "expense");
        const breakdown = {};
        
        expenses.forEach((t) => {
          if (!breakdown[t.categoryId]) {
            breakdown[t.categoryId] = { total: 0, count: 0, transactions: [] };
          }
          breakdown[t.categoryId].total += t.amount;
          breakdown[t.categoryId].count += 1;
          breakdown[t.categoryId].transactions.push(t);
        });

        return breakdown;
      },

      getSavingsRate: () => {
        const income = get().transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
        const expenses = get().transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);
        
        return income > 0 ? ((income - expenses) / income) * 100 : 0;
      },
    })),
    {
      name: "finance-storage",
    }
  )
);

export default useFinanceStore;
