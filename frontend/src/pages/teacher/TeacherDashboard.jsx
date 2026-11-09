import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTeacherDashboardStats } from '../../api/report.api'
import { formatDate } from '../../utils/formatters'
import { FileText, Clock, AlertTriangle, ArrowRight, CheckCircle, BarChart2, UploadCloud } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TeacherDashboard() {
  const [stats, setStats] = useState({
    totalSubs: 0,
    pendingVivas: 0,
    flagged: 0,
    recentSubmissions: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getTeacherDashboardStats()
        const data = response.data ? response.data : response
        setStats(data)
      } catch (error) {
        toast.error("Failed to load dashboard data")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-bold">Loading Dashboard...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white">Teacher Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of student activity, viva status, and academic integrity.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Submissions */}
        <div className="card relative overflow-hidden group border border-gray-200 dark:border-gray-800">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText size={80} className="text-blue-500" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Submissions</p>
            <div className="flex items-end space-x-3">
              <h2 className="text-4xl font-extrabold text-brand-black dark:text-white">{stats.totalSubs}</h2>
              <span className="text-sm font-medium text-blue-500 mb-1 flex items-center">
                <FileText size={16} className="mr-1"/> All Files
              </span>
            </div>
          </div>
        </div>

        {/* Pending Vivas */}
        <div className="card relative overflow-hidden group border border-gray-200 dark:border-gray-800">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock size={80} className="text-yellow-500" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Pending Vivas</p>
            <div className="flex items-end space-x-3">
              <h2 className="text-4xl font-extrabold text-brand-black dark:text-white">{stats.pendingVivas}</h2>
              <span className="text-sm font-medium text-yellow-500 mb-1 flex items-center">
                <Clock size={16} className="mr-1"/> Awaiting Students
              </span>
            </div>
          </div>
        </div>

        {/* Flagged for Plagiarism */}
        <div className="card relative overflow-hidden group border border-gray-200 dark:border-gray-800">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle size={80} className="text-red-500" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Flagged Code</p>
            <div className="flex items-end space-x-3">
              <h2 className="text-4xl font-extrabold text-brand-red">{stats.flagged}</h2>
              <span className="text-sm font-medium text-red-500 mb-1 flex items-center">
                <AlertTriangle size={16} className="mr-1"/> Suspicious / AI
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Submissions Table (Left Side - Spans 2 cols) */}
        <div className="lg:col-span-2 card p-0 overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/30">
            <h2 className="font-bold text-lg text-brand-black dark:text-white">Recent Submissions</h2>
            <Link to="/teacher/submissions" className="text-sm font-bold text-brand-red hover:underline flex items-center gap-1">
              View All <ArrowRight size={16}/>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-500 uppercase">
                  <th className="py-3 px-5">Student</th>
                  <th className="py-3 px-5">File</th>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {stats.recentSubmissions.length === 0 ? (
                  <tr><td colSpan="4" className="p-5 text-center text-gray-500">No recent submissions.</td></tr>
                ) : (
                  stats.recentSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-5 font-medium text-brand-black dark:text-white">{sub.student_name}</td>
                      <td className="py-3 px-5 text-sm text-gray-600 dark:text-gray-300">{sub.file_name}</td>
                      <td className="py-3 px-5 text-sm text-gray-500">{formatDate(sub.created_at)}</td>
                      <td className="py-3 px-5 text-right">
                        <span className={`font-bold text-sm px-2 py-1 rounded ${
                          sub.authorship_score >= 50 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                        }`}>
                          {sub.authorship_score}%
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Alerts (Right Side) */}
        <div className="space-y-6">
          
          {/* Action Card */}
          <div className="card bg-gradient-to-br from-brand-red to-red-900 text-white border-none shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <BarChart2 size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Class Analytics</h3>
              <p className="text-red-100 text-sm mb-6">Check overall class performance and AI detection charts.</p>
              <Link to="/teacher/analytics" className="inline-block bg-white text-brand-red font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
                Open Analytics
              </Link>
            </div>
          </div>

          {/* Guidelines / System Health */}
          <div className="card border border-gray-200 dark:border-gray-800">
             <h3 className="font-bold text-brand-black dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">System Status</h3>
             <ul className="space-y-3 text-sm">
               <li className="flex items-center justify-between">
                 <span className="text-gray-500 dark:text-gray-400">AI Analysis Engine</span>
                 <span className="flex items-center gap-1 text-green-500 font-bold"><CheckCircle size={14}/> Online</span>
               </li>
               <li className="flex items-center justify-between">
                 <span className="text-gray-500 dark:text-gray-400">Viva Module</span>
                 <span className="flex items-center gap-1 text-green-500 font-bold"><CheckCircle size={14}/> Active</span>
               </li>
               <li className="flex items-center justify-between">
                 <span className="text-gray-500 dark:text-gray-400">Total Students Registered</span>
                 <span className="font-bold dark:text-white">View in Admin</span>
               </li>
             </ul>
          </div>

        </div>
      </div>
    </div>
  )
}