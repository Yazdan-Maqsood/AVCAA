import { Link, useLocation } from 'react-router-dom'
import { Home, Upload, FileText, Users, Settings, ShieldCheck, FileClock, TrendingUp } from 'lucide-react'
import Logo from '../../pages/common/logo'

export default function Sidebar({ role }) {
  const location = useLocation()

  const navItems = {
    student: [
      { name: 'Dashboard', path: '/student/dashboard', icon: Home },
      { name: 'Upload Code', path: '/student/upload', icon: Upload },
      { name: 'My Feedback', path: '/student/feedback', icon: FileText },
      { name: 'Submission History', path: '/student/history', icon: FileClock },
      { name: 'My Progress', path: '/student/analytics', icon: TrendingUp },
    ],
    teacher: [
      { name: 'Dashboard', path: '/teacher/dashboard', icon: Home },
      { name: 'Submissions', path: '/teacher/submissions', icon: FileText },
      { name: 'Analytics', path: '/teacher/analytics', icon: TrendingUp },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: ShieldCheck },
      { name: 'Manage Users', path: '/admin/users', icon: Users },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ]
  }

  const links = navItems[role] || []

  return (
    <aside className="w-64 bg-brand-white dark:bg-brand-black border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 flex flex-col transition-colors duration-300">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
         <Link to="/">
          <Logo size={32} />
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
        {links.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-bold ${
                isActive 
                  ? 'bg-brand-red text-white shadow-md shadow-brand-red/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-black dark:hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-white' : ''} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}