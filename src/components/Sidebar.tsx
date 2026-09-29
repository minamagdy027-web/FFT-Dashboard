import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  ExternalLink as LinkIcon,
  FileText,
  Workflow,
  Sparkles,
  Terminal,
  BookOpen,
  ChevronLeft,
  ChevronDown,
  Layers,
  KeyRound,
  Compass,
} from 'lucide-react';
import { ViewType } from '../types/dashboard';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpen,
  onToggleOpen,
}) => {
  const [docsOpen, setDocsOpen] = useState(false);

  // Time based greeting
  const hour = new Date().getHours();
  let greeting = 'Good Morning';
  if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
  else if (hour >= 17 && hour < 21) greeting = 'Good Evening';
  else if (hour >= 21 || hour < 5) greeting = 'Good Night';

  const navClass = (view: ViewType) => {
    const isActive = currentView === view;
    return `w-full flex items-center px-3 py-2.5 rounded-xl transition-all cursor-pointer text-xs ${
      isActive
        ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-l-4 border-cyan-500 font-black shadow-sm'
        : 'text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-cyan-500/10 font-bold'
    } ${!isOpen ? 'justify-center px-0' : ''}`;
  };

  return (
    <aside
      className={`dark:bg-[#090b12] bg-white border-r dark:border-white/10 border-slate-300 flex flex-col flex-shrink-0 z-40 relative backdrop-blur-xl shadow-xl transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Toggle Arrow */}
      <button
        onClick={onToggleOpen}
        aria-label="Toggle Sidebar"
        className="absolute -right-3 top-6 dark:bg-[#141724] bg-white text-slate-500 dark:text-slate-300 hover:text-cyan-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md border dark:border-white/15 border-slate-300 z-50 transition-colors cursor-pointer"
      >
        <ChevronLeft
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            !isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Brand Header */}
      <div className="p-4 border-b dark:border-white/10 border-slate-300 flex items-center h-20">
        <div className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg">
          <div className="w-full h-full dark:bg-[#0c0d16] bg-slate-900 rounded-xl flex items-center justify-center font-black text-xs text-white">
            FFT
          </div>
        </div>
        {isOpen && (
          <div className="ml-3 whitespace-nowrap overflow-hidden leading-tight">
            <span className="text-base font-black tracking-tight block dark:text-white text-slate-950 truncate">
              {greeting}
            </span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-[0.2em]">
              Live Performance
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden px-2.5 custom-scroll text-xs">
        {isOpen && (
          <div className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 dark:text-slate-300 mb-2 mt-2 px-3">
            Main
          </div>
        )}

        <button
          onClick={() => onNavigate('view-dashboard')}
          className={navClass('view-dashboard')}
          title="Performance"
        >
          <LayoutDashboard className="w-4 h-4 min-w-[1rem]" />
          {isOpen && <span className="ml-3 truncate">Performance</span>}
        </button>

        <button
          onClick={() => onNavigate('view-links')}
          className={navClass('view-links')}
          title="Dept Links"
        >
          <LinkIcon className="w-4 h-4 min-w-[1rem]" />
          {isOpen && <span className="ml-3 truncate">Dept Links</span>}
        </button>

        {isOpen && (
          <div className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 dark:text-slate-300 mb-2 mt-5 px-3">
            Knowledge Base
          </div>
        )}

        <button
          onClick={() => onNavigate('view-policies')}
          className={navClass('view-policies')}
          title="HR Policies & KPIs"
        >
          <FileText className="w-4 h-4 min-w-[1rem]" />
          {isOpen && <span className="ml-3 truncate">HR Policies & KPIs</span>}
        </button>

        <button
          onClick={() => onNavigate('view-process')}
          className={navClass('view-process')}
          title="FFT Process"
        >
          <Workflow className="w-4 h-4 min-w-[1rem]" />
          {isOpen && <span className="ml-3 truncate">FFT Process</span>}
        </button>

        <button
          onClick={() => onNavigate('view-helpers')}
          className={navClass('view-helpers')}
          title="Operational Helpers"
        >
          <Sparkles className="w-4 h-4 min-w-[1rem]" />
          {isOpen && <span className="ml-3 truncate">Operational Helpers</span>}
        </button>

        <button
          onClick={() => onNavigate('view-cheatsheet')}
          className={navClass('view-cheatsheet')}
          title="GDS Cheatsheet"
        >
          <Terminal className="w-4 h-4 min-w-[1rem]" />
          {isOpen && <span className="ml-3 truncate">GDS Cheatsheet</span>}
        </button>

        <button
          onClick={() => onNavigate('view-manual')}
          className={navClass('view-manual')}
          title="Manual Repo"
        >
          <BookOpen className="w-4 h-4 min-w-[1rem]" />
          {isOpen && <span className="ml-3 truncate">Manual Repo</span>}
        </button>

        {isOpen && (
          <div className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 dark:text-slate-300 mb-2 mt-5 px-3">
            External Tools
          </div>
        )}

        {/* Docs Converter Submenu */}
        <div>
          <button
            onClick={() => setDocsOpen(!docsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer font-bold text-xs text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-500/10 ${
              !isOpen ? 'justify-center px-0' : ''
            }`}
            title="Docs Converter"
          >
            <div className="flex items-center">
              <Layers className="w-4 h-4 min-w-[1rem]" />
              {isOpen && <span className="ml-3 truncate">Docs Converter</span>}
            </div>
            {isOpen && (
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  docsOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </button>
          {isOpen && docsOpen && (
            <div className="flex flex-col dark:bg-black/50 bg-slate-100 rounded-xl mx-2 mt-1 py-2 border dark:border-white/10 border-slate-200">
              <a
                href="https://minamagdy027-web.github.io/FFT-docs-converter/index.html/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-black text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center uppercase tracking-wider transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2.5"></span>
                Amadeus
              </a>
              <a
                href="https://minamagdy027-web.github.io/Docs-converter-g/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-black text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 flex items-center uppercase tracking-wider transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2.5"></span>
                Galileo
              </a>
            </div>
          )}
        </div>

        {/* Fulfillment Swap */}
        <a
          href="https://script.google.com/a/macros/almosafer.com/s/AKfycbzHPoEXc0hXYcxLXWTQ32FOjwILbg2-enYr6ZfZ8hx8p0t0FhB_vCJdUJMUf5GWgkmqwA/exec"
          target="_blank"
          rel="noreferrer"
          className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all font-bold text-xs text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-500/10 ${
            !isOpen ? 'justify-center px-0' : ''
          }`}
          title="Fulfillment Swap"
        >
          <Compass className="w-4 h-4 min-w-[1rem]" />
          {isOpen && (
            <div className="ml-3 flex flex-col items-start truncate">
              <span className="truncate">Fulfillment Swap</span>
              <span className="text-[9px] font-black text-amber-600 dark:text-yellow-400 uppercase tracking-wider mt-0.5">
                Idea by Mostafa Mehanna
              </span>
            </div>
          )}
        </a>
      </nav>
    </aside>
  );
};
