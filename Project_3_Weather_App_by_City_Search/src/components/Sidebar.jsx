import { CloudRain, List, Map, Settings, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { icon: CloudRain, label: "Weather", active: true },
    { icon: List, label: "Cities", active: false },
    { icon: Map, label: "Map", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside className="w-24 m-6 rounded-[30px] bg-component-bg flex flex-col items-center py-8 gap-8 md:flex border border-white/5">
      
      {/* Logo Area */}
      <div className="w-12 h-12 bg-component-bg rounded-xl flex items-center justify-center mb-4">
        <LayoutDashboard className="text-highlight-blue w-8 h-8" />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-6 w-full px-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button 
              key={index}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
                item.active 
                  ? 'text-text-primary font-bold' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon size={24} strokeWidth={item.active ? 3 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

    </aside>
  );
}
