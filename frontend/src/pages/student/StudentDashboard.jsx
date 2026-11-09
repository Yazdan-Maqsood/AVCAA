import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getMySubmissions } from '../../api/submission.api'
import { UploadCloud, FileCode, CheckCircle, Clock } from 'lucide-react'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    getMySubmissions().then(res => {
      const data = res.data ? res.data : res;
      setSubmissions(data || [])
    }).catch(err => console.error(err))
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-black dark:text-white">Welcome, {user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your code submissions and viva results.</p>
        </div>
        <Link to="/student/upload" className="btn-primary flex items-center gap-2">
          <UploadCloud size={20} />
          Upload New Code
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card flex items-center space-x-4 border-l-4 border-l-brand-red">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-brand-black dark:text-white">
            <FileCode size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold">Total Submissions</p>
            <p className="text-2xl font-extrabold text-brand-black dark:text-white">{submissions.length}</p>
          </div>
        </div>
        <div className="card flex items-center space-x-4 border-l-4 border-l-green-600">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600">
            <CheckCircle size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold">Analyzed</p>
            <p className="text-2xl font-extrabold text-brand-black dark:text-white">
              {submissions.filter(s => s.status === 'analyzed').length}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-extrabold mb-6 text-brand-black dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">My Submissions</h2>
        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <FileCode size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">No submissions found. Upload some code to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map(sub => (
              <div key={sub.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors group">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className={`p-3 rounded-lg ${sub.status === 'analyzed' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20'}`}>
                    {sub.status === 'analyzed' ? <CheckCircle size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-black dark:text-white">{sub.file_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize font-medium">Status: {sub.status}</p>
                  </div>
                </div>
                <Link to={`/student/viva/${sub.id}`} className={`btn-secondary text-sm w-full sm:w-auto text-center ${sub.status !== 'analyzed' && 'opacity-50 pointer-events-none'}`}>
                  Take Viva
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}