import React from 'react';
import { LINKS_DATA } from '../data/linksData';

export const DeptLinksView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-2">
        {LINKS_DATA.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="bento-card p-8 flex flex-col items-center justify-center text-center group hover:-translate-y-1 border-transparent hover:border-cyan-500 border transition-all cursor-pointer"
          >
            <div className="bento-content flex flex-col items-center">
              <span className="font-extrabold text-xl dark:text-white text-gray-900 group-hover:text-cyan-500 transition-colors">
                {link.name}
              </span>
              {link.creator && (
                <span className="mt-3 text-[9px] font-bold text-pink-500 uppercase tracking-widest bg-pink-500/10 px-3 py-1 rounded-lg">
                  Created by {link.creator}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
