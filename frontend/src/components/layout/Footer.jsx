import { Link } from 'react-router-dom'
import Logo from '../../pages/common/logo'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-brand-black border-t border-gray-200 dark:border-gray-800 pt-12 pb-6 mt-auto shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)] relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Info */}
        <div className="col-span-1 md:col-span-2">
          <Logo size={32} />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 max-w-sm">
            An intelligent platform to verify code authorship, generate AI-powered personalized viva questions, and assess true student understanding.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-brand-black dark:text-white mb-4 uppercase tracking-wider text-sm">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" className="hover:text-brand-red transition-colors">How it Works</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">For Universities</a></li>
          </ul>
        </div>

        {/* Support / Legal */}
        <div>
          <h4 className="font-bold text-brand-black dark:text-white mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
             <li><Link to="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-red transition-colors">Contact Us</Link></li>
             
            {/* <li><a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Documentation</a></li> */}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} ACVAA - AI Code Viva & Authorship Analyzer. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built for Academic Integrity</p>
      </div>
    </footer>
  )
}