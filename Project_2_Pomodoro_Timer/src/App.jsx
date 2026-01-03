import { useState, useEffect, useRef } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import TimeCircle from './components/TimeCircle';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import DailyStats from './components/DailyStats';
import SessionHistory from './components/SessionHistory';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'short', 'long'
  const [sessions, setSessions] = useState([]); 

  const audioRef = useRef(new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'));

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) { // 👈 ADD "&& isActive" HERE
      // Only complete if the timer was actually running
      clearInterval(interval);
      setIsActive(false);
      handleTimerComplete();
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Handle Mode Switching
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'work') setTimeLeft(25 * 60);
    if (newMode === 'short') setTimeLeft(5 * 60);
    if (newMode === 'long') setTimeLeft(15 * 60);
  };

  const handleTimerComplete = () => {
    audioRef.current.play();
    const duration = mode === 'work' ? 25 : mode === 'short' ? 5 : 15;
    
    const newSession = {
      id: Date.now(),
      type: mode,
      duration: duration,
      completedAt: new Date(),
    };
    
    setSessions(prev => [newSession, ...prev]);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    if (mode === 'short') setTimeLeft(5 * 60);
    if (mode === 'long') setTimeLeft(15 * 60);
  };

  // Calculate percentage
  const totalTime = mode === 'work' ? 25 * 60 : mode === 'short' ? 5 * 60 : 15 * 60;
  const percentage = Math.round((timeLeft / totalTime) * 100);

  return (
    <div className="min-h-screen bg-ink-black text-alice-blue font-sans selection:bg-celadon selection:text-ink-black p-6 md:p-10">
      
      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pine-teal/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-celadon/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-celadon animate-pulse"></div>
            <h1 className="text-2xl font-bold tracking-tight">Focus<span className="text-celadon">Flow</span></h1>
          </div>
          <div className="text-sm text-muted-teal font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Timer Section */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-pine-teal/30 backdrop-blur-md border border-pine-teal/50 rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-2xl h-full min-h-[500px]">
              
              <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
              
              <TimeCircle percentage={percentage} timeLeft={timeLeft} />
              
              <Controls 
                isActive={isActive} 
                onToggle={toggleTimer} 
                onReset={resetTimer} 
              />
            </div>
          </div>

          {/* Stats & History Section */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             <DailyStats sessions={sessions} />
             <SessionHistory sessions={sessions} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
