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

  // State 1: Choose System (Amadeus or Galileo) - clean font only, no icons, no subtitles
  if (!selectedSystem) {
    return (
      <div className="space-y-6 animate-fade-in-up pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            onClick={() => setSelectedSystem('amadeus')}
            className="bento-card p-16 cursor-pointer text-center group border-t-2 border-transparent hover:border-sky-400 hover:-translate-y-1 transition-all"
          >
            <div className="bento-content">
              <h3 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 group-hover:text-sky-400 transition-colors">
                Amadeus
              </h3>
            </div>
          </div>

          <div
            onClick={() => setSelectedSystem('galileo')}
            className="bento-card p-16 cursor-pointer text-center group border-t-2 border-transparent hover:border-sky-400 hover:-translate-y-1 transition-all"
          >
            <div className="bento-content">
              <h3 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 group-hover:text-sky-400 transition-colors">
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

  // State 2: Category Commands
  if (!selectedCommand) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-fade-in-up pt-2">
        <button
          onClick={() => setSelectedSystem(null)}
          className="flex items-center gap-1.5 text-slate-500 hover:text-sky-400 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-slate-900/5 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/10 border-slate-200"
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
              className="bento-card p-8 cursor-pointer flex items-center justify-center text-center group hover:-translate-y-1 hover:border-sky-400 transition-all"
            >
              <span className="font-extrabold text-lg dark:text-white text-gray-900 group-hover:text-sky-400 transition-colors bento-content">
                {cmd}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // State 3: Terminal View - Crisp High-Contrast Black & White
  const cmdOutput = sysData.commands[selectedCommand];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up pt-2">
      <button
        onClick={() => setSelectedCommand(null)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-sky-400 font-bold text-xs uppercase tracking-widest dark:bg-white/5 bg-slate-900/5 px-4 py-2.5 rounded-xl cursor-pointer transition-colors border dark:border-white/10 border-slate-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return</span>
      </button>

      <div className="rounded-2xl overflow-hidden shadow-2xl border dark:border-white/15 border-slate-800 bg-black">
        <div className="bg-[#08080c] px-6 py-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
            </div>
            <h3 className="text-white font-mono text-sm font-bold tracking-wide">
              {selectedCommand}
            </h3>
          </div>

          <button
            onClick={() => handleCopy(cmdOutput)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition cursor-pointer border border-white/15"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-sky-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="gds-terminal p-8 overflow-x-auto custom-scroll bg-[#030305] text-white">
          <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono font-medium select-all text-white">
            {cmdOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};
