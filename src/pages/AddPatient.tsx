import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Heart, 
  TestTube,
  Image as ImageIcon,
  ClipboardList,
  Table2,
  Save
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
const emptyEmbryoDetailRow = () => ({
  tubeNo: '',
  sampleId: '',
  noOfCells: '',
  gradeOfCells: '',
  comments: '',
  typeOfCells: ''
})

const initialEmbryoDetailRows = () =>
  Array.from({ length: 15 }, emptyEmbryoDetailRow)

const AddPatient = () => {
  const { user, canAddPatient, useCycle } = useAuth()
  const { showSuccess, showError } = useToast()
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState({
    // Patient Details
    patientName: '',
    dob: '',
    age: '',
    ethnicity: '',
    partnerName: '',
    partnerDob: '',
    partnerAge: '',
    email: '',
    contactNo: '',
    height: '',
    weight: '',
    bloodType: '',
    address: '',
    
    // Wetlab Sample Details
    patientId: '',
    referringDoctor: '',
    witness: '',
    reportDate: '',
    lotNumber: '',
    testedBy: '',
    notes: '',
    
    // Wetlab Biopsy Information
    biopsyMethod: '',
    biopsyDay: '',
    embryoGrade: '',
    morphologyAssessment: '',
    handlingInstructions: '',
    
    // Referring Clinician
    clinicianName: '',
    embryologistName: '',
    hospitalClinicName: '',
    emailId: '',
    contactNo1: '',
    emailIdContactPerson: '',
    contactNo2: '',
    
    // Sample Details
    sampleCollectionDate: '',
    sampleCollectionTime: '',
    edtaBlood: false,
    couple: false,
    affectedIndividual: false,
    embryos: false,
    noOfEmbryos: '',
    dayOfBiopsy: '',
    donorYes: false,
    donorNo: false,
    donorEgg: false,
    donorSperm: false,
    ageOfDonor: '',
    spentCultureMedium: '',
    rebiopsyYes: false,
    rebiopsyNo: false,
    previousPatientId: '',
    
    // Cycle History (matches NCGM requisition PDF layout)
    hyperstimulationYes: false,
    hyperstimulationNo: false,
    fertilisationIVF: false,
    fertilisationICSI: false,
    eggRetrievalDd: '',
    eggRetrievalMm: '',
    eggRetrievalYyyy: '',
    noOfEmbryosRetrieved: '',
    noOfBiopsiedEmbryos: '',
    embryoTransferDd: '',
    embryoTransferMm: '',
    embryoTransferYyyy: '',
    embryoTransferTime: '',

    // Test Requested (NCGM form)
    testPgtA: false,
    testNiPgt: false,
    testPgtSr: false,
    testPgtM: false,
    testPrePgtWorkup: false,
    pgtMGene: '',
    pgtMVariant: '',
    prePgtMLabId: '',
    karyotypeCoupleYes: false,
    karyotypeCoupleNo: false,
    indicationRecurrentPregnancyLoss: false,
    indicationAdvancedMaternalAge: false,
    indicationIvfFailure: false,
    indicationPrimaryInfertility: false,
    indicationBoh: false,
    indicationOthers: false,
    indicationOthersText: '',
    mosaicReportYes: false,
    mosaicReportNoDesignate: false,
    mosaicReportDoNot: false,

    embryoDetailRows: initialEmbryoDetailRows()
  })

  const isWetLab = user?.role === 'wetlab'
  const entityName = isWetLab ? 'Sample' : 'Patient'

  const sections = [
    { id: 0, title: `${entityName} Details`, icon: User },
    { id: 1, title: 'Referring Clinician', icon: Heart },
    { id: 2, title: 'Sample Details', icon: TestTube },
    { id: 3, title: 'Cycle History', icon: ImageIcon },
    { id: 4, title: 'Test Requested', icon: ClipboardList },
    { id: 5, title: 'Embryo Details', icon: Table2 }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
      patientName: '',
      dob: '',
      age: '',
      ethnicity: '',
      partnerName: '',
      partnerDob: '',
      partnerAge: '',
      email: '',
      contactNo: '',
      height: '',
      weight: '',
      bloodType: '',
      address: '',
      patientId: '',
      referringDoctor: '',
      witness: '',
      reportDate: '',
      lotNumber: '',
      testedBy: '',
      notes: '',
      biopsyMethod: '',
      biopsyDay: '',
      embryoGrade: '',
      morphologyAssessment: '',
      handlingInstructions: '',
      clinicianName: '',
      embryologistName: '',
      hospitalClinicName: '',
      emailId: '',
      contactNo1: '',
      emailIdContactPerson: '',
      contactNo2: '',
      sampleCollectionDate: '',
      sampleCollectionTime: '',
      edtaBlood: false,
      couple: false,
      affectedIndividual: false,
      embryos: false,
      noOfEmbryos: '',
      dayOfBiopsy: '',
      donorYes: false,
      donorNo: false,
      donorEgg: false,
      donorSperm: false,
      ageOfDonor: '',
      spentCultureMedium: '',
      rebiopsyYes: false,
      rebiopsyNo: false,
      previousPatientId: '',
      hyperstimulationYes: false,
      hyperstimulationNo: false,
      fertilisationIVF: false,
      fertilisationICSI: false,
      eggRetrievalDd: '',
      eggRetrievalMm: '',
      eggRetrievalYyyy: '',
      noOfEmbryosRetrieved: '',
      noOfBiopsiedEmbryos: '',
      embryoTransferDd: '',
      embryoTransferMm: '',
      embryoTransferYyyy: '',
      embryoTransferTime: '',
      testPgtA: false,
      testNiPgt: false,
      testPgtSr: false,
      testPgtM: false,
      testPrePgtWorkup: false,
      pgtMGene: '',
      pgtMVariant: '',
      prePgtMLabId: '',
      karyotypeCoupleYes: false,
      karyotypeCoupleNo: false,
      indicationRecurrentPregnancyLoss: false,
      indicationAdvancedMaternalAge: false,
      indicationIvfFailure: false,
      indicationPrimaryInfertility: false,
      indicationBoh: false,
      indicationOthers: false,
      indicationOthersText: '',
      mosaicReportYes: false,
      mosaicReportNoDesignate: false,
      mosaicReportDoNot: false,
      embryoDetailRows: initialEmbryoDetailRows()
    })
    setCurrentSection(0)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Section navigation */}
      <div className="mb-8">
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
                    ? section.id === 2 // Tests section
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-2 border-pink-400 shadow-lg'
                      : 'bg-pink-100 text-pink-700 border-2 border-pink-300'
                    : section.id === 2 // Tests section when not active
                      ? 'text-pink-600 hover:text-pink-700 hover:bg-pink-50 border border-pink-200'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <section.icon className="h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">{section.title}</span>
              <span className="sm:hidden">{section.title.split(' ')[0]}</span>
            </motion.button>
          ))}
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

            {/* Referring Clinician Section */}
            {currentSection === 1 && (
              <ComorbiditiesSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Sample Details Section */}
            {currentSection === 2 && (
              <TestsSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Cycle History Section */}
            {currentSection === 3 && (
              <CycleHistorySection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {currentSection === 4 && (
              <TestRequestedSection
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            {currentSection === 5 && (
              <EmbryoDetailsSection formData={formData} onChange={handleInputChange} />
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
const PersonalDetailsSection = ({ formData, onChange }: any) => {
  // Same form for both doctor and wetlab users now
  return (
    <div>
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
      </div>
      
      <div className="space-y-6">
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name *
          </label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) => onChange('patientName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Enter patient full name"
          />
        </div>

        {/* DOB, Age, Ethnicity Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DOB *
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => onChange('dob', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => onChange('age', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Age"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethnicity
            </label>
            <input
              type="text"
              value={formData.ethnicity}
              onChange={(e) => onChange('ethnicity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter ethnicity"
            />
          </div>
        </div>

        {/* Partner's Name, DOB, Age Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner's Name
            </label>
            <input
              type="text"
              value={formData.partnerName}
              onChange={(e) => onChange('partnerName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter partner's name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner's DOB
            </label>
            <input
              type="date"
              value={formData.partnerDob}
              onChange={(e) => onChange('partnerDob', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner's Age
            </label>
            <input
              type="number"
              value={formData.partnerAge}
              onChange={(e) => onChange('partnerAge', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Age"
            />
          </div>
        </div>

        {/* Email and Contact Number Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail ID
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No. *
            </label>
            <input
              type="tel"
              value={formData.contactNo}
              onChange={(e) => onChange('contactNo', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        {/* Height, Weight, Blood Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => onChange('height', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Height in cm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => onChange('weight', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Weight in kg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Type
            </label>
            <select
              value={formData.bloodType}
              onChange={(e) => onChange('bloodType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
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
      </div>
    </div>
  )
}

// Referring Clinician Section Component
const ComorbiditiesSection = ({ formData, onChange }: any) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Heart className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Referring Clinician</h2>
        <span className="text-sm text-gray-500 ml-2">(In BLOCK letters)</span>
      </div>
      
      <div className="space-y-6">
        {/* Clinician Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clinician Name *
          </label>
          <input
            type="text"
            value={formData.clinicianName}
            onChange={(e) => onChange('clinicianName', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 uppercase"
            placeholder="ENTER CLINICIAN NAME IN BLOCK LETTERS"
          />
        </div>

        {/* Embryologist Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Embryologist Name
          </label>
          <input
            type="text"
            value={formData.embryologistName}
            onChange={(e) => onChange('embryologistName', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 uppercase"
            placeholder="ENTER EMBRYOLOGIST NAME IN BLOCK LETTERS"
          />
        </div>

        {/* Hospital/Clinic Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital/Clinic Name *
          </label>
          <input
            type="text"
            value={formData.hospitalClinicName}
            onChange={(e) => onChange('hospitalClinicName', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 uppercase"
            placeholder="ENTER HOSPITAL/CLINIC NAME IN BLOCK LETTERS"
          />
        </div>

        {/* Email ID and Contact No. Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail ID *
            </label>
            <input
              type="email"
              value={formData.emailId}
              onChange={(e) => onChange('emailId', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No. *
            </label>
            <input
              type="tel"
              value={formData.contactNo1}
              onChange={(e) => onChange('contactNo1', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        {/* Email ID and Contact No. Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail ID Of Contact Person *
            </label>
            <input
              type="email"
              value={formData.emailIdContactPerson}
              onChange={(e) => onChange('emailIdContactPerson', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter contact person email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No.
            </label>
            <input
              type="tel"
              value={formData.contactNo2}
              onChange={(e) => onChange('contactNo2', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter additional contact number"
            />
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <span className="font-medium">*Note:</span> Report will be sent to both Emails
          </p>
        </div>
      </div>
    </div>
  )
}
// Sample Details Section Component
const TestsSection = ({ formData, onChange }: any) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <TestTube className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Sample Details</h2>
      </div>
      
      <div className="space-y-8">
        {/* Sample Details Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">SAMPLE DETAILS</h3>
          
          <div className="space-y-6">
            {/* Sample Collection Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Collection Date
                </label>
                <input
                  type="date"
                  value={formData.sampleCollectionDate}
                  onChange={(e) => onChange('sampleCollectionDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Collection Time
                </label>
                <input
                  type="time"
                  value={formData.sampleCollectionTime}
                  onChange={(e) => onChange('sampleCollectionTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            {/* Sample Type Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.edtaBlood}
                  onChange={(e) => onChange('edtaBlood', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">EDTA Blood (For Pre-PGT-M work up; 4ml)</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.couple}
                  onChange={(e) => onChange('couple', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Couple</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.affectedIndividual}
                  onChange={(e) => onChange('affectedIndividual', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Affected Individual</span>
              </label>
            </div>

            {/* Embryos Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.embryos}
                  onChange={(e) => onChange('embryos', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Embryos</span>
              </label>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No of embryos
                </label>
                <input
                  type="number"
                  value={formData.noOfEmbryos}
                  onChange={(e) => onChange('noOfEmbryos', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day of biopsy
                </label>
                <input
                  type="text"
                  value={formData.dayOfBiopsy}
                  onChange={(e) => onChange('dayOfBiopsy', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter day"
                />
              </div>
            </div>

            {/* Donor Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-700">Donor:</span>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="donor"
                    checked={formData.donorYes}
                    onChange={(e) => {
                      onChange('donorYes', e.target.checked)
                      if (e.target.checked) onChange('donorNo', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="donor"
                    checked={formData.donorNo}
                    onChange={(e) => {
                      onChange('donorNo', e.target.checked)
                      if (e.target.checked) onChange('donorYes', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>

              {formData.donorYes && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.donorEgg}
                      onChange={(e) => onChange('donorEgg', e.target.checked)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Donor Egg</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.donorSperm}
                      onChange={(e) => onChange('donorSperm', e.target.checked)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Donor Sperm</span>
                  </label>
                </div>
              )}
            </div>

            {/* Age of Donor and Spent Culture Medium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age of the Donor
                </label>
                <input
                  type="number"
                  value={formData.ageOfDonor}
                  onChange={(e) => onChange('ageOfDonor', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter age"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spent Culture Medium
                </label>
                <input
                  type="text"
                  value={formData.spentCultureMedium}
                  onChange={(e) => onChange('spentCultureMedium', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter medium details"
                />
              </div>
            </div>

            {/* Rebiopsy Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-700">Rebiopsy:</span>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rebiopsy"
                    checked={formData.rebiopsyYes}
                    onChange={(e) => {
                      onChange('rebiopsyYes', e.target.checked)
                      if (e.target.checked) onChange('rebiopsyNo', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rebiopsy"
                    checked={formData.rebiopsyNo}
                    onChange={(e) => {
                      onChange('rebiopsyNo', e.target.checked)
                      if (e.target.checked) onChange('rebiopsyYes', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>

              {formData.rebiopsyYes && (
                <div className="ml-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    If yes, please provide previous ID of the patient
                  </label>
                  <input
                    type="text"
                    value={formData.previousPatientId}
                    onChange={(e) => onChange('previousPatientId', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter previous patient ID"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const slashDateInputClass =
  'w-14 sm:w-16 text-center px-2 py-2 border-0 border-b-2 border-gray-400 bg-transparent text-gray-900 focus:border-pink-500 focus:ring-0 focus:outline-none'

// Cycle History tab: PDF-style CYCLE HISTORY fields
const CycleHistorySection = ({ formData, onChange }: any) => {
  const digitsOnly = (v: string, maxLen: number) => v.replace(/\D/g, '').slice(0, maxLen)

  return (
    <div>
      <div className="flex items-center mb-6">
        <ImageIcon className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Cycle History</h2>
      </div>

      <div>
        <div className="relative rounded-xl border-2 border-gray-300 bg-white px-4 py-8 sm:px-8">
          <h3 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-base font-semibold tracking-wide text-gray-900">
            CYCLE HISTORY
          </h3>

          <div className="space-y-8 pt-2">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-medium text-gray-800">Hyperstimulation:</span>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hyperstimulationYes}
                    onChange={(e) => {
                      onChange('hyperstimulationYes', e.target.checked)
                      if (e.target.checked) onChange('hyperstimulationNo', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">Yes</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hyperstimulationNo}
                    onChange={(e) => {
                      onChange('hyperstimulationNo', e.target.checked)
                      if (e.target.checked) onChange('hyperstimulationYes', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">No</span>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-medium text-gray-800">Fertilisation method:</span>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.fertilisationIVF}
                    onChange={(e) => {
                      onChange('fertilisationIVF', e.target.checked)
                      if (e.target.checked) onChange('fertilisationICSI', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">IVF</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.fertilisationICSI}
                    onChange={(e) => {
                      onChange('fertilisationICSI', e.target.checked)
                      if (e.target.checked) onChange('fertilisationIVF', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">ICSI</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-800">Date of egg retrieval:</p>
                <div className="flex flex-wrap items-end gap-1 sm:gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD"
                    value={formData.eggRetrievalDd}
                    onChange={(e) => onChange('eggRetrievalDd', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Egg retrieval day"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    value={formData.eggRetrievalMm}
                    onChange={(e) => onChange('eggRetrievalMm', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Egg retrieval month"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="YYYY"
                    value={formData.eggRetrievalYyyy}
                    onChange={(e) => onChange('eggRetrievalYyyy', digitsOnly(e.target.value, 4))}
                    className={`${slashDateInputClass} w-20 sm:w-24`}
                    aria-label="Egg retrieval year"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  No. of embryos retrieved:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.noOfEmbryosRetrieved}
                  onChange={(e) => onChange('noOfEmbryosRetrieved', digitsOnly(e.target.value, 4))}
                  className="w-full max-w-xs border-0 border-b-2 border-gray-400 bg-transparent px-1 py-2 text-gray-900 focus:border-pink-500 focus:outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <div className="max-w-md">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                No. of biopsied embryos:
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formData.noOfBiopsiedEmbryos}
                onChange={(e) => onChange('noOfBiopsiedEmbryos', digitsOnly(e.target.value, 4))}
                className="w-full border-0 border-b-2 border-gray-400 bg-transparent px-1 py-2 text-gray-900 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-800">
                <span className="text-pink-600">*</span>Date/Time planned for embryo transfer:
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
                <div className="flex flex-wrap items-end gap-1 sm:gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD"
                    value={formData.embryoTransferDd}
                    onChange={(e) => onChange('embryoTransferDd', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Embryo transfer day"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    value={formData.embryoTransferMm}
                    onChange={(e) => onChange('embryoTransferMm', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Embryo transfer month"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="YYYY"
                    value={formData.embryoTransferYyyy}
                    onChange={(e) => onChange('embryoTransferYyyy', digitsOnly(e.target.value, 4))}
                    className={`${slashDateInputClass} w-20 sm:w-24`}
                    aria-label="Embryo transfer year"
                  />
                </div>
                <div className="flex items-center gap-2 sm:ml-2">
                  <label className="text-sm text-gray-600">Time</label>
                  <input
                    type="time"
                    value={formData.embryoTransferTime}
                    onChange={(e) => onChange('embryoTransferTime', e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const testReqUnderline =
  'min-w-[6rem] flex-1 border-0 border-b border-violet-400 bg-transparent px-1 py-0.5 text-sm text-gray-900 focus:border-violet-700 focus:outline-none'

const TestRequestedSection = ({ formData, onChange }: any) => {
  const setMosaic = (field: 'mosaicReportYes' | 'mosaicReportNoDesignate' | 'mosaicReportDoNot', checked: boolean) => {
    if (!checked) {
      onChange(field, false)
      return
    }
    onChange('mosaicReportYes', field === 'mosaicReportYes')
    onChange('mosaicReportNoDesignate', field === 'mosaicReportNoDesignate')
    onChange('mosaicReportDoNot', field === 'mosaicReportDoNot')
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <ClipboardList className="mr-3 h-6 w-6 text-violet-800" />
        <h2 className="text-2xl font-bold text-gray-900">Test Requested</h2>
      </div>

      <div className="relative rounded-xl border-2 border-violet-800 bg-white px-4 py-10 sm:px-8">
        <h3 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-center text-base font-bold tracking-wide text-violet-900">
          TEST REQUESTED
        </h3>

        <div className="space-y-5 pt-2 text-sm text-gray-900">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testPgtA}
              onChange={(e) => onChange('testPgtA', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              Preimplantation genetic testing for aneuploidies (PGT-A)
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testNiPgt}
              onChange={(e) => onChange('testNiPgt', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              Non-invasive preimplantation genetic testing for aneuploidies (niPGT)
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testPgtSr}
              onChange={(e) => onChange('testPgtSr', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              Preimplantation genetic testing for structural rearrangements (PGT-SR){' '}
              <span className="text-gray-700">(attach parental karyotype report)</span>
            </span>
          </label>

          <div className="space-y-2">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.testPgtM}
                onChange={(e) => onChange('testPgtM', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <div className="min-w-0 flex-1 space-y-2">
                <span>
                  Preimplantation genetic testing for monogenic disorders (PGT-M)
                  <span className="text-pink-600">*</span>
                </span>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 pl-0 sm:pl-1">
                  <span className="text-gray-800">(Requested for Gene</span>
                  <input
                    type="text"
                    value={formData.pgtMGene}
                    onChange={(e) => onChange('pgtMGene', e.target.value)}
                    className={testReqUnderline}
                    aria-label="PGT-M gene"
                  />
                  <span className="text-gray-800">Variant</span>
                  <input
                    type="text"
                    value={formData.pgtMVariant}
                    onChange={(e) => onChange('pgtMVariant', e.target.value)}
                    className={testReqUnderline}
                    aria-label="PGT-M variant"
                  />
                  <span className="text-gray-800">)</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                  <span className="text-gray-800">
                    (<span className="text-pink-600">*</span> Please mention Pre-PGT-M Lab ID
                  </span>
                  <input
                    type="text"
                    value={formData.prePgtMLabId}
                    onChange={(e) => onChange('prePgtMLabId', e.target.value)}
                    className={`${testReqUnderline} min-w-[8rem]`}
                    aria-label="Pre-PGT-M Lab ID"
                  />
                  <span className="text-gray-800">)</span>
                </div>
              </div>
            </label>
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testPrePgtWorkup}
              onChange={(e) => onChange('testPrePgtWorkup', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              <span className="font-medium">Pre-PGT Work up</span>{' '}
              <span className="text-gray-700">
                (Mandatory to do before PGT-M, Sample type- 4ml EDTA blood) Attach relevant genetic reports/ Hb
                electrophoresis report.
              </span>
            </span>
          </label>
        </div>

        <div className="mt-10 space-y-8 border-t border-violet-200 pt-8">
          <div>
            <h4 className="mb-3 text-sm font-bold text-violet-900">In case of PGT-A/niPGT:</h4>
            <p className="mb-3 text-sm text-gray-900">Is Karyotype done for the couple-</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.karyotypeCoupleYes}
                  onChange={(e) => {
                    onChange('karyotypeCoupleYes', e.target.checked)
                    if (e.target.checked) onChange('karyotypeCoupleNo', false)
                  }}
                  className="h-4 w-4 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">
                  Yes <span className="text-gray-700">(If yes, kindly provide the reports)</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.karyotypeCoupleNo}
                  onChange={(e) => {
                    onChange('karyotypeCoupleNo', e.target.checked)
                    if (e.target.checked) onChange('karyotypeCoupleYes', false)
                  }}
                  className="h-4 w-4 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-bold text-violet-900">In case of PGT-SR:</h4>
            <p className="text-sm leading-relaxed text-gray-900">
              Kindly provide parental karyotype reports prior to testing.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-bold text-violet-900">In case of PGT-M:</h4>
            <p className="text-sm leading-relaxed text-gray-900">
              Kindly contact NCGM and discuss with the Clinical Geneticist/ Genetic Counsellors regarding the utility of
              PGT-M for the suspected condition/ reported genetic variant/s.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-violet-200 pt-8">
          <h4 className="mb-4 text-sm font-bold text-gray-900">Indication for the test</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { key: 'indicationRecurrentPregnancyLoss', label: 'Recurrent Pregnancy loss' },
              { key: 'indicationAdvancedMaternalAge', label: 'Advanced maternal age' },
              { key: 'indicationIvfFailure', label: 'IVF Failure' },
              { key: 'indicationPrimaryInfertility', label: 'Primary Infertility' },
              { key: 'indicationBoh', label: 'BOH' }
            ].map(({ key, label }) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) => onChange(key, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">{label}</span>
              </label>
            ))}
            <div className="flex min-w-[12rem] flex-1 flex-wrap items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.indicationOthers}
                  onChange={(e) => onChange('indicationOthers', e.target.checked)}
                  className="h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">Others</span>
              </label>
              <input
                type="text"
                value={formData.indicationOthersText}
                onChange={(e) => onChange('indicationOthersText', e.target.value)}
                className="min-w-[10rem] flex-1 border-0 border-b border-gray-500 bg-transparent px-1 py-0.5 text-sm focus:border-violet-700 focus:outline-none"
                placeholder=""
                aria-label="Other indication details"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-violet-200 pt-8">
          <h4 className="mb-3 text-sm font-bold text-gray-900">Reporting of Mosaics</h4>
          <p className="mb-5 text-sm leading-relaxed text-gray-900">
            NGS-based PGT-A is able to detect embryo mosaicism. NCGM reports an embryo as &quot;Low mosaic&quot; or
            &quot;High mosaic&quot;. We recommend that all patients with mosaic embryos seek genetic counseling prior to
            considering transfer. Please indicate your preference regarding the reporting of mosaic embryos:
          </p>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.mosaicReportYes}
                onChange={(e) => setMosaic('mosaicReportYes', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <span className="text-sm text-gray-900">Yes - indicate embryo mosaicism on PGT-A report</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.mosaicReportNoDesignate}
                onChange={(e) => setMosaic('mosaicReportNoDesignate', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <span className="text-sm text-gray-900">No - designate mosaic embryos as aneuploid</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.mosaicReportDoNot}
                onChange={(e) => setMosaic('mosaicReportDoNot', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <span className="text-sm text-gray-900">Do not report mosaicism</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

const embryoDetailCellInput =
  'w-full min-h-[2.5rem] border-0 bg-transparent px-2 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-violet-50/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-400'

const EmbryoDetailsSection = ({ formData, onChange }: any) => {
  const rows = formData.embryoDetailRows as Array<{
    tubeNo: string
    sampleId: string
    noOfCells: string
    gradeOfCells: string
    comments: string
    typeOfCells: string
  }>

  const updateRow = (index: number, field: string, value: string) => {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    onChange('embryoDetailRows', next)
  }

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-violet-900 sm:text-xl">
        Embryo Details / Spent Culture Medium:
      </h2>

      <div className="overflow-x-auto rounded-lg border-2 border-violet-800">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-violet-100">
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Tube No</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Sample ID</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">No. of Cell(s)</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Grade of Cells</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Comments</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Type of Cells</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.tubeNo}
                    onChange={(e) => updateRow(index, 'tubeNo', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Tube No`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.sampleId}
                    onChange={(e) => updateRow(index, 'sampleId', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Sample ID`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.noOfCells}
                    onChange={(e) => updateRow(index, 'noOfCells', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} No. of Cells`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.gradeOfCells}
                    onChange={(e) => updateRow(index, 'gradeOfCells', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Grade of Cells`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.comments}
                    onChange={(e) => updateRow(index, 'comments', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Comments`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.typeOfCells}
                    onChange={(e) => updateRow(index, 'typeOfCells', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Type of Cells`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddPatient