import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  TestTube, 
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { name: 'Total Patients', value: '248', icon: Users, change: '+12%', changeType: 'positive' },
    { name: 'Tests This Month', value: '89', icon: TestTube, change: '+8%', changeType: 'positive' },
    { name: 'Success Rate', value: '67%', icon: TrendingUp, change: '+3%', changeType: 'positive' },
    { name: 'Pending Results', value: '12', icon: Calendar, change: '-2', changeType: 'negative' },
  ]

  const recentTests = [
    { id: 1, patient: 'Patient A', test: 'AMH Level', result: 'Normal', status: 'completed' },
    { id: 2, patient: 'Patient B', test: 'FSH Test', result: 'Elevated', status: 'review' },
    { id: 3, patient: 'Patient C', test: 'Estradiol', result: 'Low', status: 'completed' },
    { id: 4, patient: 'Patient D', test: 'LH Test', result: 'Pending', status: 'pending' },
  ]

  return (
    <div className="space-y-4 lg:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1 lg:mt-2 text-sm lg:text-base">Overview of your IVF practice analytics</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-3 lg:mt-4 flex items-center">
              <span className={`text-xs lg:text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-xs lg:text-sm text-gray-500 ml-2 truncate">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Tests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Recent Test Results</h2>
        
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-3">
          {recentTests.map((test) => (
            <div key={test.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 text-sm">{test.patient}</h3>
                <div className="flex items-center">
                  {test.status === 'completed' && (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  )}
                  {test.status === 'review' && (
                    <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                  )}
                  {test.status === 'pending' && (
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  )}
                  <span className={`text-xs capitalize ${
                    test.status === 'completed' ? 'text-green-600' :
                    test.status === 'review' ? 'text-orange-600' :
                    'text-gray-500'
                  }`}>
                    {test.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Test:</span> {test.test}
              </div>
              <div className="text-sm text-gray-900">
                <span className="font-medium">Result:</span> {test.result}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {test.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.test}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.result}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {test.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      )}
                      {test.status === 'review' && (
                        <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                      )}
                      {test.status === 'pending' && (
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span className={`text-sm capitalize ${
                        test.status === 'completed' ? 'text-green-600' :
                        test.status === 'review' ? 'text-orange-600' :
                        'text-gray-500'
                      }`}>
                        {test.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard