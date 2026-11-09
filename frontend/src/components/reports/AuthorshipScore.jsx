export default function AuthorshipScore({ score = 0 }) {
  // Score 0-100 (higher means more original)
  let color = 'text-red-500'
  let bg = 'bg-red-100'
  let label = 'High Risk'

  if (score > 75) {
    color = 'text-green-500'
    bg = 'bg-green-100'
    label = 'Original'
  } else if (score > 40) {
    color = 'text-yellow-500'
    bg = 'bg-yellow-100'
    label = 'Suspicious'
  }

  return (
    <div className="flex items-center space-x-4">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${bg} ${color}`}>
        {score}%
      </div>
      <div>
        <p className="font-bold text-dark">Authorship Confidence</p>
        <p className={`text-sm font-semibold ${color}`}>{label}</p>
      </div>
    </div>
  )
}