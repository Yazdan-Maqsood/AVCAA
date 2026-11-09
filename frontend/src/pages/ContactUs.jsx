import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Fake API call simulation (Aap aage chalkar isko backend se connect kar sakti hain)
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.")
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black dark:text-white mb-4">
              Get in <span className="text-brand-red">Touch</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions about ACVAA? Need a demo for your university? Fill out the form below or reach out to us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Contact Info Cards */}
            <div className="space-y-6">
              <div className="card flex items-start space-x-4 border-l-4 border-l-brand-red">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-brand-red rounded-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black dark:text-white">Email Us</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Our team will respond within 24 hours.</p>
                  <a href="mailto:support@acvaa.com" className="text-brand-red font-semibold text-sm mt-2 inline-block hover:underline">
                    support@acvaa.com
                  </a>
                </div>
              </div>

              <div className="card flex items-start space-x-4 border-l-4 border-l-blue-500">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black dark:text-white">Call Us</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Fri from 9am to 5pm.</p>
                  <a href="tel:+923001234567" className="text-blue-500 font-semibold text-sm mt-2 inline-block hover:underline">
                    +92 (300) 123-4567
                  </a>
                </div>
              </div>

              <div className="card flex items-start space-x-4 border-l-4 border-l-green-500">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black dark:text-white">Visit Us</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Come say hello at our office.</p>
                  <p className="text-green-600 dark:text-green-400 font-semibold text-sm mt-2">
                    Barani Institute, Sahiwal, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-2 card p-8 border-t-4 border-t-brand-red">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="text-brand-red" size={24} />
                <h2 className="text-2xl font-bold text-brand-black dark:text-white">Send us a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="input-field" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="input-field" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="input-field" 
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Message</label>
                  <textarea 
                    required
                    rows="5"
                    className="input-field resize-none" 
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-primary w-full md:w-auto px-8 py-3 flex items-center justify-center gap-2 text-lg disabled:opacity-70"
                >
                  <Send size={18} />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}