import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1) // Only 1 step now - Account Info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { signup, isLoading } = useAuth()
  const navigate = useNavigate()

  const steps = [
    { id: 1, title: 'Create Account', description: 'Get your free test' }
  ]

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate account info
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    if (!acceptTerms) {
      setError('Please accept the terms and conditions')
      return
    }

    // Create account with free trial
    const success = await signup(formData.name, formData.email, formData.password, { type: 'free-trial', name: 'Free Trial' })
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Failed to create account. Please try again.')
    }
  }, [formData, acceptTerms, signup, navigate])

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => console.error('Video failed to load:', e)}
        >
          <source
            src="https://public-assets.content-platform.envatousercontent.com/7671b01a-ac29-43b8-bcd5-35e5181e0f5f/a1e24ac7-2401-4b1c-b1a8-772f81196575/7671b01a-ac29-43b8-bcd5-35e5181e0f5f/preview_540p_crf22_higher_quality.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:mx-auto sm:w-full sm:max-w-4xl"
        >
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/background-removed.png" alt="IVF 360" className="w-auto object-contain drop-shadow-lg" style={{ height: '16.875rem' }} />
            
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white drop-shadow-lg">
            Create your account
          </h2>
          
          {/* Step Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-pink-600 border-pink-600 text-white' 
                      : 'border-white/50 text-white/50'
                  }`}>
                    {step.id}
                  </div>
                  <div className="ml-3 text-white">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-white/70">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-white/50 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl py-8 px-4 sm:px-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Get Your Free Test!</h3>
                <p className="text-white/80 text-sm">
                  Create your account and get your first genetic test absolutely free. No payment required.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-red-100 px-4 py-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-300" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-300" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300 autofill:bg-white/20 autofill:text-white"
                      style={{
                        WebkitBoxShadow: '0 0 0 1000px rgba(255, 255, 255, 0.2) inset',
                        WebkitTextFillColor: 'white'
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-300" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-10 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-300" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-10 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="accept-terms"
                    name="accept-terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-4 w-4 text-pink-400 focus:ring-pink-400/50 border-white/30 rounded bg-white/20 backdrop-blur-sm"
                  />
                  <label htmlFor="accept-terms" className="ml-2 block text-sm text-white">
                    I agree to the{' '}
                    <Link to="/terms" className="text-pink-300 hover:text-pink-200 transition-colors">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-green-300 font-medium text-sm">Free Test Included</p>
                      <p className="text-green-200 text-xs">
                        Get your first genetic test free - no payment required
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="flex-1 flex justify-center items-center py-3 px-4 border border-white/30 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Link>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Create Free Account
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup