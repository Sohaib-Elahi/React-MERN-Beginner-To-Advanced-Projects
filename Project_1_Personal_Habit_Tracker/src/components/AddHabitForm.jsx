import { useState } from "react"
import { Plus } from "lucide-react"

// Form Component with State
// This component manage its own form state 
// It calls parent function (onAddHabit) when form submitted



export default function AddHabitForm({ onAddHabit }) {

    // Toggle Between showing button and form
    const [isOpen, setIsOpen] = useState(false);

    // Each input field has its own state variable
    // This is called 'Controlled Component' pattern 

    const [habitName, setHabitName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('⭐');
    const [selectedColor, setSelectedColor] = useState('from-purple-400 to-pink-400');

    // Available Options for user to choose

    const icons = ['💧', '💪', '📚', '🧘', '🎵', '🍎', '😴', '✍️', '🚴', '📱']
    const colors = [
        {name: 'Purple', value: 'from-purple-400 to-pink-400'},
        {name: 'Blue', value: 'from-blue-400 to-cyan-400'},
        {name: 'Orange', value: 'from-orange-400 to-red-400'},
        {name: 'Green', value: 'from-green-400 to-emerald-400'},
        {name: 'Yellow', value: 'from-yellow-400 to-orange-400'},
    ];

    // Form Submission Handler
    // Called when user clicks 'Create Habit' button 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!habitName.trim()) {
            alert('Please enter a habit name');
            return;
        }

        // Call Parent function with form data 
        // This sends data back to App.jsx

        onAddHabit(habitName, selectedIcon, selectedColor);

        // Reset form after submission
        setHabitName('');
        setSelectedIcon('⭐');
        setSelectedColor('from-purple-400 to-pink-400');
        setIsOpen(false);
    }

    if (!isOpen) {
        return (
            <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-linear-to-br from-slate-800/50 to-slate-900/50
            backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 hover:border-cyan-500/50
            hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group">
                <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <span className="text-slate-300 font-semibold group-hover:text-white transition-colors duration-300">
                        Add New Habit
                    </span>
                </div>
            </button>
        )
    }

    return (
        <form 
        onClick={handleSubmit}
        className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/500 shadow-xl">

            <h2 className="text-xl font-bold text-white mb-6">Create New Habit</h2>
            
            {/* Habit Name Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Habit Name
                </label>
                <input type="text" value={habitName}
                
                // onChange Event Handler
                // Updates State as user types
                // This makes it a 'Controlled component'

                onChange={(e) => setHabitName(e.target.value)}
                placeholder="e.g., Meditation, Reading, Exercise..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl
                px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50
                focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                
                />
            </div>

            {/* Icon Selection */}
            <div className="mb-6">
                <label htmlFor="" className="block text-sm font-medium text-slate-300 mb-3">
                    Choose Icon
                </label>

                <div className="grid grid-cols-5 gap-3">
                    {icons.map(icon => (
                        <button
                        key={icon}
                        type="button"
                        onClick={() => setSelectedIcon(icon)}
                            
                            /* Different Styles based on whether icon is selected */
                        className={`p-3 rounded-xl text-2xl transition-all duration-300
                            ${selectedIcon === icon} ? 'bg-cyan-500/30 border-2 border-cyan-500 scale-110'
                            : 'bg-slate-800/50 border-2 border-slate-700 hover:border-cyan-500/50'}`} 
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>
            

            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    Choose Color
                </label>
                <div className="grid grid-cols-5 gap-3">
                    {colors.map(color => (
                        <button
                        key={color.value}
                        type="button"
                        onClick={() => setSelectedColor(color.value)}
                        className={`p-3 rounded-xl transition-all duration-300
                            ${selectedColor == color.value} ?
                            'ring-2 ring-white scale-110' :
                            'hover:scale-105'
                        }`}>
                            <div className={`w-full h-8 bg-linear-to-r
                                ${color.value} rounded-lg`}></div>
                        </button>
                    ))}
                </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                type="submit"
                className="flex-1 bg-linear-to-r from-cyan-500 to-blue=500 text-white
                font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all
                duration-300 active:scale-95">
                    Create Habit
                </button>

                <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-slate-700/50 text-slate-300 font-semibold py-3
                rounded-xl hover:bg-slate-700 transition-all duration-300">
                    Cancel
                </button>
            </div>
        </form>
    )
}

