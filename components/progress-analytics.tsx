"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, CheckSquare, ListTodo, Award } from "lucide-react"

export default function ProgressAnalytics({ data }: { data: any[] }) {
  const [focus, setFocus] = useState<any>(null)

  useEffect(() => {
    if (data?.length > 0 && !focus) setFocus(data[0])
  }, [data, focus])

  if (!data?.length || !focus) return <div className="p-10 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading Graph Data...</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 rounded-[2rem] space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-blue-500" />
          <h2 className="font-black text-lg uppercase tracking-tighter">Subject Metrics</h2>
        </div>
        <div className="space-y-4">
          {data.map((c) => (
            <div key={c.id} onClick={() => setFocus(c)} className={`p-4 rounded-2xl border cursor-pointer transition-all ${focus.id === c.id ? "bg-zinc-950 border-blue-500/50" : "bg-transparent border-zinc-800"}`}>
              <div className="flex justify-between text-sm font-bold mb-3 px-1">
                <span>{c.title}</span>
                <span className="text-blue-500">{c.progress}%</span>
              </div>
              <div className="flex gap-1 h-1.5">
                {c.topics?.map((_: any, i: number) => (
                  <div key={i} className={`flex-1 rounded-full ${i < Math.floor((c.progress / 100) * c.topics.length) ? "bg-blue-500" : "bg-zinc-800"}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-[2rem] space-y-6 h-fit">
        <div className="border-b border-zinc-800 pb-4">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Where you stand</span>
          <h3 className="text-xl font-black mt-1">{focus.title}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
            <CheckSquare className="w-4 h-4 text-green-500 mb-2" />
            <div className="text-lg font-mono font-bold">{Math.floor((focus.progress/100)*focus.topics.length)}</div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase">Done</div>
          </div>
          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
            <ListTodo className="w-4 h-4 text-zinc-400 mb-2" />
            <div className="text-lg font-mono font-bold">{focus.topics.length - Math.floor((focus.progress/100)*focus.topics.length)}</div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase">To Go</div>
          </div>
        </div>
      </div>
    </div>
  )
}
