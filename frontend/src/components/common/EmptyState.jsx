import { FileQuestion } from 'lucide-react'

export default function EmptyState({ title = "No data found", description = "There is nothing to display here yet." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileQuestion size={48} className="text-gray-300 mb-4" />
      <h3 className="text-lg font-bold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}