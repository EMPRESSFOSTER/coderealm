"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Skull, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  Sword,
  Target,
  AlertCircle
} from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import LevelPreview from "@/components/LevelPreview";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";
import { levels } from "@/constants/levels";

export default function CSSBossBattle() {
  const router = useRouter();
  const { addXp, completeLevel } = useGameStore();
  const level = levels["3"];

  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [html, setHtml] = useState(level.initialHtml);
  const [css, setCss] = useState(level.initialCss);
  const [combatLog, setCombatLog] = useState<string[]>(["&gt; Target acquired: #boss-target", "&gt; Boss used '!important Corruption'", "&gt; Waiting for specificity injection..."]);
  const [isIntro, setIsIntro] = useState(true);
  const [statusMessage, setStatusMessage] = useState("BOSS_ENGAGED: Override the corrupted styles!");

  // Timed "attacks" from the boss
  useEffect(() => {
    if (isIntro || bossHp <= 0) return;

    const interval = setInterval(() => {
      setPlayerHp(prev => Math.max(0, prev - 2));
      if (playerHp <= 10) {
        setStatusMessage("CRITICAL_FAILURE: System integrity failing!");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isIntro, bossHp, playerHp]);

  const handleAttack = () => {
    const result = level.validation(html, css, "");
    
    // Add feedback to log
    const newLogs = result.feedback.map(f => `&gt; ${f}`);
    if (!result.passed) {
      result.corrections?.forEach(c => newLogs.push(`&gt; [CORRECTION] ${c}`));
    }
    setCombatLog(prev => [...prev, ...newLogs]);

    if (result.score > 0) {
      setBossHp(prev => Math.max(0, 100 - result.score));
      setStatusMessage(result.passed ? "DIRECT_HIT: Specificity override successful!" : "PARTIAL_HIT: Specificity increasing...");
      
      if (result.passed && bossHp <= (100 - result.score)) {
        handleVictory(result.score);
      }
    } else {
      setStatusMessage("ATTACK_FAILED: Specificity too low!");
      setPlayerHp(prev => Math.max(0, prev - 10));
    }
  };

  const handleVictory = (score: number) => {
    setStatusMessage("BOSS_DEFEATED: System purified.");
    addXp(level.xpReward);
    completeLevel(3);
  };

  if (isIntro) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Skull className="w-32 h-32 text-brand-magenta mx-auto" />
          </motion.div>
          <h1 className="text-6xl font-black text-white mb-4 tracking-tighter italic uppercase">
            Boss_Encounter
          </h1>
          <h2 className="text-2xl font-bold text-brand-magenta mb-12 font-mono">
            THE_CSS_SPECIFICITY_MONSTER
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 0, 234, 0.5)" }}
            onClick={() => setIsIntro(false)}
            className="px-12 py-4 rounded-full bg-brand-magenta text-white font-black uppercase tracking-[0.2em]"
          >
            INITIATE_BATTLE
          </motion.button>
        </motion.div>

        {/* Glitch overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-1/3 bg-brand-magenta animate-pulse absolute top-0" />
          <div className="w-full h-1/3 bg-brand-cyan animate-pulse absolute bottom-0" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-[#050508] overflow-hidden relative">
      {/* Background Glitch Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Boss Status Bar */}
      <div className="min-h-[6rem] py-4 lg:py-0 lg:h-24 glass-panel border-b border-brand-magenta/30 flex flex-col lg:flex-row items-center px-4 lg:px-12 gap-4 lg:gap-12 relative overflow-hidden">
        <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-brand-magenta/10 border border-brand-magenta flex items-center justify-center">
              <Skull className="w-8 h-8 lg:w-10 lg:h-10 text-brand-magenta" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-black text-white uppercase italic tracking-tighter">SPECIFICITY_MONSTER</h2>
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded bg-brand-magenta/20 text-[10px] text-brand-magenta font-bold border border-brand-magenta/30">ELITE_BOSS</div>
                <div className="text-[10px] text-slate-500 font-mono hidden sm:block">ID: 0xDEADBEEF</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full lg:w-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-brand-magenta flex items-center gap-2">
              <Target className="w-3 h-3" /> BOSS_INTEGRITY
            </span>
            <span className="text-sm font-black text-brand-magenta font-mono">{bossHp}%</span>
          </div>
          <div className="h-4 bg-slate-900 rounded-full border border-brand-magenta/20 overflow-hidden">
            <motion.div 
              animate={{ width: `${bossHp}%` }}
              className="h-full bg-gradient-to-r from-brand-magenta to-red-500 shadow-[0_0_20px_rgba(255,0,234,0.5)]"
            />
          </div>
        </div>

        <div className="w-full lg:w-64">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-brand-cyan flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> PLAYER_SHIELD
            </span>
            <span className="text-sm font-black text-brand-cyan font-mono">{playerHp}%</span>
          </div>
          <div className="h-4 bg-slate-900 rounded-full border border-brand-cyan/20 overflow-hidden">
            <motion.div 
              animate={{ width: `${playerHp}%` }}
              className="h-full bg-brand-cyan shadow-[0_0_20px_rgba(0,243,255,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* Battle Console */}
      <div className="h-10 bg-brand-magenta/10 border-b border-brand-magenta/30 flex items-center px-12 gap-4">
        <AlertCircle className="w-4 h-4 text-brand-magenta animate-pulse" />
        <span className="text-xs font-mono font-bold text-brand-magenta tracking-wider uppercase">
          {statusMessage}
        </span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-brand-magenta/20 min-h-[300px]">
          <div className="h-10 bg-black/40 flex items-center px-4 border-b border-white/5">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <Zap className="w-3 h-3 text-brand-yellow" /> Overwrite CSS
             </span>
          </div>
          <div className="flex-1 relative">
            <CodeEditor language="css" value={css} onChange={(v) => setCss(v || "")} />
          </div>
          <div className="p-4 sm:p-6 bg-brand-magenta/5 border-t border-brand-magenta/20">
            <button 
              onClick={handleAttack}
              className="w-full py-3 sm:py-4 rounded-xl bg-brand-magenta text-white font-black text-sm sm:text-base uppercase tracking-widest sm:tracking-[0.2em] hover:shadow-[0_0_30px_rgba(255,0,234,0.5)] transition-all flex items-center justify-center gap-2 sm:gap-3"
            >
              <Sword className="w-5 h-5 sm:w-6 sm:h-6" />
              EXECUTE_OVERRIDE_ATTACK
            </button>
          </div>
        </div>

        {/* Preview / Monster Area */}
        <div className="w-full lg:w-[500px] xl:w-[600px] bg-black p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 relative overflow-y-auto lg:overflow-visible">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" /> BATTLE_VISUALIZER
            </h3>
          </div>

          <div className="flex-1 relative">
             <LevelPreview html={html} css={css} js="" />
             
             {/* Boss HUD Overlays */}
             <div className="absolute inset-0 pointer-events-none border-2 border-brand-magenta/30 rounded-xl overflow-hidden">
                <div className="absolute top-4 left-4 p-3 glass-panel border-brand-magenta/20 text-[10px] font-mono text-brand-magenta uppercase">
                  MONSTER_SHIELD: ACTIVE<br/>
                  SPECIFICITY: 100/100
                </div>
             </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-slate-800 font-mono text-[10px] h-32 overflow-y-auto">
            <div className="text-brand-magenta mb-2 font-bold uppercase tracking-widest">Combat_Log</div>
            {combatLog.map((log, i) => (
              <p key={i} className={log.includes("✅") ? "text-brand-cyan" : log.includes("[CORRECTION]") ? "text-brand-magenta" : "text-slate-500"}>
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Victory Modal */}
      <AnimatePresence>
        {bossHp <= 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[300] bg-brand-cyan/20 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel p-16 rounded-3xl border-brand-cyan/50 max-w-2xl w-full text-center relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -left-32 w-64 h-64 bg-brand-cyan/10 blur-3xl rounded-full"
              />
              
              <div className="w-24 h-24 bg-brand-cyan/20 border-2 border-brand-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(0,243,255,0.4)]">
                <Trophy className="w-12 h-12 text-brand-cyan" />
              </div>

              <h2 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">Victory_Achieved</h2>
              <p className="text-xl text-brand-cyan font-mono mb-12">THE_SPECIFICITY_MONSTER_HAS_BEEN_PURGED</p>

              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">XP</p>
                  <p className="text-3xl font-black text-brand-cyan">+1500</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Credits</p>
                  <p className="text-3xl font-black text-brand-yellow">+500</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Unlocks</p>
                  <p className="text-3xl font-black text-brand-magenta">THEMES</p>
                </div>
              </div>

              <button 
                onClick={() => router.push("/dashboard")}
                className="w-full py-5 rounded-2xl bg-brand-cyan text-black font-black uppercase tracking-[0.3em] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] transition-all"
              >
                RETURN_AS_CHAMPION
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Defeat Modal */}
      <AnimatePresence>
        {playerHp <= 0 && bossHp > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[300] bg-red-900/50 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="text-center">
              <h2 className="text-8xl font-black text-red-500 mb-8 italic tracking-tighter">Wasted.</h2>
              <p className="text-xl text-white font-mono mb-12 uppercase">Your specificity was too weak.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-12 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
              >
                RESPAWN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Re-using some components from earlier
function Trophy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
