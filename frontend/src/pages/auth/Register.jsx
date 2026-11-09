import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axiosClient'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Moon, Sun, UserPlus } from 'lucide-react'
import Logo from '../common/logo'

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axiosClient.post('/auth/register', formData)
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark relative overflow-hidden py-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-red"></div>

      <button onClick={toggleTheme} className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm text-brand-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all z-20">
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="card w-full max-w-md relative z-10 border-t-4 border-t-brand-red">
        <div className="flex justify-center mb-6">
         <Logo size={48} showText={true} />
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-2 text-brand-black dark:text-white">Create Account</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">Join ACVAA today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1.5 text-brand-black dark:text-gray-300">Full Name</label>
            <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5 text-brand-black dark:text-gray-300">Email</label>
            <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5 text-brand-black dark:text-gray-300">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-field pr-12" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
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
          <div>
            <label className="block text-sm font-bold mb-1.5 text-brand-black dark:text-gray-300">Role</label>
            <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading} className="w-full btn-primary py-3 text-lg mt-4">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-brand-red hover:underline font-bold">Login</Link>
        </p>
      </div>
    </div>
  )
}