import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
      <p className="text-gray-500 mb-6">You do not have permission to view this page.</p>
      <Link to="/login" className="btn-primary">Go to Login</Link>
    </div>
  )
}