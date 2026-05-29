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
  
  // Real database dynamic state hooks
  const [coursesData, setCoursesData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Asynchronous Supabase fetching workflow
  useEffect(() => {
    async function fetchDatabasePayload() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("id", { ascending: true })

        if (error) throw error
        if (data) setCoursesData(data)
      } catch (err) {
        console.error("Supabase Payload Syncing Error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDatabasePayload()
  }, []) //  Fixed the broken brace syntax error here

  // Computing layout configurations based on live backend changes
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
        <p className="text-xs tracking-widest text-zinc-500 uppercase font-mono animate-pulse">Syncing Supabase Database...</p>
      </div>
    )
  }

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${darkMode ? "bg-[#050505] text-white" : "bg-zinc-50 text-black"}`}>
      
      {/* 100% Fully Active Controller Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={handleTabSwitch} />

      {/* Main UI Frame Wrapper */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-14 custom-scrollbar">
        <AnimatePresence mode="wait">
          
          {/* TAB OPTION 1: DASHBOARD VIEW ROUTE */}
          {activeTab === "dashboard" && (
            <motion.div key="dashboard-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-12">
              <div className="max-w-3xl">
                <HeroCard userName="Abhiranjan" onContinue={() => handleTabSwitch("courses")} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-xl font-bold tracking-tight opacity-80 italic">Active Path (In Progress)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activePath.length > 0 ? (
                      activePath.map((course, i) => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          index={i} 
                          onClick={() => { setSelectedCourse(course); setActiveTab("courses"); }} 
                        />
                      ))
                    ) : (
                      <div className="p-6 border border-zinc-800/60 bg-zinc-900/10 rounded-2xl text-zinc-500 text-xs font-medium">
                        No modules currently in progress. Click "Continue Learning" above to start!
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-xl font-bold tracking-tight opacity-80">Learning Pulse</h2>
                  {/* Added totalProgress parameter to map live metrics accurately */}
                  {/* Cast props to any to satisfy differing ActivityCard prop types */}
                  <ActivityCard {...({ totalProgress: overallProgress } as any)} />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB OPTION 2: MY LESSONS VIEW ROUTE */}
          {activeTab === "courses" && (
            <motion.div key="lessons-tab" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              {!selectedCourse ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
                    <div>
                      <h1 className="text-4xl font-black tracking-tight">My Lessons</h1>
                      <p className="text-sm text-zinc-500 mt-1">Review and manage topics fetched directly from your Supabase client.</p>
                    </div>
                    <div className="bg-zinc-950 dark:bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-4 min-w-[200px]">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center font-black text-blue-500 text-lg">
                        {overallProgress}%
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Overall Progress</div>
                        <div className="text-sm font-bold text-zinc-300">Live DB Metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* TAB OPTION 3: TOPIC PROGRESS ANALYTICS VIEW ROUTE */}
          {activeTab === "analytics" && (
            <motion.div key="analytics-tab" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-10">
              <div>
                <h1 className="text-4xl font-black tracking-tight italic">Performance Analytics</h1>
                <p className="text-sm text-zinc-500 mt-1">Topic-level performance profiles generated straight from live entries.</p>
              </div>
              <ProgressAnalytics data={coursesData} />
            </motion.div>
          )}

          {/* TAB OPTION 4: SETTINGS SYSTEM CONFIGURE VIEW ROUTE */}
          {activeTab === "settings" && (
            <motion.div key="settings-tab" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl space-y-10">
              <div>
                <h1 className="text-4xl font-black tracking-tight italic">Focus Center</h1>
                <p className="text-sm text-zinc-500 mt-1">Control parameters, configure background metrics styles, or toggle timers.</p>
              </div>
              <FocusTools darkMode={darkMode} setDarkMode={setDarkMode} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  )
}