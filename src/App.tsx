import React, { useState, useEffect, useCallback } from 'react';
import { GlobalDashboardData, ViewType, Agent } from './types/dashboard';
import { calculateAgentKPI } from './utils/kpi';
import { KB_DATA } from './data/kbData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { ManagerView } from './views/ManagerView';
import { AgentDetailView } from './views/AgentDetailView';
import { ScheduleView } from './views/ScheduleView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';
import { CheatsheetView } from './views/CheatsheetView';
import { DeptLinksView } from './views/DeptLinksView';
import { ManualRepoView } from './views/ManualRepoView';
import fallbackData from './data/fallbackData.json';

const GAS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbz6VmJXY4WNJAZaiFdSOpeK_dhFi2lEME4aUxfO-Pz8W3Cfg6m-5LpHbd-2eVI5YD9n/exec';
const CACHE_KEY = 'FFT_DASHBOARD_DATA_CACHE';

// Prepares instant initial data from cache or bundled snapshot
function getInitialDashboardData(): GlobalDashboardData {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as GlobalDashboardData;
      if (parsed.agents && parsed.agents.length > 0) {
        parsed.agents = parsed.agents.filter(
          (a) => (a.name || '').trim().toLowerCase() !== 'points'
        );
        parsed.agents.forEach((agent) => {
          agent.calculatedKPI = calculateAgentKPI(agent, parsed.overrides).total;
        });
        return parsed;
      }
    } catch (e) {
      console.warn('Could not parse cached data, using bundled dataset', e);
    }
  }

  const bundled = JSON.parse(JSON.stringify(fallbackData)) as GlobalDashboardData;
  if (bundled.agents) {
    bundled.agents = bundled.agents.filter(
      (a) => (a.name || '').trim().toLowerCase() !== 'points'
    );
    bundled.agents.forEach((agent) => {
      agent.calculatedKPI = calculateAgentKPI(agent, bundled.overrides).total;
    });
  }
  return bundled;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('view-dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const [selectedAgentName, setSelectedAgentName] = useState<string | null>(() => {
    return localStorage.getItem('currentSelectedAgent') || null;
  });
  const [selectedManagerName, setSelectedManagerName] = useState<string | null>(() => {
    return localStorage.getItem('currentSelectedManager') || null;
  });

  const [globalData, setGlobalData] = useState<GlobalDashboardData>(getInitialDashboardData);

  // Theme synchronization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    if (savedTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Bento card mouse glow interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('.bento-card') as HTMLElement;
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        target.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch data from Google Apps Script with graceful fallback
  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    setSyncError(null);

    let rawData: GlobalDashboardData | null = null;

    try {
      const response = await fetch(GAS_WEB_APP_URL);
      if (response.ok) {
        rawData = (await response.json()) as GlobalDashboardData;
      } else {
        console.warn(`Live sync status ${response.status}. Using stored/bundled dataset.`);
      }
    } catch (err: any) {
      console.warn('Network sync unreachable, using stored/bundled dataset:', err?.message || err);
    }

    if (rawData && rawData.agents && rawData.agents.length > 0) {
      rawData.agents = rawData.agents.filter(
        (a) => (a.name || '').trim().toLowerCase() !== 'points'
      );
      rawData.agents.forEach((agent) => {
        agent.calculatedKPI = calculateAgentKPI(agent, rawData!.overrides).total;
      });
      localStorage.setItem(CACHE_KEY, JSON.stringify(rawData));
      setGlobalData(rawData);
      setSyncError(null);
    } else {
      // Ensure we have active data from getInitialDashboardData
      setGlobalData((prev) => {
        if (prev.agents && prev.agents.length > 0) return prev;
        return getInitialDashboardData();
      });
    }

    setIsRefreshing(false);
  }, []);

  // Initial load
  useEffect(() => {
    fetchData();

    // Clean up index.html from URL path if present (e.g. from old bookmarks)
    if (window.location.pathname.includes('index.html')) {
      const cleanPath = window.location.pathname.replace(/\/index\.html\/?$/, '/').replace(/\/index\.html\//, '/');
      const hash = window.location.hash || '#view-dashboard';
      window.history.replaceState({ view: hash.replace('#', '') }, '', `${cleanPath}${hash}`);
    }

    // Hash sync
    const hash = window.location.hash.replace('#', '') as ViewType;
    if (hash) {
      setCurrentView(hash);
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view) {
        setCurrentView(e.state.view);
      } else {
        setCurrentView('view-dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [fetchData]);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    window.history.pushState({ view }, '', `#${view}`);
    const scrollContainer = document.getElementById('main-scroll-container');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  };

  const handleSelectAgent = (name: string) => {
    setSelectedAgentName(name);
    localStorage.setItem('currentSelectedAgent', name);
    handleNavigate('view-detail');
  };

  const handleSelectManager = (tl: string) => {
    setSelectedManagerName(tl);
    localStorage.setItem('currentSelectedManager', tl);
    handleNavigate('view-manager');
  };

  const currentAgent: Agent | undefined = globalData.agents.find(
    (a) => a.name === selectedAgentName
  );

  return (
    <div className="min-h-screen flex selection:bg-cyan-500 selection:text-white overflow-hidden relative dark:bg-[#06060a] bg-[#eef2f6] text-slate-800 dark:text-slate-200">
      {/* Ambient Radial Glow Lighting */}
      <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] dark:bg-purple-600/15 bg-indigo-300/20 rounded-full blur-[130px] pointer-events-none transition-colors duration-1000 z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[35%] h-[35%] dark:bg-cyan-500/10 bg-cyan-300/20 rounded-full blur-[110px] pointer-events-none transition-colors duration-1000 z-0"></div>

      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggleOpen={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onRefresh={fetchData}
          isRefreshing={isRefreshing}
        />

        <div
          id="main-scroll-container"
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scroll relative"
        >
          <div className="max-w-[1600px] mx-auto pb-16">
            {/* Sync Error Notice if applicable */}
            {syncError && globalData.agents.length === 0 && (
              <div className="bento-card p-6 mb-6 border-red-500/30 bg-red-500/10 text-red-500 text-center">
                <p className="font-bold">Sync Failed</p>
                <p className="text-xs font-mono text-gray-400 mt-1">{syncError}</p>
                <button
                  onClick={fetchData}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold text-xs"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* View Switching */}
            {currentView === 'view-dashboard' && (
              <DashboardView
                agents={globalData.agents}
                onSelectAgent={handleSelectAgent}
                onSelectManager={handleSelectManager}
                isLoading={isRefreshing}
              />
            )}

            {currentView === 'view-manager' && (
              <ManagerView
                managerName={selectedManagerName || 'Team Leader'}
                agents={globalData.agents}
                onSelectAgent={handleSelectAgent}
              />
            )}

            {currentView === 'view-detail' && currentAgent && (
              <AgentDetailView
                agent={currentAgent}
                latenessDate={globalData.latenessDate}
                overrides={globalData.overrides}
              />
            )}

            {currentView === 'view-detail' && !currentAgent && (
              <div className="bento-card p-12 text-center">
                <h3 className="text-2xl font-bold mb-2">No Agent Selected</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Please return to the performance matrix and pick an agent.
                </p>
                <button
                  onClick={() => handleNavigate('view-dashboard')}
                  className="px-4 py-2 bg-cyan-500 text-white font-bold text-xs rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

            {currentView === 'view-schedule' && (
              <ScheduleView
                schedule={globalData.schedule}
                scheduleDate={globalData.scheduleDate}
                agents={globalData.agents}
                isLoading={isRefreshing}
              />
            )}

            {currentView === 'view-policies' && (
              <KnowledgeBaseView
                categories={KB_DATA.policies}
                sectionTitle="HR Policies & KPIs"
              />
            )}

            {currentView === 'view-process' && (
              <KnowledgeBaseView
                categories={KB_DATA.process}
                sectionTitle="FFT Operations Process"
              />
            )}

            {currentView === 'view-helpers' && (
              <KnowledgeBaseView
                categories={KB_DATA.helpers}
                sectionTitle="Operational Helpers"
              />
            )}

            {currentView === 'view-cheatsheet' && <CheatsheetView />}

            {currentView === 'view-links' && <DeptLinksView />}

            {currentView === 'view-manual' && <ManualRepoView />}
          </div>
        </div>
      </main>
    </div>
  );
}
