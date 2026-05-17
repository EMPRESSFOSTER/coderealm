"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle2, Play, Star } from "lucide-react";
import Link from "next/link";

interface LevelCardProps {
  id: number;
  title: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Boss";
  xpReward: number;
}

export default function LevelCard({
  id,
  title,
  description,
  isUnlocked,
  isCompleted,
  difficulty,
  xpReward,
}: LevelCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy": return "text-green-400 border-green-400/20";
      case "Medium": return "text-brand-yellow border-brand-yellow/20";
      case "Hard": return "text-orange-400 border-orange-400/20";
      case "Boss": return "text-brand-magenta border-brand-magenta/30";
      default: return "text-brand-cyan border-brand-cyan/20";
    }
  };

  return (
    <motion.div
      whileHover={isUnlocked ? { y: -5, scale: 1.02 } : {}}
      className={`glass-panel p-6 rounded-xl border relative overflow-hidden transition-all duration-300 ${
        isUnlocked ? "opacity-100" : "opacity-50 grayscale"
      } ${isCompleted ? "border-green-500/50" : "border-brand-cyan/20"}`}
    >
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 backdrop-blur-[2px]">
          <Lock className="w-8 h-8 text-slate-500" />
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-mono px-2 py-1 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
          LEVEL_{id.toString().padStart(3, '0')}
        </span>
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
      </div>

      <h3 className="text-lg font-bold mb-2 group-hover:text-brand-cyan transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 mb-6 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor()}`}>
            {difficulty}
          </span>
          <span className="text-xs text-brand-cyan font-mono">+{xpReward} XP</span>
        </div>

        {isUnlocked ? (
          <Link
            href={difficulty === "Boss" ? `/boss/${id}` : `/play/${id}`}
            className="p-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-black transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
          </Link>
        ) : (
          <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-500 cursor-not-allowed">
            <Lock className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Decorative pulse for boss levels */}
      {difficulty === "Boss" && isUnlocked && (
        <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-brand-magenta/20 blur-xl rounded-full animate-pulse" />
      )}
    </motion.div>
  );
}
