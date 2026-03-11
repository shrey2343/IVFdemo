import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock, Heart, Baby, Star, BookOpen, TrendingUp } from 'lucide-react'
import { useRef, useState } from 'react'

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const blogPosts = [
    {
      id: 1,
      title: 'Understanding AMH Levels in IVF Treatment',
      excerpt: 'Anti-Müllerian Hormone (AMH) is a crucial marker for assessing ovarian reserve. Learn how to interpret AMH levels and their impact on IVF success rates.',
      author: 'Dr. Sarah Johnson',
      date: '2024-03-10',
      readTime: '5 min read',
      category: 'Clinical Insights',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Optimizing FSH Protocols for Better Outcomes',
      excerpt: 'Explore the latest research on FSH stimulation protocols and how personalized approaches can improve patient outcomes in assisted reproduction.',
      author: 'Dr. Michael Chen',
      date: '2024-03-08',
      readTime: '7 min read',
      category: 'Treatment Protocols',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'The Role of Estradiol Monitoring in IVF Cycles',
      excerpt: 'Discover how proper estradiol monitoring can help predict cycle outcomes and guide clinical decision-making throughout the IVF process.',
      author: 'Dr. Emily Rodriguez',
      date: '2024-03-05',
      readTime: '6 min read',
      category: 'Monitoring',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Emotional Support During Fertility Treatment',
      excerpt: 'Learn how advanced analytics and emotional care are revolutionizing fertility treatment by providing better support for families.',
      author: 'Dr. James Wilson',
      date: '2024-03-02',
      readTime: '8 min read',
      category: 'Patient Care',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Nurturing Hope: Patient Communication Strategies',
      excerpt: 'Effective communication strategies for discussing complex fertility data and treatment options with patients and their families.',
      author: 'Dr. Lisa Thompson',
      date: '2024-02-28',
      readTime: '4 min read',
      category: 'Family Support',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Creating a Caring Laboratory Environment',
      excerpt: 'Best practices for maintaining laboratory standards while ensuring a compassionate environment for fertility treatments.',
      author: 'Dr. Robert Kim',
      date: '2024-02-25',
      readTime: '6 min read',
      category: 'Laboratory Care',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  const categories = ['All', 'Clinical Insights', 'Treatment Protocols', 'Monitoring', 'Patient Care', 'Family Support', 'Laboratory Care']

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
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
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-lg transform rotate-45"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full"
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Simple Icon Cluster */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg">
                  <Baby className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                Fertility Care
              </span>
              <br />
              <motion.span 
                className="text-gray-900"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 20px rgba(236, 72, 153, 0.3)",
                    "0 0 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Insights
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Stay updated with the latest insights, research, and compassionate care practices 
              in fertility medicine and reproductive health.
            </motion.p>

            {/* Animated Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { icon: BookOpen, number: "150+", label: "Articles", color: "from-pink-500 to-rose-500" },
                { icon: Star, number: "50K+", label: "Readers", color: "from-purple-500 to-indigo-500" },
                { icon: TrendingUp, number: "95%", label: "Success Rate", color: "from-blue-500 to-cyan-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 10,
                    z: 50
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Categories */}
      <section className="py-12 bg-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              background: [
                "linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(147, 51, 234, 0.05))",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
                "linear-gradient(45deg, rgba(245, 158, 11, 0.05), rgba(239, 68, 68, 0.05))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(147, 51, 234, 0.05))"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:text-pink-600 hover:bg-pink-50 shadow-md border border-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts with Advanced Animations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter with Particle Effects */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div 
              className="flex justify-center mb-8"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-2xl">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 0 30px rgba(34, 197, 94, 0.3)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Stay Connected with Care
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Subscribe to our newsletter and receive the latest insights in fertility 
              medicine and compassionate care delivered to your inbox.
            </motion.p>
            
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex space-x-4">
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  whileFocus={{ scale: 1.02 }}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg"
                />
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg text-lg"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Blog Card Component with Advanced Animations
const BlogCard = ({ post, index }: { post: any, index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.article
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateX: -30,
        z: -100
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        z: 0
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        rotateY: 5,
        z: 50,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(236, 72, 153, 0), rgba(147, 51, 234, 0), rgba(59, 130, 246, 0))",
            "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(45deg, rgba(236, 72, 153, 0), rgba(147, 51, 234, 0), rgba(59, 130, 246, 0))"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Image with Parallax Effect */}
      <div className="relative overflow-hidden h-48">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating Category Badge */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-pink-700 rounded-full shadow-lg">
            {post.category}
          </span>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </div>
        </div>
        
        <motion.h2 
          className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {post.title}
        </motion.h2>
        
        <motion.p 
          className="text-gray-700 mb-4 line-clamp-3"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {post.excerpt}
        </motion.p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>
        
        <motion.div 
          className="pt-4 border-t border-gray-200"
          whileHover={{ borderColor: "rgb(236, 72, 153)" }}
        >
          <motion.button 
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-semibold group"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Read More</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* 3D Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-500/5 to-purple-500/10 rounded-2xl transform translate-x-2 translate-y-2 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.article>
  )
}

export default Blog