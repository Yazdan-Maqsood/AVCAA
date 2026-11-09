import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import Sidebar from './Sidebar'
import { LogOut, Moon, Sun } from 'lucide-react'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Sidebar role={user?.role} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-brand-white dark:bg-brand-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 transition-colors duration-300">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Role: <span className="font-bold text-brand-red capitalize ml-1">{user?.role}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-brand-red dark:hover:text-brand-red transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <span className="text-sm font-bold text-brand-black dark:text-white">
              {user?.name}
            </span>
            <button onClick={handleLogout} className="text-brand-red hover:text-red-800 transition-colors flex items-center space-x-1 text-sm font-bold border-2 border-brand-red px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto bg-background-light dark:bg-background-dark p-8 transition-colors duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  )
}