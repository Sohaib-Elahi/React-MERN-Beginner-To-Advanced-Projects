import {X, Check } from "lucide-react"

// Props - Receive data from parent component 
// Each habit card receives:
// - habit: the habit object with all data 
// - isCompleted: boolean showing if completed today 
// - onToggle: function to call when user clicks complete 
// - onDelete: function to call when user clicks delete


export default function HabitCard({
  habit,
  isCompleted,
  onToggle,
  onDelete
}) {

    return (
        <div

        // Different styles based on isCompleted state
        className={`relative overflow-hidden rounded-2xl p-5
            backdrop-blur-xl transition-all duration-300 cursor-pointer group
            ${isCompleted ? 'bg-linear-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                          : 'bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50'
            }`} 
        >

            {/* Background Gradient Overlay */}
            <div className={`absolute inset-0 bg-linear-to-br
                ${habit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>


            <div className="relative z-10">
                {/* Header: Icon + Name + Delete Button  */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`text-4xl transition-transform duration-300
                            ${isCompleted ? 'scale-110' : ''}`}>
                                {habit.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                                {habit.name}
                            </h3>
                    </div>
                    
                    <button
                    onClick={onDelete}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 opacity-0
                    group-hover:opacity-100 hover:bg-red-500/20 transition-all duration-300">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                
                {/* Status Badge */}
                <div className="mb-4">
                    {isCompleted ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1
                        bg-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/50">
                            <Check className="w-3 h-3"/>
                            Completed Today!
                        </span>
                    ) : (
                        <span className="inline-block px-3 py-1 bg-slate-700/50 text-slate-400 text-xs font-medium rounded-full">
                            Not Yet
                        </span>
                    )}
                </div>

                {/* Toggle Button */}
                    <button
                    onClick={onToggle}
                    
                    // Button Text changes based on completion state
                    className={`w-full py-3 rounded-lg font-semibold
                        transition-all duration-300 active:scale-95
                    ${isCompleted 
                        ? 'bg-linear-to-r from-cyan-400/20 to-blue-400/20 text-cyan-300 border border-cyan-500/50 hover:from-cyan-400/30 hover:to-blue-400/30' 
                        : 'bg-linear-to-r from-slate-700/50 to-slate-800/50 text-slate-300 border border-slate-600/50 hover:from-slate-700/70 hover:to-slate-800/70'
                    }`}
                    >
                        {isCompleted ? '✓ Mark as Incomplete' : 'Mark as Complete'} 
                    </button>

                    {/* Created Date Info */}
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                        <p className="text-xs text-slate-400">
                            Created: {new Date(habit.createdDate).toLocaleDateString()}
                        </p>
                    </div>
            </div>
        </div>
    );
}




