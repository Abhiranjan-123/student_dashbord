"use client"
import { motion } from "framer-motion"
import { CheckCircle2, PlayCircle, Lock } from "lucide-react"

interface Topic {
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export default function TopicList({ course, onBack }: { course: any, onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-xl transition-colors">
          <PlayCircle className="rotate-180 w-6 h-6 text-zinc-500" />
        </button>
        <div>
          <h2 className="text-3xl font-black text-white">{course.title}</h2>
          <p className="text-zinc-500 text-sm">Detailed Curriculum • {course.topics.length} Lessons</p>
        </div>
      </div>

      <div className="grid gap-4">
        {course.topics.map((topic: string, index: number) => {
          const isLocked = index > 1; // Mock logic: Lock lessons after the first two
          const isCompleted = index === 0;

          return (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-3xl border flex items-center justify-between transition-all ${
                isLocked ? "bg-zinc-900/20 border-zinc-900 opacity-50" : "bg-zinc-900 border-zinc-800 hover:border-blue-500/50"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                  isCompleted ? "bg-green-500/10 text-green-500" : "bg-zinc-800 text-zinc-400"
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200">{topic}</h4>
                  <p className="text-xs text-zinc-500">Video Lesson • 12 mins</p>
                </div>
              </div>

              {isLocked ? (
                <Lock className="w-5 h-5 text-zinc-700" />
              ) : (
                <button className="px-4 py-2 bg-zinc-800 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors">
                  Start
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  )
}