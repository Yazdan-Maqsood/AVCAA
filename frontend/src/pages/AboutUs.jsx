import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { ShieldCheck, Brain, Target, Users, Zap, Code2, GraduationCap, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative px-6 py-20 md:py-28 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-red/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-red-50 dark:bg-red-900/30 text-brand-red text-xs font-bold tracking-wider uppercase mb-6 border border-red-100 dark:border-red-900/50">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-black dark:text-white leading-tight mb-6">
              Redefining Academic Integrity for the <span className="text-brand-red">AI Era</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              ACVAA was born out of a simple question: How can we verify if a student truly understands the code they submit? With the rise of AI generators, traditional plagiarism tools are no longer enough.
            </p>
          </div>
        </section>

        {/* The Problem & Solution Section */}
        <section className="px-6 py-16 bg-white dark:bg-brand-black border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-3xl font-bold text-brand-black dark:text-white mb-6">The Problem with Traditional Systems</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p className="flex gap-3 items-start">
                  <span className="text-red-500 mt-1">✖</span>
                  Plagiarism checkers only compare text similarities; they don't assess actual logic.
                </p>
                <p className="flex gap-3 items-start">
                  <span className="text-red-500 mt-1">✖</span>
                  Teachers lack the time to conduct personalized viva sessions for every student.
                </p>
                <p className="flex gap-3 items-start">
                  <span className="text-red-500 mt-1">✖</span>
                  AI-generated code (ChatGPT) goes undetected, leading to skill gaps in graduates.
                </p>
              </div>
            </div>

            <div className="card bg-gray-50 dark:bg-gray-800/50 border-none shadow-none relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red"></div>
              <h2 className="text-2xl font-bold text-brand-black dark:text-white mb-4">Our Solution: ACVAA</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We combine deep structural code analysis with Large Language Models (LLMs) to automatically generate viva questions based on the student's specific code. We evaluate their answers and live coding modifications to prove their understanding.
              </p>
              <div className="flex items-center gap-2 text-brand-red font-bold">
                <ShieldCheck size={20} />
                <span>Built for the modern classroom</span>
              </div>
            </div>

          </div>
        </section>

        {/* Core Values / Features */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-brand-black dark:text-white mb-4">Our Core Values</h2>
              <p className="text-gray-500 dark:text-gray-400">The principles that drive our platform forward.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center hover:-translate-y-1 transition-transform">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-brand-red mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Fair Assessment</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Providing objective and personalized evaluation to ensure grades reflect true understanding.
                </p>
              </div>

              <div className="card text-center hover:-translate-y-1 transition-transform">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 mb-6">
                  <Brain size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">AI Innovation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Leveraging state-of-the-art AI to scale personalized viva sessions for large classrooms.
                </p>
              </div>

              <div className="card text-center hover:-translate-y-1 transition-transform">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 mb-6">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Empowering Teachers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Saving educators' time by automating analysis and generating deep insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-20 bg-brand-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your academic integrity?</h2>
            <p className="text-gray-300 mb-10 text-lg">Join universities and educators who are using ACVAA to transform how they assess coding skills.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn-primary py-3 px-8 text-lg flex items-center justify-center gap-2">
                Get Started <ArrowRight size={20}/>
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}