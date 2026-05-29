"use client"
import { useState, useEffect, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { supabase } from "@/utils/supabase"
import Sidebar from "@/components/sidebar"
import HeroCard from "@/components/hero-card"
import CourseCard from "@/components/course-card"
import ActivityCard from "@/components/activity-card"
import TopicList from "@/components/topic-list"
import FocusTools from "@/components/focus-tools"
import ProgressAnalytics from "@/components/progress-analytics"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [darkMode, setDarkMode] = useState(true)
  const [coursesData, setCoursesData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDatabase() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("id", { ascending: true })
        if (error) throw error
        if (data) setCoursesData(data)
      } catch (err) {
        console.error("Fetch Error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDatabase()
  }, [])

  const activePath = useMemo(() => coursesData.filter(c => c.progress > 0 && c.progress < 100), [coursesData])
  const overallProgress = useMemo(() => {
    if (coursesData.length === 0) return 0
    return Math.round(coursesData.reduce((acc, c) => acc + c.progress, 0) / coursesData.length)
  }, [coursesData])

  const handleTabSwitch = (tabName: string) => {
    setActiveTab(tabName)
    setSelectedCourse(null)
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs tracking-widest text-zinc-500 uppercase font-mono">Syncing Database...</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col md:flex-row h-screen overflow-hidden transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-zinc-50 text-black"}`}>
      
      {/* Responsive Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={handleTabSwitch} />

      {/* Responsive Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 pb-10 px-4 md:pt-10 md:px-10 lg:px-14 custom-scrollbar">
        <AnimatePresence mode="wait">
          
          {activeTab === "dashboard" && (
            <motion.div key="dash" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10 md:space-y-12">
              <div className="max-w-4xl">
                <HeroCard userName="Abhiranjan" onContinue={() => handleTabSwitch("courses")} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-xl font-bold italic opacity-80">Active Path</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {activePath.map((course, i) => (
                      <CourseCard 
                        key={course.id} 
                        course={course} 
                        index={i} 
                        onClick={() => { setSelectedCourse(course); setActiveTab("courses"); }} 
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-xl font-bold opacity-80">Learning Pulse</h2>
                  <ActivityCard totalProgress={overallProgress} />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div key="courses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              {!selectedCourse ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-800/60 pb-6">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-black">My Lessons</h1>
                      <p className="text-sm text-zinc-500 mt-1">Pick up where you left off.</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 min-w-[200px]">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center font-black text-blue-500 text-lg">
                        {overallProgress}%
                      </div>
                      <div className="text-xs font-bold text-zinc-400 uppercase">Avg. Completion</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coursesData.map((course, i) => (
                      <CourseCard key={course.id} course={course} index={i} onClick={() => setSelectedCourse(course)} />
                    ))}
                  </div>
                </>
              ) : (
                <TopicList course={selectedCourse} onBack={() => setSelectedCourse(null)} />
              )}
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProgressAnalytics data={coursesData} />
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FocusTools darkMode={darkMode} setDarkMode={setDarkMode} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  )
}
