import CodeEditor from './CodeEditor'

export default function ModificationChallenge({ task, language, code, onChange }) {
  return (
    <div className="card p-0 overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h4 className="font-bold text-sm text-dark mb-1">Task: {task}</h4>
        <p className="text-xs text-gray-500">Modify the code below to pass the test cases.</p>
      </div>
      <div className="flex-1">
        <CodeEditor language={language} code={code} onChange={onChange} />
      </div>
    </div>
  )
}