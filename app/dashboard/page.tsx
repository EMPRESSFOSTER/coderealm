"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import LevelCard from "@/components/LevelCard";
import { Trophy, Zap, Coins, Sword, Map as MapIcon, ChevronRight, Gamepad2, Fingerprint, TerminalSquare } from "lucide-react";
import Link from "next/link";

import { levels } from "@/constants/levels";

const levelList = Object.values(levels);

export default function Dashboard() {
  const { xp, level, rank, coins, unlockedLevels, completedLevels, addXp, addCoins } = useGameStore();
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);

  const progress = (xp % 1000) / 10; // Simple XP bar for current level

  const handleClaimQuest = (index: number, rewardXp: number, rewardCoins: number) => {
    if (completedQuests.includes(index)) return;
    setCompletedQuests([...completedQuests, index]);
    addXp(rewardXp);
    addCoins(rewardCoins);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      {/* Header / Stats Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-brand-cyan/20 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-brand-cyan/30 flex items-center justify-center bg-brand-cyan/5">
              <span className="text-3xl font-bold neon-text">{level}</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-magenta px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-tighter">
              RANK
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{rank}</h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple"
                />
              </div>
              <span className="text-xs font-mono text-slate-400">{xp % 1000}/1000 XP</span>
            </div>
            <span className="text-xs text-brand-cyan font-mono tracking-widest uppercase">TOTAL_EXPERIENCE: {xp}</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-brand-yellow/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center">
            <Coins className="w-6 h-6 text-brand-yellow" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Credits</p>
            <p className="text-2xl font-bold text-brand-yellow">{coins}</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-brand-magenta/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-brand-magenta" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Completed</p>
            <p className="text-2xl font-bold text-brand-magenta">{completedLevels.length}</p>
          </div>
        </div>
      </div>

      {/* Main Map Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <MapIcon className="w-6 h-6 text-brand-cyan flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-mono">Mission_Map</h2>
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button className="px-4 py-2 rounded-lg glass-panel text-xs font-mono border-brand-cyan/20 text-brand-cyan whitespace-nowrap">ALL_REGIONS</button>
            <button className="px-4 py-2 rounded-lg glass-panel text-xs font-mono border-slate-700 text-slate-500 whitespace-nowrap">BOSS_ONLY</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelList.map((levelData) => (
            <LevelCard
              key={levelData.id}
              id={levelData.id}
              title={levelData.title}
              description={levelData.description}
              difficulty={levelData.difficulty}
              xpReward={levelData.xpReward}
              isUnlocked={unlockedLevels.includes(levelData.id)}
              isCompleted={completedLevels.includes(levelData.id)}
            />
          ))}
        </div>
      </div>

      {/* Minigames Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-brand-purple" />
          Minigames / Simulations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/puzzle" className="glass-panel p-6 rounded-2xl border-brand-purple/30 hover:border-brand-purple hover:shadow-[0_0_20px_rgba(157,0,255,0.2)] transition-all group cursor-pointer block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Fingerprint className="w-6 h-6 text-brand-purple" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Data Decrypt Protocol</h3>
                <p className="text-xs text-brand-purple uppercase tracking-widest font-mono">Memory Matrix</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">Match the data node fragments to bypass security and farm extra credits.</p>
            <div className="flex items-center text-xs text-brand-yellow font-mono gap-1">
              <Coins className="w-3 h-3" />
              <span>Up to +100 Credits</span>
            </div>
          </Link>

          <Link href="/breach" className="glass-panel p-6 rounded-2xl border-brand-magenta/30 hover:border-brand-magenta hover:shadow-[0_0_20px_rgba(255,0,234,0.2)] transition-all group cursor-pointer block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand-magenta/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TerminalSquare className="w-6 h-6 text-brand-magenta" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Terminal Breach</h3>
                <p className="text-xs text-brand-magenta uppercase tracking-widest font-mono">Word Sequence</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">Crack the firewall by guessing the 5-letter web development access code.</p>
            <div className="flex items-center text-xs text-brand-yellow font-mono gap-1">
              <Coins className="w-3 h-3" />
              <span>+150 Credits</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Daily Challenges Section */}
      <div className="glass-panel p-8 rounded-3xl border-brand-cyan/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap className="w-32 h-32 text-brand-cyan" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-yellow" />
            Daily Quests
          </h2>
          
          <div className="space-y-4">
            {[
              { task: "Build a navbar in 5 mins", reward: 150, coins: 50 },
              { task: "Fix 10 accessibility issues", reward: 200, coins: 75 },
              { task: "Create animation challenge", reward: 300, coins: 100 },
            ].map((quest, i) => (
              <div 
                key={i} 
                onClick={() => handleClaimQuest(i, quest.reward, quest.coins)}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group gap-3 sm:gap-0 ${
                  completedQuests.includes(i) 
                    ? "bg-brand-cyan/5 border-brand-cyan/30 opacity-60" 
                    : "bg-white/5 border-white/5 hover:border-brand-cyan/30"
                }`}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${completedQuests.includes(i) ? 'bg-brand-cyan' : 'bg-slate-600'}`} />
                  <span className={`transition-colors break-words text-sm sm:text-base ${completedQuests.includes(i) ? 'text-brand-cyan line-through' : 'text-slate-300 group-hover:text-white'}`}>
                    {quest.task}
                  </span>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end sm:justify-start">
                  <span className="text-xs font-mono text-brand-cyan">
                    {completedQuests.includes(i) ? 'CLAIMED' : `+${quest.reward} XP`}
                  </span>
                  {!completedQuests.includes(i) && <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-brand-cyan transition-colors" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
