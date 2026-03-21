import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, TestTube, Clock, Upload, FileText, X } from 'lucide-react'

const NewTest = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [showFastqUpload, setShowFastqUpload] = useState(false)
  const [selectedTestForUpload, setSelectedTestForUpload] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const patient = {
    name: 'Sarah Johnson',
    age: 32
  }

  const availableTests = [
    { id: 'pgt-a', name: 'PGT-A (Preimplantation Genetic Testing for Aneuploidy)', category: 'Genetic Testing' },
    { id: 'pgt-m', name: 'PGT-M (Preimplantation Genetic Testing for Monogenic)', category: 'Genetic Testing' },
    { id: 'pgt-sr', name: 'PGT-SR (Preimplantation Genetic Testing for Structural Rearrangements)', category: 'Genetic Testing' }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  const handleTestToggle = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    )
    
    // If test is selected, show FASTQ upload modal
    if (!selectedTests.includes(testId)) {
      setSelectedTestForUpload(testId)
      setShowFastqUpload(true)
    }
  }

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
    setSelectedTestForUpload('')
    // Here you would typically upload the files to your backend
    console.log('Uploaded files for test:', selectedTestForUpload, uploadedFiles)
  }

  const handleSchedule = () => {
    if (selectedTests.length === 0 || !selectedDate || !selectedTime) {
      alert('Please select at least one test, date, and time')
      return
    }
    
    // Here you would typically send the data to your backend
    console.log({
      patientId,
      tests: selectedTests,
      date: selectedDate,
      time: selectedTime,
      notes
    })
    
    alert('Test scheduled successfully!')
    navigate('/patient-records')
  }

  const groupedTests = availableTests.reduce((acc, test) => {
    if (!acc[test.category]) {
      acc[test.category] = []
    }
    acc[test.category].push(test)
    return acc
  }, {} as Record<string, typeof availableTests>)

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
            <h1 className="text-3xl font-bold text-gray-900">Schedule New Test</h1>
            <p className="text-gray-600 mt-1">{patient.name} - Age: {patient.age}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Tests</h2>
          
          {Object.entries(groupedTests).map(([category, tests]) => (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">{category}</h3>
              <div className="space-y-2">
                {tests.map(test => (
                  <label
                    key={test.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTests.includes(test.id)}
                      onChange={() => handleTestToggle(test.id)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{test.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Summary */}
          <div className="card bg-pink-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Tests:</span> {selectedTests.length} selected</p>
              <p><span className="font-medium">Date:</span> {selectedDate || 'Not selected'}</p>
              <p><span className="font-medium">Time:</span> {selectedTime || 'Not selected'}</p>
            </div>
            
            <button
              onClick={handleSchedule}
              disabled={selectedTests.length === 0 || !selectedDate || !selectedTime}
              className="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Test
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
                Upload FASTQ Files - {availableTests.find(t => t.id === selectedTestForUpload)?.name}
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload FASTQ Files</h3>
                <p className="text-gray-600 mb-4">
                  Select FASTQ files (.fastq, .fq, .fastq.gz) for genetic analysis
                </p>
                <input
                  type="file"
                  multiple
                  accept=".fastq,.fq,.fastq.gz"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fastq-upload"
                />
                <label
                  htmlFor="fastq-upload"
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
                <h4 className="font-medium text-blue-900 mb-2">File Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Accepted formats: .fastq, .fq, .fastq.gz</li>
                  <li>• Maximum file size: 500MB per file</li>
                  <li>• Multiple files can be uploaded for paired-end sequencing</li>
                  <li>• Files will be processed for genetic analysis</li>
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

export default NewTest