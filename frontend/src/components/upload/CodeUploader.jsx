import { useState } from 'react'
import { UploadCloud } from 'lucide-react'
import FilePreview from './FilePreview'

export default function CodeUploader({ onFileSelect, allowedExtensions = ['.py', '.cpp', '.java', '.js'] }) {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      setFile(selected)
      if (onFileSelect) onFileSelect(selected)
    }
  }

  const handleRemove = () => {
    setFile(null)
    if (onFileSelect) onFileSelect(null)
  }

  return (
    <div>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-all" 
        onClick={() => document.getElementById('codeFileInput').click()}
      >
        <UploadCloud size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-700 font-semibold">Click to browse or drag & drop</p>
        <p className="text-xs text-gray-500 mt-1">Supported: {allowedExtensions.join(', ')}</p>
        <input 
          id="codeFileInput" 
          type="file" 
          className="hidden" 
          onChange={handleFileChange} 
          accept={allowedExtensions.join(',')} 
        />
      </div>
      {file && <FilePreview file={file} onRemove={handleRemove} />}
    </div>
  )
}