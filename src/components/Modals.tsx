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
        className="bento-card p-6 md:p-8 w-[450px] max-w-[95%] border-t-2 border-red-500 bg-white dark:bg-[#12121b] shadow-2xl"
      >
        <div className="bento-content">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-2xl dark:text-white text-gray-900 tracking-tight">
              Error Logs
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 dark:hover:text-white transition-colors p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">
            Quality Scored Below 100%
          </p>
          <div className="dark:bg-black/30 bg-gray-50 p-5 rounded-xl border dark:border-white/5 border-black/5 max-h-64 overflow-y-auto custom-scroll">
            <p className="font-mono text-sm font-semibold text-red-500 break-words leading-relaxed whitespace-pre-wrap">
              {casesText || 'No specific errors detected in current cycle.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 dark:bg-white/5 bg-black/5 dark:text-white text-gray-900 w-full py-3.5 rounded-xl font-bold hover:bg-black/10 dark:hover:bg-white/10 transition text-[10px] uppercase tracking-[0.2em] cursor-pointer"
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
        className="bento-card relative p-6 w-[700px] max-w-[95%] border-t-2 border-cyan-500 flex flex-col bg-white dark:bg-[#14141e] rounded-2xl shadow-2xl"
      >
        <div className="bento-content flex flex-col w-full">
          {/* Header with Title and Clickable Close X */}
          <div className="flex items-center justify-between mb-4 border-b dark:border-white/5 border-black/5 pb-3">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-cyan-500 shrink-0" />
              <div>
                <h3 className="font-extrabold text-xl dark:text-white text-gray-900 tracking-tight">
                  KPI Logic & Weights
                </h3>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-0.5">
                  Detailed Calculation Rules & Earned Points
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 dark:hover:text-white p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden bg-black/[0.02] dark:bg-black/20 max-h-[60vh] overflow-y-auto custom-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                  <th className="py-2.5 px-4 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 w-1/4">
                    Metric Name
                  </th>
                  <th className="py-2.5 px-4 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    Logic & Calculation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-xs">
                {breakdown.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[10px] text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                          {r.metric}
                        </span>
                        {r.isWaived && (
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-500 font-extrabold px-1.5 py-0.5 rounded">
                            WAIVED
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-gray-500 mt-0.5">
                        {r.earned}% / {r.max}%
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top">
                      <p className="text-[11px] font-medium leading-relaxed text-gray-600 dark:text-gray-300">
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
            className="mt-5 flex-shrink-0 dark:bg-white/5 bg-black/5 dark:text-white text-gray-900 w-full py-3 rounded-lg font-bold hover:bg-black/10 dark:hover:bg-white/10 transition text-[10px] uppercase tracking-[0.2em] cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
