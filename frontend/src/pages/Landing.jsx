import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { ShieldCheck, Brain, Code2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
          
          {/* Background Gradient Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none"></div>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-6 border border-red-100 dark:border-red-900/50">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            Next-Gen Academic Integrity
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-black dark:text-white max-w-4xl leading-tight mb-6">
            Verify Code Authorship & <br className="hidden md:block"/>
            <span className="text-brand-red">Assess True Understanding</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
            AI-powered platform to detect AI-generated code, generate personalized viva questions, and evaluate student logic through live coding challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to={user ? `/${user.role}/dashboard` : "/register"} 
              className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2 group"
            >
              {user ? 'Go to Dashboard' : 'Get Started for Free'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="btn-secondary py-4 px-8 text-lg flex items-center justify-center"
            >
              Login to Account
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> No credit card required</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Universities worldwide</span>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-white dark:bg-brand-black border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-brand-black dark:text-white mb-4">Why Choose ACVAA?</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Our platform goes beyond simple plagiarism checkers by verifying actual understanding through AI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="card border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6 text-brand-red group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Authorship Verification</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Detect plagiarism and AI-generated code using deep structural analysis and AST fingerprinting.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6 text-brand-red group-hover:scale-110 transition-transform">
                  <Brain size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">AI Viva Generation</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Automatically generate personalized viva questions based on the student's specific code and logic.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6 text-brand-red group-hover:scale-110 transition-transform">
                  <Code2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Live Modifications</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Test student understanding in real-time by proposing live coding modifications and edge cases.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}