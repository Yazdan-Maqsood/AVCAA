export default function VivaProgress({ current, total }) {
  const percentage = Math.round((current / total) * 100)
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}