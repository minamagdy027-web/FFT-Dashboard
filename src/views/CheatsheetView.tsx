import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { GDS_DATA } from '../data/gdsData';

export const CheatsheetView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.keys(GDS_DATA);

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

        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-1.5 dark:bg-white/5 bg-black/5 dark:text-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return</span>
          </button>
        )}
      </div>

      {/* State 1: Category Grid (Font only, no entry counts) */}
      {!selectedCategory ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((catKey) => (
            <div
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className="bento-card p-6 cursor-pointer flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all border border-transparent hover:border-cyan-500 hover:-translate-y-1"
            >
              <span className="font-bold text-sm dark:text-white text-gray-900 bento-content">
                {catKey}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* State 2: Comparison Table */
        <div className="bento-card overflow-hidden border-t-2 border-cyan-500">
          <div className="p-6 dark:bg-white/5 bg-black/5 flex justify-between items-center bento-content">
            <h3 className="font-extrabold text-xl tracking-tight dark:text-white text-gray-900">
              {selectedCategory}
            </h3>
          </div>

          <div className="overflow-x-auto custom-scroll bento-content">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="dark:bg-[#0c0c14]/50 bg-white/50 text-[10px] uppercase font-black tracking-widest text-gray-400 border-b dark:border-white/5 border-black/5">
                  <th className="p-5 w-1/3">Command Intent</th>
                  <th className="p-5 w-1/3 text-cyan-500">Galileo [1G]</th>
                  <th className="p-5 w-1/3 text-purple-400">Amadeus [1A]</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-white/5 divide-black/5 text-sm font-mono dark:text-gray-300 text-gray-700">
                {GDS_DATA[selectedCategory]?.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-cyan-500/5 transition-colors"
                  >
                    <td className="p-5 font-sans font-bold dark:text-white text-gray-900 leading-relaxed">
                      {item.d}
                    </td>
                    <td className="p-5 font-mono text-cyan-500 whitespace-pre-wrap select-all">
                      {item.g || '-'}
                    </td>
                    <td className="p-5 font-mono text-purple-400 whitespace-pre-wrap select-all">
                      {item.a || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
