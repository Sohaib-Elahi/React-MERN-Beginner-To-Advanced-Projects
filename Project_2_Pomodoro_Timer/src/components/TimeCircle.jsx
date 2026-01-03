import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

export default function TimerCircle({ percentage, timeLeft }) {
  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-64 h-64 md:w-80 md:h-80 relative mb-8">
      {/* Glow effect behind the timer */}
      <div className="absolute inset-4 bg-celadon/5 rounded-full blur-2xl"></div>
      
      <CircularProgressbarWithChildren 
        value={percentage}
        strokeWidth={4}
        styles={buildStyles({
          // These are overridden by CSS in index.css but keeping for reference
          pathColor: '#B3EFB2', // Celadon
          trailColor: '#31493C', // Pine Teal
          textColor: '#E8F1F2', // Alice Blue
        })}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-6xl md:text-7xl font-bold font-sans tracking-tighter text-alice-blue">
            {formatTime(timeLeft)}
          </span>
          <span className="text-muted-teal font-medium mt-2 tracking-widest text-xs uppercase">
            Minutes Remaining
          </span>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
