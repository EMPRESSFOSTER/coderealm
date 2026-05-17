"use client";

import Link from "next/link";
import { Code2, Trophy, User, Settings, Bell } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

export default function TopNav() {
  const { level, rank, xp } = useGameStore();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 glass-panel border-b border-brand-cyan/20 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-cyan flex-shrink-0" />
        <Link href="/" className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white hover:text-brand-cyan transition-colors truncate">
          CODE_REALM
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/dashboard" className="text-slate-300 hover:text-brand-cyan transition-colors neon-text-hover flex items-center gap-2">
          Dashboard
        </Link>
        <Link href="/dashboard" className="text-slate-300 hover:text-brand-cyan transition-colors flex items-center gap-2">
          Levels
        </Link>
        <Link href="/arena" className="text-slate-300 hover:text-brand-cyan transition-colors flex items-center gap-2">
          Arena
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-300 hover:text-brand-yellow transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand-yellow rounded-full shadow-[0_0_5px_var(--color-brand-yellow)]"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[10px] text-brand-cyan font-mono uppercase tracking-tighter">LVL_{level} {rank}</span>
            <span className="text-sm font-bold">EXPLORER_99</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_var(--color-brand-purple)] transition-shadow">
            <User className="w-4 h-4 text-brand-purple" />
          </div>
        </div>
      </div>
    </nav>
  );
}
