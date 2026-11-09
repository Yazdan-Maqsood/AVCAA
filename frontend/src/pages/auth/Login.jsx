import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Moon, Sun, Lock } from 'lucide-react'
import Logo from '../common/logo'
// import Logo from '../../components/common/Logo';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const user = await login({ email, password })
      toast.success('Logged in successfully')
      if (user.role === 'student') navigate('/student/dashboard')
      else if (user.role === 'teacher') navigate('/teacher/dashboard')
      else navigate('/admin/dashboard')
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-red"></div>

      <button onClick={toggleTheme} className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm text-brand-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="card w-full max-w-md relative z-10 border-t-4 border-t-brand-red">
        <div className="flex justify-center mb-6">
          <Logo size={48} showText={true} />
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-2 text-brand-black dark:text-white">Welcome Back</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">Login to continue to ACVAA</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-1.5 text-brand-black dark:text-gray-300">Email</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-1.5 text-brand-black dark:text-gray-300">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-field pr-12" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required 
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-red transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full btn-primary py-3 text-lg mt-2">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-brand-red hover:underline font-bold">Register</Link>
        </p>
      </div>
    </div>
  )
}