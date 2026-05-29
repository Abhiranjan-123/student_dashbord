"use client"
import { motion } from "framer-motion"

export default function HeroCard({ userName, onContinue }: { userName: string, onContinue: () => void }) {
  return (
    <motion.div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 p-8 md:p-10 lg:w-[80%]">
      <div className="relative z-10 space-y-6">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          Ready to learn, <br/>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{userName}?</span>
        </h1>
        <p className="text-zinc-500 max-w-md">Your progress is 15% higher than last week. Keep the momentum going!</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="px-8 py-3 bg-white text-black font-bold rounded-xl shadow-lg shadow-white/5"
        >
          Continue Learning
        </motion.button>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
    </motion.div>
  )
}