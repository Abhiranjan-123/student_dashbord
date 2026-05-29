"use client"
import { motion } from "framer-motion"
import { LayoutDashboard, BookOpen, BarChart3, Settings, Compass } from "lucide-react"

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Lessons", icon: BookOpen },
    { id: "analytics", label: "Progress", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-72 hidden md:flex flex-col h-screen bg-zinc-950 border-r border-zinc-900 p-6 justify-between select-none">
      <div className="space-y-12">
        {/* Main Interface Branded Header Slot */}
        <div className="flex items-center gap-3 px-3 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/10">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <span className="text-lg font-black tracking-tight text-white uppercase italic">
            EduPulse<span className="text-blue-500">.</span>
          </span>
        </div>

        {/* Sidebar Menu Iterations Matrix */}
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon
            const isTabSelected = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all outline-none ${
                  isTabSelected ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {/* Smooth matching motion background slides */}
                {isTabSelected && (
                  <motion.div
                    layoutId="activeTabIndicatorBackground"
                    className="absolute inset-0 bg-zinc-900 border border-zinc-800/60 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                <IconComponent className={`w-5 h-5 relative z-10 transition-colors ${
                  isTabSelected ? "text-blue-500" : "text-zinc-500"
                }`} />
                
                <span className="relative z-10 tracking-wide">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Account Profiler Node Widget */}
      <div className="p-2 border border-zinc-900 bg-zinc-900/10 rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-800/80 font-black flex items-center justify-center text-xs text-zinc-300 border border-zinc-700/30">
          AR
        </div>
        <div>
          <span className="text-xs font-black text-zinc-200 block leading-tight">Abhiranjan</span>
          <span className="text-[10px] text-zinc-600 font-bold block mt-0.5 uppercase tracking-wider">Premium Access</span>
        </div>
      </div>
    </aside>
  )
}