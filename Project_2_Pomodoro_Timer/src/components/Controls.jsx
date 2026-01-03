import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Controls({ isActive, onToggle, onReset }) {
  return (
    <div className="flex items-center gap-6">
      <button
        onClick={onReset}
        className="p-4 rounded-full text-muted-teal hover:bg-pine-teal/50 hover:text-alice-blue transition-all border border-transparent hover:border-pine-teal"
        title="Reset Timer"
      >
        <RotateCcw size={24} />
      </button>

      <button
        onClick={onToggle}
        className={`
          flex items-center justify-center w-20 h-20 rounded-4xl 
          transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95
          ${isActive 
            ? 'bg-pine-teal text-alice-blue border border-muted-teal/50' 
            : 'bg-celadon text-ink-black'
          }
        `}
      >
        {isActive ? (
          <Pause size={32} fill="currentColor" />
        ) : (
          <Play size={32} fill="currentColor" className="ml-1" />
        )}
      </button>

      {/* Placeholder for future sound toggle or settings */}
      <div className="w-14.5"></div> 
    </div>
  );
}
