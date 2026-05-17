"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Sword, Timer, Shield, Trophy, Zap, Search, Loader2 } from "lucide-react";

const activeBattles = [
  { id: 1, type: "Speed Coding", players: "1/2", difficulty: "Medium", reward: "500 XP", time: "10:00" },
  { id: 2, type: "Bug Fixing Race", players: "4/8", difficulty: "Hard", reward: "1200 XP", time: "15:00" },
  { id: 3, type: "CSS Battle", players: "2/2", difficulty: "Medium", reward: "800 XP", time: "05:00" },
];

const leaderboards = [
  { rank: 1, name: "Neon_Ghost", level: 92, xp: "142,500", status: "online" },
  { rank: 2, name: "Zero_Day", level: 88, xp: "135,200", status: "online" },
  { rank: 3, name: "Code_Phantom", level: 85, xp: "128,000", status: "offline" },
  { rank: 4, name: "Binary_Bose", level: 82, xp: "115,400", status: "online" },
];

export default function Arena() {
  const [isMatching, setIsMatching] = useState(false);
  const [selectedBattle, setSelectedBattle] = useState<any>(null);

  const handleJoin = (battle: any) => {
    setSelectedBattle(battle);
    setIsMatching(true);
    // Simulate matching time
    setTimeout(() => {
      setIsMatching(false);
      // In a real app, this would route to the battle instance
      alert(`MATCH_FOUND: Entering ${battle.type} Arena...`);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Active Battles */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Sword className="w-6 h-6 text-brand-magenta flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-mono">Battle_Arena</h2>
            </div>
            <button className="w-full sm:w-auto px-6 py-2 rounded-lg bg-brand-magenta text-white font-bold text-xs hover:shadow-[0_0_15px_var(--color-brand-magenta)] transition-all uppercase tracking-widest">
              Create_Lobby
            </button>
          </div>

          <div className="space-y-6">
            {activeBattles.map((battle) => (
              <motion.div 
                key={battle.id}
                whileHover={{ x: 10 }}
                className="glass-panel p-6 rounded-2xl border-brand-magenta/10 hover:border-brand-magenta/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-brand-magenta/10 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-brand-magenta" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-brand-magenta transition-colors">{battle.type}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {battle.players}</span>
                      <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {battle.time}</span>
                      <span className="text-brand-magenta font-bold">{battle.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Prize Pool</p>
                    <p className="text-base sm:text-lg font-black text-brand-yellow">{battle.reward}</p>
                  </div>
                  <button 
                    onClick={() => handleJoin(battle)}
                    className="flex-1 md:flex-none px-4 sm:px-8 py-3 rounded-xl border border-brand-magenta text-brand-magenta font-bold uppercase tracking-widest text-xs hover:bg-brand-magenta hover:text-white transition-all text-center"
                  >
                    Join_Battle
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Leaderboards */}
        <div className="w-full lg:w-96">
          <div className="glass-panel p-8 rounded-3xl border-white/5 h-full">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-8 uppercase tracking-tight">
              <Trophy className="w-5 h-5 text-brand-yellow" />
              Legendary_Rankings
            </h2>

            <div className="space-y-6">
              {leaderboards.map((player) => (
                <div key={player.rank} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className={`w-6 text-center font-black italic ${player.rank === 1 ? 'text-brand-yellow' : 'text-slate-600'}`}>
                      {player.rank}
                    </span>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-xs uppercase font-bold text-slate-400">{player.name[0]}</span>
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-brand-dark ${player.status === 'online' ? 'bg-green-500' : 'bg-slate-700'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-brand-cyan transition-colors">{player.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">LVL_{player.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total XP</p>
                    <p className="text-xs font-mono text-brand-cyan">{player.xp}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-12 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
              View_Full_Leaderboard
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMatching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-md"
          >
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-t-brand-magenta border-r-transparent border-b-brand-cyan border-l-transparent rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sword className="w-10 h-10 text-brand-magenta animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-widest mb-2">Establishing_Link</h2>
              <p className="text-slate-400 font-mono text-sm">Searching for opponents in {selectedBattle?.type}...</p>
              
              <div className="mt-12 flex justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    className="w-2 h-2 rounded-full bg-brand-magenta"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
