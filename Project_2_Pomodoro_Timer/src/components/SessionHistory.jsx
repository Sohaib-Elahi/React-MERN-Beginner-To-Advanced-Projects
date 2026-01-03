import { CheckCircle2, Coffee } from 'lucide-react';

export default function SessionHistory({ sessions }) {
  return (
    <div className="bg-pine-teal/30 backdrop-blur-md border border-pine-teal/50 rounded-3xl p-6 flex-1 flex flex-col overflow-hidden max-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-alice-blue">History</h3>
        <span className="text-xs bg-pine-teal px-2 py-1 rounded-full text-celadon border border-pine-teal">
          {sessions.length} Sessions
        </span>
      </div>

      <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1">
        {sessions.length === 0 ? (
          <p className="text-muted-teal text-sm">Your completed sessions will appear here.</p>
        ) : (
          sessions.map((session) => (
            <div 
              key={session.id} 
              className="flex items-center justify-between p-3 rounded-xl bg-ink-black/20 border border-cyan-900/30 hover:border-cyan-300/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${session.type === 'work' ? 'bg-celadon/10 text-celadon' : 'bg-muted-teal/10 text-muted-teal'}`}>
                  {session.type === 'work' ? <CheckCircle2 size={16} /> : <Coffee size={16} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-alice-blue capitalize">{session.type === 'work' ? 'Focus Session' : 'Break Time'}</p>
                  <p className="text-xs text-muted-teal">
                    {session.completedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-alice-blue/80">
                {session.duration}:00
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
