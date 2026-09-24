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
    return `w-full flex items-center px-3 py-2.5 rounded-xl transition-all cursor-pointer font-semibold text-xs ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-l-4 border-cyan-500 font-bold'
        : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/5'
    } ${!isOpen ? 'justify-center px-0' : ''}`;
  };

  return (
    <aside
      className={`dark:bg-[#07070b]/90 bg-white/90 border-r dark:border-white/5 border-slate-200/80 flex flex-col flex-shrink-0 z-40 relative backdrop-blur-2xl shadow-xl transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Toggle Arrow */}
      <button
        onClick={onToggleOpen}
        aria-label="Toggle Sidebar"
        className="absolute -right-3 top-6 dark:bg-[#12121a] bg-white text-slate-400 hover:text-cyan-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md border dark:border-white/10 border-slate-200 z-50 transition-colors cursor-pointer"
      >
        <ChevronLeft
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            !isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Brand Header */}
      <div className="p-4 border-b dark:border-white/5 border-slate-200/80 flex items-center h-20">
        <div className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1px] shadow-lg">
          <div className="w-full h-full dark:bg-[#0c0c14] bg-white rounded-xl flex items-center justify-center font-black text-xs dark:text-white text-slate-900">
            FFT
          </div>
        </div>
        {isOpen && (
          <div className="ml-3 whitespace-nowrap overflow-hidden leading-tight">
            <span className="text-base font-black tracking-tight block dark:text-white text-slate-900 truncate">
              {greeting}
            </span>
            <span className="text-[9px] text-cyan-500 font-bold uppercase tracking-[0.2em]">
              Live Performance
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto overflow-x-hidden px-2 custom-scroll text-xs">
        {isOpen && (
          <div className="text-[9px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2 mt-2 px-3">
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
          <div className="text-[9px] uppercase font-black tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 mt-6 px-3">
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
          <div className="text-[9px] uppercase font-black tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 mt-6 px-3">
            External Tools
          </div>
        )}

        {/* Docs Converter Submenu */}
        <div>
          <button
            onClick={() => setDocsOpen(!docsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer font-semibold text-xs text-gray-700 dark:text-gray-300 hover:text-pink-500 hover:bg-pink-500/5 ${
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
            <div className="flex flex-col dark:bg-black/30 bg-black/5 rounded-xl mx-2 mt-1 py-2">
              <a
                href="https://minamagdy027-web.github.io/FFT-docs-converter/index.html/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-[10px] font-bold text-gray-500 hover:text-cyan-500 flex items-center uppercase tracking-wider transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></span>
                Amadeus
              </a>
              <a
                href="https://minamagdy027-web.github.io/Docs-converter-g/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-[10px] font-bold text-gray-500 hover:text-purple-400 flex items-center uppercase tracking-wider transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></span>
                Galileo
              </a>
            </div>
          )}
        </div>

        {/* Fulfillment Swap */}
        <a
          href="https://script.google.com/macros/s/AKfycbzHPoEXc0hXYcxLXWTQ32FOjwILbg2-enYr6ZfZ8hx8p0t0FhB_vCJdUJMUf5GWgkmqwA/exec"
          target="_blank"
          rel="noreferrer"
          className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all font-semibold text-xs text-gray-700 dark:text-gray-300 hover:text-pink-500 hover:bg-pink-500/5 ${
            !isOpen ? 'justify-center px-0' : ''
          }`}
          title="Fulfillment Swap"
        >
          <Compass className="w-4 h-4 min-w-[1rem]" />
          {isOpen && (
            <div className="ml-3 flex flex-col items-start truncate">
              <span className="truncate">Fulfillment Swap</span>
              <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-[0.1em] mt-0.5">
                Idea by Mostafa Mehanna
              </span>
            </div>
          )}
        </a>
      </nav>
    </aside>
  );
};
