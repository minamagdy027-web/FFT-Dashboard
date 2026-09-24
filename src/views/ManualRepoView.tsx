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
            className="bento-card p-16 cursor-pointer text-center group border-t-2 border-transparent hover:border-cyan-500 hover:-translate-y-1 transition-all"
          >
            <div className="bento-content">
              <h3 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 group-hover:text-cyan-500 transition-colors">
                Amadeus
              </h3>
            </div>
          </div>

          <div
            onClick={() => setSelectedSystem('galileo')}
            className="bento-card p-16 cursor-pointer text-center group border-t-2 border-transparent hover:border-cyan-500 hover:-translate-y-1 transition-all"
          >
            <div className="bento-content">
              <h3 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 group-hover:text-cyan-500 transition-colors">
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
          className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-500 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-slate-900/5 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/10 border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>

        <h3 className="text-2xl md:text-3xl font-extrabold dark:text-white text-gray-900 tracking-tight border-b dark:border-white/10 border-black/10 pb-4 capitalize">
          {selectedSystem} Commands
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commandNames.map((cmd) => (
            <div
              key={cmd}
              onClick={() => setSelectedCommand(cmd)}
              className="bento-card p-8 cursor-pointer flex items-center justify-center text-center group hover:-translate-y-1 hover:border-cyan-500 transition-all"
            >
              <span className="font-extrabold text-lg dark:text-white text-gray-900 group-hover:text-cyan-500 transition-colors bento-content">
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
        className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-500 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-slate-900/5 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/10 border-slate-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return</span>
      </button>

      {/* Amadeus GDS Terminal Window */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-sky-500/30 bg-[#020b14] ring-1 ring-sky-500/20">
        <div className="bg-[#051324] px-6 py-4 flex justify-between items-center border-b border-sky-500/20">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 tracking-widest">
                {selectedSystem.toUpperCase()} GDS
              </span>
              <h3 className="text-white font-mono text-sm font-bold tracking-wide">
                {selectedCommand}
              </h3>
            </div>
          </div>

          <button
            onClick={() => handleCopy(cmdOutput)}
            className="flex items-center gap-1.5 bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition cursor-pointer border border-sky-500/30"
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
        <div className="p-8 overflow-x-auto custom-scroll bg-[#020b14] select-text">
          <pre className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-mono font-medium select-text cursor-text text-sky-400 tracking-wide selection:bg-cyan-500 selection:text-black">
            {cmdOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};
