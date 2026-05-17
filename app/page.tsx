"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Zap, Shield, Play, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00f3ff11_1px,transparent_1px),linear-gradient(to_bottom,#00f3ff11_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <main className="z-10 w-full max-w-7xl px-6 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel neon-border mb-8">
            <Terminal className="w-4 h-4 text-brand-cyan" />
            <span className="text-sm font-mono text-brand-cyan tracking-wider">INITIATING_SEQUENCE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-magenta neon-text">Code Realm</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
            A gamified coding adventure. Level up from Junior Explorer to Frontend Architect by solving real-world challenges, defeating bosses, and mastering the web.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
            <Link href="/dashboard" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full relative group overflow-hidden rounded-lg bg-brand-cyan/10 border border-brand-cyan px-8 py-4 font-mono font-bold text-brand-cyan transition-all"
              >
                <div className="absolute inset-0 bg-brand-cyan/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 fill-current" />
                  START_ADVENTURE
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full"
        >
          {[
            { icon: Trophy, title: "100+ Levels", desc: "Master HTML, CSS, JS, React, and Performance through progressive challenges.", color: "text-brand-yellow", border: "border-brand-yellow/30" },
            { icon: Code2, title: "Live Editor", desc: "Write code directly in the browser with real-time preview and AI mentor feedback.", color: "text-brand-cyan", border: "border-brand-cyan/30" },
            { icon: Shield, title: "Boss Fights", desc: "Defeat 'The Infinite Re-render' and other legendary bugs to prove your worth.", color: "text-brand-magenta", border: "border-brand-magenta/30" },
          ].map((feature, i) => (
            <div key={i} className={`glass-panel p-8 rounded-xl border ${feature.border} flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300`}>
              <feature.icon className={`w-12 h-12 mb-6 ${feature.color}`} />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
