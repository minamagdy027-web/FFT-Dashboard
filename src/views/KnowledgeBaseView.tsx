import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, MapPin } from 'lucide-react';
import { KBCategory } from '../types/dashboard';
import { TOUCHLESS_PROFILES } from '../data/manualData';

interface KnowledgeBaseViewProps {
  categories: KBCategory[];
  sectionTitle: string;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  categories,
  sectionTitle,
}) => {
  const [selectedCatIdx, setSelectedCatIdx] = useState<number | null>(null);
  const [selectedSubIdx, setSelectedSubIdx] = useState<number | null>(null);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  const handleCopyProfileValue = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedItemId(id);
    setTimeout(() => {
      setCopiedItemId((curr) => (curr === id ? null : curr));
    }, 2000);
  };

  // Reset navigation when category clicked
  const handleSelectCat = (idx: number) => {
    const cat = categories[idx];
    if (cat.subs.length === 1) {
      setSelectedCatIdx(idx);
      setSelectedSubIdx(0);
    } else {
      setSelectedCatIdx(idx);
      setSelectedSubIdx(null);
    }
  };

  const handleBackToCats = () => {
    setSelectedCatIdx(null);
    setSelectedSubIdx(null);
  };

  const handleBackToSubs = () => {
    if (selectedCatIdx !== null && categories[selectedCatIdx].subs.length === 1) {
      setSelectedCatIdx(null);
      setSelectedSubIdx(null);
    } else {
      setSelectedSubIdx(null);
    }
  };

  // State 1: Category Grid (No duplicate page title, no article count)
  if (selectedCatIdx === null) {
    return (
      <div className="space-y-6 animate-fade-in-up pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectCat(idx)}
              className="bento-card p-10 cursor-pointer flex flex-col items-center justify-center text-center group transition-transform hover:-translate-y-1 hover:border-cyan-500"
            >
              <h3 className="font-extrabold text-2xl dark:text-white text-gray-900 group-hover:text-cyan-500 transition-colors bento-content">
                {cat.cat}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const category = categories[selectedCatIdx];

  // State 2: Subcategories Grid (if more than 1)
  if (selectedSubIdx === null) {
    return (
      <div className="space-y-6 animate-fade-in-up pt-2">
        <button
          onClick={handleBackToCats}
          className="flex items-center gap-1.5 text-gray-500 hover:text-cyan-500 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-black/5 px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>

        <h2 className="text-2xl md:text-3xl font-extrabold dark:text-white text-gray-900 tracking-tight border-b dark:border-white/10 border-black/10 pb-4">
          {category.cat}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.subs.map((sub, sIdx) => (
            <div
              key={sIdx}
              onClick={() => setSelectedSubIdx(sIdx)}
              className="bento-card p-8 cursor-pointer group text-center flex items-center justify-center hover:-translate-y-1 transition-transform hover:border-purple-500"
            >
              <h4 className="font-extrabold text-xl dark:text-white text-gray-900 group-hover:text-purple-400 transition-colors bento-content">
                {sub.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // State 3: Reading Article
  const article = category.subs[selectedSubIdx];
  const isTouchlessProfiles =
    category.cat.trim().toLowerCase() === 'touchless profiles' ||
    article.title.trim().toLowerCase() === 'touchless profiles';

  if (isTouchlessProfiles) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto animate-fade-in-up pt-2">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToSubs}
            className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-500 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-slate-900/5 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/10 border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return</span>
          </button>
          <h2 className="text-3xl md:text-4xl font-extrabold dark:text-white text-gray-900 tracking-tight">
            Touchless Profiles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {TOUCHLESS_PROFILES.map((group) => (
            <div
              key={group.region}
              className="bento-card p-6 md:p-8 flex flex-col justify-between transition-all"
            >
              <div className="bento-content">
                {/* Region Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-black dark:text-white text-gray-900 tracking-wide">
                    {group.region}
                  </h3>
                  <div className="w-8 h-8 rounded-full dark:bg-sky-500/10 bg-sky-50 flex items-center justify-center border dark:border-sky-500/30 border-sky-200">
                    <MapPin className="w-4 h-4 text-sky-500" />
                  </div>
                </div>

                {/* Profile Items */}
                <div className="space-y-3.5">
                  {group.items.map((item, idx) => {
                    const itemId = `${group.region}-${item.brand}-${idx}`;
                    const isCopied = copiedItemId === itemId;

                    // Brand color styles
                    let brandColorClass = 'text-blue-500 dark:text-blue-400';
                    if (item.brand === 'AMEX') {
                      brandColorClass = 'text-emerald-600 dark:text-emerald-400';
                    } else if (item.brand === 'MASTER') {
                      brandColorClass = 'text-amber-600 dark:text-orange-500';
                    }

                    return (
                      <div
                        key={itemId}
                        className="p-4 rounded-xl dark:bg-white/[0.03] bg-black/[0.02] border dark:border-white/5 border-black/5 hover:border-sky-500/30 transition-all group/item"
                      >
                        <div className={`text-[11px] font-black uppercase tracking-widest mb-1.5 ${brandColorClass}`}>
                          {item.brand}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-bold text-sm dark:text-white text-gray-900 truncate">
                            {item.code}
                          </span>
                          <button
                            onClick={() => handleCopyProfileValue(item.copyValue, itemId)}
                            title={`Copy ${item.copyValue}`}
                            className="p-1.5 rounded-lg dark:text-slate-400 text-slate-500 hover:text-sky-500 hover:bg-sky-500/10 transition-colors cursor-pointer shrink-0"
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up pt-2 relative">
      <div className="bento-card p-6 md:p-10 max-w-5xl mx-auto">
        <div className="bento-content">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <button
              onClick={handleBackToSubs}
              className="flex items-center gap-1.5 text-gray-500 hover:text-cyan-500 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-black/5 px-4 py-2 rounded-xl cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return</span>
            </button>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 dark:text-white text-gray-900 tracking-tight border-b dark:border-white/10 border-black/10 pb-4">
            {article.title}
          </h2>

          <div
            className="leading-relaxed dark:text-gray-300 text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
};

