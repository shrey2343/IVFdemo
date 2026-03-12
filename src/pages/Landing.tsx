import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Heart,
  Baby,
  Microscope,
  Activity
} from 'lucide-react'

const Landing = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive analysis of IVF test results with intelligent insights and trend tracking.'
    },
    {
      icon: Users,
      title: 'Patient Care',
      description: 'Streamlined patient record management with treatment stage tracking and progress monitoring.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'HIPAA-compliant platform ensuring the highest standards of patient data security.'
    },
    {
      icon: Heart,
      title: 'Success Tracking',
      description: 'Monitor treatment success rates and identify patterns to optimize patient outcomes.'
    }
  ]

  const benefits = [
    'Real-time test result analysis',
    'Automated report generation',
    'Treatment outcome predictions',
    'Patient progress tracking',
    'Secure data management',
  
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Video background */}
      <section className="py-20 relative overflow-hidden min-h-screen flex items-center bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => console.error('Video failed to load:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
          >
            <source
              src="https://public-assets.content-platform.envatousercontent.com/5a189022-c239-4e57-907b-87776cc0d4af/a30368f1-d62e-46cd-9e7d-d7701afb5fd6/5a189022-c239-4e57-907b-87776cc0d4af/preview_540p_crf26_lower_quality.mp4"
              type="video/mp4"
            />
            {/* Fallback for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>
          {/* Very light overlay only for text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/30">
                <Baby className="h-12 w-12 text-pink-600 drop-shadow-sm" />
                <Heart className="h-8 w-8 text-orange-500 drop-shadow-sm" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Nurturing Dreams with
              <span className="text-pink-300 drop-shadow-lg"> IVF Analytics</span>
            </h1>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl px-6 py-6 mb-8 max-w-4xl mx-auto shadow-lg border border-white/30">
              <p className="text-xl text-gray-900 drop-shadow-sm font-medium">
                Empower your fertility journey with compassionate care and intelligent analytics. 
                Supporting families in their path to parenthood with advanced medical insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                Start Your Journey
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/90 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Secondary gradient */}
      <section className="section-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for fertility success
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools necessary to support 
              your fertility practice and nurture hope for growing families.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-secondary text-center p-6"
              >
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Accent gradient */}
      <section className="section-accent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why choose our platform?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Built with love and expertise by medical professionals who understand 
                the delicate journey of fertility treatment. Every feature is designed 
                with care and compassion.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-800">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-primary"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Baby className="h-10 w-10 text-pink-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to begin?
                </h3>
                <p className="text-gray-700 mb-6">
                  Join hundreds of fertility specialists who trust our platform 
                  to support families on their journey to parenthood.
                </p>
                <Link 
                  to="/signup" 
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <span>Start your journey</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Simple Tech Icons Grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8"
            >
              {[
                { icon: Microscope, title: "AI Analysis", color: "from-blue-400 to-cyan-400" },
                { icon: Activity, title: "Real-time Data", color: "from-green-400 to-emerald-400" },
                { icon: BarChart3, title: "Analytics", color: "from-yellow-400 to-orange-400" },
                { icon: Shield, title: "Security", color: "from-red-400 to-pink-400" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </motion.div>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Advanced
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> Technology</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our cutting-edge platform combines AI, machine learning, and medical expertise 
                to provide unprecedented insights into fertility treatments.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Microscope, title: "AI-Powered Analysis", desc: "Advanced algorithms analyze test results with 99.9% accuracy" },
                  { icon: Activity, title: "Real-time Monitoring", desc: "Continuous tracking of patient progress and treatment outcomes" },
                  { icon: Shield, title: "Secure Data", desc: "Bank-level encryption ensures complete patient privacy" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Nature gradient */}
      <section className="section-nature py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-pink-600" />
                <Baby className="h-10 w-10 text-orange-600" />
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transform fertility care with compassion
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Experience the power of intelligent analytics combined with 
              heartfelt care for every family's unique journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Begin Your Journey
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing