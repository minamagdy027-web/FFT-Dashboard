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
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
          Team Leader Not Found
        </h2>
        <p className="text-gray-500 text-sm">
          No records found for manager "{managerName}".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Card */}
      <div className="bento-card manager-frame p-8 bento-content">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight dark:text-white text-gray-900">
          {managerName}
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
          Team Leader
        </p>
      </div>

      <h2 className="text-sm font-black dark:text-white text-gray-900 uppercase tracking-[0.15em] border-b dark:border-white/5 border-black/10 pb-3">
        Team Analysis
      </h2>

      {/* Metrics Breakdown Table */}
      <div className="bento-card manager-frame overflow-hidden">
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-[9px] uppercase font-bold text-gray-700 dark:text-gray-200 tracking-widest bg-black/5 dark:bg-white/5">
                <th className="p-4 text-left">Metric</th>
                <th className="p-4">Quality</th>
                <th className="p-4">Lateness</th>
                <th className="p-4">SLA</th>
                <th className="p-4">Meeting</th>
                <th className="p-4">Off Board</th>
                <th className="p-4">Avail</th>
                <th className="p-4">Breaks</th>
                <th className="p-4 text-cyan-500">KPI</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono font-bold dark:text-white text-gray-900 divide-y dark:divide-white/5 divide-black/5">
              <tr>
                <td className="p-4 text-left text-xs uppercase tracking-widest text-gray-500">
                  Average
                </td>
                <td className="p-4">{teamData.avgQ}%</td>
                <td className="p-4">{teamData.avgLate}m</td>
                <td className="p-4">{teamData.avgSla}m</td>
                <td className="p-4">{teamData.avgMeet}%</td>
                <td className="p-4">{teamData.avgOff}%</td>
                <td className="p-4">{teamData.avgAvail}%</td>
                <td className="p-4">{teamData.avgBreak}</td>
                <td className="p-4 text-cyan-500 text-base">{teamData.avgKpi}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bento-card manager-frame p-8 flex items-center justify-between">
          <span className="text-xs uppercase font-black text-gray-400 tracking-[0.15em] bento-content">
            Total Agents
          </span>
          <span className="text-4xl font-mono dark:text-white text-gray-900 font-bold bento-content">
            {teamData.count}
          </span>
        </div>
        <div className="bento-card manager-frame p-8 flex items-center justify-between">
          <span className="text-xs uppercase font-black text-gray-400 tracking-[0.15em] bento-content">
            Total KPI Score
          </span>
          <span className="text-4xl font-mono text-cyan-500 font-bold bento-content">
            {teamData.avgKpi}%
          </span>
        </div>
      </div>

      {/* Team Roster */}
      <div className="bento-card manager-frame overflow-hidden">
        <div className="p-6 border-b dark:border-white/5 border-black/5 dark:bg-white/5 bg-black/5 bento-content">
          <h3 className="font-black text-lg dark:text-white text-gray-900">
            Team Members
          </h3>
        </div>
        <div className="overflow-x-auto custom-scroll relative bento-content">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 border-b dark:border-white/5 border-black/5 dark:bg-black/20 bg-black/5">
                <th className="p-5 text-center w-16">Rank</th>
                <th className="p-5">Agent Name</th>
                <th className="p-5 text-center">Occupancy</th>
                <th className="p-5 text-center text-cyan-500">KPI %</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/5 divide-black/5 text-sm font-semibold">
              {teamData.roster.map((agent, i) => (
                <tr
                  key={agent.name + i}
                  onClick={() => onSelectAgent(agent.name)}
                  className="hover:bg-cyan-500/5 cursor-pointer transition-colors group"
                >
                  <td className="p-5 text-center text-xs opacity-50 font-mono w-16">
                    {i + 1}
                  </td>
                  <td className="p-5 font-bold dark:text-sky-100 text-sky-950 group-hover:text-cyan-500 transition-colors">
                    {agent.name}
                  </td>
                  <td
                    className={`p-5 text-center font-mono font-bold text-lg ${
                      (agent.newPct || 0) >= 100
                        ? 'text-emerald-500'
                        : 'dark:text-gray-400 text-gray-600'
                    }`}
                  >
                    {parseFloat(String(agent.newPct || 0)).toFixed(1)}%
                  </td>
                  <td className="p-5 text-center font-mono font-bold text-cyan-500 text-lg">
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
