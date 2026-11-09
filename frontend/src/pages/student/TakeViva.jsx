import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axiosClient'
import { getSubmissionCode } from '../../api/submission.api'
import Editor from '@monaco-editor/react'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { ChevronRight, LogOut, Code2, FileCode2, Moon, Sun, Loader2 } from 'lucide-react'

export default function TakeViva() {
  const { id } = useParams() // Yeh submissionId hai
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answer, setAnswer] = useState('')
  
  const [originalCode, setOriginalCode] = useState('')
  const [fileLang, setFileLang] = useState('cpp')
  const [modifiedCode, setModifiedCode] = useState('')
  
  const [activeTab, setActiveTab] = useState('original') 
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchVivaData = async () => {
      try {
        const qResponse = await axiosClient.get(`/viva/${id}/questions`)
        let qData = qResponse.data ? qResponse.data : qResponse;
        
        const fetchedQuestions = qData.questions || qData || [];
        setQuestions(fetchedQuestions)

        const cResponse = await getSubmissionCode(id)
        const cData = cResponse.data ? cResponse.data : cResponse;
        setOriginalCode(cData.code)
        setModifiedCode(cData.code) 
        
        const langMap = { 'cpp': 'cpp', 'js': 'javascript', 'py': 'python', 'java': 'java' }
        setFileLang(langMap[cData.language] || 'cpp')
      } catch (error) {
        toast.error("Failed to load viva session data.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchVivaData()
  }, [id])

  const handleSubmit = async () => {
    if (!answer.trim()) return toast.error("Please provide an answer before proceeding.")
    
    setIsSubmitting(true)
    try {
      const currentQuestionId = questions[currentQ].id; // Current question id nikalain

      // 🔥 FIX: URL mein submission ID (id) aur body mein 'answer' bhejien
      await axiosClient.post(`/viva/${id}/answer`, {
        questionId: currentQuestionId,
        answer: answer // Backend 'answer' expect kar raha hai
      });

      toast.success("Answer submitted and evaluated!")
      
      if (currentQ < questions.length - 1) {
        setAnswer('') 
        setCurrentQ((prevQ) => prevQ + 1) 
        setModifiedCode(originalCode) 
        setActiveTab('original') 
      } else {
        toast.success("Viva Completed Successfully!")
        navigate('/student/dashboard')
      }
    } catch (error) {
      toast.error("Failed to submit answer.")
      console.error(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <div className="h-screen flex items-center justify-center text-brand-black dark:text-white font-bold text-xl">Loading Viva Session...</div>
  
  if (questions.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <h2 className="text-2xl font-bold text-red-600 mb-4">No Viva Questions Found</h2>
        <button onClick={() => navigate('/student/dashboard')} className="btn-primary mt-4">Go Back</button>
      </div>
    )
  }

  const q = questions[currentQ]
  const questionText = q?.text || q?.question_text || "Question text not found.";
  const progress = ((currentQ + 1) / questions.length) * 100

  return (
    <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      
      <header className="h-16 bg-white dark:bg-brand-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-bold">A</div>
          <h1 className="text-lg font-bold text-brand-black dark:text-white hidden sm:block">ACVAA Live Assessment</h1>
        </div>
        
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
            <span>Progress</span>
            <span>{currentQ + 1} / {questions.length} Questions</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-brand-red h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-brand-red transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={() => navigate('/student/dashboard')} className="flex items-center space-x-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg font-bold transition-colors">
            <LogOut size={18} />
            <span className="hidden sm:block">End Session</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="card flex flex-col h-full overflow-hidden border-t-4 border-t-brand-red p-0">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <span className="bg-brand-red text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                {q?.difficulty || "Basic"}
              </span>
            </div>
            <h2 key={currentQ} className="text-xl md:text-2xl font-bold text-brand-black dark:text-white leading-snug">
              {questionText}
            </h2>
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Answer</label>
            <textarea 
              className="input-field flex-1 resize-none bg-background-light dark:bg-gray-800/30 mb-6 focus:ring-brand-red" 
              placeholder="Explain your logic based on the code visible on the right..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            
            <button 
              className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2 disabled:opacity-50" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <span>{currentQ === questions.length - 1 ? 'Finish Assessment' : 'Submit & Next'}</span>}
              {!isSubmitting && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
        
        <div className="card p-0 overflow-hidden flex flex-col h-full border-gray-200 dark:border-gray-700">
          <div className="bg-brand-black flex text-sm font-bold border-b border-gray-700">
            <button 
              onClick={() => setActiveTab('original')}
              className={`flex-1 p-4 flex items-center justify-center space-x-2 transition-colors ${activeTab === 'original' ? 'bg-gray-800 text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-white'}`}
            >
              <FileCode2 size={18} />
              <span>Your Original Code</span>
            </button>
            <button 
              onClick={() => setActiveTab('editor')}
              className={`flex-1 p-4 flex items-center justify-center space-x-2 transition-colors ${activeTab === 'editor' ? 'bg-gray-800 text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-white'}`}
            >
              <Code2 size={18} />
              <span>Modification Challenge</span>
            </button>
          </div>
          
          <div className="flex-1 relative">
            {activeTab === 'original' ? (
              <Editor
                height="100%"
                language={fileLang} 
                value={originalCode}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, padding: { top: 20 } }}
              />
            ) : (
              <Editor
                height="100%"
                language={fileLang} 
                value={modifiedCode}
                onChange={(val) => setModifiedCode(val)}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 20 } }}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}