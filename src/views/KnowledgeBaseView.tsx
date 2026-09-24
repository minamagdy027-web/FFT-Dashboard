import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { KBCategory } from '../types/dashboard';

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

  return (
    <div className="space-y-6 animate-fade-in-up pt-2">
      <div className="bento-card p-8 md:p-10 max-w-5xl mx-auto">
        <div className="bento-content">
          <button
            onClick={handleBackToSubs}
            className="flex items-center gap-1.5 text-gray-500 hover:text-cyan-500 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-black/5 px-4 py-2 rounded-xl cursor-pointer mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return</span>
          </button>

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
