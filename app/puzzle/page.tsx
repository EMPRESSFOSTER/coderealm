"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { ArrowLeft, Cpu, Database, Network, Shield, Terminal, Zap, Hash, Server, Fingerprint } from "lucide-react";
import Link from "next/link";

const icons = [Cpu, Database, Network, Shield, Terminal, Zap, Hash, Server];

const generateDeck = () => {
  const deck = [...icons, ...icons].map((Icon, i) => ({
    id: i,
    icon: Icon,
    isFlipped: false,
    isMatched: false,
  }));
  return deck.sort(() => Math.random() - 0.5);
};

export default function PuzzleMinigame() {
  const router = useRouter();
  const { addCoins } = useGameStore();
  const [deck, setDeck] = useState(generateDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [reward, setReward] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = flippedCards;
      
      if (deck[firstIndex].icon === deck[secondIndex].icon) {
        setDeck((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setDeck((prev) =>
            prev.map((card, i) =>
              i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
      setMoves((m) => m + 1);
    }
  }, [flippedCards, deck]);

  useEffect(() => {
    if (deck.length > 0 && deck.every((card) => card.isMatched)) {
      setIsVictory(true);
      const earnedCoins = Math.max(10, 100 - moves * 2);
      setReward(earnedCoins);
      addCoins(earnedCoins);
    }
  }, [deck, moves, addCoins]);

  const handleCardClick = (index: number) => {
    if (isLocked || deck[index].isFlipped || deck[index].isMatched) return;
    setDeck((prev) => prev.map((card, i) => (i === index ? { ...card, isFlipped: true } : card)));
    setFlippedCards((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setDeck(generateDeck());
    setFlippedCards([]);
    setMoves(0);
    setIsLocked(false);
    setIsVictory(false);
    setReward(0);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 glass-panel rounded-lg hover:bg-white/5 transition-colors border-brand-cyan/20">
            <ArrowLeft className="w-5 h-5 text-brand-cyan" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold font-mono uppercase tracking-widest text-brand-cyan flex items-center gap-2">
            <Fingerprint className="w-6 h-6 hidden md:block" />
            Data_Decrypt_Protocol
          </h1>
        </div>
        <div className="glass-panel px-4 py-2 rounded-lg border-brand-yellow/20">
          <span className="text-brand-yellow font-mono font-bold text-sm">MOVES: {moves}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-2xl">
          {deck.map((card, i) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(i)}
              className={`aspect-square cursor-pointer rounded-xl flex items-center justify-center border-2 transition-all duration-300 transform-gpu ${
                card.isFlipped || card.isMatched
                  ? "bg-brand-cyan/20 border-brand-cyan shadow-[0_0_15px_rgba(0,243,255,0.4)] rotate-y-180"
                  : "bg-black/60 border-slate-800 hover:border-brand-purple/50 hover:bg-brand-purple/10"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {(card.isFlipped || card.isMatched) ? (
                  <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                    <card.icon className="w-8 h-8 md:w-12 md:h-12 text-brand-cyan" />
                  </motion.div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <Fingerprint className="w-6 h-6 md:w-8 md:h-8 text-slate-600" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isVictory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="glass-panel p-10 rounded-2xl border-brand-cyan text-center max-w-sm w-full">
              <Zap className="w-16 h-16 text-brand-yellow mx-auto mb-6" />
              <h2 className="text-3xl font-black uppercase text-brand-cyan mb-2">Decrypted!</h2>
              <p className="text-slate-400 mb-6 font-mono text-sm">Protocol bypassed in {moves} moves.</p>
              
              <div className="bg-brand-yellow/10 border border-brand-yellow/30 p-4 rounded-xl mb-8">
                <p className="text-xs text-brand-yellow uppercase tracking-widest font-bold mb-1">Bounty Claimed</p>
                <p className="text-3xl font-black text-brand-yellow">+{reward} Credits</p>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={resetGame} className="w-full py-3 bg-brand-cyan text-black font-bold uppercase rounded-lg hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all">
                  Run Again
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
