import React, { useState, useMemo } from 'react';
import { Search, Trophy, ArrowRight, Loader2 } from 'lucide-react';
import { Agent } from '../types/dashboard';

interface DashboardViewProps {
  agents: Agent[];
  onSelectAgent: (name: string) => void;
  onSelectManager: (tl: string) => void;
  isLoading: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  agents,
  onSelectAgent,
  onSelectManager,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Calculate Top Achiever
  const topAchiever = useMemo(() => {
    if (!agents || agents.length === 0) return null;
    let perfect = agents.filter((a) => Math.round(a.calculatedKPI || 0) === 100);
    if (perfect.length === 0) {
      const maxKPI = Math.max(...agents.map((a) => Math.round(a.calculatedKPI || 0)));
      perfect = agents.filter((a) => Math.round(a.calculatedKPI || 0) === maxKPI);
    }
    perfect.sort((a, b) => (b.newPct || 0) - (a.newPct || 0));
    return perfect[0] || null;
  }, [agents]);

  // 2. Team Leaders aggregation
  const teamLeaders = useMemo(() => {
    const teams: Record<
      string,
      { count: number; sumOcc: number; sumKpi: number }
    > = {};

    agents.forEach((agent) => {
      const tl = agent.tl || 'Unassigned';
      if (!teams[tl]) {
        teams[tl] = { count: 0, sumOcc: 0, sumKpi: 0 };
      }
      teams[tl].count += 1;
      teams[tl].sumOcc += agent.newPct || 0;
      teams[tl].sumKpi += agent.calculatedKPI || 0;
    });

    return Object.keys(teams)
      .filter((tl) => tl.toLowerCase() !== 'unassigned')
      .map((tl) => {
        const item = teams[tl];
        return {
          tl,
          count: item.count,
          avgKpi: (item.sumKpi / item.count).toFixed(1),
          avgOcc: (item.sumOcc / item.count).toFixed(1),
        };
      })
      .sort((a, b) => parseFloat(b.avgKpi) - parseFloat(a.avgKpi));
  }, [agents]);

  // 3. Filtered & Sorted Matrix Agents
  const matrixAgents = useMemo(() => {
    const sorted = [...agents].sort((a, b) => (b.newPct || 0) - (a.newPct || 0));
    if (!searchTerm.trim()) return sorted;
    const terms = searchTerm.toLowerCase().split(' ').filter(Boolean);
    return sorted.filter((a) => {
      const name = (a.name || '').toLowerCase();
      const tl = (a.tl || '').toLowerCase();
      return terms.every((t) => name.includes(t) || tl.includes(t));
    });
  }, [agents, searchTerm]);

