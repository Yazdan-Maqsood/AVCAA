import AuthorshipScore from './AuthorshipScore'
import UnderstandingLevel from './UnderstandingLevel'

export default function ReportCard({ studentName, fileName, authorshipScore, understandingLevel, date }) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-dark">{studentName}</h3>
          <p className="text-sm text-gray-500">{fileName} • {date}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AuthorshipScore score={authorshipScore} />
        <UnderstandingLevel level={understandingLevel} />
      </div>
    </div>
  )
}