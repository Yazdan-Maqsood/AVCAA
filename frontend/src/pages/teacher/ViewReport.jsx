import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axiosClient'
import toast from 'react-hot-toast'
import { ArrowLeft, CheckCircle, XCircle, FileText, Award } from 'lucide-react'

export default function ViewReport() {
  const { id } = useParams() 
  const navigate = useNavigate()
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axiosClient.get(`/reports/${id}`)
        const data = response.data ? response.data : response;
        setReportData(data)
      } catch (error) {
        toast.error("Failed to load report")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReport()
  }, [id])

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-bold">Loading Report Data...</div>
  if (!reportData) return <div className="p-8 text-center text-red-500 font-bold">Report not found.</div>

  const { submission, vivaDetails } = reportData

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-6">
      <button onClick={() => navigate('/teacher/submissions')} className="flex items-center space-x-2 text-brand-red hover:text-red-800 font-bold mb-4 transition-colors">
        <ArrowLeft size={20} />
        <span>Back to Submissions</span>
      </button>

      <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-black dark:text-white">Viva Assessment Report</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Student: <strong className="text-brand-black dark:text-white">{submission.student_name}</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Submission Info Card */}
        <div className="card border-t-4 border-t-gray-400">
          <div className="flex items-center space-x-3 mb-2 text-gray-500">
            <FileText size={20} />
            <h2 className="font-bold">Submission Info</h2>
          </div>
          <p className="text-sm mt-3"><span className="text-gray-500">File:</span> <strong className="dark:text-white">{submission.file_name}</strong></p>
          <p className="text-sm mt-2"><span className="text-gray-500">Status:</span> <span className="uppercase font-bold text-green-600">{submission.status}</span></p>
        </div>

        {/* Authorship Score Card */}
        <div className="card border-t-4 border-t-brand-red md:col-span-2 bg-gradient-to-r from-red-50 to-white dark:from-gray-800 dark:to-brand-black">
          <div className="flex items-center space-x-3 mb-2 text-brand-red">
            <Award size={20} />
            <h2 className="font-bold">Authorship Analysis</h2>
          </div>
          <div className="flex items-end space-x-3 mt-3">
            <span className="text-5xl font-extrabold text-brand-red">{submission.authorship_score}%</span>
            <span className="text-sm font-medium text-gray-500 mb-1 pb-2">Confidence Score</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Higher score indicates original student work. Lower score flags potential AI generation or plagiarism.</p>
        </div>
      </div>

      {/* Viva Responses */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6 text-brand-black dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Viva Q&A Breakdown</h2>
        
        {!vivaDetails || vivaDetails.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No viva questions found for this submission.</p>
        ) : (
          <div className="space-y-6">
            {vivaDetails.map((q, index) => (
              <div key={q.id} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                
                {/* Question */}
                <div className="flex justify-between items-start mb-4">
                  <p className="font-bold text-lg text-brand-black dark:text-white">
                    <span className="text-brand-red mr-2">Q{index + 1}.</span> 
                    {q.question_text}
                  </p>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    q.difficulty === 'Basic' ? 'bg-green-100 text-green-700' : 
                    q.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                
                {/* Student Answer */}
                <div className="pl-6 border-l-4 border-brand-red mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Student's Answer</p>
                  {q.answer_text ? (
                    <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded shadow-sm border border-gray-100 dark:border-gray-700">
                      {q.answer_text}
                    </p>
                  ) : (
                    <p className="text-red-500 italic text-sm flex items-center space-x-1">
                      <XCircle size={16} /> <span>Not Answered</span>
                    </p>
                  )}
                </div>

                {/* AI Score & Feedback */}
                {q.score !== null && q.answer_text && (
                  <div className="pl-6 pt-2 flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                       <CheckCircle size={18} className="text-green-500" />
                       <span className="font-bold text-sm text-gray-700 dark:text-gray-300">AI Evaluation:</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 italic">{q.feedback}</span>
                      <span className="text-lg font-extrabold text-brand-red">{q.score}/100</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}