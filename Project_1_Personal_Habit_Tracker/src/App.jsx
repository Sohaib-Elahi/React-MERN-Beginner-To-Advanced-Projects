import { useState } from 'react';
import Header from './components/Header';
import AddHabitForm from './components/AddHabitForm';
import HabitCard from './components/HabitCard';
import WeeklyOverview from './components/WeeklyOverview';

function App() {

  // selectedDate = current state value 
  // setSelectedDate = function to update the state 

  // When data changes, React re-renders the component
  const [selectedDate , setSelectedDate] = useState(new Date());

  // We start with 2 default habits to display
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Drink Water',
      icon: '💧',
      color:  'from-blue-400 to-cyan-400',
      completedDates: [],
      createdDate: new Date(),
    },
    {
      id: 2,
      name: 'Exercise',
      icon: '💪',
      color:  'from-orange-400 to-red-400',
      completedDates: [],
      createdDate: new Date(),
    },
  ]);

  // Check if Habit is completed on specific Date 
  // Uses Array.find() and string comparison

  const isHabitCompleted = (habitId, date) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return false;

    // Convert date to YYYY-MM-DD Format for comparisonm

  const dateString = date.toISOString().split('T')[0];
  return habit.completedDates.includes(dateString);

  }

  // Toggle Habit complettion 
  // Uses Array.map() to update specific habit in array 
  // Complex state update with immutability

  const handleToggleHabit = (habitId) => {
    setHabits(habits.map(habit => {
      if(habit.id === habitId) {
        const dateString = selectedDate.toISOString().split('T')[0]
        const isCompleted = habit.completedDates.includes(dateString);

        return {
          ...habit, // Keep all other properties same
          completedDates: isCompleted
          ? habit.completedDates.filter(d => d !== dateString) // Remove if exists
          : [...habit.completedDates, dateString],
        }
      }
      return habit; // Return Unchanged habit
    }))
  }
  
  // Delete Habit 
  // Uses Array.filter() to remove habit from array 

  const handleDeleteHabit = (habitId) =>{
    setHabits(habits.filter(h => h.id !== habitId))
  }



  // Function to handle adding new habit 
  // Called from AddHabitForm component 
  // Uses Array Spread (...) to create new array 
  const handleAddHabit = (habitName, habitIcon, habitColor) => {
    const newHabit = {
      id: Date.now(), // Simple unique ID using timestamp
      name: habitName,
      icon: habitIcon,
      color: habitColor,
      completedDates: [],
      createdDate: new Date(),
    }
    
    setHabits([...habits, newHabit]);
  }

  // Array State Update 
  // Create new array with old habits + new habits 
  // This is the proper way to update arrays in react 
  const completedCount = habits.filter(
    h => isHabitCompleted(h.id, selectedDate)
  ).length;


  // Count how many habits we have for display
  const totalHabits = habits.length;
  const completedToday = 0; // We'll update this later



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {/* Glass Morphism Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
          <Header 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            completedCount={completedCount}
            totalCount={totalHabits}
          />

          {/* Add Habit Form Component */}
          <div className="mb-8">
            <AddHabitForm onAddHabit={handleAddHabit}/>
          </div>

          {/* Weekly Overview Component  */}
          <div className="mb-8">
            <WeeklyOverview habits={habits} />
          </div>

          {/* Habits Grid - Bento Layout */}
          <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
            {habits.length === 0 ? (
              // Empty state when no habits
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-slate-400 text-lg mb-2">
                    No Habits yet 
                  </p>
                  <p className="text-slate-500 text-sm">
                    Add your first habit to get started
                  </p>
                </div>
              </div>
            ) : (
              // Displays all habit cards
              habits.map (habit => (
                <HabitCard 
                  key={habit.id}
                  habit={habit}
                  isCompleted={isHabitCompleted(habit.id, selectedDate)}
                  onToggle={() => handleToggleHabit(habit.id)}
                  onDelete={() => handleDeleteHabit(habit.id)}
                />
              ))
            )}
          </div>
      </div>
    </div>
  );
}

export default App;
