import { motion } from 'framer-motion'
import { Heart, Users, Award, Target } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Compassionate Care', description: 'We put patients at the center of everything we do, supporting families through every step of their fertility journey.' },
  { icon: Target, title: 'Precision Medicine', description: 'Leveraging cutting-edge genomics and AI to deliver highly accurate, personalized fertility insights.' },
  { icon: Users, title: 'Expert Team', description: 'Our team of embryologists, geneticists, and fertility specialists bring decades of combined experience.' },
  { icon: Award, title: 'Proven Results', description: 'Trusted by leading IVF clinics worldwide with thousands of successful treatment cycles.' },
]

const team = [
  { name: 'Dr. Sarah Mitchell', role: 'Chief Medical Officer', bio: 'Reproductive endocrinologist with 20+ years in IVF and genetic medicine.' },
  { name: 'Dr. James Okafor', role: 'Head of Genetics', bio: 'PhD in molecular genetics, pioneering PGT research across three continents.' },
  { name: 'Dr. Priya Sharma', role: 'Lead Embryologist', bio: 'Specialist in embryo culture and vitrification with a 70%+ success rate.' },
]

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About IVF360</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We are a team of scientists, clinicians, and technologists united by a single mission — helping more families achieve the dream of parenthood through smarter fertility science.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            IVF360 was founded to bridge the gap between advanced genetic science and everyday fertility care. We believe every patient deserves access to the most accurate diagnostics and the most compassionate support — regardless of where they are in the world.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <v.icon className="h-10 w-10 text-pink-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-pink-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
