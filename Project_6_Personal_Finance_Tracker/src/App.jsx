import { motion } from 'framer-motion'
import { useState } from 'react'
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import CommandPallete from './components/command/CommandPallete';
import TransactionsView from './components/TransactionsView';
import GoalsView from './components/GoalsView';
import DebtsView from './components/DebtsView';
import RecurringView from './components/RecurringView';


function App() {

  const [activeView, setActiveView] = useState("dashboard");
  const [commandOpen, setCommandOpen] = useState(false);

  // Keyboard Shortcut : Cmd/Cntr + K
  useState(() => {
    const handleKeyDown = (e) => {
      if((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const views = {
    dashboard: <Dashboard />,
    transactions: <TransactionsView />,
    goals: <GoalsView />,
    debts: <DebtsView />,
    recurring: <RecurringView />
  };

  return (
    <div className="flex h-screen overflow-hidden bg-notion-surface">
        {/* Sidebar */}
        <Sidebar activeView={activeView} onViewChange={setActiveView}/>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onCommandOpen={() => setCommandOpen(true)}/>
          <motion.main
            key={activeView}
            initial = {{opacity: 0, y: 10}}
            animate = {{opacity: 1, y: 0}}
            transition={{duration: 0.2}}
            className='flex-1 overflow-y-auto p-8'
          >
            {views[activeView]}
          </motion.main>

        </div>
      {/* Command Pallete */}
      <CommandPallete open={commandOpen} onClose={() => setCommandOpen(false)}/>
    </div>
  )
}

export default App
