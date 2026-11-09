import { useState, useEffect } from 'react'
import { getMyVivaFeedback } from '../../api/viva.api'
import { formatDate } from '../../utils/formatters'
import { MessageSquare, Search, ChevronDown, ChevronUp, FileCode, Award, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MyFeedback() {
  const [rawFeedbacks, setRawFeedbacks] = useState([]) 
  const [groupedFeedbacks, setGroupedFeedbacks] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [expandedSub, setExpandedSub] = useState(null) 

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getMyVivaFeedback()
        const data = response.data ? response.data : response
        
        setRawFeedbacks(data || [])
        processGrouping(data || [], '')
      } catch (error) {
        toast.error("Failed to load feedback")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeedback()
  }, [])

  const processGrouping = (data, search) => {
    const filtered = data.filter(item => 
      item.file_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.question_text?.toLowerCase().includes(search.toLowerCase())
    )

    const grouped = filtered.reduce((acc, current) => {
      const subId = current.submission_id;
      if (!acc[subId]) {
        acc[subId] = {
          submission_id: subId,
          file_name: current.file_name,
          authorship_score: current.authorship_score,
          date: current.response_date,
          questions: []
        }
      }
      acc[subId].questions.push(current)
      return acc;
    }, {})

    setGroupedFeedbacks(Object.values(grouped))
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    processGrouping(rawFeedbacks, term);
  }

  const toggleExpand = (subId) => {
    setExpandedSub(expandedSub === subId ? null : subId)
  }

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 font-bold text-lg">Loading your feedback...</div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-black dark:text-white flex items-center gap-3">
            <MessageSquare className="text-brand-red" size={32} />
            My Viva Feedback
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Review AI's evaluation grouped by your submitted files.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search by file name or question..." 
            className="input-field pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {groupedFeedbacks.length === 0 ? (
        <div className="card text-center py-16">
          <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Feedback Found</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm ? "No results match your search." : "You haven't completed any viva sessions yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedFeedbacks.map((sub) => {
            
            // 🔥 FIX: NaN Error Solution yahan hai
            const validScores = sub.questions.filter(q => q.viva_score !== null && q.viva_score !== undefined);
            const totalScore = validScores.reduce((sum, q) => sum + Number(q.viva_score), 0);
            const avgScore = validScores.length > 0 ? (totalScore / validScores.length).toFixed(1) : "0.0";

            return (
              <div key={sub.submission_id} className="bg-white dark:bg-brand-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                
                <div 
                  onClick={() => toggleExpand(sub.submission_id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-brand-red rounded-xl">
                      <FileCode size={28} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-brand-black dark:text-white">{sub.file_name}</h2>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                        <span>Uploaded: {formatDate(sub.date)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <CheckCircle size={14}/> Authorship: {sub.authorship_score}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase">Viva Avg Score</p>
                      <p className={`text-2xl font-extrabold ${
                        avgScore >= 70 ? 'text-green-500' : avgScore >= 40 ? 'text-yellow-500' : 'text-red-500'
                      }`}>{avgScore} / 100</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                      {expandedSub === sub.submission_id ? <ChevronUp size={24} className="text-gray-500" /> : <ChevronDown size={24} className="text-gray-500" />}
                    </div>
                  </div>
                </div>

                {expandedSub === sub.submission_id && (
                  <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/10 p-5 space-y-4">
                    {sub.questions.map((q, idx) => (
                      <div key={q.response_id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-brand-black dark:text-white flex gap-2 pr-4">
                            <span className="text-brand-red">Q{idx + 1}.</span> {q.question_text}
                          </h3>
                          <div className="flex items-center space-x-2 shrink-0">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              q.difficulty === 'Basic' ? 'bg-green-100 text-green-700' : 
                              q.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-red-100 text-red-700'
                            }`}>
                              {q.difficulty}
                            </span>
                            {q.viva_score !== null ? (
                              <span className={`px-2 py-1 rounded text-xs font-extrabold ${
                                q.viva_score >= 70 ? 'bg-green-100 text-green-700' : 
                                q.viva_score >= 40 ? 'bg-yellow-100 text-yellow-700' : 
                                'bg-red-100 text-red-700'
                              }`}>
                                {q.viva_score} / 100
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-500">Not Graded</span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Your Answer</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                {q.answer_text || <span className="italic text-gray-400">No answer provided</span>}
                            </p>
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                            <h4 className="text-[10px] font-bold text-brand-red uppercase mb-1 flex items-center gap-1">
                              <Award size={12}/> AI Feedback
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                "{q.ai_feedback || "No feedback available"}"
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}