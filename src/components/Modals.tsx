import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { KPIRationaleItem } from '../types/dashboard';

interface QualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  casesText?: string;
}

export const QualityModal: React.FC<QualityModalProps> = ({
  isOpen,
  onClose,
  casesText,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-fade-in-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bento-card p-6 md:p-8 w-[450px] max-w-[95%] border-t-4 border-red-500 bg-white dark:bg-[#0e111a] shadow-2xl border border-slate-300 dark:border-white/10"
      >
        <div className="bento-content">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-2xl dark:text-white text-slate-950 tracking-tight">
              Error Logs
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-red-500 dark:text-slate-300 dark:hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs font-black text-slate-500 dark:text-slate-300 mb-6 uppercase tracking-wider">
            Quality Scored Below 100%
          </p>
          <div className="dark:bg-black/50 bg-slate-100 p-5 rounded-xl border dark:border-white/10 border-slate-300 max-h-64 overflow-y-auto custom-scroll">
            <p className="font-mono text-sm font-bold text-red-600 dark:text-red-400 break-words leading-relaxed whitespace-pre-wrap">
              {casesText || 'No specific errors detected in current cycle.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 dark:bg-white/10 bg-slate-200 dark:text-white text-slate-950 w-full py-3.5 rounded-xl font-black hover:bg-slate-300 dark:hover:bg-white/15 transition text-xs uppercase tracking-wider cursor-pointer border dark:border-white/15 border-slate-300 shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface RationaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  breakdown: KPIRationaleItem[];
}

export const RationaleModal: React.FC<RationaleModalProps> = ({
  isOpen,
  onClose,
  breakdown,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-fade-in-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bento-card relative p-6 w-[700px] max-w-[95%] border-t-4 border-cyan-500 flex flex-col bg-white dark:bg-[#0e111a] rounded-2xl shadow-2xl border border-slate-300 dark:border-white/10"
      >
        <div className="bento-content flex flex-col w-full">
          {/* Header with Title and Clickable Close X */}
          <div className="flex items-center justify-between mb-4 border-b dark:border-white/10 border-slate-300 pb-3">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div>
                <h3 className="font-black text-xl dark:text-white text-slate-950 tracking-tight">
                  KPI Logic & Weights
                </h3>
                <p className="text-xs font-black text-slate-500 dark:text-slate-300 uppercase tracking-wider mt-0.5">
                  Detailed Calculation Rules & Earned Points
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-red-500 dark:text-slate-300 dark:hover:text-white p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full rounded-xl border border-slate-300 dark:border-white/10 overflow-hidden bg-slate-50 dark:bg-black/30 max-h-[60vh] overflow-y-auto custom-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-white/10 border-b border-slate-300 dark:border-white/10">
                  <th className="py-2.5 px-4 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 w-1/4">
                    Metric Name
                  </th>
                  <th className="py-2.5 px-4 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Logic & Calculation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs">
                {breakdown.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-cyan-500/5 transition-colors"
                  >
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
                          {r.metric}
                        </span>
                        {r.isWaived && (
                          <span className="text-[9px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-black px-1.5 py-0.5 rounded border border-emerald-500/30">
                            WAIVED
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs font-bold text-slate-500 dark:text-slate-300 mt-1">
                        {r.earned}% / {r.max}%
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top">
                      <p className="text-xs font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                        {r.reason}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 flex-shrink-0 dark:bg-white/10 bg-slate-200 dark:text-white text-slate-950 w-full py-3 rounded-lg font-black hover:bg-slate-300 dark:hover:bg-white/15 transition text-xs uppercase tracking-wider cursor-pointer border dark:border-white/15 border-slate-300 shadow-sm"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
