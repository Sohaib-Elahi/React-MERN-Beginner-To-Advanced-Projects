import clsx from 'clsx';
import { Brain, Coffee, BatteryCharging } from 'lucide-react';

export default function ModeSelector({ currentMode, onModeChange }) {
  const modes = [
    { id: 'work', label: 'Focus', icon: Brain, duration: 25 },
    { id: 'short', label: 'Short Break', icon: Coffee, duration: 5 },
    { id: 'long', label: 'Long Break', icon: BatteryCharging, duration: 15 },
  ];

  return (
    <div className="flex bg-ink-black/40 p-1.5 rounded-2xl mb-8 border border-pine-teal/50">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;
        
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
              isActive 
                ? "bg-pine-teal text-celadon shadow-lg shadow-black/20" 
                : "text-muted-teal hover:text-alice-blue hover:bg-white/5"
            )}
          >
            <Icon size={18} />
            <span>{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
