import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ setCity }) {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        setCity(input); // This triggers the useEffect in App.jsx
        setInput(''); // Clear input
      }
    }
  };

  return (
    <div className="w-full">
      <div className="relative bg-component-bg rounded-2xl max-w-2xl border border-white/5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for cities..." 
          className="w-full bg-transparent text-text-primary placeholder-text-secondary py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-highlight-blue/50 transition-all"
        />
      </div>
    </div>
  );
}
