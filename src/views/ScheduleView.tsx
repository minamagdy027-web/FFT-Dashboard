import React, { useState, useMemo } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { ScheduleData, Agent } from '../types/dashboard';
import { getShiftColorClass, getFirstAndLastName } from '../utils/kpi';

interface ScheduleViewProps {
  schedule: ScheduleData;
  scheduleDate?: string;
  agents: Agent[];
  isLoading: boolean;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  scheduleDate,
  agents,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGrid = useMemo(() => {
    if (!schedule || !schedule.grid) return [];
    if (!searchTerm.trim()) return schedule.grid;
    const terms = searchTerm.toLowerCase().split(' ').filter(Boolean);
    return schedule.grid.filter((row) => {
      const name = (row.name || '').toLowerCase();
      return terms.every((t) => name.includes(t));
    });
  }, [schedule, searchTerm]);

  // Map agent name to SFID
  const sfIdMap = useMemo(() => {
    const map = new Map<string, string>();
    agents.forEach((a) => {
      if (a.name) map.set(a.name.toLowerCase().trim(), a.sfId);
    });
    return map;
  }, [agents]);

  const hasData = schedule && schedule.dates && schedule.dates.length > 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bento-card flex flex-col h-[78vh]">
        {/* Header Bar */}
        <div className="p-6 border-b dark:border-white/5 border-black/5 dark:bg-white/5 bg-black/5 flex justify-between items-center flex-shrink-0 bento-content flex-wrap gap-4">
          <div className="flex flex-col">
            <h2 className="font-extrabold text-xl tracking-tight dark:text-white text-gray-900">
              Operations Schedule Matrix
            </h2>
            <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.2em] mt-1">
              {scheduleDate ? `Last Updated: ${scheduleDate}` : 'Fetching update time...'}
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Agent Name..."
              className="pl-9 pr-4 py-2 rounded-xl dark:bg-[#0c0c14] bg-white border dark:border-white/10 border-black/10 text-xs focus:ring-1 focus:ring-cyan-500 outline-none shadow-sm w-64 font-mono transition-all dark:text-white"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Schedule Table Container */}
        <div className="overflow-x-auto relative w-full flex-1 custom-scroll bento-content">
          {!hasData ? (
            <div className="p-24 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mb-4" />
              <div className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                Syncing Schedule Database...
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs min-w-max">
              <thead className="sticky top-0 z-40 font-bold text-gray-500 shadow-sm">
                <tr>
                  <th
                    rowSpan={2}
                    className="p-4 sticky left-0 z-50 dark:bg-[#111318] bg-[#f8fafc] border-b border-r dark:border-white/5 border-black/5 text-center align-middle font-black shadow-[2px_0_10px_rgba(0,0,0,0.1)] text-xs uppercase tracking-widest text-gray-500 min-w-[110px]"
                  >
                    SF ID
                  </th>
                  <th
                    rowSpan={2}
                    className="p-4 sticky left-[110px] z-50 dark:bg-[#111318] bg-[#f8fafc] border-b border-r dark:border-white/5 border-black/5 text-center align-middle font-black shadow-[2px_0_10px_rgba(0,0,0,0.1)] text-xs uppercase tracking-widest text-gray-500 min-w-[180px] max-w-[180px]"
                  >
                    Agent Name
                  </th>
                  {schedule.dates.map((d, i) => (
                    <th
                      key={i}
                      className="p-2.5 min-w-[76px] text-center border-b dark:border-white/5 border-black/5 font-mono dark:text-white text-gray-900 dark:bg-[#111318] bg-[#f8fafc]"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
                <tr>
                  {schedule.days.map((day, i) => (
                    <th
                      key={i}
                      className="p-1.5 text-center border-b dark:border-white/5 border-black/5 text-[9px] uppercase tracking-[0.15em] font-black text-gray-400 dark:bg-[#111318] bg-[#f8fafc]"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y dark:divide-white/5 divide-black/5 font-semibold text-xs">
                {filteredGrid.map((row, idx) => {
                  const shortName = getFirstAndLastName(row.name || 'Unknown');
                  const sfid =
                    sfIdMap.get((row.name || '').toLowerCase().trim()) || 'N/A';

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-cyan-500/5 transition-colors"
                    >
                      {/* Sticky SFID */}
                      <td className="p-3 sticky left-0 z-20 font-mono text-[10px] font-bold text-gray-500 dark:bg-[#111318] bg-[#f8fafc] border-b border-r dark:border-white/5 border-black/5 shadow-[2px_0_10px_rgba(0,0,0,0.05)] text-center min-w-[110px]">
                        {sfid}
                      </td>

                      {/* Sticky Name */}
                      <td
                        className="p-3 sticky left-[110px] z-20 font-bold dark:text-white text-gray-900 whitespace-nowrap dark:bg-[#111318] bg-[#f8fafc] border-b border-r dark:border-white/5 border-black/5 shadow-[2px_0_10px_rgba(0,0,0,0.05)] min-w-[180px] max-w-[180px] truncate"
                        title={row.name}
                      >
                        {shortName}
                      </td>

                      {/* Shifts */}
                      {row.shifts.map((shift, sIdx) => {
                        let sClass = '';
                        const s = (shift || '').toLowerCase().trim();
                        let display = shift;
                        const timeMatch = shift.match(/\d{2}:\d{2}/);

                        if (timeMatch) display = timeMatch[0];

                        if (s === 'off') {
                          sClass =
                            'text-red-500 bg-red-500/10 dark:text-red-400 dark:bg-red-500/20';
                          display = 'OFF';
                        } else if (s === 'sick') {
                          sClass =
                            'text-amber-500 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/20';
                        } else if (s === 'annual') {
                          sClass =
                            'text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/20';
                        } else if (s === 'casual') {
                          sClass =
                            'text-fuchsia-500 bg-fuchsia-500/10 dark:text-fuchsia-400 dark:bg-fuchsia-500/20';
                        } else if (s === 'upl') {
                          sClass =
                            'text-pink-500 bg-pink-500/10 dark:text-pink-400 dark:bg-pink-500/20';
                        } else if (s === 'ph') {
                          sClass =
                            'text-indigo-500 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-500/20';
                        } else if (timeMatch) {
                          sClass = getShiftColorClass(display);
                        } else {
                          sClass =
                            'text-gray-500 bg-gray-500/10 dark:bg-white/5';
                        }

                        return (
                          <td
                            key={sIdx}
                            className="p-2 text-center border-b border-r dark:border-white/5 border-black/5"
                          >
                            <div
                              className={`inline-flex items-center justify-center px-2 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider w-full min-w-[46px] ${sClass}`}
                            >
                              {display || '-'}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
