import { motion } from 'framer-motion'
import { Building2, Globe, TrendingUp, ArrowRight, CheckCircle, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const benefits = [
  { icon: TrendingUp, title: 'Boost Success Rates', description: 'Integrate our genetic testing platform to improve embryo selection and patient outcomes.' },
  { icon: Globe, title: 'Global Network', description: 'Join a growing network of clinics and labs across 30+ countries sharing best practices.' },
  { icon: Building2, title: 'White-Label Solutions', description: 'Offer IVF 360 analytics under your own brand with full technical support.' },
  { icon: Users, title: 'Dedicated Support', description: 'A dedicated partnership manager and 24/7 technical support for your team.' },
]

const partnerTypes = [
  { title: 'IVF Clinics', description: 'Enhance your clinical workflow with integrated genetic testing and AI-powered analytics.' },
  { title: 'Diagnostic Labs', description: 'Expand your service offering with our PGT and carrier screening solutions.' },
  { title: 'Hospitals & Health Systems', description: 'Bring advanced reproductive genetics to your fertility department.' },
  { title: 'Research Institutions', description: 'Collaborate on clinical studies and access our anonymized data platform.' },
]

const whyPoints = [
  { label: 'Quality', desc: 'Cost-effective global quality offerings. CAP accredited & NABL certified clinical sequencing lab.' },
  { label: 'Science', desc: 'Comprehensive diagnostic coverage across all major disease areas.' },
  { label: 'Innovation', desc: 'Scientific research backed innovative genomics offerings.' },
  { label: 'Technology', desc: 'Proprietary AI/ML enabled automated, scalable analysis tools.' },
  { label: 'Trust', desc: 'Trusted by the scientific and clinician community, with a well-established pan-India presence and network.' },
]

const Partner = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Users className="h-14 w-14 text-pink-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Partner With Us</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join the IVF 360 ecosystem and bring world-class genetic testing and analytics to your patients.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partner Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-md border border-gray-200">

          {/* Cyan header bar */}
          <div className="bg-cyan-500 px-8 py-5">
            <h2 className="text-xl md:text-2xl font-semibold text-white text-center tracking-wide">
              Please Share Your Details For Us To Reach You
            </h2>
          </div>

          {/* Two-column body */}
          <div className="flex flex-col md:flex-row bg-white">

            {/* Left — Why Partner list */}
            <div className="md:w-5/12 px-8 py-10 border-r border-gray-100">
              <h3 className="text-base font-bold text-cyan-600 mb-6">Why Partner with IVF 360?</h3>
              <ul className="space-y-5">
                {whyPoints.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-800">{item.label}: </span>
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Form */}
            <div className="md:w-7/12 px-8 py-10 flex flex-col justify-center">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name*"
                    required
                    className="border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Last Name*"
                    required
                    className="border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email*"
                    required
                    className="border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="City*"
                    required
                    className="border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Mobile No.*"
                    required
                    className="border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Message*"
                    className="border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div className="flex justify-end items-center pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 text-cyan-600 font-semibold text-sm hover:text-cyan-700 transition-colors"
                  >
                    Connect With Us
                    <span className="w-9 h-9 rounded-full border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-50 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Partner
