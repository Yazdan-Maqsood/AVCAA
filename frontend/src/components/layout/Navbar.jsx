import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'

import { Moon, Sun, LogOut, Menu, X } from 'lucide-react'
import Logo from '../../pages/common/logo'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    setIsOpen(false)
  }

  return (
    <nav className="bg-white dark:bg-brand-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <Logo size={32} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* 🔥 NAYA: Contact Us Link (Desktop) */}
            <Link to="/about" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red transition-colors">
                About Us
            </Link>
            <Link to="/contact" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red transition-colors">
              Contact Us
            </Link>

            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {user ? (
              <>
                <Link to={`/${user.role}/dashboard`} className="text-sm font-bold text-brand-black dark:text-white hover:text-brand-red transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-primary py-2 px-4 flex items-center gap-2 text-sm">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div> {/* Divider */}
                <Link to="/login" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 dark:text-gray-300 hover:text-brand-red focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-72 border-t border-gray-100 dark:border-gray-800' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-3 bg-white dark:bg-brand-black shadow-lg">
          
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
            About Us
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Contact Us
          </Link>

          {user ? (
            <>
              <Link 
                to={`/${user.role}/dashboard`} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-brand-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-3 py-2 rounded-md text-base font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-primary py-2.5 mt-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}