"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Play, 
  Send, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  Settings,
  Code2,
  Eye,
  Info
} from "lucide-react";
import Link from "next/link";
import CodeEditor from "@/components/CodeEditor";
import LevelPreview from "@/components/LevelPreview";
import { useGameStore } from "@/store/useGameStore";
import { levels } from "@/constants/levels";

export default function PlayLevel() {
  const params = useParams();
  const router = useRouter();
  const levelId = (params?.id as string) || "1";
  const level = levels[levelId] || levels["1"];
  
  const { addXp, completeLevel, unlockLevel } = useGameStore();

  const [html, setHtml] = useState(level.initialHtml);
  const [css, setCss] = useState(level.initialCss);
  const [js, setJs] = useState(level.initialJs);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js" | "preview">("html");
  const [showMentor, setShowMentor] = useState(true);
  const [missionComplete, setMissionComplete] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when levelId changes (if navigated via dashboard)
  useEffect(() => {
    setHtml(level.initialHtml);
    setCss(level.initialCss);
    setJs(level.initialJs);
    setMissionComplete(false);
    setValidationResult(null);
    setActiveTab("html");
  }, [levelId, level]);

  const handleRunCode = () => {
    if (isSubmitting) return;
    console.log("SUBMIT_CODE: Initiating validation...");
    setIsSubmitting(true);
    setValidationResult(null); // Clear previous result to reset UI

    // Simulate analysis delay to provide clear visual feedback to the user
    setTimeout(() => {
      const result = level.validation(html, css, js);
      console.log("VALIDATION_RESULT:", result);
      setValidationResult(result);
      setIsSubmitting(false);
      
      if (result.passed) {
        console.log("MISSION_SUCCESS: Unlocking next sector...");
        setMissionComplete(true);
        completeLevel(parseInt(levelId));
        unlockLevel(parseInt(levelId) + 1);
        addXp(level.xpReward);
      } else {
        console.log("MISSION_FAILED: Requirements not met.");
      }
    }, 800);
  };

  return (
    <div key={levelId} className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 glass-panel border-b border-brand-cyan/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="h-4 w-[1px] bg-white/10 flex-shrink-0" />
          <h1 className="font-mono text-xs sm:text-sm font-bold tracking-tight text-brand-cyan truncate">
            MISSION: {level.title.toUpperCase()}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleRunCode}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${
              isSubmitting 
                ? "bg-brand-cyan/50 text-black/50 cursor-not-allowed" 
                : "bg-brand-cyan text-black hover:shadow-[0_0_15px_var(--color-brand-cyan)]"
            }`}
          >
            {isSubmitting ? (
              <span className="animate-pulse flex items-center gap-2">
                <Settings className="w-3 h-3 animate-spin" />
                ANALYZING
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                SUBMIT_CODE
              </>
            )}
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Instructions */}
        <div className="w-80 glass-panel border-r border-brand-cyan/10 flex flex-col hidden lg:flex">
          <div className="p-6 overflow-y-auto flex-1">
            <h2 className="flex items-center gap-2 text-brand-yellow font-bold mb-4 uppercase tracking-wider text-xs">
              <Info className="w-4 h-4" />
              Briefing
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {level.objective}
            </p>

            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Requirements</h3>
            <ul className="space-y-4">
              {level.instructions.map((inst: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-slate-400">
                  <div className="w-5 h-5 rounded border border-slate-700 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-[10px]">{i + 1}</span>
                  </div>
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 border-t border-brand-cyan/10 bg-brand-cyan/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest">Rewards</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-mono">+{level.xpReward} XP</span>
              <span className="text-xs text-slate-400 font-mono">+50 Credits</span>
            </div>
          </div>
        </div>

        {/* Middle: Editor */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-brand-cyan/10 relative">
          <div className="h-10 bg-black/40 flex items-center px-4 gap-4 border-b border-white/5 overflow-x-auto">
            {[
              { id: "html", label: "index.html", icon: Code2 },
              { id: "css", label: "styles.css", icon: Terminal },
              { id: "js", label: "main.js", icon: Play },
              { id: "preview", label: "Preview", icon: Eye, mobileOnly: true },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 h-full px-2 text-xs font-mono transition-all border-b-2 whitespace-nowrap ${
                  tab.mobileOnly ? "md:hidden" : ""
                } ${
                  activeTab === tab.id 
                    ? "border-brand-cyan text-brand-cyan bg-brand-cyan/5" 
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 relative overflow-hidden">
            {activeTab === "html" && (
              <CodeEditor language="html" value={html} onChange={(v) => setHtml(v || "")} />
            )}
            {activeTab === "css" && (
              <CodeEditor language="css" value={css} onChange={(v) => setCss(v || "")} />
            )}
            {activeTab === "js" && (
              <CodeEditor language="javascript" value={js} onChange={(v) => setJs(v || "")} />
            )}
            {activeTab === "preview" && (
              <div className="absolute inset-0 p-4 md:hidden flex flex-col gap-4 overflow-y-auto bg-brand-dark">
                <div className="h-[300px] flex-shrink-0">
                  <LevelPreview html={html} css={css} js={js} />
                </div>
                <div className="flex-1 min-h-[150px] glass-panel rounded-xl border-slate-800 p-4 font-mono text-[10px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Terminal className="w-3 h-3" />
                      <span>TERMINAL_OUTPUT</span>
                    </div>
                    {validationResult && (
                      <span className={`font-bold ${validationResult.passed ? 'text-green-400' : 'text-brand-magenta'}`}>
                        SCORE: {validationResult.score}/100
                      </span>
                    )}
                  </div>
                  {!validationResult && !isSubmitting ? (
                    <div className="space-y-1 text-slate-500/50">
                      <p>&gt; Starting preview server...</p>
                      <p>&gt; Hot-reload enabled</p>
                      <p>&gt; Awaiting submission...</p>
                    </div>
                  ) : isSubmitting ? (
                    <div className="space-y-2 text-brand-cyan animate-pulse">
                      <p>&gt; Executing code analysis...</p>
                      <p>&gt; Validating syntax constraints...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {validationResult?.feedback?.map((f: string, i: number) => (
                        <p key={i} className="text-green-400">{f}</p>
                      ))}
                      {!validationResult?.passed && (
                        <>
                          <p className="text-brand-magenta font-bold mt-4 tracking-widest uppercase italic">Corrections_Needed:</p>
                          {validationResult?.corrections?.map((c: string, i: number) => (
                            <p key={i} className="text-brand-magenta/80 flex gap-2">
                              <span>&gt;</span>
                              <span>{c}</span>
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* AI Mentor Popover (Small) */}
          <AnimatePresence>
            {showMentor && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 right-6 w-80 glass-panel p-4 rounded-2xl border-brand-purple/40 shadow-2xl z-40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-purple/20 border border-brand-purple/50 flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-purple uppercase tracking-widest">AI_MENTOR</h4>
                    <p className="text-[10px] text-slate-500">Available for hints</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 italic">
                  &quot;{level.hints[hintIndex % level.hints.length]}&quot;
                </p>
                <button 
                  onClick={() => setHintIndex(prev => prev + 1)}
                  className="w-full py-2 rounded-lg bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-all"
                >
                  NEXT_HINT (-10 Credits)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar: Preview */}
        <div className="w-[400px] xl:w-[500px] p-6 bg-brand-dark/50 hidden md:flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-brand-cyan font-bold uppercase tracking-wider text-xs">
              <Eye className="w-4 h-4" />
              Realtime_Preview
            </h2>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-mono">LIVE_FEED</span>
            </div>
          </div>
          
          <div className="h-[260px] flex-shrink-0 lg:h-[300px]">
            <LevelPreview html={html} css={css} js={js} />
          </div>

          {/* Console / Log area */}
          <div className="flex-1 glass-panel rounded-xl border-slate-800 p-4 font-mono text-[10px] overflow-y-auto">
            <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Terminal className="w-3 h-3" />
                <span>TERMINAL_OUTPUT</span>
              </div>
              {validationResult && (
                <span className={`font-bold ${validationResult.passed ? 'text-green-400' : 'text-brand-magenta'}`}>
                  SCORE: {validationResult.score}/100
                </span>
              )}
            </div>
            
            {!validationResult && !isSubmitting ? (
              <div className="space-y-1 text-slate-500/50">
                <p>&gt; Starting preview server...</p>
                <p>&gt; Hot-reload enabled</p>
                <p>&gt; Awaiting submission...</p>
              </div>
            ) : isSubmitting ? (
              <div className="space-y-2 text-brand-cyan animate-pulse">
                <p>&gt; Executing code analysis...</p>
                <p>&gt; Validating syntax constraints...</p>
                <p>&gt; Calculating structural score...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {validationResult.feedback.map((f: string, i: number) => (
                  <p key={i} className="text-green-400">{f}</p>
                ))}
                {!validationResult.passed && (
                  <>
                    <p className="text-brand-magenta font-bold mt-4 tracking-widest uppercase italic">Corrections_Needed:</p>
                    {validationResult.corrections.map((c: string, i: number) => (
                      <p key={i} className="text-brand-magenta/80 flex gap-2">
                        <span>&gt;</span>
                        <span>{c}</span>
                      </p>
                    ))}
                    <p className="text-slate-500 mt-4 italic animate-pulse">Level not passed. Try again explorer.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mission Success Overlay */}
      <AnimatePresence>
        {missionComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel p-12 rounded-3xl border-brand-cyan/30 max-w-lg w-full text-center relative overflow-hidden"
            >
              {/* Particle effects would go here */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
              
              <div className="w-20 h-20 bg-brand-cyan/10 border border-brand-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                <CheckCircle2 className="w-10 h-10 text-brand-cyan" />
              </div>

              <h2 className="text-4xl font-black mb-4 tracking-tighter text-white uppercase italic">Mission_Complete</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Excellent work, Explorer. You&apos;ve stabilized the profile card structure and mastered the basics of HTML survival. New sectors are now accessible.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Score</p>
                  <p className="text-2xl font-black text-brand-yellow">{validationResult?.score}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">XP Earned</p>
                  <p className="text-2xl font-black text-brand-cyan">+{level.xpReward}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Credits</p>
                  <p className="text-2xl font-black text-brand-yellow">+50</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-4 rounded-xl bg-brand-cyan text-black font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all"
                >
                  Return_To_Base
                </button>
                <button 
                  onClick={() => {
                    const nextId = parseInt(levelId) + 1;
                    if (levels[nextId.toString()]) {
                      router.push(`/play/${nextId}`);
                    } else {
                      router.push("/dashboard");
                    }
                  }}
                  className="w-full py-4 rounded-xl bg-white/5 text-slate-400 font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Next_Sector
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
