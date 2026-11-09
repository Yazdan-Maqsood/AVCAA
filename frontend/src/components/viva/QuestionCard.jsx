import DifficultyBadge from './DifficultyBadge'

export default function QuestionCard({ question, current, total }) {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <DifficultyBadge level={question.difficulty} />
        <span className="text-sm text-gray-500 font-medium">Question {current} of {total}</span>
      </div>
      <h2 className="text-lg font-bold text-dark leading-relaxed mb-4">
        {question.text}
      </h2>
    </div>
  )
}