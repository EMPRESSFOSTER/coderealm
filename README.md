# 🌌 Code Realm

**Code Realm** is a gamified, interactive frontend learning platform designed to teach HTML, CSS, and JavaScript through immersive, cyberpunk-themed missions, boss battles, and puzzle minigames.

## 🚀 Features

*   **Interactive Coding Missions**: Write HTML, CSS, and JavaScript directly in the browser using an integrated, controlled Monaco Editor.
*   **Real-time Live Preview**: Instantly view the results of your code in an isolated, hot-reloading iframe environment.
*   **Intelligent Validation Engine**: Submit your code and receive accurate, highly-specific feedback. The engine uses DOM analysis and strict Regex parsing to evaluate CSS specificity, semantic HTML structure, and JS logic (without failing on formatting differences).
*   **Boss Battles**: Test your mastery in high-stakes levels (like "The Specificity Monster") where you must override complex legacy styles to achieve victory.
*   **Data Decrypt Protocol (Minigame)**: A fun memory-matrix puzzle game integrated into the dashboard to let you farm extra credits and take a break from coding.
*   **Global Progression System**: Powered by Zustand, the platform tracks your XP, Rank, Credits, and unlocked missions in real-time.

## 🛠️ Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4 (with custom `@theme` properties)
*   **Animations**: Framer Motion
*   **Code Editor**: `@monaco-editor/react`
*   **State Management**: Zustand
*   **Icons**: Lucide React

## 🎮 Getting Started

First, make sure you have the dependencies installed:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to enter the realm.

## 🗺️ Project Structure

*   `/app`: Next.js 15 App Router pages and layouts.
    *   `/app/dashboard`: The main hub displaying your stats, map, and daily quests.
    *   `/app/play/[id]`: The interactive coding sector featuring the editor and terminal.
    *   `/app/boss/[id]`: Specialized, high-stakes boss battle arenas.
    *   `/app/puzzle`: The standalone minigames section.
*   `/components`: Reusable UI elements (CodeEditor, LevelCard, LevelPreview, TopNav).
*   `/constants/levels.ts`: Centralized game logic, initial code states, and validation algorithms.
*   `/store/useGameStore.ts`: Global Zustand state for player progression.

## 🛡️ License

This project is created for educational and demonstration purposes.
