import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Copy,
  Check,
  Terminal,
  Layers,
  Sparkles,
  Filter,
  X,
} from 'lucide-react';
import { GDS_DATA } from '../data/gdsData';

type GdsFilterMode = 'all' | 'galileo' | 'amadeus';

export const CheatsheetView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemFilter, setSystemFilter] = useState<GdsFilterMode>('all');

  const categories = useMemo(() => Object.keys(GDS_DATA), []);

  const handleCopy = (text: string | undefined, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!text || text === '-' || text.trim() === '') return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 1800);
  };

  // Global search across all categories
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const results: { category: string; d: string; g: string; a: string; origIdx: number }[] = [];

    Object.entries(GDS_DATA).forEach(([cat, items]) => {
      items.forEach((item, idx) => {
        const gVal = item.g || '';
        const aVal = item.a || '';
        if (
          item.d.toLowerCase().includes(query) ||
          gVal.toLowerCase().includes(query) ||
          aVal.toLowerCase().includes(query) ||
          cat.toLowerCase().includes(query)
        ) {
          results.push({ category: cat, d: item.d, g: gVal, a: aVal, origIdx: idx });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const activeItems = useMemo(() => {
    if (!selectedCategory) return [];
    return GDS_DATA[selectedCategory] || [];
  }, [selectedCategory]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b dark:border-white/10 border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">AMADEUS</span>
              <span className="text-amber-500 font-serif italic text-xl md:text-2xl">vs</span>
              <span className="text-teal-600 dark:text-teal-400">GALILEO</span>
            </h2>
          </div>
        </div>

        {/* Search & System Filter Bar */}
        <div className="flex items-center flex-wrap gap-2.5 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (selectedCategory) setSelectedCategory(null);
              }}
              placeholder="Search command, intent, or syntax..."
              className="w-full pl-9 pr-8 py-2 rounded-xl dark:bg-[#12131a] bg-white border dark:border-white/10 border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500/40 outline-none font-mono text-slate-900 dark:text-slate-100 shadow-sm"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* System Filter Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-bold">
            <button
              onClick={() => setSystemFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                systemFilter === 'all'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSystemFilter('galileo')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                systemFilter === 'galileo'
                  ? 'bg-teal-500 text-white shadow-xs font-bold'
                  : 'text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              Galileo [1G]
            </button>
            <button
              onClick={() => setSystemFilter('amadeus')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                systemFilter === 'amadeus'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Amadeus [1A]
            </button>
          </div>

          {/* Return Button */}
          {(selectedCategory || searchResults) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-slate-100 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all cursor-pointer shadow-xs border border-slate-300 dark:border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
        </div>
      </div>

      {/* State 1: Search Results View */}
      {searchResults ? (
        <div className="bento-card overflow-hidden">
          <div className="p-5 border-b dark:border-white/10 border-slate-200/80 bg-slate-50/50 dark:bg-white/[0.02] flex justify-between items-center bento-content">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <h3 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                Found {searchResults.length} Match{searchResults.length === 1 ? '' : 'es'}
              </h3>
            </div>
            <span className="text-[11px] font-mono font-semibold text-slate-400">
              Query: &ldquo;{searchQuery}&rdquo;
            </span>
          </div>

          <div className="overflow-x-auto custom-scroll bento-content">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/70 dark:bg-[#0e0f17] text-[10px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400 border-b dark:border-white/10 border-slate-200">
                  <th className="p-4 w-1/5">Category</th>
                  <th className="p-4 w-2/5">Command Intent</th>
                  {systemFilter !== 'amadeus' && (
                    <th className="p-4 w-1/4 text-teal-700 dark:text-teal-400">
                      Galileo [1G]
                    </th>
                  )}
                  {systemFilter !== 'galileo' && (
                    <th className="p-4 w-1/4 text-indigo-700 dark:text-indigo-400">
                      Amadeus [1A]
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-white/5 divide-slate-200/60 text-sm">
                {searchResults.map((item, idx) => {
                  const gKey = `search-g-${idx}`;
                  const aKey = `search-a-${idx}`;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-cyan-500/[0.04] transition-colors group"
                    >
                      <td className="p-4 font-sans text-xs font-bold text-slate-500 dark:text-slate-400">
                        {item.category}
                      </td>
                      <td className="p-4 font-sans font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {item.d}
                      </td>
                      {systemFilter !== 'amadeus' && (
                        <td className="p-4">
                          <CommandChip
                            command={item.g}
                            system="galileo"
                            copied={copiedKey === gKey}
                            onCopy={(e) => handleCopy(item.g, gKey, e)}
                          />
                        </td>
                      )}
                      {systemFilter !== 'galileo' && (
                        <td className="p-4">
                          <CommandChip
                            command={item.a}
                            system="amadeus"
                            copied={copiedKey === aKey}
                            onCopy={(e) => handleCopy(item.a, aKey, e)}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : !selectedCategory ? (
        /* State 2: Category Grid View (Compact squares to fit on one page) */
        <div className="space-y-4 pt-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {categories.map((catKey) => (
              <div
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className="bento-card px-3.5 py-4 min-h-[76px] cursor-pointer flex items-center justify-center text-center group transition-all hover:-translate-y-0.5 hover:border-cyan-500 border border-slate-200/60 dark:border-white/5"
              >
                <h3 className="font-extrabold text-xs sm:text-sm dark:text-white text-gray-900 group-hover:text-cyan-500 transition-colors bento-content leading-tight">
                  {catKey}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* State 3: Selected Category Detailed Table */
        <div className="space-y-6 pt-2">
          {/* Back & Category Header Bar */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-500 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-slate-900/5 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/10 border-slate-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return</span>
            </button>
            <h2 className="text-2xl md:text-3xl font-extrabold dark:text-white text-gray-900 tracking-tight">
              {selectedCategory}
            </h2>
          </div>

          {/* Quick Category Jump Bar */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scroll pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white shadow-xs'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="bento-card overflow-hidden">
            <div className="p-5 border-b dark:border-white/10 border-slate-200/80 bg-slate-50/50 dark:bg-white/[0.02] flex flex-wrap justify-between items-center gap-3 bento-content">
              <div>
                <h3 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  {selectedCategory}
                </h3>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {activeItems.length} commands available in this module
                </span>
              </div>

              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10">
                Click code badge to copy
              </span>
            </div>

            <div className="overflow-x-auto custom-scroll bento-content">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100/70 dark:bg-[#0e0f17] text-[10px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400 border-b dark:border-white/10 border-slate-200">
                    <th className="p-4 w-1/2">Command Intent</th>
                    {systemFilter !== 'amadeus' && (
                      <th className="p-4 w-1/4 text-teal-700 dark:text-teal-400">
                        Galileo [1G]
                      </th>
                    )}
                    {systemFilter !== 'galileo' && (
                      <th className="p-4 w-1/4 text-indigo-700 dark:text-indigo-400">
                        Amadeus [1A]
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-white/5 divide-slate-200/60 text-sm">
                  {activeItems.map((item, idx) => {
                    const gKey = `cat-g-${idx}`;
                    const aKey = `cat-a-${idx}`;

                    return (
                      <tr
                        key={idx}
                        className="hover:bg-cyan-500/[0.04] transition-colors group"
                      >
                        <td className="p-4 font-sans font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {item.d}
                        </td>
                        {systemFilter !== 'amadeus' && (
                          <td className="p-4">
                            <CommandChip
                              command={item.g}
                              system="galileo"
                              copied={copiedKey === gKey}
                              onCopy={(e) => handleCopy(item.g, gKey, e)}
                            />
                          </td>
                        )}
                        {systemFilter !== 'galileo' && (
                          <td className="p-4">
                            <CommandChip
                              command={item.a}
                              system="amadeus"
                              copied={copiedKey === aKey}
                              onCopy={(e) => handleCopy(item.a, aKey, e)}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Advanced Smart Command Chip Component
interface CommandChipProps {
  command?: string;
  system: 'galileo' | 'amadeus';
  copied: boolean;
  onCopy: (e: React.MouseEvent) => void;
}

const CommandChip: React.FC<CommandChipProps> = ({ command, system, copied, onCopy }) => {
  const hasCommand = Boolean(command && command.trim() !== '' && command !== '-');

  if (!hasCommand) {
    return (
      <span className="text-slate-400 dark:text-slate-600 font-mono text-xs italic">
        &mdash;
      </span>
    );
  }

  const isGalileo = system === 'galileo';

  return (
    <div
      onClick={onCopy}
      title="Click to copy command"
      className={`inline-flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer select-all group/chip shadow-xs ${
        isGalileo
          ? copied
            ? 'bg-emerald-500 text-white border-emerald-600'
            : 'bg-teal-50 border-teal-200/90 text-teal-950 hover:bg-teal-100 hover:border-teal-400 dark:bg-teal-950/40 dark:border-teal-500/30 dark:text-teal-200 dark:hover:bg-teal-900/50 dark:hover:border-teal-400'
          : copied
          ? 'bg-emerald-500 text-white border-emerald-600'
          : 'bg-indigo-50 border-indigo-200/90 text-indigo-950 hover:bg-indigo-100 hover:border-indigo-400 dark:bg-indigo-950/40 dark:border-indigo-500/30 dark:text-indigo-200 dark:hover:bg-indigo-900/50 dark:hover:border-indigo-400'
      }`}
    >
      <span className="tracking-wide break-all">{command}</span>
      <span className="shrink-0 flex items-center">
        {copied ? (
          <span className="flex items-center gap-1 text-[10px] font-sans font-extrabold uppercase">
            <Check className="w-3.5 h-3.5" />
            <span>Copied</span>
          </span>
        ) : (
          <Copy
            className={`w-3.5 h-3.5 opacity-60 group-hover/chip:opacity-100 transition-opacity ${
              isGalileo ? 'text-teal-700 dark:text-teal-400' : 'text-indigo-700 dark:text-indigo-400'
            }`}
          />
        )}
      </span>
    </div>
  );
};
