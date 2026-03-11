import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Calendar,
  Phone,
  Mail,
  FileText
} from 'lucide-react'

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 32,
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      lastVisit: '2024-03-10',
      status: 'active',
      treatmentStage: 'Stimulation',
      nextAppointment: '2024-03-15',
      recentTests: ['AMH', 'FSH', 'Estradiol']
    },
    {
      id: 2,
      name: 'Emily Chen',
      age: 38,
      email: 'emily.chen@email.com',
      phone: '+1 (555) 234-5678',
      lastVisit: '2024-03-08',
      status: 'monitoring',
      treatmentStage: 'Baseline',
      nextAppointment: '2024-03-12',
      recentTests: ['FSH', 'LH']
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      age: 29,
      email: 'maria.r@email.com',
      phone: '+1 (555) 345-6789',
      lastVisit: '2024-03-05',
      status: 'completed',
      treatmentStage: 'Transfer',
      nextAppointment: '2024-03-20',
      recentTests: ['Progesterone', 'Beta HCG']
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
          <p className="text-gray-600 mt-2">Manage and track patient information and treatment progress</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
        </button>
      </motion.div>

      {/* Search and Filters */}
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Patients</option>
              <option value="active">Active Treatment</option>
              <option value="monitoring">Monitoring</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {patients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-sm text-gray-500">Age: {patient.age}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Last visit: {patient.lastVisit}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Treatment Stage</span>
                <span className="text-sm text-gray-900">{patient.treatmentStage}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Next Appointment</span>
                <span className="text-sm text-gray-900">{patient.nextAppointment}</span>
              </div>
              
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 block mb-2">Recent Tests</span>
                <div className="flex flex-wrap gap-1">
                  {patient.recentTests.map((test) => (
                    <span
                      key={test}
                      className="px-2 py-1 text-xs bg-pink-50 text-pink-700 rounded"
                    >
                      {test}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 btn-primary text-sm">
                  View Details
                </button>
                <button className="btn-secondary text-sm flex items-center space-x-1">
                  <FileText className="h-3 w-3" />
                  <span>Records</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PatientRecords