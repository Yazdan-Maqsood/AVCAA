import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadCode } from '../../api/submission.api'
import toast from 'react-hot-toast'
import { UploadCloud } from 'lucide-react'

export default function UploadCode() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file')
    
    const formData = new FormData()
    formData.append('codeFile', file)

    setIsUploading(true)
    try {
      await uploadCode(formData)
      toast.success('Code uploaded. Analysis is processing.')
      navigate('/student/dashboard')
    } catch (error) {
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Source Code</h1>
      <div className="card border-2 border-dashed border-gray-300 flex flex-col items-center justify-center py-12 cursor-pointer hover:border-primary transition-colors" onClick={() => document.getElementById('fileInput').click()}>
        <UploadCloud size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to browse or drag & drop'}</p>
        <p className="text-xs text-gray-400 mt-2">Supported: .py, .cpp, .java, .js</p>
        <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} accept=".py,.cpp,.java,.js" />
      </div>
      <div className="mt-6 flex justify-end">
        <button className="btn-primary" onClick={handleUpload} disabled={isUploading || !file}>
          {isUploading ? 'Analyzing & Uploading...' : 'Upload Code'}
        </button>
      </div>
    </div>
  )
}