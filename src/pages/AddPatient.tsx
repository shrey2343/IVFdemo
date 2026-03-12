import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Heart, 
  Upload, 
  FileText, 
  TestTube,
  Image as ImageIcon,
  Save,
  AlertCircle,
  Lock,
  CreditCard
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { Link } from 'react-router-dom'

const AddPatient = () => {
  const { user, canAddPatient, useCycle } = useAuth()
  const { showSuccess, showError } = useToast()
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Comorbidities
    diabetes: false,
    hypertension: false,
    thyroid: false,
    pcos: false,
    endometriosis: false,
    otherConditions: '',
    medications: '',
    allergies: '',
    
    // Test Files
    pgtaFile: null,
    pgtmFile: null,
    pgtsrFile: null,
    
    // Embryo Images
    embryoImages: []
  })

  const sections = [
    { id: 0, title: 'Personal Details', icon: User },
    { id: 1, title: 'Comorbidities', icon: Heart },
    { id: 2, title: 'Tests', icon: TestTube },
    { id: 3, title: 'Embryo Images', icon: ImageIcon }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const handleSubmit = () => {
    if (!canAddPatient()) {
      showError(
        'Cannot Add Patient',
        'Your plan has expired or you have no cycles remaining. Please upgrade your plan to continue.'
      )
      return
    }
    
    // Use a cycle for this patient
    const cycleUsed = useCycle()
    if (!cycleUsed) {
      showError(
        'Failed to Add Patient',
        'Unable to use cycle. Please check your plan status.'
      )
      return
    }
    
    console.log('Patient data:', formData)
    showSuccess(
      'Patient Added Successfully!',
      'Patient information has been saved and a cycle has been used from your plan.'
    )
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      diabetes: false,
      hypertension: false,
      thyroid: false,
      pcos: false,
      endometriosis: false,
      otherConditions: '',
      medications: '',
      allergies: '',
      pgtaFile: null,
      pgtmFile: null,
      pgtsrFile: null,
      embryoImages: []
    })
    setCurrentSection(0)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Patient</h1>
        <p className="text-gray-600 mt-2">Enter patient information and upload test files</p>
      </div>

      {/* Plan Status Alert */}
      {user && (
        <div className="mb-6">
          {!canAddPatient() ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center">
                <Lock className="h-6 w-6 text-red-600 mr-3" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800">Cannot Add Patients</h3>
                  <p className="text-red-700 mt-1">
                    {user.plan.cyclesRemaining === 0 
                      ? 'You have no cycles remaining in your current plan.'
                      : new Date() > new Date(user.plan.expiryDate)
                        ? 'Your plan has expired.'
                        : 'Your plan is not active.'
                    }
                  </p>
                </div>
                <Link
                  to="/billing"
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-800 font-medium">
                    Plan Active: {user.plan.name}
                  </span>
                </div>
                <span className="text-green-700 text-sm">
                  {user.plan.cyclesRemaining === 'unlimited' 
                    ? 'Unlimited cycles' 
                    : `${user.plan.cyclesRemaining} cycles remaining`
                  }
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section Navigation - Top Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => canAddPatient() && setCurrentSection(section.id)}
                whileHover={canAddPatient() ? { scale: 1.02 } : {}}
                whileTap={canAddPatient() ? { scale: 0.98 } : {}}
                disabled={!canAddPatient()}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  !canAddPatient()
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : currentSection === section.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <section.icon className="h-5 w-5 mr-2" />
                {section.title}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <div className={`${!canAddPatient() ? 'opacity-50 pointer-events-none' : ''}`}>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            {/* Personal Details Section */}
            {currentSection === 0 && (
              <PersonalDetailsSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Comorbidities Section */}
            {currentSection === 1 && (
              <ComorbiditiesSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Tests Section */}
            {currentSection === 2 && (
              <TestsSection 
                formData={formData} 
                onFileUpload={handleFileUpload} 
              />
            )}

            {/* Embryo Images Section */}
            {currentSection === 3 && (
              <EmbryoImagesSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentSection < sections.length - 1 ? (
                <button
                  onClick={() => setCurrentSection(currentSection + 1)}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={!canAddPatient()}
                  whileHover={canAddPatient() ? { scale: 1.02 } : {}}
                  whileTap={canAddPatient() ? { scale: 0.98 } : {}}
                  className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                    canAddPatient()
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {canAddPatient() ? 'Save Patient' : 'Plan Required'}
                </motion.button>
              )}
            </div>
          </motion.div>
      </div>
    </div>
  )
}

// Personal Details Section Component
const PersonalDetailsSection = ({ formData, onChange }: any) => (
  <div>
    <div className="flex items-center mb-6">
      <User className="h-6 w-6 text-pink-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          First Name *
        </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter first name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Last Name *
        </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter last name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth *
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => onChange('dateOfBirth', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender *
        </label>
        <select
          value={formData.gender}
          onChange={(e) => onChange('gender', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter phone number"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter email address"
        />
      </div>
    </div>
    
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Address
      </label>
      <textarea
        value={formData.address}
        onChange={(e) => onChange('address', e.target.value)}
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        placeholder="Enter full address"
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emergency Contact Name
        </label>
        <input
          type="text"
          value={formData.emergencyContact}
          onChange={(e) => onChange('emergencyContact', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter emergency contact name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emergency Contact Phone
        </label>
        <input
          type="tel"
          value={formData.emergencyPhone}
          onChange={(e) => onChange('emergencyPhone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter emergency contact phone"
        />
      </div>
    </div>
  </div>
)

// Comorbidities Section Component
const ComorbiditiesSection = ({ formData, onChange }: any) => (
  <div>
    <div className="flex items-center mb-6">
      <Heart className="h-6 w-6 text-pink-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Medical History & Comorbidities</h2>
    </div>
    
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'diabetes', label: 'Diabetes' },
            { key: 'hypertension', label: 'Hypertension' },
            { key: 'thyroid', label: 'Thyroid Disorders' },
            { key: 'pcos', label: 'PCOS' },
            { key: 'endometriosis', label: 'Endometriosis' }
          ].map((condition) => (
            <label key={condition.key} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData[condition.key]}
                onChange={(e) => onChange(condition.key, e.target.checked)}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">{condition.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Other Medical Conditions
        </label>
        <textarea
          value={formData.otherConditions}
          onChange={(e) => onChange('otherConditions', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Describe any other medical conditions"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Medications
        </label>
        <textarea
          value={formData.medications}
          onChange={(e) => onChange('medications', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="List current medications and dosages"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Known Allergies
        </label>
        <textarea
          value={formData.allergies}
          onChange={(e) => onChange('allergies', e.target.value)}
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="List any known allergies"
        />
      </div>
    </div>
  </div>
)
// Tests Section Component
const TestsSection = ({ formData, onFileUpload }: any) => {
  const tests = [
    {
      key: 'pgtaFile',
      title: 'PGT-A (Preimplantation Genetic Testing for Aneuploidy)',
      description: 'Screens embryos for chromosomal abnormalities',
      color: 'blue'
    },
    {
      key: 'pgtmFile',
      title: 'PGT-M (Preimplantation Genetic Testing for Monogenic)',
      description: 'Tests for specific genetic disorders',
      color: 'green'
    },
    {
      key: 'pgtsrFile',
      title: 'PGT-SR (Preimplantation Genetic Testing for Structural Rearrangements)',
      description: 'Detects chromosomal structural abnormalities',
      color: 'purple'
    }
  ]

  const handleFileChange = (testKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onFileUpload(testKey, file)
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <TestTube className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Genetic Tests</h2>
      </div>
      
      <div className="space-y-6">
        {tests.map((test) => (
          <motion.div
            key={test.key}
            whileHover={{ scale: 1.01 }}
            className={`border-2 border-${test.color}-200 rounded-xl p-6 hover:border-${test.color}-300 transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold text-${test.color}-700 mb-2`}>
                  {test.title}
                </h3>
                <p className="text-gray-600 text-sm">{test.description}</p>
              </div>
              <div className={`w-12 h-12 bg-${test.color}-100 rounded-lg flex items-center justify-center`}>
                <FileText className={`h-6 w-6 text-${test.color}-600`} />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload FastQ File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".fastq,.fq,.fastq.gz,.fq.gz"
                  onChange={(e) => handleFileChange(test.key, e)}
                  className="hidden"
                  id={`file-${test.key}`}
                />
                <label
                  htmlFor={`file-${test.key}`}
                  className={`flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-${test.color}-300 rounded-lg cursor-pointer hover:border-${test.color}-400 hover:bg-${test.color}-50 transition-all duration-200`}
                >
                  <div className="text-center">
                    <Upload className={`h-8 w-8 text-${test.color}-500 mx-auto mb-2`} />
                    <p className="text-sm font-medium text-gray-700">
                      {formData[test.key] ? formData[test.key].name : 'Click to upload FastQ file'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports .fastq, .fq, .fastq.gz, .fq.gz files
                    </p>
                  </div>
                </label>
              </div>
              
              {formData[test.key] && (
                <div className={`mt-3 p-3 bg-${test.color}-50 rounded-lg border border-${test.color}-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className={`h-4 w-4 text-${test.color}-600 mr-2`} />
                      <span className="text-sm font-medium text-gray-700">
                        {formData[test.key].name}
                      </span>
                    </div>
                    <button
                      onClick={() => onFileUpload(test.key, null)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {(formData[test.key].size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-yellow-800">File Upload Guidelines</h4>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• FastQ files should be quality-checked before upload</li>
                <li>• Maximum file size: 500MB per file</li>
                <li>• Compressed files (.gz) are recommended for faster upload</li>
                <li>• Ensure file names are descriptive and include sample ID</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Embryo Images Section Component
const EmbryoImagesSection = ({ formData, onChange }: any) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    onChange('embryoImages', [...formData.embryoImages, ...files])
  }

  const removeImage = (index: number) => {
    const newImages = formData.embryoImages.filter((_: any, i: number) => i !== index)
    onChange('embryoImages', newImages)
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <ImageIcon className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Embryo Images</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Embryo Images
          </label>
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="embryo-images"
            />
            <label
              htmlFor="embryo-images"
              className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all duration-200"
            >
              <div className="text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload embryo images
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, TIFF formats. Multiple files allowed.
                </p>
              </div>
            </label>
          </div>
        </div>
        
        {formData.embryoImages.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Images ({formData.embryoImages.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.embryoImages.map((image: File, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Embryo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  >
                    ×
                  </button>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {image.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddPatient