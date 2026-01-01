export default function Header({
    selectedDate,
    setSelectedDate,
    completedCount,
    totalCount
}) {

    // Data Handling 
    // Format Date to readable format like "Monday, Dec 20"
    const formatDate = (date) => {
        const options = {weekday: 'long', month: 'short', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }

    // When user clicks previous day button
    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    }

    // When user clicks next day button
    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
    }

    // Check if selected day is today
    const isToday = selectedDate?.toDateString?.() === new Date().toDateString();

    return(
        <div className="mb-8">
            {/* Progress Card: Glass */}
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50
            backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl
            hover:shadow-2xl transition-shadow duration-500">

                {/* Date Navigation Row */}

                <div className="flex items-center justify-between mb-6">
                    <button onClick={handlePrevDay}
                    className="p-2 rounded-full hover:bg-slate-700/50 transition-colors duration-200 text-xl">
                        ←
                    </button>

                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                            {formatDate(selectedDate)}
                        </h1>
                        {isToday && (
                            <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300
                            text-xs font-semibold rounded-full">
                                Today
                            </span>
                        )}
                    </div>
                    
                    <button onClick={handleNextDay}
                    className="p-2 rounded-full hover:bg-slate-700/50 transition-colors duration-200 text-xl">
                        →
                    </button>
                </div>
                
                {/* Progress Section */}

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm font-medium">
                            Daily Progress
                        </span>

                        <span className="text-cyan-400 font-semibold">
                            {completedCount}/{totalCount}
                        </span>
                    </div>


                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                            <div className="bg-linear-to-r from-cyan-400 to-blue-500
                            h-full rounded-full transition-all duration-500 ease-out"
                            style={{width: `${totalCount === 0 ? 0: (completedCount/totalCount)*100}%`}}>

                            </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                            <p className="text-xs text-slate-400 mb-1">Total</p>
                            <p className="text-lg font-bold text-white">{totalCount}</p>
                        </div>
                        <div className="bg-cyan-500/10 rounded-lg p-3 text-center border border-cyan-500/20">
                            <p className="text-xs text-cyan-300 mb-1">Completed</p>
                            <p className="text-lg font-bold text-cyan-400">{completedCount}</p>
                        </div>
                        <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                            <p className="text-xs text-slate-400 mb-1">Remaining</p>
                            <p className="text-lg font-bold text-white">{totalCount-completedCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}