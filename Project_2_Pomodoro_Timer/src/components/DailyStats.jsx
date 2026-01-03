import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DailyStats({ sessions }) {
  // Aggregate data: count sessions per hour or simply show type distribution
  // For simplicity, let's show Work vs Break count
  const data = [
    { name: 'Focus', count: sessions.filter(s => s.type === 'work').length },
    { name: 'Short', count: sessions.filter(s => s.type === 'short').length },
    { name: 'Long', count: sessions.filter(s => s.type === 'long').length },
  ];

  return (
    <div className="bg-pine-teal/30 backdrop-blur-md border border-pine-teal/50 rounded-3xl p-6 h-64 flex flex-col">
      <h3 className="text-lg font-semibold text-alice-blue mb-2">Daily Activity</h3>
      
      {sessions.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-teal text-sm">
          No activity yet. Start a session!
        </div>
      ) : (
        <div className="flex-1 w-full h-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#7A9E7E', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#31493C', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: '#001A23', 
                  borderColor: '#7A9E7E', 
                  borderRadius: '12px',
                  color: '#E8F1F2' 
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Focus' ? '#B3EFB2' : '#7A9E7E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
