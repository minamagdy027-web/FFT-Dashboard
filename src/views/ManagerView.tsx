import React, { useMemo } from 'react';
import { Agent } from '../types/dashboard';

interface ManagerViewProps {
  managerName: string;
  agents: Agent[];
  onSelectAgent: (name: string) => void;
}

export const ManagerView: React.FC<ManagerViewProps> = ({
  managerName,
  agents,
  onSelectAgent,
}) => {
  const teamData = useMemo(() => {
    const teamAgents = agents.filter(
      (a) => (a.tl || '').toLowerCase() === managerName.toLowerCase()
    );

    if (teamAgents.length === 0) {
      return null;
    }

    const count = teamAgents.length;
    let sumOcc = 0;
    let sumKpi = 0;
    let sumQ = 0;
    let sumLate = 0;
    let sumSla = 0;
    let sumMeet = 0;
    let sumOff = 0;
    let sumAvail = 0;
    let sumBreak = 0;

    teamAgents.forEach((a) => {
      sumOcc += a.newPct || 0;
      sumKpi += a.calculatedKPI || 0;
      sumQ += a.qualityPct || 0;
      sumLate += a.latenessSum || 0;
      sumSla += parseFloat(String(a.slaDuration || '0')) || 0;
      sumMeet += a.meetingPct || 0;
      sumOff += a.offBoardPct || 0;
      sumAvail += a.availablePct || 0;
      sumBreak += a.breakCount || 0;
    });

    const sortedAgents = [...teamAgents].sort((a, b) => (b.newPct || 0) - (a.newPct || 0));

    return {
      count,
      avgOcc: (sumOcc / count).toFixed(1),
      avgKpi: (sumKpi / count).toFixed(1),
      avgQ: (sumQ / count).toFixed(1),
      avgLate: (sumLate / count).toFixed(1),
      avgSla: (sumSla / count).toFixed(1),
      avgMeet: (sumMeet / count).toFixed(1),
      avgOff: (sumOff / count).toFixed(1),
      avgAvail: (sumAvail / count).toFixed(1),
      avgBreak: (sumBreak / count).toFixed(1),
      roster: sortedAgents,
    };
  }, [managerName, agents]);

  if (!teamData) {
    return (
      <div className="bento-card p-12 text-center">
        <h2 className="text-2xl font-black dark:text-white text-slate-950 mb-2">
          Team Leader Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold">
          No records found for manager "{managerName}".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Card */}
      <div className="bento-card manager-frame p-8 bento-content">
        <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight dark:text-white text-slate-950">
          {managerName}
        </h1>
        <p className="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
          Team Leader
        </p>
      </div>

      <h2 className="text-sm font-black dark:text-white text-slate-950 uppercase tracking-wider border-b dark:border-white/10 border-slate-300 pb-3">
        Team Analysis
      </h2>

      {/* Metrics Breakdown Table */}
      <div className="bento-card manager-frame overflow-hidden">
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-xs uppercase font-black text-slate-800 dark:text-slate-200 tracking-wider bg-slate-100 dark:bg-white/10 border-b dark:border-white/10 border-slate-300">
                <th className="p-4 text-left">Metric</th>
                <th className="p-4">Quality</th>
                <th className="p-4">Lateness</th>
                <th className="p-4">SLA</th>
                <th className="p-4">Meeting</th>
                <th className="p-4">Off Board</th>
                <th className="p-4">Avail</th>
                <th className="p-4">Breaks</th>
                <th className="p-4 text-cyan-600 dark:text-cyan-400">KPI</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono font-bold dark:text-white text-slate-950 divide-y dark:divide-white/5 divide-slate-200">
              <tr>
                <td className="p-4 text-left text-xs uppercase font-black tracking-wider text-slate-500 dark:text-slate-300">
                  Average
                </td>
                <td className="p-4">{teamData.avgQ}%</td>
                <td className="p-4">{teamData.avgLate}m</td>
                <td className="p-4">{teamData.avgSla}m</td>
                <td className="p-4">{teamData.avgMeet}%</td>
                <td className="p-4">{teamData.avgOff}%</td>
                <td className="p-4">{teamData.avgAvail}%</td>
                <td className="p-4">{teamData.avgBreak}</td>
                <td className="p-4 text-cyan-600 dark:text-cyan-400 text-lg font-black">{teamData.avgKpi}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bento-card manager-frame p-8 flex items-center justify-between">
          <span className="text-xs uppercase font-black text-slate-500 dark:text-slate-300 tracking-wider bento-content">
            Total Agents
          </span>
          <span className="text-4xl font-mono dark:text-white text-slate-950 font-black bento-content">
            {teamData.count}
          </span>
        </div>
        <div className="bento-card manager-frame p-8 flex items-center justify-between">
          <span className="text-xs uppercase font-black text-slate-500 dark:text-slate-300 tracking-wider bento-content">
            Total KPI Score
          </span>
          <span className="text-4xl font-mono text-cyan-600 dark:text-cyan-400 font-black bento-content">
            {teamData.avgKpi}%
          </span>
        </div>
      </div>

      {/* Team Roster */}
      <div className="bento-card manager-frame overflow-hidden">
        <div className="p-6 border-b dark:border-white/10 border-slate-300 dark:bg-white/5 bg-slate-100 bento-content">
          <h3 className="font-black text-xl dark:text-white text-slate-950">
            Team Members
          </h3>
        </div>
        <div className="overflow-x-auto custom-scroll relative bento-content">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="text-xs uppercase font-black tracking-wider text-slate-800 dark:text-slate-200 border-b dark:border-white/10 border-slate-300 dark:bg-black/30 bg-slate-100">
                <th className="p-5 text-center w-16">Rank</th>
                <th className="p-5">Agent Name</th>
                <th className="p-5 text-center">Occupancy</th>
                <th className="p-5 text-center text-cyan-600 dark:text-cyan-400">KPI %</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/5 divide-slate-200 text-sm font-semibold">
              {teamData.roster.map((agent, i) => (
                <tr
                  key={agent.name + i}
                  onClick={() => onSelectAgent(agent.name)}
                  className="hover:bg-cyan-500/10 cursor-pointer transition-colors group"
                >
                  <td className="p-5 text-center text-xs text-slate-600 dark:text-slate-300 font-mono font-bold w-16">
                    {i + 1}
                  </td>
                  <td className="p-5 font-black dark:text-white text-slate-950 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {agent.name}
                  </td>
                  <td
                    className={`p-5 text-center font-mono font-black text-lg ${
                      (agent.newPct || 0) >= 100
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'dark:text-slate-300 text-slate-700'
                    }`}
                  >
                    {parseFloat(String(agent.newPct || 0)).toFixed(1)}%
                  </td>
                  <td className="p-5 text-center font-mono font-black text-cyan-600 dark:text-cyan-400 text-lg">
                    {agent.calculatedKPI || 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
