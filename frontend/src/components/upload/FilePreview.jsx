import { FileCode, X } from 'lucide-react'

export default function FilePreview({ file, onRemove }) {
  if (!file) return null;

  return (
    <div className="flex items-center justify-between p-4 mt-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-lg">
          <FileCode size={24} />
        </div>
        <div>
          <p className="font-semibold text-dark text-sm">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
        </div>
      </div>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500 transition-colors">
        <X size={20} />
      </button>
    </div>
  );
}