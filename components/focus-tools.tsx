"use client"
import { useState, useEffect, useRef } from "react"
import { Moon, Sun, Eye, EyeOff, Bell, BellOff, Timer, Play, Square, RotateCcw } from "lucide-react"

export default function FocusTools({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (v: boolean) => void }) {
  // Focus state arrays
  const [dhyaanActive, setDhyaanActive] = useState(false)
  const [snoozeActive, setSnoozeActive] = useState(false)

  // Stopwatch state properties
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Dynamic Theme Controls */}
      <div 
        onClick={() => setDarkMode(!darkMode)} 
        className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] flex flex-col justify-between h-48 cursor-pointer hover:border-zinc-700 transition-all shadow-sm group relative overflow-hidden"
      >
        <div className="flex justify-between items-center relative z-10">
          <div className={`p-3 rounded-2xl ${darkMode ? "bg-purple-500/10 text-purple-400" : "bg-yellow-500/10 text-yellow-600"}`}>
            {darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </div>
          <div className={`w-10 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-purple-600' : 'bg-zinc-700'}`}>
            <div className={`bg-white w-4 h-4 rounded-full transition-transform ${darkMode ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>
        <div className="relative z-10">
          <span className="font-black text-xl text-white tracking-tight block">Theme Mode</span>
          <span className="text-xs text-zinc-500 mt-1 block">Toggle appearance options dynamically</span>
        </div>
      </div>

      {/* Dhyaan (Concentration) Mode Option */}
      <div 
        onClick={() => setDhyaanActive(!dhyaanActive)} 
        className={`p-8 border rounded-[2.5rem] flex flex-col justify-between h-48 cursor-pointer transition-all relative overflow-hidden ${
          dhyaanActive ? "bg-blue-950/40 border-blue-500/50 shadow-md" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className={`p-3 rounded-2xl ${dhyaanActive ? "bg-blue-500 text-white" : "bg-zinc-800 text-blue-400"}`}>
            {dhyaanActive ? <Eye className="w-6 h-6 animate-pulse" /> : <EyeOff className="w-6 h-6" />}
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${dhyaanActive ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
            {dhyaanActive ? 'Active' : 'Disabled'}
          </span>
        </div>
        <div>
          <span className="font-black text-xl text-white tracking-tight block">Dhyaan Mode</span>
          <span className="text-xs text-zinc-500 mt-1 block">Locks attention monitors, hides ambient system alerts</span>
        </div>
      </div>

      {/* Snooze (Concentration Alert Muting) Block */}
      <div 
        onClick={() => setSnoozeActive(!snoozeActive)} 
        className={`p-8 border rounded-[2.5rem] flex flex-col justify-between h-48 cursor-pointer transition-all ${
          snoozeActive ? "bg-orange-950/40 border-orange-500/50 shadow-md" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className={`p-3 rounded-2xl ${snoozeActive ? "bg-orange-500 text-white" : "bg-zinc-800 text-orange-400"}`}>
            {snoozeActive ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${snoozeActive ? 'bg-orange-500/20 text-orange-400' : 'bg-zinc-800 text-zinc-500'}`}>
            {snoozeActive ? 'Muted' : 'Live'}
          </span>
        </div>
        <div>
          <span className="font-black text-xl text-white tracking-tight block">Snooze Focus</span>
          <span className="text-xs text-zinc-500 mt-1 block">Silence notifications to clear the screen space</span>
        </div>
      </div>

      {/* Interactive Stopwatch System */}
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] flex flex-col justify-between h-48">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-zinc-800 rounded-2xl text-green-400">
              <Timer className={`w-6 h-6 ${isRunning ? "animate-spin" : ""}`} style={{ animationDuration: '4s' }} />
            </div>
            <span className="text-2xl font-mono font-black text-white">{formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsRunning(!isRunning)} 
              className={`p-2.5 rounded-xl transition-colors ${isRunning ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"}`}
            >
              {isRunning ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button 
              onClick={() => { setTime(0); setIsRunning(false); }} 
              className="p-2.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <span className="font-black text-xl text-white tracking-tight block">Session Stopwatch</span>
          <span className="text-xs text-zinc-500 mt-1 block">Track local time metrics directly inside lessons</span>
        </div>
      </div>

    </div>
  )
}