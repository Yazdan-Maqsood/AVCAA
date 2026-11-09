export default function UnderstandingLevel({ level }) {
  const levels = {
    'Excellent': { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    'Good': { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    'Average': { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    'Poor': { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  }

  const style = levels[level] || levels['Average']

  return (
    <div className={`p-4 rounded-xl border ${style.border} ${style.bg} flex items-center justify-between`}>
      <span className="text-sm font-bold text-gray-600">Understanding Level</span>
      <span className={`font-extrabold text-lg ${style.color}`}>{level}</span>
    </div>
  )
}