"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, BookOpen, BarChart3, Settings, Menu, X, Compass } from "lucide-react"

export default function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Lessons", icon: BookOpen },
    { id: "analytics", label: "Progress", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const Content = () => (
    <div className="flex flex-col h-full bg-zinc-950 p-6">
      <div className="flex items-center gap-3 px-3 mb-12">
        <Compass className="text-blue-500 w-8 h-8" />
        <span className="text-xl font-black italic tracking-tight">EduPulse.</span>
      </div>
      <nav className="flex-1 space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          const active = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative ${active ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {active && <motion.div layoutId="pill" className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl" />}
              <Icon className={`w-5 h-5 relative z-10 ${active ? "text-blue-500" : ""}`} />
              <span className="font-bold text-sm relative z-10">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-zinc-950 border-b border-zinc-900 z-50 flex items-center justify-between px-6">
        <span className="font-black italic">EduPulse.</span>
        <button onClick={() => setIsOpen(true)}><Menu className="w-6 h-6" /></button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 h-screen border-r border-zinc-900">
        <Content />
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed inset-y-0 left-0 w-64 z-[70] md:hidden shadow-2xl">
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 z-[80]"><X /></button>
              <Content />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
