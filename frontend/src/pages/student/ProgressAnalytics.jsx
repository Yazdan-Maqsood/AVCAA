import { useState, useEffect } from 'react'
import { getMyAnalytics } from '../../api/viva.api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, Award, FileCode } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTheme } from '../../context/ThemeContext'

export default function ProgressAnalytics() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getMyAnalytics()
        const actualData = response.data ? response.data : response
        setData(actualData || [])
      } catch (error) {
        toast.error("Failed to load analytics")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-bold">Loading analytics...</div>

  if (data.length === 0) {
    return (
      <div className="card text-center py-16">
        <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold mb-2">No Data Available</h2>
        <p className="text-gray-500">Upload and analyze some code to see your progress charts.</p>
      </div>
    )
  }

  // Overall Averages
  const totalViva = data.reduce((sum, item) => sum + item.vivaScore, 0)
  const avgViva = data.length > 0 ? (totalViva / data.length).toFixed(1) : 0
  
  const totalAuthorship = data.reduce((sum, item) => sum + item.authorshipScore, 0)
  const avgAuthorship = data.length > 0 ? (totalAuthorship / data.length).toFixed(1) : 0

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white flex items-center gap-3">
          <TrendingUp className="text-brand-red" size={32} />
          My Progress & Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track your viva performance and authorship scores over time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex items-center space-x-4 border-l-4 border-l-brand-red">
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-brand-red rounded-xl">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Average Viva Score</p>
            <p className="text-3xl font-extrabold text-brand-black dark:text-white">{avgViva}%</p>
          </div>
        </div>
        <div className="card flex items-center space-x-4 border-l-4 border-l-green-500">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-xl">
            <Award size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Avg Authorship</p>
            <p className="text-3xl font-extrabold text-brand-black dark:text-white">{avgAuthorship}%</p>
          </div>
        </div>
        <div className="card flex items-center space-x-4 border-l-4 border-l-blue-500">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl">
            <FileCode size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Total Submissions</p>
            <p className="text-3xl font-extrabold text-brand-black dark:text-white">{data.length}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Viva Performance Chart */}
        <div className="card">
          <h2 className="font-bold text-lg mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">Viva Performance per File</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" tick={{fill: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: 12}} />
                <YAxis domain={[0, 100]} tick={{fill: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', borderColor: '#374151', borderRadius: '8px' }}
                  labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
                />
                <Line type="monotone" dataKey="vivaScore" name="Viva Score" stroke="#b3001b" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Authorship Score Chart */}
        <div className="card">
          <h2 className="font-bold text-lg mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">Authorship Confidence per File</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" tick={{fill: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: 12}} />
                <YAxis domain={[0, 100]} tick={{fill: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', borderColor: '#374151', borderRadius: '8px' }}
                  labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
                />
                <Bar dataKey="authorshipScore" name="Authorship %" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}