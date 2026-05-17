"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { ArrowLeft, TerminalSquare, ShieldAlert, Zap, Lock, Unlock } from "lucide-react";
import Link from "next/link";

const WORDS = ["FETCH", "ASYNC", "AWAIT", "CONST", "ARRAY", "CLASS", "PROPS", "STATE", "HOOKS", "EVENT", "ALIGN", "COLOR", "WIDTH", "HOVER", "FOCUS", "INDEX", "ROUTE", "QUERY", "MODEL", "REACT"];
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function TerminalBreach() {
  const router = useRouter();
  const { addCoins } = useGameStore();
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  useEffect(() => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) return;
        
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess === targetWord) {
          setIsVictory(true);
          setGameOver(true);
          addCoins(150); // Big reward for winning
        } else if (newGuesses.length >= MAX_GUESSES) {
          setGameOver(true);
        }
      } else if (e.key === "Backspace") {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => (prev + e.key).toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, gameOver, guesses, targetWord, addCoins]);

  const resetGame = () => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setIsVictory(false);
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < MAX_GUESSES; i++) {
      const isCurrentRow = i === guesses.length;
      const guess = isCurrentRow ? currentGuess : guesses[i] || "";
      
      const row = [];
      for (let j = 0; j < WORD_LENGTH; j++) {
        const letter = guess[j] || "";
        let bgColor = "bg-black/60 border-slate-800";
        let animationDelay = 0;
        
        if (i < guesses.length) {
          animationDelay = j * 0.1;
          if (letter === targetWord[j]) {
            bgColor = "bg-green-500/20 border-green-500 text-green-400";
          } else if (targetWord.includes(letter)) {
            bgColor = "bg-brand-yellow/20 border-brand-yellow text-brand-yellow";
          } else {
            bgColor = "bg-slate-900 border-slate-700 text-slate-500";
          }
        } else if (isCurrentRow && letter) {
          bgColor = "bg-brand-magenta/10 border-brand-magenta shadow-[0_0_10px_rgba(255,0,234,0.2)]";
        }

        row.push(
          <motion.div
            key={j}
            initial={i < guesses.length ? { rotateX: 90 } : false}
            animate={{ rotateX: 0 }}
            transition={{ delay: animationDelay, duration: 0.3 }}
            className={`w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center text-2xl font-bold font-mono rounded ${bgColor}`}
          >
            {letter}
          </motion.div>
        );
      }
      grid.push(<div key={i} className="flex gap-2 mb-2">{row}</div>);
    }
    return grid;
  };

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 glass-panel rounded-lg hover:bg-white/5 transition-colors border-brand-cyan/20">
            <ArrowLeft className="w-5 h-5 text-brand-cyan" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold font-mono uppercase tracking-widest text-brand-magenta flex items-center gap-2">
            <TerminalSquare className="w-6 h-6 hidden md:block" />
            Terminal_Breach
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-yellow" />
            Firewall Active
          </h2>
          <p className="text-xs text-slate-500">Guess the 5-letter access code to bypass.</p>
        </div>

        <div className="flex flex-col items-center">
          {renderGrid()}
        </div>

        {!gameOver && (
          <div className="mt-8 text-slate-500 text-xs font-mono text-center">
            Type using your keyboard. Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">ENTER</kbd> to submit.
          </div>
        )}
      </div>

      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className={`glass-panel p-10 rounded-2xl border text-center max-w-sm w-full ${isVictory ? 'border-brand-cyan' : 'border-red-500'}`}>
              {isVictory ? (
                <>
                  <Unlock className="w-16 h-16 text-brand-cyan mx-auto mb-6" />
                  <h2 className="text-3xl font-black uppercase text-brand-cyan mb-2">Breached!</h2>
                  <p className="text-slate-400 mb-6 font-mono text-sm">Firewall bypassed successfully.</p>
                  <div className="bg-brand-cyan/10 border border-brand-cyan/30 p-4 rounded-xl mb-8">
                    <p className="text-xs text-brand-cyan uppercase tracking-widest font-bold mb-1">Bounty Claimed</p>
                    <p className="text-3xl font-black text-brand-cyan">+150 Credits</p>
                  </div>
                </>
              ) : (
                <>
                  <Lock className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-black uppercase text-red-500 mb-2">Access Denied</h2>
                  <p className="text-slate-400 mb-6 font-mono text-sm">The code was: <span className="text-white font-bold">{targetWord}</span></p>
                </>
              )}

              <div className="flex flex-col gap-3">
                <button onClick={resetGame} className="w-full py-3 bg-brand-magenta text-white font-bold uppercase rounded-lg hover:shadow-[0_0_15px_rgba(255,0,234,0.5)] transition-all">
                  Try Again
                </button>
                <button onClick={() => router.push("/dashboard")} className="w-full py-3 bg-transparent border border-slate-700 text-slate-300 font-bold uppercase rounded-lg hover:bg-white/5 transition-all">
                  Return to Base
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