  if (isLoading && agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-center">
        <div className="relative flex justify-center items-center h-20 w-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-cyan-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-purple-500 animate-spin"></div>
          <Loader2 className="w-6 h-6 text-cyan-400 animate-pulse" />
        </div>
        <div className="mt-6 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 animate-pulse">
          Syncing Performance Matrix...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Top Performer Golden Card */}
      {topAchiever && (
        <div
          onClick={() => onSelectAgent(topAchiever.name)}
          className="bento-card p-6 md:p-8 flex flex-col xl:flex-row justify-between items-start xl:items-center relative overflow-hidden gold-frame cursor-pointer gap-6 transition-all duration-300"
        >
          <div className="bento-content w-full xl:w-auto">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-2 dark:text-yellow-400 text-yellow-600">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Top Performer</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-1 tracking-tight dark:text-sky-100 text-gray-900 break-words">
              {topAchiever.name}
            </h2>
            <p className="text-sm font-bold dark:text-gray-400 text-gray-500">
              <span>{topAchiever.tl}</span>
            </p>
          </div>

          <div className="bento-content flex flex-row items-center justify-start xl:justify-end gap-6 md:gap-8 w-full xl:w-auto border-t xl:border-t-0 dark:border-white/10 border-black/10 pt-4 xl:pt-0">
            <div className="text-left xl:text-right">
              <div className="text-3xl md:text-4xl font-black tracking-tighter text-cyan-500">
                {Math.round(topAchiever.calculatedKPI || 0)}%
              </div>
              <div className="text-[9px] md:text-[10px] font-bold uppercase mt-1 tracking-[0.2em] text-gray-500">
                KPI Vector
              </div>
            </div>
            <div className="w-px h-10 md:h-12 dark:bg-white/10 bg-black/10"></div>
            <div className="text-left xl:text-right">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-amber-600">
                {parseFloat(String(topAchiever.newPct || 0)).toFixed(1)}%
              </div>
              <div className="text-[9px] md:text-[10px] font-bold uppercase mt-1 tracking-[0.2em] text-gray-500">
                Total Output
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Leaders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {teamLeaders.map((team) => (
          <div
            key={team.tl}
            onClick={() => onSelectManager(team.tl)}
            className="bento-card leader-frame p-6 cursor-pointer relative overflow-hidden gap-4 transition-all duration-300 group"
          >
            <div className="bento-content">
              <div
                className="font-extrabold text-xl dark:text-white text-gray-900 truncate mb-1 group-hover:text-cyan-400 transition-colors"
                title={team.tl}
              >
                {team.tl}
              </div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.15em] mb-4">
                {team.count} Agents
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-mono dark:text-white text-gray-900 font-bold">
                    {team.avgKpi}%
                  </div>
                  <div className="text-[9px] uppercase font-bold text-cyan-500 tracking-widest mt-1">
                    Total KPI Score
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono text-gray-800 dark:text-gray-200 font-bold">
                    {team.avgOcc}%
                  </div>
                  <div className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-1">
                    Total Occupancy
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Matrix Table */}
      <div className="bento-card matrix-frame overflow-hidden transition-all duration-300">
        <div className="p-6 border-b dark:border-white/10 border-slate-200/60 dark:bg-transparent bg-transparent flex justify-between items-center flex-wrap gap-4 bento-content">
          <h3 className="font-black text-lg dark:text-white text-slate-900">
            Performance Matrix
          </h3>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name or TL..."
              className="pl-9 pr-4 py-2.5 rounded-xl dark:bg-black/30 bg-white/70 border dark:border-white/10 border-slate-200/80 backdrop-blur-md text-sm focus:ring-1 focus:ring-cyan-500 outline-none shadow-sm w-64 font-mono transition-all dark:text-white text-slate-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="overflow-x-auto custom-scroll relative bento-content">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="text-[10px] uppercase font-black tracking-[0.15em] text-gray-400 dark:text-gray-500 border-b dark:border-white/5 border-slate-200/80 dark:bg-[#0c0c14]/40 bg-gray-50/40">
                <th className="p-5 text-center w-16">Rank</th>
                <th className="p-5 sticky left-0 dark:bg-[#111318]/90 bg-sky-100/60 backdrop-blur-md z-20 border-r dark:border-white/5 border-sky-200/40 text-sky-900 dark:text-gray-400">
                  Agent Name
                </th>
                <th className="p-5">TL</th>
                <th className="p-5 text-center">Occupancy</th>
                <th className="p-5 text-center text-cyan-500">KPI %</th>
                <th className="p-5 text-right">View details</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold">
              {matrixAgents.map((agent, i) => {
                return (
                  <tr
                    key={agent.name + i}
                    onClick={() => onSelectAgent(agent.name)}
                    className="hover:bg-cyan-500/5 cursor-pointer transition-colors group border-b dark:border-white/[0.04] border-slate-200/40"
                  >
                    <td className="p-5 text-center text-xs text-gray-400 font-mono w-16">
                      {i + 1}
                    </td>
                    <td className="p-5 sticky left-0 dark:bg-[#111318]/90 bg-sky-50/70 backdrop-blur-md group-hover:bg-cyan-500/10 font-extrabold dark:text-sky-100 text-sky-950 truncate max-w-[240px] z-10 transition-colors border-r dark:border-white/5 border-sky-100/70">
                      {agent.name}
                    </td>
                    <td className="p-5 text-xs font-semibold text-gray-500">
                      {agent.tl}
                    </td>
                    <td className="p-5 text-center text-lg font-mono font-bold text-emerald-500">
                      {parseFloat(String(agent.newPct || 0)).toFixed(1)}%
                    </td>
                    <td className="p-5 text-center font-mono font-bold text-blue-500 dark:text-cyan-400 text-lg">
                      {agent.calculatedKPI || 0}%
                    </td>
                    <td className="p-5 text-right">
                      <span className="inline-block dark:bg-white/10 bg-gray-100 dark:text-white text-gray-700 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                        Select
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {matrixAgents.length === 0 && (
            <div className="p-12 text-center text-slate-500 font-mono text-xs">
              No matching records found in current matrix.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
