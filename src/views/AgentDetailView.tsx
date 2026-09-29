import React, { useState } from 'react';
import { Mail, Hash, HelpCircle, FileSearch, Sparkles } from 'lucide-react';
import { Agent, Overrides } from '../types/dashboard';
import { calculateAgentKPI } from '../utils/kpi';
import { QualityModal, RationaleModal } from '../components/Modals';

interface AgentDetailViewProps {
  agent: Agent;
  latenessDate?: string;
  overrides?: Overrides;
}

export const AgentDetailView: React.FC<AgentDetailViewProps> = ({
  agent,
  latenessDate,
  overrides,
}) => {
  const [qualityModalOpen, setQualityModalOpen] = useState(false);
  const [rationaleModalOpen, setRationaleModalOpen] = useState(false);

  const fallbackEmail =
    agent.email ||
    agent.name.trim().toLowerCase().replace(/\s+/g, '.') + '@almosafer.com';

  const kpiData = calculateAgentKPI(agent, overrides);

  // Format danger indicators
  const isAvailableLow = (agent.availablePct || 0) < 90;
  const isMeetingHigh = (agent.meetingPct || 0) > 20;
  const isBreakHigh = (agent.breakCount || 0) > 2;
  const isQualityLow = (agent.qualityPct || 0) < 100;
  const isLateSumHigh = (agent.latenessSum || 0) > 22;
  const isSfLateHigh = (agent.sfLateness || 0) > 60;

  const slaVal = parseFloat(String(agent.slaDuration || '0'));
  const isSlaHigh = !isNaN(slaVal) && slaVal > 10.5;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Agent Hero Banner */}
      <div className="bento-card p-6 md:p-10 border-l-4 border-cyan-500 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="bento-content w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-2 dark:text-white text-slate-950 break-words">
            {agent.name}
          </h1>

          <div className="text-sm font-mono font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
            <span className="truncate">{fallbackEmail}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-lg font-black border border-cyan-500/30">
              TL: {agent.tl}
            </span>
            <span className="flex items-center gap-1.5 dark:bg-white/10 bg-slate-100 px-3 py-1 rounded-lg dark:text-slate-200 text-slate-800 border dark:border-white/15 border-slate-300 font-bold">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              <span>SFID:</span>
              <span className="font-black">{agent.sfId || 'N/A'}</span>
            </span>
          </div>
        </div>

        <div className="text-left md:text-right bento-content w-full md:w-auto border-t md:border-t-0 dark:border-white/15 border-slate-300 pt-4 md:pt-0">
          <div className="text-xs uppercase font-black tracking-wider text-slate-500 dark:text-slate-300 mb-1">
            Occupancy Output
          </div>
          <div className="text-4xl md:text-5xl font-mono font-black text-cyan-600 dark:text-cyan-400">
            {parseFloat(String(agent.newPct || 0)).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* 4 Overview Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Performance Summary */}
        <div className="bento-card p-6">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-950 dark:text-white border-b dark:border-white/10 border-slate-200 pb-3 mb-4 bento-content">
            Performance
          </h3>
          <div className="space-y-3.5 text-sm font-semibold bento-content">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Total Cases</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.total || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Needed Points</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black">
                {typeof agent.needed === 'number'
                  ? agent.needed.toFixed(2)
                  : agent.needed || '0'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Support</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.support || 0}
              </span>
            </div>
            <div className="flex justify-between items-center border-t dark:border-white/10 border-slate-200 pt-3">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Working Days</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.wkDays || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Productivity */}
        <div className="bento-card p-6">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-950 dark:text-white border-b dark:border-white/10 border-slate-200 pb-3 mb-4 bento-content">
            Productivity
          </h3>
          <div className="space-y-3.5 text-sm font-semibold bento-content">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Available</span>
              <span
                className={`font-mono font-black ${
                  isAvailableLow ? 'text-red-500' : 'dark:text-white text-slate-950'
                }`}
              >
                {parseFloat(String(agent.availablePct || 0)).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Meeting</span>
              <span
                className={`font-mono font-black ${
                  isMeetingHigh ? 'text-red-500' : 'dark:text-white text-slate-950'
                }`}
              >
                {parseFloat(String(agent.meetingPct || 0)).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Offboard</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {parseFloat(String(agent.offBoardPct || 0)).toFixed(1)}% (
                {agent.offBoardMins || 0}m)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Breaks Count</span>
              <span
                className={`font-mono font-black ${
                  isBreakHigh ? 'text-red-500' : 'dark:text-white text-slate-950'
                }`}
              >
                {agent.breakCount || 0}
              </span>
            </div>
            <div className="flex justify-between items-center border-t dark:border-white/10 border-slate-200 pt-3">
              <span className="text-slate-600 dark:text-slate-300 font-bold">SLA</span>
              <span
                className={`font-mono font-black ${
                  isSlaHigh ? 'text-red-500' : 'dark:text-white text-slate-950'
                }`}
              >
                {isNaN(slaVal) ? agent.slaDuration : slaVal.toFixed(2)}m
              </span>
            </div>
          </div>
        </div>

        {/* Efficiency */}
        <div className="bento-card p-6">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-950 dark:text-white border-b dark:border-white/10 border-slate-200 pb-3 mb-4 bento-content">
            Efficiency
          </h3>
          <div className="space-y-4 bento-content">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  Quality
                </span>
                <button
                  type="button"
                  onClick={() => setQualityModalOpen(true)}
                  className="text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded uppercase tracking-wider hover:bg-red-500/20 transition border border-red-500/30 font-black flex items-center gap-1 cursor-pointer"
                  title="View Error Logs"
                >
                  <FileSearch className="w-2.5 h-2.5" />
                  LOGS
                </button>
              </div>
              <span
                className={`text-xl font-mono font-black ${
                  isQualityLow ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {parseFloat(String(agent.qualityPct || 0)).toFixed(1)}%
              </span>
            </div>

            <div className="flex justify-between items-center border-t dark:border-white/10 border-slate-200 pt-4 text-sm font-semibold">
              <div className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-300 text-xs font-bold">
                  Fingerprint Lateness
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-300 font-bold">
                  {latenessDate ? `Updated: ${latenessDate}` : 'Updating...'}
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`font-mono font-black text-base ${
                    isLateSumHigh
                      ? 'text-red-500'
                      : 'dark:text-white text-slate-950'
                  }`}
                >
                  {agent.latenessSum || 0}m
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-600 dark:text-slate-300 font-bold">SF Lateness</span>
              <span
                className={`font-mono font-black ${
                  isSfLateHigh
                    ? 'text-red-500'
                    : 'dark:text-white text-slate-950'
                }`}
              >
                {agent.sfLateness || 0}m
              </span>
            </div>
          </div>
        </div>

        {/* Leave */}
        <div className="bento-card p-6">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-950 dark:text-white border-b dark:border-white/10 border-slate-200 pb-3 mb-4 bento-content">
            Leave
          </h3>
          <div className="space-y-3.5 text-sm font-semibold bento-content">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Casual</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.leaves?.casual || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Sick</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.leaves?.sick || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">Annual</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.leaves?.annual || 0}
              </span>
            </div>
            <div className="flex justify-between items-center border-t dark:border-white/10 border-slate-200 pt-3">
              <span className="text-slate-600 dark:text-slate-300 font-bold">PH (Public Holiday)</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.leaves?.ph || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-bold">UPL (Unpaid)</span>
              <span className="font-mono dark:text-white text-slate-950 font-black">
                {agent.leaves?.upl || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cases Breakdown Table */}
      <div className="bento-card overflow-hidden">
        <div className="p-6 dark:bg-white/5 bg-slate-100 font-black text-xs uppercase tracking-wider text-slate-950 dark:text-white bento-content border-b dark:border-white/10 border-slate-300">
          Cases Breakdown
        </div>
        <div className="overflow-x-auto custom-scroll bento-content">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="dark:bg-[#10131f] bg-slate-100 text-xs uppercase text-slate-800 dark:text-slate-200 font-black tracking-wider whitespace-nowrap border-b dark:border-white/10 border-slate-300">
                <th className="p-4">1G SCH</th>
                <th className="p-4">Auto</th>
                <th className="p-4">Check In</th>
                <th className="p-4">DMC</th>
                <th className="p-4">Expired Payment</th>
                <th className="p-4">Failed</th>
                <th className="p-4">Manual</th>
                <th className="p-4">Refund Others</th>
                <th className="p-4">Reissue/Refunds</th>
                <th className="p-4">SCH</th>
                <th className="p-4">WA SCH</th>
                <th className="p-4 text-cyan-600 dark:text-cyan-400">Avg/Day</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm dark:text-white text-slate-950 font-bold divide-y dark:divide-white/5 divide-slate-200">
              <tr>
                <td className="p-5">{agent.raw_1g || 0}</td>
                <td className="p-5">{agent.raw_auto || 0}</td>
                <td className="p-5">{agent.raw_checkin || 0}</td>
                <td className="p-5">{agent.raw_dmc || 0}</td>
                <td className="p-5">{agent.raw_expired || 0}</td>
                <td className="p-5">{agent.raw_failed || 0}</td>
                <td className="p-5">{agent.raw_manual || 0}</td>
                <td className="p-5">{agent.raw_refund || 0}</td>
                <td className="p-5">{agent.raw_reissue || 0}</td>
                <td className="p-5">{agent.raw_sch || 0}</td>
                <td className="p-5">{agent.raw_wa || 0}</td>
                <td className="p-5 text-cyan-600 dark:text-cyan-400 font-black text-lg">
                  {agent.avgCases ? parseFloat(String(agent.avgCases)).toFixed(2) : '0'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Final KPI Breakdown Bento Section */}
      <div className="bento-card overflow-hidden">
        <div className="p-6 md:p-8 dark:bg-white/5 bg-slate-100 border-b dark:border-white/10 border-slate-300 flex justify-between items-center flex-wrap gap-4 bento-content">
          <div className="flex items-center gap-4">
            <h3 className="font-black text-2xl dark:text-white text-slate-950">
              Final KPI Score
            </h3>
            <button
              type="button"
              onClick={() => setRationaleModalOpen(true)}
              className="text-xs font-black text-cyan-700 dark:text-cyan-300 hover:text-white hover:bg-cyan-600 bg-cyan-500/15 px-3.5 py-1.5 rounded-lg transition border border-cyan-500/30 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Read Logic</span>
            </button>
          </div>
          <div className="text-4xl md:text-5xl font-mono font-black text-cyan-600 dark:text-cyan-400">
            {kpiData.total}%
          </div>
        </div>

        {/* 7 KPI Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 p-6 w-full bento-content">
          {kpiData.breakdown.map((item) => {
            const isWaived = item.isWaived;
            return (
              <div
                key={item.metric}
                className={`p-4 rounded-xl border text-center shadow-sm relative overflow-hidden transition-all ${
                  isWaived
                    ? 'border-emerald-500/50 dark:bg-emerald-500/15 bg-emerald-50'
                    : 'dark:border-white/10 border-slate-300 dark:bg-black/20 bg-slate-50'
                }`}
              >
                {isWaived && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500"></div>
                )}
                <div className="text-[10px] uppercase font-black text-slate-600 dark:text-slate-300 tracking-wider mb-2 flex items-center justify-center gap-1">
                  <span>{item.metric}</span>
                  {isWaived ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-black tracking-widest">
                      [WAIVED]
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-300 font-bold">[{item.max}]</span>
                  )}
                </div>
                <div
                  className={`text-2xl font-mono font-black ${
                    isWaived
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-cyan-600 dark:text-cyan-400'
                  }`}
                >
                  {item.earned}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Notice - Beautiful, modern, eye-catching, and comfortable */}
      <div className="relative overflow-hidden rounded-2xl p-5 border border-purple-500/25 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-cyan-500/10 dark:from-purple-950/40 dark:via-indigo-950/25 dark:to-cyan-950/30 shadow-lg backdrop-blur-xl bento-content flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center">
          <div className="w-full h-full dark:bg-[#0c0c16] bg-white rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-extrabold text-[10px] uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              Audit Notice
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          </div>
          <p className="text-sm font-medium tracking-wide dark:text-slate-200 text-slate-800 leading-relaxed">
            Final KPI scores are subject to month-end managerial review regarding task considerations and audit verifications.
          </p>
        </div>
      </div>

      {/* Modals */}
      <QualityModal
        isOpen={qualityModalOpen}
        onClose={() => setQualityModalOpen(false)}
        casesText={agent.casesBelow100}
      />
      <RationaleModal
        isOpen={rationaleModalOpen}
        onClose={() => setRationaleModalOpen(false)}
        breakdown={kpiData.breakdown}
      />
    </div>
  );
};
