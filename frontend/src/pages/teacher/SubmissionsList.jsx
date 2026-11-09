import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllSubmissions } from '../../api/submission.api'
import { formatDate } from '../../utils/formatters'
import { FileSearch } from 'lucide-react'

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getAllSubmissions()
        const actualData = response.data ? response.data : response;
        if (Array.isArray(actualData)) setSubmissions(actualData)
      } catch (error) {
        console.error("Failed to fetch submissions", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSubmissions()
  }, [])

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading submissions...</div>

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-black dark:text-white">All Submissions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review student code and viva performance.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-brand-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header border-b border-gray-200 dark:border-gray-800">
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">File Name</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <FileSearch size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    No submissions found in the database.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-black dark:text-white">{sub.student_name || 'Unknown'}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300 font-medium">{sub.file_name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">{formatDate(sub.created_at)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        sub.status === 'analyzed' 
                          ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                          : sub.status === 'analysis_failed'
                          ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
                      }`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link to={`/teacher/reports/${sub.id}`} className="text-brand-red hover:text-red-800 font-bold text-sm transition-colors border-b border-transparent hover:border-brand-red">
                        View Report
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