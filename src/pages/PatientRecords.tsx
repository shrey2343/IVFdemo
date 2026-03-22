import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  ChevronRight,
  Upload,
  X
} from 'lucide-react'

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [userRole, setUserRole] = useState('doctor') // 'doctor' or 'wetlab'
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  
  // Filter states
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTestType, setFilterTestType] = useState('all')
  const [filterDateRange, setFilterDateRange] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  const navigate = useNavigate()

  // Sample data matching the new UI design
  const samples = [
    {
      id: 'S001',
      patientName: 'Sarah Johnson',
      testType: 'PGT-A',
      status: 'Completed',
      date: '2024-03-10',
      patientId: 1
    },
    {
      id: 'S002',
      patientName: 'Emily Chen',
      testType: 'PGT-M',
      status: 'Processing',
      date: '2024-03-11',
      patientId: 2
    },
    {
      id: 'S003',
      patientName: 'Maria Rodriguez',
      testType: 'PGT-SR',
      status: 'Flagged',
      date: '2024-03-12',
      patientId: 3
    },
    {
      id: 'S004',
      patientName: 'Jessica Lee',
      testType: 'PGT-A',
      status: 'Completed',
      date: '2024-03-13',
      patientId: 4
    },
    {
      id: 'S005',
      patientName: 'Amanda White',
      testType: 'PGT-M',
      status: 'Processing',
      date: '2024-03-14',
      patientId: 5
    }
  ]

  // Statistics
  const stats = {
    totalSamples: 5,
    inProgress: 2,
    completed: 2,
    flagged: 1
  }

  // Progress stages
  const progressStages = [
    { name: 'Uploaded', count: 5, color: 'bg-blue-500' },
    { name: 'Processing', count: 2, color: 'bg-yellow-500' },
    { name: 'Analysis', count: 1, color: 'bg-purple-500' },
    { name: 'Report Ready', count: 2, color: 'bg-green-500' }
  ]

  // Alerts
  const alerts = [
    { type: 'warning', message: '1 Sample requires review' },
    { type: 'error', message: 'Upload Error: 5010 failed' }
  ]

  const filteredSamples = samples.filter(sample => {
    // Search filter
    const matchesSearch = sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.testType.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || sample.status === filterStatus
    
    // Test type filter
    const matchesTestType = filterTestType === 'all' || sample.testType === filterTestType
    
    // Date filter
    let matchesDate = true
    if (filterDateRange !== 'all') {
      const sampleDate = new Date(sample.date)
      const today = new Date()
      
      if (filterDateRange === 'today') {
        matchesDate = sampleDate.toDateString() === today.toDateString()
      } else if (filterDateRange === 'week') {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        matchesDate = sampleDate >= weekAgo
      } else if (filterDateRange === 'month') {
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        matchesDate = sampleDate >= monthAgo
      } else if (filterDateRange === 'custom' && startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)
        matchesDate = sampleDate >= start && sampleDate <= end
      }
    }
    
    return matchesSearch && matchesStatus && matchesTestType && matchesDate
  })

  // Get unique test types for filter dropdown
  const testTypes = ['all', ...Array.from(new Set(samples.map(s => s.testType)))]

  // Clear all filters
  const clearFilters = () => {
    setFilterStatus('all')
    setFilterTestType('all')
    setFilterDateRange('all')
    setStartDate('')
    setEndDate('')
  }

  // Check if any filters are active
  const hasActiveFilters = filterStatus !== 'all' || filterTestType !== 'all' || filterDateRange !== 'all'

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Flagged':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />
      case 'Processing':
        return <Clock className="h-4 w-4" />
      case 'Flagged':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleSampleClick = (patientId: number) => {
    navigate(`/patients/${patientId}`)
  }

  const handleUploadFastQ = (sampleId: string) => {
    // Simulate file upload process
    setTimeout(() => {
      setToastMessage(`FastQ files for sample ${sampleId} uploaded successfully!`)
      setToastType('success')
      setShowToast(true)
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }, 1000) // Simulate upload delay
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
          <p className="text-gray-600 mt-2">Manage and track patient samples and test results</p>
        </div>
        <button 
          onClick={() => navigate('/add-patient')}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
        </button>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Samples</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalSamples}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Flagged</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.flagged}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Section and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h2>
          <div className="space-y-4">
            {progressStages.map((stage, index) => (
              <div key={stage.name} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                    <span className="text-sm text-gray-900">{stage.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${stage.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${(stage.count / stats.totalSamples) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${
                  alert.type === 'error' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {alert.type === 'error' ? (
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  )}
                  <p className={`text-sm ${
                    alert.type === 'error' ? 'text-red-800' : 'text-yellow-800'
                  }`}>
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search samples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowFilterModal(true)}
                className={`btn-secondary flex items-center space-x-2 ${hasActiveFilters ? 'bg-pink-100 text-pink-700 border-pink-300' : ''}`}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {hasActiveFilters && (
                  <span className="bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {[filterStatus, filterTestType, filterDateRange].filter(f => f !== 'all').length}
                  </span>
                )}
              </button>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1"
                >
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Samples Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Samples</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Sample ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Test Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSamples.map((sample) => (
                <tr 
                  key={sample.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleSampleClick(sample.patientId)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {sample.id}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{sample.testType}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sample.status)}`}>
                      {getStatusIcon(sample.status)}
                      <span>{sample.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{sample.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {sample.status === 'Completed' ? (
                        <>
                          <button 
                            onClick={() => navigate(`/patients/${sample.patientId}?tab=reports`)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                          >
                            <FileText className="h-3 w-3" />
                            <span>View Report</span>
                          </button>
                          {userRole === 'wetlab' && (
                            <button 
                              onClick={() => handleUploadFastQ(sample.id)}
                              className="text-sm text-green-600 hover:text-green-800 flex items-center space-x-1"
                            >
                              <Upload className="h-3 w-3" />
                              <span>Upload FastQ</span>
                            </button>
                          )}
                        </>
                      ) : sample.status === 'Flagged' ? (
                        <>
                          <button 
                            onClick={() => handleSampleClick(sample.patientId)}
                            className="text-sm text-red-600 hover:text-red-800 flex items-center space-x-1"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Review</span>
                          </button>
                          {userRole === 'wetlab' && (
                            <button 
                              onClick={() => handleUploadFastQ(sample.id)}
                              className="text-sm text-green-600 hover:text-green-800 flex items-center space-x-1"
                            >
                              <Upload className="h-3 w-3" />
                              <span>Upload FastQ</span>
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleSampleClick(sample.patientId)}
                            className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                          >
                            <span>View</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                          {userRole === 'wetlab' && (
                            <button 
                              onClick={() => handleUploadFastQ(sample.id)}
                              className="text-sm text-green-600 hover:text-green-800 flex items-center space-x-1"
                            >
                              <Upload className="h-3 w-3" />
                              <span>Upload FastQ</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Filter Samples</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Processing">Processing</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>

              {/* Test Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                <select
                  value={filterTestType}
                  onChange={(e) => setFilterTestType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {testTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Test Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-3"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </select>

                {/* Custom Date Range */}
                {filterDateRange === 'custom' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={clearFilters}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            toastType === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          <div className="flex items-center space-x-2">
            {toastType === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            <span className="font-medium">{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </div>
  )}

export default PatientRecords;