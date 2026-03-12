import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Heart,
  Activity,
  FileText,
  Download,
  Eye,
  Edit,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react'

const PatientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock patient data - in real app, this would come from API
  const patient = {
    id: 1,
    name: 'Sarah Johnson',
    age: 32,
    dateOfBirth: '1992-05-15',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Husband',
      phone: '+1 (555) 123-4568'
    },
    medicalInfo: {
      height: '5\'6"',
      weight: '140 lbs',
      bloodType: 'A+',
      allergies: ['Penicillin', 'Shellfish'],
      medications: ['Folic Acid', 'Prenatal Vitamins'],
      medicalHistory: ['Endometriosis', 'PCOS']
    },
    treatmentInfo: {
      status: 'active',
      treatmentStage: 'Stimulation',
      cycleNumber: 2,
      startDate: '2024-02-15',
      doctor: 'Dr. Emily Rodriguez',
      protocol: 'Long Agonist Protocol',
      nextAppointment: '2024-03-15'
    },
    reports: [
      {
        id: 1,
        date: '2024-03-10',
        type: 'Hormone Panel',
        status: 'completed',
        results: {
          AMH: { value: '2.5', unit: 'ng/mL', range: '1.0-4.0', status: 'normal' },
          FSH: { value: '8.2', unit: 'mIU/mL', range: '3.0-20.0', status: 'normal' },
          Estradiol: { value: '45', unit: 'pg/mL', range: '30-400', status: 'normal' },
          LH: { value: '5.1', unit: 'mIU/mL', range: '2.0-10.0', status: 'normal' }
        },
        notes: 'Hormone levels are within normal range. Patient responding well to stimulation.'
      },
      {
        id: 2,
        date: '2024-03-08',
        type: 'Ultrasound',
        status: 'completed',
        results: {
          'Follicle Count': { value: '12', unit: 'follicles', range: '8-15', status: 'normal' },
          'Endometrial Thickness': { value: '8.5', unit: 'mm', range: '7-14', status: 'normal' },
          'Ovarian Volume': { value: '10.2', unit: 'mL', range: '5-15', status: 'normal' }
        },
        notes: 'Good follicular development observed. Endometrium appears healthy.'
      },
      {
        id: 3,
        date: '2024-03-05',
        type: 'Blood Work',
        status: 'completed',
        results: {
          'Hemoglobin': { value: '12.8', unit: 'g/dL', range: '12.0-15.5', status: 'normal' },
          'Platelet Count': { value: '285', unit: 'K/μL', range: '150-450', status: 'normal' },
          'White Blood Cells': { value: '6.2', unit: 'K/μL', range: '4.0-11.0', status: 'normal' }
        },
        notes: 'All blood parameters within normal limits.'
      },
      {
        id: 4,
        date: '2024-02-28',
        type: 'Baseline Assessment',
        status: 'completed',
        results: {
          'Antral Follicle Count': { value: '15', unit: 'follicles', range: '10-20', status: 'normal' },
          'Baseline E2': { value: '35', unit: 'pg/mL', range: '<50', status: 'normal' },
          'Baseline FSH': { value: '7.8', unit: 'mIU/mL', range: '<10', status: 'normal' }
        },
        notes: 'Excellent baseline parameters. Patient cleared for stimulation cycle.'
      }
    ],
    appointments: [
      {
        id: 1,
        date: '2024-03-15',
        time: '10:00 AM',
        type: 'Follow-up Monitoring',
        doctor: 'Dr. Emily Rodriguez',
        status: 'scheduled',
        notes: 'Follicle monitoring and hormone check'
      },
      {
        id: 2,
        date: '2024-03-10',
        time: '2:30 PM',
        type: 'Hormone Panel',
        doctor: 'Dr. Emily Rodriguez',
        status: 'completed',
        notes: 'Routine hormone monitoring during stimulation'
      },
      {
        id: 3,
        date: '2024-03-08',
        time: '9:15 AM',
        type: 'Ultrasound',
        doctor: 'Dr. Sarah Kim',
        status: 'completed',
        notes: 'Follicle development assessment'
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50'
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'low':
        return 'text-yellow-600 bg-yellow-50'
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'scheduled':
        return 'text-blue-600 bg-blue-50'
      case 'active':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'reports', label: 'Test Reports', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'treatment', label: 'Treatment History', icon: Activity }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/patients')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-600">Patient ID: #{patient.id} • Age: {patient.age}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(patient.treatmentInfo.status)}`}>
            {patient.treatmentInfo.status}
          </span>
          <button className="btn-secondary flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Patient</span>
          </button>
        </div>
      </motion.div>

      {/* Patient Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Treatment Stage</p>
              <p className="font-semibold text-gray-900">{patient.treatmentInfo.treatmentStage}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cycle Number</p>
              <p className="font-semibold text-gray-900">#{patient.treatmentInfo.cycleNumber}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Appointment</p>
              <p className="font-semibold text-gray-900">{patient.treatmentInfo.nextAppointment}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="font-semibold text-gray-900">{patient.reports.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border-b border-gray-200"
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{patient.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{patient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{patient.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium">{patient.dateOfBirth}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="font-medium">{patient.medicalInfo.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-medium">{patient.medicalInfo.weight}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Type</p>
                  <p className="font-medium">{patient.medicalInfo.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Allergies</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.medicalInfo.allergies.map((allergy) => (
                      <span key={allergy} className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Medications</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.medicalInfo.medications.map((medication) => (
                      <span key={medication} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                        {medication}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Relationship</p>
                  <p className="font-medium">{patient.emergencyContact.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{patient.emergencyContact.phone}</p>
                </div>
              </div>
            </div>

            {/* Treatment Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Treatment</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Attending Doctor</p>
                  <p className="font-medium">{patient.treatmentInfo.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Protocol</p>
                  <p className="font-medium">{patient.treatmentInfo.protocol}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Treatment Start Date</p>
                  <p className="font-medium">{patient.treatmentInfo.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Stage</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(patient.treatmentInfo.status)}`}>
                    {patient.treatmentInfo.treatmentStage}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Test Reports & Results</h3>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Report</span>
              </button>
            </div>

            <div className="space-y-4">
              {patient.reports.map((report) => (
                <div key={report.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{report.type}</h4>
                      <p className="text-sm text-gray-600">{report.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {Object.entries(report.results).map(([key, value]) => (
                      <div key={key} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">{key}</p>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">
                            {value.value} {value.unit}
                          </span>
                          <span className={`px-1 py-0.5 text-xs rounded ${getStatusColor(value.status)}`}>
                            {value.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Range: {value.range}</p>
                      </div>
                    ))}
                  </div>

                  {report.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Notes:</strong> {report.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Schedule Appointment</span>
              </button>
            </div>

            <div className="space-y-4">
              {patient.appointments.map((appointment) => (
                <div key={appointment.id} className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.type}</h4>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">with {appointment.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      {appointment.status === 'scheduled' && (
                        <button className="btn-secondary text-sm">
                          Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'treatment' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Treatment History</h3>
            
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Current Cycle Progress</h4>
                  <p className="text-sm text-gray-600">Cycle #{patient.treatmentInfo.cycleNumber} - {patient.treatmentInfo.treatmentStage}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Baseline Assessment</span>
                  </div>
                  <span className="text-sm text-green-600">Completed</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Stimulation Started</span>
                  </div>
                  <span className="text-sm text-green-600">In Progress</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-600">Egg Retrieval</span>
                  </div>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-600">Embryo Transfer</span>
                  </div>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-4">Previous Cycles</h4>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Cycle #1</span>
                    <span className="text-sm text-gray-500">Jan 2024 - Feb 2024</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Completed stimulation and egg retrieval. 8 eggs retrieved, 5 fertilized. 
                    Transfer postponed due to OHSS risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default PatientDetails