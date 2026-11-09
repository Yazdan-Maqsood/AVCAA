import { useState, useEffect } from 'react'
import { getClassAnalytics } from '../../api/report.api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { Users, FileText, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTheme } from '../../context/ThemeContext'

export default function ClassAnalytics() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getClassAnalytics()
        const actualData = response.data ? response.data : response
        setData(actualData)
      } catch (error) {
        toast.error("Failed to load class analytics")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-bold">Loading analytics...</div>
  if (!data) return <div className="card text-center py-16 text-red-500 font-bold">No Data Available</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white flex items-center gap-3">
          <TrendingUp className="text-brand-red" size={32} />
          Class Analytics & Insights
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Monitor overall class performance and potential academic integrity issues.
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex items-center space-x-4 border-l-4 border-l-blue-500">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Total Students</p>
            <p className="text-3xl font-extrabold text-brand-black dark:text-white">{data.totalStudents}</p>
          </div>
        </div>
        <div className="card flex items-center space-x-4 border-l-4 border-l-brand-red">
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-brand-red rounded-xl">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Total Submissions</p>
            <p className="text-3xl font-extrabold text-brand-black dark:text-white">{data.totalSubmissions}</p>
          </div>
        </div>
        <div className="card flex items-center space-x-4 border-l-4 border-l-green-500">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Class Avg Viva</p>
            <p className="text-3xl font-extrabold text-brand-black dark:text-white">{data.classAverageViva}%</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Authorship Pie Chart */}
        <div className="card lg:col-span-1 flex flex-col">
          <h2 className="font-bold text-lg mb-2 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            Code Authorship Status
          </h2>
          <p className="text-xs text-gray-500 mb-4">Ratio of original vs suspicious code submissions.</p>
          <div className="flex-1 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.authorshipStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.authorshipStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', borderColor: '#374151', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Performance Bar Chart */}
        <div className="card lg:col-span-2">
          <h2 className="font-bold text-lg mb-2 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
            <TrendingUp className="text-brand-red" size={20} />
            Student Viva Performance
          </h2>
          <p className="text-xs text-gray-500 mb-4">Average Viva Score per student.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.studentPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" tick={{fill: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: 12}} />
                <YAxis domain={[0, 100]} tick={{fill: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', borderColor: '#374151', borderRadius: '8px' }}
                  labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
                />
                <Bar dataKey="score" name="Avg Viva Score" fill="#b3001b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}