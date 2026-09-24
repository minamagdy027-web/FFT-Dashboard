import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Copy, Check } from 'lucide-react';
import { GDS_DATA } from '../data/gdsData';

export const CheatsheetView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.keys(GDS_DATA);

  const handleCopy = (text: string | undefined, key: string) => {
    if (!text || text === '-') return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Global search across all categories
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const results: { category: string; d: string; g: string; a: string }[] = [];

    Object.entries(GDS_DATA).forEach(([cat, items]) => {
      items.forEach((item) => {
        const gVal = item.g || '';
        const aVal = item.a || '';
        if (
          item.d.toLowerCase().includes(query) ||
          gVal.toLowerCase().includes(query) ||
          aVal.toLowerCase().includes(query) ||
          cat.toLowerCase().includes(query)
        ) {
          results.push({ category: cat, d: item.d, g: gVal, a: aVal });
        }
      });
    });

    return results;
  }, [searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b dark:border-white/10 border-black/10 pb-4 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight dark:text-white text-gray-900">
            <span className="text-cyan-500">AMADEUS</span>
            <span className="text-yellow-500 italic font-serif mx-2 text-2xl md:text-3xl">
              vs
            </span>
            <span className="text-purple-500">GALILEO</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar functionality kept */}
          <div className="relative w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (selectedCategory) setSelectedCategory(null);
              }}
              placeholder="Search command or action..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl dark:bg-white/5 bg-white/80 border dark:border-white/10 border-slate-200 text-xs focus:ring-1 focus:ring-sky-400 outline-none font-mono text-gray-900 dark:text-white backdrop-blur-md"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
          </div>

          {(selectedCategory || searchResults) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 dark:bg-white/5 bg-slate-900/5 dark:text-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-sky-400/10 transition cursor-pointer border dark:border-white/10 border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return</span>
            </button>
          )}
        </div>
      </div>

      {/* State 1: Search Results */}
      {searchResults ? (
        <div className="bento-card overflow-hidden border-t-2 border-sky-400">
          <div className="p-6 dark:bg-white/5 bg-black/5 flex justify-between items-center bento-content">
            <h3 className="font-extrabold text-xl tracking-tight dark:text-white text-gray-900">
              Search Results ({searchResults.length})
            </h3>
          </div>

          <div className="overflow-x-auto custom-scroll bento-content">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="dark:bg-white/[0.02] bg-slate-50/60 text-[10px] uppercase font-black tracking-widest text-slate-400 border-b dark:border-white/10 border-slate-200">
                  <th className="p-5 w-1/4">Category</th>
                  <th className="p-5 w-1/3">Command Intent</th>
                  <th className="p-5 w-1/4 text-cyan-400">Galileo [1G]</th>
                  <th className="p-5 w-1/4 text-purple-400">Amadeus [1A]</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-white/5 divide-slate-100 text-sm font-mono dark:text-gray-300 text-gray-700">
                {searchResults.map((item, idx) => {
                  const gKey = `search-g-${idx}`;
                  const aKey = `search-a-${idx}`;

                  return (
                    <tr key={idx} className="hover:bg-sky-400/5 transition-colors">
                      <td className="p-5 font-sans text-xs font-bold text-gray-400">
                        {item.category}
                      </td>
                      <td className="p-5 font-sans font-bold dark:text-white text-gray-900 leading-relaxed">
                        {item.d}
                      </td>
                      <td className="p-5 font-mono text-cyan-400 select-all">
                        <div className="flex items-center justify-between gap-2 group/copy">
                          <span>{item.g || '-'}</span>
                          {item.g && (
                            <button
                              onClick={() => handleCopy(item.g, gKey)}
                              className="opacity-0 group-hover/copy:opacity-100 p-1 hover:text-cyan-300 transition-opacity cursor-pointer"
                              title="Copy"
                            >
                              {copiedKey === gKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-5 font-mono text-purple-400 select-all">
                        <div className="flex items-center justify-between gap-2 group/copy">
                          <span>{item.a || '-'}</span>
                          {item.a && (
                            <button
                              onClick={() => handleCopy(item.a, aKey)}
                              className="opacity-0 group-hover/copy:opacity-100 p-1 hover:text-purple-300 transition-opacity cursor-pointer"
                              title="Copy"
                            >
                              {copiedKey === aKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : !selectedCategory ? (
        /* State 2: Category Grid (Font only, previous clean cards) */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((catKey) => (
            <div
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className="bento-card p-6 cursor-pointer flex flex-col items-center justify-center text-center transition-all border border-transparent hover:border-sky-400 hover:-translate-y-1"
            >
              <span className="font-bold text-sm dark:text-white text-gray-900 bento-content">
                {catKey}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* State 3: Comparison Table with kept cyan/purple colors and copy */
        <div className="bento-card overflow-hidden border-t-2 border-sky-400">
          <div className="p-6 dark:bg-white/5 bg-black/5 flex justify-between items-center bento-content">
            <h3 className="font-extrabold text-xl tracking-tight dark:text-white text-gray-900">
              {selectedCategory}
            </h3>
          </div>

          <div className="overflow-x-auto custom-scroll bento-content">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="dark:bg-white/[0.02] bg-slate-50/60 text-[10px] uppercase font-black tracking-widest text-slate-400 border-b dark:border-white/10 border-slate-200">
                  <th className="p-5 w-1/3">Command Intent</th>
                  <th className="p-5 w-1/3 text-cyan-400">Galileo [1G]</th>
                  <th className="p-5 w-1/3 text-purple-400">Amadeus [1A]</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-white/5 divide-slate-100 text-sm font-mono dark:text-gray-300 text-gray-700">
                {GDS_DATA[selectedCategory]?.map((item, idx) => {
                  const gKey = `cat-g-${idx}`;
                  const aKey = `cat-a-${idx}`;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-cyan-500/5 transition-colors"
                    >
                      <td className="p-5 font-sans font-bold dark:text-white text-gray-900 leading-relaxed">
                        {item.d}
                      </td>
                      <td className="p-5 font-mono text-cyan-400 select-all">
                        <div className="flex items-center justify-between gap-2 group/copy">
                          <span>{item.g || '-'}</span>
                          {item.g && (
                            <button
                              onClick={() => handleCopy(item.g, gKey)}
                              className="opacity-0 group-hover/copy:opacity-100 p-1 hover:text-cyan-300 transition-opacity cursor-pointer"
                              title="Copy"
                            >
                              {copiedKey === gKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-5 font-mono text-purple-400 select-all">
                        <div className="flex items-center justify-between gap-2 group/copy">
                          <span>{item.a || '-'}</span>
                          {item.a && (
                            <button
                              onClick={() => handleCopy(item.a, aKey)}
                              className="opacity-0 group-hover/copy:opacity-100 p-1 hover:text-purple-300 transition-opacity cursor-pointer"
                              title="Copy"
                            >
                              {copiedKey === aKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
