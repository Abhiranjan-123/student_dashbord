"use client"
import { motion } from "framer-motion"

// Define the interface for the props matching what your page.tsx passes down
interface ActivityCardProps {
  totalProgress: number;
}

export default function ActivityCard({ totalProgress }: ActivityCardProps) {
  // If you are using a circular or horizontal indicator inside, calculate metrics based on the prop
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (totalProgress / 100) * circumference

  return (
    <div className="p-6 md:p-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-6">
      
      {/* Circular Progress SVG Graph Visualizer */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Tracking Ring */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-zinc-800"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Active Colored Indicator Ring */}
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-blue-500"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Absolute Centered Content Label String */}
        <div className="absolute text-center">
          <span className="text-3xl font-black font-mono tracking-tighter text-white">{totalProgress}%</span>
          <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider mt-0.5">Complete</span>
        </div>
      </div>

      {/* Subtext Status Metadata Block */}
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-zinc-200">Consistency Metrics</h4>
        <p className="text-xs text-zinc-500 max-w-[180px]">
          Overall course framework parameters tracking completion indexes.
        </p>
      </div>

    </div>
  )
}
