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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-white">
        {/* Background image - right side bleed */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/1b/49/8f/ee/85/v1_E10/E108TA0K.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=de1427c6a419301c3b1f2a4bda9ce317235d972bf3acef16e2fd2b1f88b397a7"
            alt="hero"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay: solid white on left fading to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-24">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
            >
              Making Advanced Genomics{' '}
              <span className="text-pink-600">Accessible to Everyone</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg text-gray-600 mb-10"
            >
              Delivering accurate, affordable, and cutting-edge genetic insights worldwide.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-0 mb-10"
            >
              {[
                { value: '10+', label: 'Years of Excellence' },
                { value: '1M+', label: 'Patients Served' },
                { value: '600+', label: 'Locations Covered' },
                { value: '40+', label: 'Countries Reached' },
              ].map((stat, i, arr) => (
                <div
                  key={stat.value}
                  className={`pr-6 ${i !== arr.length - 1 ? 'border-r border-gray-300 mr-6' : ''}`}
                >
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Link
                to="/ivf-genetic-tests"
                className="inline-flex items-center gap-2 text-pink-600 font-semibold text-base hover:gap-3 transition-all duration-200"
              >
                Explore More <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why IVF Clinics 
              
              
               Choose Us
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Not just testing — we power your IVF decisions. Most labs give you a report. We help you make faster, smarter embryo transfer decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: '⚡',
                title: '2X Faster Reports',
                subtitle: '5–7 Day Turnaround',
                points: ['No more 10–14 day waiting cycles', 'Faster embryo transfer planning', 'Reduced patient anxiety'],
                cta: 'Because in IVF, timing is everything',
              },
              {
                emoji: '💰',
                title: 'Increase Profit Per IVF Cycle',
                subtitle: 'Save 30–40% on PGT-A costs',
                points: ['Offer competitive pricing to patients', 'Improve your clinic margins'],
                cta: 'More revenue without increasing patient load',
              },
              {
                emoji: '🤖',
                title: 'AI-Powered Embryo Insights',
                subtitle: 'Game Changer',
                points: ['Clear embryo ranking', 'Visual, easy-to-understand reports', 'Better clinical decision support'],
                cta: 'Not just data — actionable intelligence',
              },
              {
                emoji: '📞',
                title: 'Dedicated Support',
                subtitle: 'No Ticket System',
                points: ['Direct WhatsApp & call support', 'Real-time sample tracking', 'Faster issue resolution'],
                cta: 'Because IVF workflows can\'t wait',
              },
              {
                emoji: '🔬',
                title: 'Accuracy You Can Trust',
                subtitle: 'NGS-based analysis',
                points: ['Clinically validated pipelines', 'Expert-reviewed reports'],
                cta: 'Same reliability, better experience',
              },
              {
                emoji: '🧾',
                title: 'White-Labeled Reports',
                subtitle: 'Your brand, your identity',
                points: ['Your logo on every report', 'Your branding in front of patients'],
                cta: 'We stay invisible — you build your brand',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="text-pink-600 text-sm font-medium mb-3">{card.subtitle}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {card.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 italic border-t border-gray-200 pt-3">👉 {card.cta}</p>
              </motion.div>
            ))}
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
                Book Your Test
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