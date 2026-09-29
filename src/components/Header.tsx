import React from 'react';
import { Sun, Moon, RotateCw, ArrowLeft } from 'lucide-react';
import { ViewType } from '../types/dashboard';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const VIEW_TITLES: Record<ViewType, string> = {
  'view-dashboard': 'Fulfillment Air Dashboard',
  'view-manager': 'Manager Overview',
  'view-detail': 'Agent Performance Details',
  'view-policies': 'HR Policies & KPIs',
  'view-process': 'FFT Operations Process',
  'view-helpers': 'Operational Helpers',
  'view-cheatsheet': 'GDS Cheatsheet',
  'view-links': 'Department Links',
  'view-manual': 'Operations Manual',
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isDark,
  onToggleTheme,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between border-b dark:border-white/10 border-slate-300/90 backdrop-blur-xl z-30 sticky top-0 bg-white/95 dark:bg-[#0a0c16]/95 transition-colors">
      <div className="flex items-center gap-4">
        <h1 className="text-xl md:text-2xl font-black dark:text-white text-slate-950 tracking-tight">
          {VIEW_TITLES[currentView] || 'Fulfillment Air Dashboard'}
        </h1>

        {/* Premium Signature Badge */}
        <div className="hidden md:flex items-center group cursor-default mt-1">
          <div className="flex items-center justify-center px-3 py-1 rounded-full dark:bg-black/50 bg-slate-100 border dark:border-white/15 border-slate-300 shadow-sm transition-all duration-500 group-hover:border-cyan-500/60 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <span className="font-sans text-[11px] leading-none font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r dark:from-cyan-300 dark:to-purple-300 from-cyan-700 to-purple-700">
              Created by Mina Naseem
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {currentView !== 'view-dashboard' && (
          <button
            onClick={() => onNavigate('view-dashboard')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        )}

        <button
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          className="p-2.5 rounded-xl dark:bg-white/10 bg-slate-200/80 hover:scale-105 transition-transform border dark:border-white/15 border-slate-300 shadow-sm cursor-pointer flex items-center justify-center backdrop-blur-md"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-700" />
          )}
        </button>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="dark:bg-white/10 bg-slate-200/80 dark:text-white text-slate-950 px-4 py-2.5 rounded-xl transition-all hover:scale-105 shadow-sm flex items-center text-xs md:text-sm font-extrabold border dark:border-white/15 border-slate-300 backdrop-blur-md cursor-pointer disabled:opacity-60"
        >
          <RotateCw
            className={`w-4 h-4 mr-2 text-cyan-500 transition-transform ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          />
          <span className="hidden sm:inline">Refresh Sync</span>
          <span className="sm:hidden">Sync</span>
        </button>
      </div>
    </header>
  );
};
