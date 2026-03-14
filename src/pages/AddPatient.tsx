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
    
    // Genetic Test Selection
    selectedGeneticTests: [], // Array for PGT-A and PGT-M
    selectedStructuralTest: null, // For PGT-SR
    testReportFiles: [], // Array of files for selected tests
    
    // Embryo Images
    embryoImages: []
  })

  const isWetLab = user?.role === 'wetlab'
  const entityName = isWetLab ? 'Sample' : 'Patient'

  const sections = [
    { id: 0, title: `${entityName} Details`, icon: User },
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
        `Cannot Add ${entityName}`,
        'Your plan has expired or you have no cycles remaining. Please upgrade your plan to continue.'
      )
      return
    }
    
    // Use a cycle for this patient
    const cycleUsed = useCycle()
    if (!cycleUsed) {
      showError(
        `Failed to Add ${entityName}`,
        'Unable to use cycle. Please check your plan status.'
      )
      return
    }
    
    console.log(`${entityName} data:`, formData)
    showSuccess(
      `${entityName} Added Successfully!`,
      `${entityName} information has been saved and a cycle has been used from your plan.`
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
      selectedGeneticTests: [],
      selectedStructuralTest: null,
      testReportFiles: [],
      embryoImages: []
    })
    setCurrentSection(0)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Section Navigation and Plan Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        {/* Section Navigation */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-4">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => canAddPatient() && setCurrentSection(section.id)}
              whileHover={canAddPatient() ? { scale: 1.02 } : {}}
              whileTap={canAddPatient() ? { scale: 0.98 } : {}}
              disabled={!canAddPatient()}
              className={`flex items-center py-2 px-3 lg:px-4 rounded-lg font-medium text-xs lg:text-sm transition-all duration-200 ${
                !canAddPatient()
                  ? 'text-gray-400 cursor-not-allowed'
                  : currentSection === section.id
                    ? 'bg-pink-100 text-pink-700 border-2 border-pink-300'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <section.icon className="h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">{section.title}</span>
              <span className="sm:hidden">{section.title.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>

        {/* Plan Status Badge */}
        {user && (
          <div className="flex items-center justify-end">
            {!canAddPatient() ? (
              <div className="flex items-center bg-red-100 text-red-800 px-3 py-2 rounded-full border border-red-200">
                <Lock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Plan Inactive</span>
                <Link
                  to="/billing"
                  className="ml-3 flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs"
                >
                  <CreditCard className="h-3 w-3 mr-1" />
                  Upgrade
                </Link>
              </div>
            ) : (
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">{user.plan.name}</span>
                <span className="ml-2 text-xs text-green-600">
                  {user.plan.cyclesRemaining === 'unlimited' 
                    ? '∞' 
                    : user.plan.cyclesRemaining
                  } cycles
                </span>
              </div>
            )}
          </div>
        )}
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
  const [selectedGeneticTests, setSelectedGeneticTests] = useState<string[]>(
    formData.selectedGeneticTests || []
  )
  const [selectedStructuralTest, setSelectedStructuralTest] = useState<string | null>(
    formData.selectedStructuralTest || null
  )

  const geneticTests = [
    {
      key: 'pgt-a',
      title: 'PGT-A (Preimplantation Genetic Testing for Aneuploidy)',
      description: 'Screens embryos for chromosomal abnormalities',
      cost: '₹2,000 – ₹8,000 per embryo',
      colors: {
        border: 'border-blue-500',
        borderHover: 'hover:border-blue-300',
        borderDefault: 'border-blue-200',
        bg: 'bg-blue-50',
        bgHover: 'hover:bg-blue-25',
        iconBg: 'bg-blue-100',
        text: 'text-blue-700',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-800'
      },
      icon: '🧬'
    },
    {
      key: 'pgt-m',
      title: 'PGT-M (Preimplantation Genetic Testing for Monogenic)',
      description: 'Tests for specific genetic disorders',
      cost: '₹5,000 – ₹20,000 per case/family',
      colors: {
        border: 'border-green-500',
        borderHover: 'hover:border-green-300',
        borderDefault: 'border-green-200',
        bg: 'bg-green-50',
        bgHover: 'hover:bg-green-25',
        iconBg: 'bg-green-100',
        text: 'text-green-700',
        badgeBg: 'bg-green-100',
        badgeText: 'text-green-800'
      },
      icon: '🔬'
    }
  ]

  const structuralTest = {
    key: 'pgt-sr',
    title: 'PGT-SR (Preimplantation Genetic Testing for Structural Rearrangements)',
    description: 'Detects chromosomal structural abnormalities',
    cost: '₹4,000 – ₹15,000 per embryo',
    colors: {
      border: 'border-purple-500',
      borderHover: 'hover:border-purple-300',
      borderDefault: 'border-purple-200',
      bg: 'bg-purple-50',
      bgHover: 'hover:bg-purple-25',
      iconBg: 'bg-purple-100',
      text: 'text-purple-700',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800'
    },
    icon: '🧪'
  }

  const handleGeneticTestSelection = (testKey: string) => {
    const newSelection = selectedGeneticTests.includes(testKey)
      ? selectedGeneticTests.filter(t => t !== testKey)
      : [...selectedGeneticTests, testKey]
    
    setSelectedGeneticTests(newSelection)
    onFileUpload('selectedGeneticTests', newSelection)
    
    // If selecting genetic tests, clear structural test
    if (newSelection.length > 0 && selectedStructuralTest) {
      setSelectedStructuralTest(null)
      onFileUpload('selectedStructuralTest', null)
      // Remove PGT-SR file if it exists
      const currentFiles = formData.testReportFiles || []
      const newFiles = currentFiles.filter((f: any) => f.testKey !== 'pgt-sr')
      onFileUpload('testReportFiles', newFiles)
    }
  }

  const handleStructuralTestSelection = (testKey: string) => {
    const newSelection = selectedStructuralTest === testKey ? null : testKey
    setSelectedStructuralTest(newSelection)
    onFileUpload('selectedStructuralTest', newSelection)
    
    // If selecting structural test, clear genetic tests
    if (newSelection && selectedGeneticTests.length > 0) {
      setSelectedGeneticTests([])
      onFileUpload('selectedGeneticTests', [])
      // Remove genetic test files if they exist
      const currentFiles = formData.testReportFiles || []
      const newFiles = currentFiles.filter((f: any) => !['pgt-a', 'pgt-m'].includes(f.testKey))
      onFileUpload('testReportFiles', newFiles)
    }
  }

  const handleFileChange = (testKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    const currentFiles = formData.testReportFiles || []
    
    if (file) {
      // Add or update file for this test
      const newFiles = currentFiles.filter((f: any) => f.testKey !== testKey)
      newFiles.push({ testKey, file, fileName: file.name })
      onFileUpload('testReportFiles', newFiles)
    } else {
      // Remove file for this test
      const newFiles = currentFiles.filter((f: any) => f.testKey !== testKey)
      onFileUpload('testReportFiles', newFiles)
    }
  }

  const getFileForTest = (testKey: string) => {
    const files = formData.testReportFiles || []
    return files.find((f: any) => f.testKey === testKey)
  }

  const removeFileForTest = (testKey: string) => {
    const currentFiles = formData.testReportFiles || []
    const newFiles = currentFiles.filter((f: any) => f.testKey !== testKey)
    onFileUpload('testReportFiles', newFiles)
  }

  const selectedTests = [...selectedGeneticTests, ...(selectedStructuralTest ? [selectedStructuralTest] : [])]

  return (
    <div>
      <div className="flex items-center mb-6">
        <TestTube className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Genetic Tests</h2>
      </div>
      
      <div className="space-y-8">
        {/* Genetic Tests Section (PGT-A and PGT-M) */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Genetic Tests (Can select multiple)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            You can select both PGT-A and PGT-M tests for comprehensive genetic analysis.
            {selectedStructuralTest && (
              <span className="text-orange-600 font-medium"> Note: Cannot combine with structural test below.</span>
            )}
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            {geneticTests.map((test) => {
              const isDisabled = selectedStructuralTest !== null
              const isSelected = selectedGeneticTests.includes(test.key)
              
              return (
                <motion.div
                  key={test.key}
                  whileHover={!isDisabled ? { scale: 1.01 } : {}}
                  whileTap={!isDisabled ? { scale: 0.99 } : {}}
                  onClick={() => !isDisabled && handleGeneticTestSelection(test.key)}
                  className={`relative border-2 rounded-xl p-6 transition-all duration-200 ${
                    isDisabled
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                      : isSelected
                        ? `${test.colors.border} ${test.colors.bg} shadow-md cursor-pointer`
                        : `${test.colors.borderDefault} ${test.colors.borderHover} ${test.colors.bgHover} cursor-pointer`
                  }`}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected && !isDisabled
                        ? `${test.colors.border} bg-blue-500`
                        : `border-gray-300`
                    }`}>
                      {isSelected && !isDisabled && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 ${isDisabled ? 'bg-gray-200' : test.colors.iconBg} rounded-xl flex items-center justify-center text-2xl`}>
                      {test.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`text-lg font-semibold mb-2 ${
                        isDisabled
                          ? 'text-gray-400'
                          : isSelected 
                            ? test.colors.text 
                            : 'text-gray-900'
                      }`}>
                        {test.title}
                      </h4>
                      <p className={`text-sm mb-3 ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                        {test.description}
                      </p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        isDisabled
                          ? 'bg-gray-200 text-gray-500'
                          : isSelected
                            ? `${test.colors.badgeBg} ${test.colors.badgeText}`
                            : 'bg-gray-100 text-gray-700'
                      }`}>
                        Cost: {test.cost}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Structural Test Section (PGT-SR) */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Structural Rearrangement Test (Separate selection)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            This test is performed separately and cannot be combined with the genetic tests above.
            {selectedGeneticTests.length > 0 && (
              <span className="text-orange-600 font-medium"> Note: Cannot combine with genetic tests above.</span>
            )}
          </p>
          
          {(() => {
            const isDisabled = selectedGeneticTests.length > 0
            const isSelected = selectedStructuralTest === structuralTest.key
            
            return (
              <motion.div
                whileHover={!isDisabled ? { scale: 1.01 } : {}}
                whileTap={!isDisabled ? { scale: 0.99 } : {}}
                onClick={() => !isDisabled && handleStructuralTestSelection(structuralTest.key)}
                className={`relative border-2 rounded-xl p-6 transition-all duration-200 ${
                  isDisabled
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                    : isSelected
                      ? `${structuralTest.colors.border} ${structuralTest.colors.bg} shadow-md cursor-pointer`
                      : `${structuralTest.colors.borderDefault} ${structuralTest.colors.borderHover} ${structuralTest.colors.bgHover} cursor-pointer`
                }`}
              >
                {/* Selection Radio Button */}
                <div className="absolute top-4 right-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected && !isDisabled
                      ? `${structuralTest.colors.border} bg-purple-500`
                      : `border-gray-300`
                  }`}>
                    {isSelected && !isDisabled && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${isDisabled ? 'bg-gray-200' : structuralTest.colors.iconBg} rounded-xl flex items-center justify-center text-2xl`}>
                    {structuralTest.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-2 ${
                      isDisabled
                        ? 'text-gray-400'
                        : isSelected 
                          ? structuralTest.colors.text 
                          : 'text-gray-900'
                    }`}>
                      {structuralTest.title}
                    </h4>
                    <p className={`text-sm mb-3 ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                      {structuralTest.description}
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      isDisabled
                        ? 'bg-gray-200 text-gray-500'
                        : isSelected
                          ? `${structuralTest.colors.badgeBg} ${structuralTest.colors.badgeText}`
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      Cost: {structuralTest.cost}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })()}
        </div>

        {/* File Upload Section - Show for each selected test */}
        {selectedTests.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Upload Test Reports
            </h3>
            
            {selectedTests.map((testKey) => {
              const test = [...geneticTests, structuralTest].find(t => t.key === testKey)
              const fileData = getFileForTest(testKey)
              
              return (
                <motion.div
                  key={testKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <h4 className="text-md font-semibold text-gray-900 mb-4">
                    {test?.title} Report
                  </h4>
                  
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff,.fastq,.fq,.fastq.gz,.fq.gz"
                      onChange={(e) => handleFileChange(testKey, e)}
                      className="hidden"
                      id={`test-report-file-${testKey}`}
                    />
                    <label
                      htmlFor={`test-report-file-${testKey}`}
                      className="flex items-center justify-center w-full px-6 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all duration-200"
                    >
                      <div className="text-center">
                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-md font-medium text-gray-700 mb-1">
                          {fileData ? 'Change Report File' : 'Click to upload test report'}
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, DOCX, Images, FastQ files (Max: 100MB)
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  {fileData && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {fileData.fileName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Size: {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFileForTest(testKey)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
        
        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Test Selection Rules</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Valid combinations:</strong> PGT-A only, PGT-M only, PGT-A + PGT-M together, or PGT-SR only</li>
                <li>• <strong>Cannot combine:</strong> Genetic tests (PGT-A/PGT-M) with structural test (PGT-SR)</li>
                <li>• Upload separate report files for each selected test</li>
                <li>• Ensure file quality is clear and readable</li>
                <li>• Include patient ID and test date in filenames if possible</li>
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