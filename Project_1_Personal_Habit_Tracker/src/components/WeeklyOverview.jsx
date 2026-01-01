
// Component that displays data in a new way 
// Shows completionm stats for the last 7 days 
// Uses Array methods to calculate data 

export default function WeeklyOverview({habits}) {

    // Generate last 7 days 
    // Used to show a week view of a habit completion 
    
    const getLast7days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date);
        }
        return days;
    }

    const weekDays = getLast7days();

    // Filter array and count 
    // For each day, count how many habits were completed
    const getCompletedCountForDay = (date) => {
        const dateString = date.toISOString().split('T')[0]
        return habits.filter(habit =>
            habit.completedDates.includes(dateString)
        ).length;
    }

    return (
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50
        backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 mb-8">

            <h2 className="text-lg font-bold text-white mb-6">
                This Week
            </h2>

            {/* Week Days Grid */}
            <div className="grid grid-cols-7 gap-3">
                {weekDays.map((date, index) => {
                    const  completedCount = getCompletedCountForDay(date)
                    const totalHabits = habits.length
                    const dayName = date.toLocaleDateString('en-US', {weekday: 'short'})
                    const dayDate = date.getDate()
                    const isToday = date.toDateString() === new Date().toDateString()

                    return (
                        <div
                        key={index}
                        // Conditional styling for today 
                        // Today's box gets highlighted with cyan color
                        className={`rounded=xl p-3 text-center transition-all duration-300
                           ${isToday ? 'bg-linear-to-br from cyan-500/30 to-blue-500/30 border-2 border-cyan-500/50'
                                     : 'bg-slate-700/30 border border-slate-600/50 hover:border-slate-500/50' 
                           } `}
                        >
                            <p className={`text-xs font-semibold mb-2 ${isToday ? 'text-cyan-300':'text-slate-400'}`}>
                                {dayName}
                            </p>
                           <p className="text-sm font-bold text-white mb-2">
                             {dayDate}
                           </p>

                           {/* Completion Count */}
                           <div className="flex items-center justify-center gap-1">
                            <div className="w-6 h-6 rounded-full bg-slate-600/50 flex items-center justify-center text-xs font-semibold text-white">
                                {completedCount}/{totalHabits}
                            </div>
                           </div>
                        </div>
                    )
                })}
            </div>

            {/* Weekly Status */}
            
            <div className="mt-6 pt-6 border-t border-slate-700/50">
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">
                            Total Habits
                        </p>
                        <p className="text-2xl font-bold text-white">
                            {habits.length}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">
                            Avg/Day 
                        </p>
                        <p className="text-2xl font-bold text-purple-400">
                            {weekDays.length === 0 ? 0 : Math.round(
                                weekDays.reduce((sum, date) => sum + getCompletedCountForDay(date), 0 / weekDays.length)
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
