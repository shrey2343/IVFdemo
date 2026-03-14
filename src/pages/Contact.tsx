import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Heart, Baby, Sparkles, Star, Zap, Globe, MessageCircle, Users, Shield } from 'lucide-react'
import { useState, useRef } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@ivf360.com',
      description: 'Send us an email anytime',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Medical Center Dr, Suite 100',
      description: 'San Francisco, CA 94102',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday: 8:00 AM - 5:00 PM',
      description: 'Weekend support available',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 2, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      {/* Hero Section with Advanced Animations */}
      <section ref={heroRef} className="relative py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0"
          >
            {/* Floating Geometric Shapes */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-16 left-16 w-40 h-40 bg-gradient-to-r from-pink-400/15 to-purple-400/15 rounded-full blur-sm"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 18, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-lg transform rotate-45 blur-sm"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
                x: [0, -40, 0],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-r from-orange-400/15 to-pink-400/15 rounded-full blur-sm"
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            {/* Simple Icon Cluster */}
            <motion.div 
              className="flex justify-center mb-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-2xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <div className="p-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-2xl">
                  <MessageCircle className="h-12 w-12 text-white" />
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-2xl">
                  <Baby className="h-10 w-10 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                We're Here
              </span>
              <br />
              <motion.span 
                className="text-gray-900"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 25px rgba(236, 72, 153, 0.4)",
                    "0 0 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                to Help
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Get in touch with our caring team. We're here to support you in 
              optimizing your fertility practice with compassionate technology.
            </motion.p>

            {/* Animated CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(236, 72, 153, 0.3)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300"
              >
                Start Conversation
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 border-2 border-gray-300 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:border-blue-500 transition-all duration-300"
              >
                Schedule Call
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Contact Information Cards with 3D Effects */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {[...Array(64)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-pink-200/20"
                animate={{
                  backgroundColor: [
                    "rgba(236, 72, 153, 0.05)",
                    "rgba(147, 51, 234, 0.05)",
                    "rgba(59, 130, 246, 0.05)",
                    "rgba(236, 72, 153, 0.05)"
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Multiple Ways to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"> Connect</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <ContactCard key={info.title} info={info} index={index} />
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form with Advanced Animations */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-pink-500 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.3, 1, 0.3],
                        rotate: [0, 360, 0],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-8 relative z-10"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(0,0,0,0)",
                      "0 0 20px rgba(236, 72, 153, 0.2)",
                      "0 0 0px rgba(0,0,0,0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Send us a message
                </motion.h2>
                
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        whileFocus={{ 
                          boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)",
                          borderColor: "rgb(236, 72, 153)"
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all duration-300 text-lg"
                        placeholder="Your name"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        whileFocus={{ 
                          boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)",
                          borderColor: "rgb(236, 72, 153)"
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all duration-300 text-lg"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <motion.select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      whileFocus={{ 
                        boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)",
                        borderColor: "rgb(236, 72, 153)"
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all duration-300 text-lg"
                    >
                      <option value="">Select a subject</option>
                      <option value="demo">Request a Demo</option>
                      <option value="support">Technical Support</option>
                      <option value="consultation">Fertility Consultation</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </motion.select>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      whileFocus={{ 
                        boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)",
                        borderColor: "rgb(236, 72, 153)"
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all duration-300 text-lg resize-none"
                      placeholder="Tell us how we can help you on your fertility journey..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                </form>
              </div>
            </motion.div>
            {/* Interactive Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="space-y-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Interactive Map Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  z: 30
                }}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl border border-pink-100 p-8 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 mb-6"
                  animate={{ 
                    color: [
                      "rgb(17, 24, 39)",
                      "rgb(236, 72, 153)",
                      "rgb(17, 24, 39)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Visit our office
                </motion.h2>
                
                <motion.div 
                  className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Animated Map Placeholder */}
                  <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-pink-500/30 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <MapPin className="h-16 w-16 text-pink-600 mb-4" />
                    <p className="text-pink-700 font-semibold text-lg">Interactive map coming soon</p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Emergency Support Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: -5,
                  z: 30
                }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-2xl border border-blue-100 p-8 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-4 right-4 w-20 h-20 bg-blue-300 rounded-full"
                  />
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-4 left-4 w-16 h-16 bg-cyan-300 rounded-full"
                  />
                </div>

                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-4 relative z-10"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(0,0,0,0)",
                      "0 0 15px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(0,0,0,0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Need immediate assistance?
                </motion.h3>
                <p className="text-gray-700 mb-6 relative z-10">
                  For urgent support or critical issues, please call our 
                  24/7 support hotline.
                </p>
                <div className="space-y-3 relative z-10">
                  <p className="font-semibold text-gray-900">Emergency Support:</p>
                  <motion.p 
                    className="text-blue-600 font-bold text-xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      color: [
                        "rgb(37, 99, 235)",
                        "rgb(236, 72, 153)",
                        "rgb(37, 99, 235)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    +1 (555) 999-0000
                  </motion.p>
                </div>
              </motion.div>

              {/* Support Resources Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  z: 30
                }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-2xl border border-green-100 p-8 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-6"
                  animate={{ 
                    color: [
                      "rgb(17, 24, 39)",
                      "rgb(34, 197, 94)",
                      "rgb(17, 24, 39)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Quick Resources
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Users, label: "FAQ", desc: "Common questions" },
                    { icon: Shield, label: "Support", desc: "Help center" },
                    { icon: Globe, label: "Docs", desc: "Documentation" },
                    { icon: Star, label: "Updates", desc: "Latest news" }
                  ].map((item, index) => (
                    <motion.button
                      key={item.label}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.8)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2"
                      >
                        <item.icon className="h-4 w-4 text-white" />
                      </motion.div>
                      <h4 className="font-semibold text-gray-900 text-sm">{item.label}</h4>
                      <p className="text-gray-600 text-xs">{item.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Particle Effects */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 relative overflow-hidden">
        {/* Animated Particle Background */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div 
              className="flex justify-center mb-8"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl">
                <Heart className="h-16 w-16 text-white" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-white mb-8"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 40px rgba(236, 72, 153, 0.5)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Ready to Transform Care?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of fertility specialists who trust our platform 
              to provide compassionate, data-driven care.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255, 255, 255, 0.2)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(236, 72, 153, 0.3)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-purple-900 transition-all duration-300"
              >
                Book Demo Call
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Contact Card Component with 3D Effects
const ContactCard = ({ info, index }: { info: any, index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: 60,
        rotateX: -20,
        z: -50
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        z: 0
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -15,
        rotateY: 10,
        z: 50,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 text-center relative overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            `linear-gradient(45deg, ${info.color.split(' ')[1]}/10, ${info.color.split(' ')[3]}/10)`,
            `linear-gradient(45deg, ${info.color.split(' ')[3]}/15, ${info.color.split(' ')[1]}/15)`,
            `linear-gradient(45deg, ${info.color.split(' ')[1]}/10, ${info.color.split(' ')[3]}/10)`
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`w-20 h-20 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10`}
      >
        <info.icon className="h-10 w-10 text-white" />
      </motion.div>
      
      <motion.h3 
        className="text-xl font-bold text-gray-900 mb-3 relative z-10"
        whileHover={{ scale: 1.05 }}
      >
        {info.title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-900 font-semibold mb-2 relative z-10"
        animate={{ 
          color: [
            "rgb(17, 24, 39)",
            `rgb(${info.color.includes('pink') ? '236, 72, 153' : info.color.includes('blue') ? '59, 130, 246' : info.color.includes('purple') ? '147, 51, 234' : '34, 197, 94'})`,
            "rgb(17, 24, 39)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      >
        {info.details}
      </motion.p>
      
      <p className="text-gray-600 text-sm relative z-10">
        {info.description}
      </p>

      {/* 3D Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-500/5 to-gray-500/10 rounded-2xl transform translate-x-3 translate-y-3 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  )
}

export default Contact