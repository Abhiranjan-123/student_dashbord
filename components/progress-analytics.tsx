"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, CheckSquare, ListTodo, Award } from "lucide-react"

export default function ProgressAnalytics({ data }: { data: any[] }) {
  // 1. Initialize as null or first element if immediately present
  const [focusedCourse, setFocusedCourse] = useState<any>(data?.[0] || null)

  // 2. Synchronize state when data loads from Supabase asynchronously
  useEffect(() => {
    if (data && data.length > 0 && !focusedCourse) {
      setFocusedCourse(data[0])
    }
  }, [data, focusedCourse])

  // 3. Graceful fallback guard clause if data array is still completely empty
  if (!data || data.length === 0 || !focusedCourse) {
    return (
      <div className="p-8 border border-zinc-800/60 bg-zinc-900/10 rounded-[2.5rem] text-zinc-500 text-sm text-center">
        No analytics parameters available yet. Populate records in your Supabase table.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Subject Mapping Graph Bar Layouts */}
      <div className="lg:col-span-2 p-6 md:p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-lg text-white">Subject Progress Map</h3>
            <p className="text-xs text-zinc-500">Click individual parameters to review micro-level checklists</p>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          {data.map((course) => {
            const total = course.topics?.length || 0
            const finishedCount = Math.floor(((course.progress || 0) / 100) * total)
            const isFocused = focusedCourse.id === course.id

            return (
              <div 
                key={course.id}
                onClick={() => setFocusedCourse(course)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3 ${
                  isFocused ? "bg-zinc-950 border-blue-500/60 shadow-lg" : "bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-sm text-zinc-200 block">{course.title}</span>
                    <span className="text-[11px] text-zinc-500 font-semibold">{finishedCount} of {total} topics complete</span>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${course.progress === 100 ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-400"}`}>
                    {course.progress}%
                  </span>
                </div>

                {/* Progress bars split block */}
                <div className="flex gap-1.5 h-2 items-end pt-1 w-full">
                  {(course.topics || []).map((_: string, idx: number) => {
                    const done = idx < finishedCount
                    return (
                      <div key={idx} className="flex-1 h-2 rounded-full relative bg-zinc-800 overflow-hidden">
                        <motion.div 
                          className={`h-full w-full ${done ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-zinc-800"}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Target focus details section (Where You Stand Info Box) */}
      <div className="p-6 md:p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] space-y-6">
        <div className="border-b border-zinc-800/80 pb-4">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">Where You Stand</span>
          {/* ✅ Safe referencing now guaranteed by safety guard above */}
          <h3 className="font-black text-xl text-white mt-1">{focusedCourse.title}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-950 border border-zinc-800/60 rounded-xl flex items-center gap-3">
            <CheckSquare className="w-4 h-4 text-green-400" />
            <div>
              <span className="text-xs text-zinc-500 block leading-none">Finished</span>
              <span className="font-mono text-sm font-bold text-zinc-200 mt-1 block">
                {Math.floor(((focusedCourse.progress || 0) / 100) * (focusedCourse.topics?.length || 0))}
              </span>
            </div>
          </div>
          <div className="p-4 bg-zinc-950 border border-zinc-800/60 rounded-xl flex items-center gap-3">
            <ListTodo className="w-4 h-4 text-zinc-400" />
            <div>
              <span className="text-xs text-zinc-500 block leading-none">Remaining</span>
              <span className="font-mono text-sm font-bold text-zinc-200 mt-1 block">
                {(focusedCourse.topics?.length || 0) - Math.floor(((focusedCourse.progress || 0) / 100) * (focusedCourse.topics?.length || 0))}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-zinc-400 block">Syllabus Sequence Details</span>
          <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
            {(focusedCourse.topics || []).map((topic: string, i: number) => {
              const done = i < Math.floor(((focusedCourse.progress || 0) / 100) * (focusedCourse.topics?.length || 0))
              return (
                <div key={topic} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${done ? "bg-green-500/5 border-green-500/25 text-zinc-300" : "bg-zinc-950/60 border-zinc-800/80 text-zinc-500"}`}>
                  <span className="truncate max-w-[170px]">{topic}</span>
                  {done ? <Award className="w-4 h-4 text-green-400 flex-shrink-0" /> : <span className="text-[10px] opacity-40">Pending</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}