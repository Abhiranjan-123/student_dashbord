"use client"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"

export default function CourseCard({ course, index, onClick }: any) {
  const Icon = (Icons as any)[course.icon] || Icons.Book
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="p-6 bg-zinc-900 border border-zinc-800 rounded-[2rem] space-y-8 cursor-pointer hover:border-blue-500 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="p-3 bg-zinc-800 rounded-2xl"><Icon className="w-6 h-6 text-blue-400" /></div>
        <span className="text-xs font-bold text-zinc-500">{course.progress}%</span>
      </div>
      <div>
        <h3 className="font-bold text-white text-lg">{course.title}</h3>
        <div className="mt-4 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${course.progress}%` }} 
            className="h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" 
          />
        </div>
      </div>
    </motion.div>
  )
}