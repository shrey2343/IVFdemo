import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock, Heart, Baby } from 'lucide-react'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding AMH Levels in IVF Treatment',
      excerpt: 'Anti-Müllerian Hormone (AMH) is a crucial marker for assessing ovarian reserve. Learn how to interpret AMH levels and their impact on IVF success rates.',
      author: 'Dr. Sarah Johnson',
      date: '2024-03-10',
      readTime: '5 min read',
      category: 'Clinical Insights',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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

  return (
    <div className="min-h-screen">
      {/* Hero Section - Primary gradient */}
      <section className="section-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-pink-600" />
                <Baby className="h-10 w-10 text-orange-600" />
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fertility Care Insights
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay updated with the latest insights, research, and compassionate care practices 
              in fertility medicine and reproductive health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories - Secondary background */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts - Accent gradient */}
      <section className="section-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-700 rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Nature gradient */}
      <section className="section-nature py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Heart className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Connected with Care
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive the latest insights in fertility 
              medicine and compassionate care delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog