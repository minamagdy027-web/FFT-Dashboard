import React, { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { MANUAL_REPO_DATA } from '../data/manualData';

export const ManualRepoView: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<'amadeus' | 'galileo' | null>(null);
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // State 1: Choose System (Amadeus or Galileo) - Original clean styling
  if (!selectedSystem) {
    return (
      <div className="space-y-6 animate-fade-in-up pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            onClick={() => setSelectedSystem('amadeus')}
            className="bento-card p-16 cursor-pointer text-center group border border-slate-300 dark:border-white/10 hover:border-cyan-500 hover:-translate-y-1 transition-all shadow-sm"
          >
            <div className="bento-content">
              <h3 className="text-3xl md:text-4xl font-black dark:text-white text-slate-950 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Amadeus
              </h3>
            </div>
          </div>

          <div
            onClick={() => setSelectedSystem('galileo')}
            className="bento-card p-16 cursor-pointer text-center group border border-slate-300 dark:border-white/10 hover:border-cyan-500 hover:-translate-y-1 transition-all shadow-sm"
          >
            <div className="bento-content">
              <h3 className="text-3xl md:text-4xl font-black dark:text-white text-slate-950 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Galileo
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sysData = MANUAL_REPO_DATA[selectedSystem];
  const commandNames = Object.keys(sysData.commands);

  // State 2: Category Commands - Original clean styling
  if (!selectedCommand) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-fade-in-up pt-2">
        <button
          onClick={() => setSelectedSystem(null)}
          className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-black text-xs uppercase tracking-wider dark:bg-white/10 bg-slate-200 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/15 border-slate-300 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>

        <h3 className="text-2xl md:text-3xl font-black dark:text-white text-slate-950 tracking-tight border-b dark:border-white/10 border-slate-300 pb-4 capitalize">
          {selectedSystem} Commands
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commandNames.map((cmd) => (
            <div
              key={cmd}
              onClick={() => setSelectedCommand(cmd)}
              className="bento-card p-8 cursor-pointer flex items-center justify-center text-center group hover:-translate-y-1 hover:border-cyan-500 border border-slate-300 dark:border-white/10 transition-all shadow-sm"
            >
              <span className="font-black text-lg dark:text-white text-slate-950 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors bento-content">
                {cmd}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // State 3: Terminal View - Selectable text for smooth highlighting and copy-pasting
  const cmdOutput = sysData.commands[selectedCommand];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up pt-2">
      <button
        onClick={() => setSelectedCommand(null)}
        className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-black text-xs uppercase tracking-wider dark:bg-white/10 bg-slate-200 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/15 border-slate-300 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return</span>
      </button>

      {/* Amadeus GDS Terminal Window */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/40 bg-[#030914] ring-1 ring-cyan-500/30">
        <div className="bg-[#071326] px-6 py-4 flex justify-between items-center border-b border-cyan-500/30">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black uppercase px-2.5 py-0.5 rounded bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 tracking-wider">
                {selectedSystem.toUpperCase()} GDS
              </span>
              <h3 className="text-white font-mono text-sm font-black tracking-wide">
                {selectedCommand}
              </h3>
            </div>
          </div>

          <button
            onClick={() => handleCopy(cmdOutput)}
            className="flex items-center gap-1.5 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer border border-cyan-500/40"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Fully selectable text area for effortless highlighting of single/multiple lines */}
        <div className="p-8 overflow-x-auto custom-scroll bg-[#030914] select-text">
          <pre className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-mono font-semibold select-text cursor-text text-cyan-300 tracking-wide selection:bg-cyan-500 selection:text-black">
            {cmdOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};
