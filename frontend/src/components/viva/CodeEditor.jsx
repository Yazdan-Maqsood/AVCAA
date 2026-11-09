import Editor from '@monaco-editor/react'

export default function CodeEditor({ language = 'python', code, onChange }) {
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="bg-dark p-2 text-white text-xs font-mono flex justify-between items-center px-4">
        <span>Code Modification Challenge</span>
        <span>{language.toUpperCase()}</span>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={onChange}
          theme="vs-dark"
          options={{ 
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 }
          }}
        />
      </div>
    </div>
  )
}