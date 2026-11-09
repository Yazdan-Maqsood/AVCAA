export default function AnswerBox({ value, onChange, placeholder = "Type your answer here..." }) {
  return (
    <textarea 
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-40 resize-none text-sm" 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}