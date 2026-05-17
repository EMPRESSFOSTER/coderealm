import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
  xp: number;
  level: number;
  rank: string;
  coins: number;
  unlockedLevels: number[];
  completedLevels: number[];
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  unlockLevel: (levelId: number) => void;
  completeLevel: (levelId: number) => void;
}

export const useGameStore = create<PlayerState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      rank: 'Junior Frontend Explorer',
      coins: 100,
      unlockedLevels: [1],
      completedLevels: [],

      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        // Simple level up logic: every 1000 XP is a new level
        const newLevel = Math.floor(newXp / 1000) + 1;
        
        let newRank = state.rank;
        if (newLevel >= 5) newRank = 'CSS Fighter';
        if (newLevel >= 15) newRank = 'JavaScript Ninja';
        if (newLevel >= 30) newRank = 'React Warrior';
        if (newLevel >= 50) newRank = 'Frontend Wizard';
        if (newLevel >= 75) newRank = 'UI Architect';
        if (newLevel >= 90) newRank = 'Legendary Engineer';

        return { xp: newXp, level: newLevel, rank: newRank };
      }),

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      unlockLevel: (levelId) => set((state) => ({
        unlockedLevels: state.unlockedLevels.includes(levelId) 
          ? state.unlockedLevels 
          : [...state.unlockedLevels, levelId]
      })),

      completeLevel: (levelId) => set((state) => ({
        completedLevels: state.completedLevels.includes(levelId)
          ? state.completedLevels
          : [...state.completedLevels, levelId]
      })),
    }),
    {
      name: 'coderealm-player-storage',
    }
  )
);
