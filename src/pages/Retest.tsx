import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, TestTube, Clock, RefreshCw, Upload, FileText, X } from 'lucide-react'

const Retest = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const [selectedTest, setSelectedTest] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [showFastqUpload, setShowFastqUpload] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const patient = {
    name: 'Sarah Johnson',
    age: 32
  }

  const previousTests = [
    {
      id: 'pgt-a-1',
      name: 'PGT-A (Preimplantation Genetic Testing for Aneuploidy)',
      date: '2024-03-10',
      tests: ['Chromosome Analysis', 'Aneuploidy Screening'],
      reason: 'Embryo genetic screening'
    },
    {
      id: 'pgt-m-1',
      name: 'PGT-M (Preimplantation Genetic Testing for Monogenic)',
      date: '2024-03-05',
      tests: ['Single Gene Analysis', 'Mutation Detection'],
      reason: 'Monogenic disorder screening'
    },
    {
      id: 'pgt-sr-1',
      name: 'PGT-SR (Preimplantation Genetic Testing for Structural Rearrangements)',
      date: '2024-02-28',
      tests: ['Structural Analysis', 'Chromosomal Rearrangement'],
      reason: 'Structural chromosome analysis'
    }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fastqFiles = Array.from(files).filter(file => 
        file.name.toLowerCase().endsWith('.fastq') || 
        file.name.toLowerCase().endsWith('.fq') ||
        file.name.toLowerCase().endsWith('.fastq.gz')
      )
      setUploadedFiles(prev => [...prev, ...fastqFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadComplete = () => {
    setShowFastqUpload(false)
    // Here you would typically upload the files to your backend
    console.log('Uploaded files for retest:', selectedTest, uploadedFiles)
  }

  const handleTestSelection = (testId: string) => {
    setSelectedTest(testId)
    // Show FASTQ upload modal when test is selected
    setShowFastqUpload(true)
  }

  const handleScheduleRetest = () => {
    if (!selectedTest || !selectedDate || !selectedTime) {
      alert('Please select a test, date, and time')
      return
    }
    
    // Here you would typically send the data to your backend
    console.log({
      patientId,
      retestId: selectedTest,
      date: selectedDate,
      time: selectedTime,
      notes
    })
    
    alert('Retest scheduled successfully!')
    navigate('/patient-records')
  }

  const selectedTestDetails = previousTests.find(test => test.id === selectedTest)

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
            onClick={() => navigate('/patient-records')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule Retest</h1>
            <p className="text-gray-600 mt-1">{patient.name} - Age: {patient.age}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Previous Tests Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <RefreshCw className="h-5 w-5 mr-2 text-blue-600" />
            Select Previous Test to Repeat
          </h2>
          
          <div className="space-y-4">
            {previousTests.map(test => (
              <label
                key={test.id}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedTest === test.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="previousTest"
                  value={test.id}
                  checked={selectedTest === test.id}
                  onChange={(e) => handleTestSelection(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{test.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Previous test date: {test.date}</p>
                    <p className="text-sm text-gray-600 mt-1">Reason: {test.reason}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {test.tests.map(testName => (
                        <span
                          key={testName}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {testName}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedTest === test.id && (
                    <div className="ml-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Scheduling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Date Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-pink-600" />
              Select Date
            </h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Time Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-pink-600" />
              Select Time
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-sm border rounded-lg transition-colors ${
                    selectedTime === time
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reason for Retest</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Why is this retest needed? Any specific concerns or changes to monitor..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Summary */}
          <div className="card bg-blue-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Retest Summary</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Test:</span> {selectedTestDetails?.name || 'Not selected'}</p>
              <p><span className="font-medium">Original Date:</span> {selectedTestDetails?.date || 'N/A'}</p>
              <p><span className="font-medium">New Date:</span> {selectedDate || 'Not selected'}</p>
              <p><span className="font-medium">Time:</span> {selectedTime || 'Not selected'}</p>
            </div>
            
            {selectedTestDetails && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Tests included:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedTestDetails.tests.map(testName => (
                    <span
                      key={testName}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                    >
                      {testName}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={handleScheduleRetest}
              disabled={!selectedTest || !selectedDate || !selectedTime}
              className="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Retest
            </button>
          </div>
        </motion.div>
      </div>

      {/* FASTQ Upload Modal */}
      {showFastqUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Upload Updated FASTQ Files - {previousTests.find(t => t.id === selectedTest)?.name}
              </h2>
              <button
                onClick={() => setShowFastqUpload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Updated FASTQ Files</h3>
                <p className="text-gray-600 mb-4">
                  Upload new FASTQ files (.fastq, .fq, .fastq.gz) for reanalysis
                </p>
                <input
                  type="file"
                  multiple
                  accept=".fastq,.fq,.fastq.gz"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fastq-retest-upload"
                />
                <label
                  htmlFor="fastq-retest-upload"
                  className="btn-primary cursor-pointer inline-flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Choose Files</span>
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Retest Information:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Upload updated FASTQ files for reanalysis</li>
                  <li>• Previous results will be compared with new analysis</li>
                  <li>• Accepted formats: .fastq, .fq, .fastq.gz</li>
                  <li>• Maximum file size: 500MB per file</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowFastqUpload(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadComplete}
                  disabled={uploadedFiles.length === 0}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Retest