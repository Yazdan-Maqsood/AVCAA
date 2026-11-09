import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMySubmissions } from '../../api/submission.api'
import { formatDate } from '../../utils/formatters'
import { useTheme } from '../../context/ThemeContext'
import { FileText, Search, Eye, CheckCircle, FileClock, XCircle, AlertCircle } from 'lucide-react'

export default function SubmissionHistory() {
  const [submissions, setSubmissions] = useState([])
  const [filteredSubs, setFilteredSubs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getMySubmissions()
        const data = response.data ? response.data : response;
        setSubmissions(data || [])
        setFilteredSubs(data || [])
      } catch (error) {
        console.error("Failed to fetch submissions", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSubmissions()
  }, [])

  // Search Filter Logic
  useEffect(() => {
    const results = submissions.filter(sub => 
      sub.file_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredSubs(results)
  }, [searchTerm, submissions])

  // Status Badge Helper
  const renderStatus = (status) => {
    switch (status) {
      case 'analyzed':
        return <span className="flex items-center space-x-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"><CheckCircle size={14} /> <span>Analyzed</span></span>
      case 'pending':
        return <span className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"><FileClock size={14} /> <span>Pending</span></span>
      case 'analysis_failed':
        return <span className="flex items-center space-x-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"><XCircle size={14} /> <span>Failed</span></span>
      default:
        return <span className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-bold uppercase"><AlertCircle size={14} /> <span>{status}</span></span>
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 dark:text-gray-400 font-bold text-lg">Loading your history...</div>
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-black dark:text-white flex items-center gap-3">
            <FileText className="text-brand-red" size={32} />
            Submission History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View all your past uploads, AI scores, and viva status.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search files..." 
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-brand-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header border-b border-gray-200 dark:border-gray-800">
                <th className="py-4 px-6">File Name</th>
                <th className="py-4 px-6">Uploaded Date</th>
                <th className="py-4 px-6">Authorship Score</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredSubs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-lg font-medium">No submissions found.</p>
                    <p className="text-sm mt-1">Upload some code to see it here.</p>
                  </td>
                </tr>
              ) : (
                filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-brand-red">
                          <FileText size={18} />
                        </div>
                        <span className="font-bold text-brand-black dark:text-white">{sub.file_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {formatDate(sub.created_at)}
                    </td>
                    <td className="py-4 px-6">
                      {sub.authorship_score ? (
                        <div className="flex items-center space-x-2">
                          <span className={`font-extrabold ${sub.authorship_score > 70 ? 'text-green-600' : sub.authorship_score > 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {sub.authorship_score}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Not available</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {renderStatus(sub.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link 
                        to={`/student/viva/${sub.id}`} 
                        className={`inline-flex items-center space-x-1 font-bold text-sm px-4 py-2 rounded-lg transition-colors ${
                          sub.status === 'analyzed' 
                            ? 'text-brand-red bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40' 
                            : 'text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-800'
                        }`}
                        onClick={(e) => sub.status !== 'analyzed' && e.preventDefault()}
                      >
                        <Eye size={16} />
                        <span>View Viva</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}