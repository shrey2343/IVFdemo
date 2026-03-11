import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react'

const TestAnalysis = () => {
  const [selectedTest, setSelectedTest] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const testTypes = [
    { id: 'all', name: 'All Tests' },
    { id: 'amh', name: 'AMH Level' },
    { id: 'fsh', name: 'FSH Test' },
    { id: 'estradiol', name: 'Estradiol' },
    { id: 'lh', name: 'LH Test' },
    { id: 'progesterone', name: 'Progesterone' },
  ]

  const analysisData = [
    {
      id: 1,
      patient: 'Patient A',
      age: 32,
      testType: 'AMH Level',
      value: '2.8 ng/mL',
      referenceRange: '1.0-4.0 ng/mL',
      status: 'normal',
      interpretation: 'Good ovarian reserve',
      date: '2024-03-10'
    },
    {
      id: 2,
      patient: 'Patient B',
      age: 38,
      testType: 'FSH Test',
      value: '12.5 mIU/mL',
      referenceRange: '3.5-12.5 mIU/mL',
      status: 'borderline',
      interpretation: 'Borderline elevated, monitor closely',
      date: '2024-03-09'
    },
    {
      id: 3,
      patient: 'Patient C',
      age: 29,
      testType: 'Estradiol',
      value: '45 pg/mL',
      referenceRange: '30-400 pg/mL',
      status: 'low',
      interpretation: 'Low estradiol, consider supplementation',
      date: '2024-03-08'
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <div className="h-3 w-3 bg-green-500 rounded-full" />
      case 'borderline':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'low':
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Test Analysis</h1>
        <p className="text-gray-600 mt-2">Comprehensive analysis of IVF-related test results</p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {testTypes.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Analysis Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Results Analysis</h2>
        <div className="space-y-4">
          {analysisData.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(result.status)}
                    <h3 className="text-lg font-medium text-gray-900">
                      {result.patient} - {result.testType}
                    </h3>
                    <span className="text-sm text-gray-500">Age: {result.age}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Test Value</p>
                      <p className="text-lg font-semibold text-gray-900">{result.value}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Reference Range</p>
                      <p className="text-sm text-gray-700">{result.referenceRange}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Test Date</p>
                      <p className="text-sm text-gray-700">{result.date}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Clinical Interpretation</p>
                    <p className="text-sm text-gray-800">{result.interpretation}</p>
                  </div>
                </div>
                
                <div className="ml-4">
                  <button className="btn-secondary text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trends Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Trends Analysis</h2>
          <TrendingUp className="h-5 w-5 text-pink-600" />
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would be implemented here</p>
        </div>
      </motion.div>
    </div>
  )
}

export default TestAnalysis