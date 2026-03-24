import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Upload, 
  FileText, 
  Image as ImageIcon,
  Save,
  Palette,
  Check,
  Download
} from 'lucide-react'
import { useToast } from '../contexts/ToastContext'

const IVFSuccessReport = () => {
  const { showSuccess, showError } = useToast()
  const [logo, setLogo] = useState<string | null>(null)
  const [labName, setLabName] = useState('mylab')
  const [labAddress, setLabAddress] = useState('')
  const [emailAddress, setEmailAddress] = useState('shreym82@gmail.com')
  const [footerText, setFooterText] = useState('')
  const [selectedCoverDesign, setSelectedCoverDesign] = useState(0)
  const [themeColor, setThemeColor] = useState('#4A90E2')
  const [aiGeneratedTag, setAiGeneratedTag] = useState(false)
  const [testHistoryGraph, setTestHistoryGraph] = useState(false)
  const [doctorReport, setDoctorReport] = useState(false)
  const [activeTab, setActiveTab] = useState<'page-layout' | 'structure'>('page-layout')
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Load saved configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('ivfReportConfig')
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig)
        setLogo(config.logo || null)
        setLabName(config.labName || 'mylab')
        setLabAddress(config.labAddress || '')
        setEmailAddress(config.emailAddress || 'shreym82@gmail.com')
        setFooterText(config.footerText || '')
        setSelectedCoverDesign(config.selectedCoverDesign || 0)
        setThemeColor(config.themeColor || '#4A90E2')
        setAiGeneratedTag(config.aiGeneratedTag || false)
        setTestHistoryGraph(config.testHistoryGraph || false)
        setDoctorReport(config.doctorReport || false)
      } catch (error) {
        console.error('Error loading saved configuration:', error)
      }
    }
  }, [])

  const coverDesigns = [
    { 
      id: 0, 
      name: 'Modern Blue', 
      gradient: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600'
    },
    { 
      id: 1, 
      name: 'Professional Gray', 
      gradient: 'from-gray-400 to-gray-600',
      textColor: 'text-gray-600'
    },
    { 
      id: 2, 
      name: 'Medical Green', 
      gradient: 'from-green-400 to-green-600',
      textColor: 'text-green-600'
    },
    { 
      id: 3, 
      name: 'Elegant Purple', 
      gradient: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-600'
    },
  ]

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showError('File size should be less than 2MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
        showSuccess('Logo uploaded successfully')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Validate required fields
    if (!labName.trim()) {
      showError('Lab name is required')
      setIsSaving(false)
      return
    }
    
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      showError('Valid email address is required')
      setIsSaving(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const reportConfig = {
      logo,
      labName,
      labAddress,
      emailAddress,
      footerText,
      selectedCoverDesign,
      themeColor,
      aiGeneratedTag,
      testHistoryGraph,
      doctorReport,
      savedAt: new Date().toISOString()
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('ivfReportConfig', JSON.stringify(reportConfig))
    
    setIsSaving(false)
    showSuccess('Report configuration saved successfully!')
  }

  const generatePDFReport = async () => {
    setIsGenerating(true)
    
    // Validate that configuration is saved
    const savedConfig = localStorage.getItem('ivfReportConfig')
    if (!savedConfig) {
      showError('Please save configuration first')
      setIsGenerating(false)
      return
    }

    try {
      const config = JSON.parse(savedConfig)
      
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a simple HTML report based on configuration
      const reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>IVF Success Report - ${config.labName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: ${config.themeColor}15;
            }
            .cover-page {
              width: 210mm;
              height: 297mm;
              margin: 0 auto;
              background: white;
              padding: 40px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
            }
            .logo {
              max-height: 80px;
              margin-bottom: 40px;
            }
            .title-section {
              text-align: center;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .title {
              font-size: 48px;
              font-weight: bold;
              color: ${config.themeColor};
              margin: 20px 0;
            }
            .subtitle {
              font-size: 32px;
              color: #333;
              margin: 10px 0;
            }
            .ai-tag {
              display: inline-block;
              padding: 8px 16px;
              background: #e9d5ff;
              color: #7c3aed;
              border-radius: 20px;
              font-size: 14px;
              margin: 20px 0;
            }
            .lab-info {
              text-align: center;
              margin: 20px 0;
            }
            .lab-name {
              font-size: 18px;
              font-weight: bold;
              color: #333;
            }
            .lab-address {
              font-size: 14px;
              color: #666;
              margin-top: 10px;
            }
            .qr-code {
              width: 100px;
              height: 100px;
              background: #000;
              margin-top: 40px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
              margin-top: 20px;
            }
            .page-break {
              page-break-after: always;
            }
            .content-page {
              width: 210mm;
              margin: 20px auto;
              background: white;
              padding: 40px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .section-title {
              font-size: 24px;
              color: ${config.themeColor};
              border-bottom: 2px solid ${config.themeColor};
              padding-bottom: 10px;
              margin: 30px 0 20px 0;
            }
            .disclaimer {
              background: #f9fafb;
              padding: 20px;
              border-left: 4px solid ${config.themeColor};
              margin: 20px 0;
              font-size: 12px;
              line-height: 1.6;
            }
            @media print {
              body { background: white; }
              .cover-page, .content-page { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <!-- Cover Page -->
          <div class="cover-page">
            ${config.logo ? `<img src="${config.logo}" alt="Lab Logo" class="logo" />` : '<div style="height: 80px;"></div>'}
            
            <div class="title-section">
              <div class="title">SMART</div>
              <div class="subtitle">HEALTH REPORT</div>
              ${config.aiGeneratedTag ? '<div class="ai-tag">AI Generated</div>' : ''}
              
              <div class="lab-info">
                <div class="lab-name">${config.labName}</div>
                ${config.labAddress ? `<div class="lab-address">${config.labAddress}</div>` : ''}
              </div>
            </div>
            
            <div class="qr-code"></div>
          </div>

          <div class="page-break"></div>

          <!-- Content Pages -->
          <div class="content-page">
            <h1 class="section-title">IVF Success Report</h1>
            
            <p><strong>Lab Name:</strong> ${config.labName}</p>
            <p><strong>Email:</strong> ${config.emailAddress}</p>
            ${config.labAddress ? `<p><strong>Address:</strong> ${config.labAddress}</p>` : ''}
            
            ${config.testHistoryGraph ? `
              <h2 class="section-title">Test History Graph</h2>
              <p>Test history graph data will be displayed here based on patient records.</p>
            ` : ''}
            
            ${config.doctorReport ? `
              <h2 class="section-title">Doctor's Report</h2>
              <p>Detailed doctor's analysis and recommendations will be included here.</p>
            ` : ''}
            
            <div class="disclaimer">
              <h3>Disclaimer</h3>
              <p><strong>1. Clinical Use Only</strong></p>
              <ul>
                <li>This report is intended for informational purposes only</li>
                <li>It should be used by qualified healthcare professionals for clinical correlation.</li>
                <li>It is not a substitute for medical consultation, diagnosis, or treatment.</li>
              </ul>
              
              <p><strong>2. No Diagnostic Claim</strong></p>
              <ul>
                <li>Information in this report, including AI-based insights and trend analyses, is suggestive in nature.</li>
                <li>It must not be solely relied upon for diagnosis or treatment decisions.</li>
                <li>Always consult a registered medical practitioner.</li>
              </ul>
            </div>
            
            ${config.footerText ? `<div class="footer">${config.footerText}</div>` : ''}
          </div>
        </body>
        </html>
      `
      
      // Create a blob and download
      const blob = new Blob([reportHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `IVF_Report_${config.labName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      showSuccess('Report generated successfully!', 'You can print it as PDF from your browser.')
    } catch (error) {
      console.error('Error generating report:', error)
      showError('Error generating report')
    } finally {
      setIsGenerating(false)
    }
  }

  const disclaimer = `1. Clinical Use Only
• This report is intended for informational purposes only
• It should be used by qualified healthcare professionals for clinical correlation.
• It is not a substitute for medical consultation, diagnosis, or treatment.

2. No Diagnostic Claim
• Information in this report, including AI-based insights and trend analyses, is suggestive in nature.
• It must not be solely relied upon for diagnosis or treatment decisions.
• Always consult a registered medical practitioner.`

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">IVF Success Report</h1>
        <p className="text-gray-600 mt-2">Customize your report layout and branding</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="card">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('page-layout')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'page-layout'
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Page Layout
              </button>
              <button
                onClick={() => setActiveTab('structure')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'structure'
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Structure and Field
              </button>
            </div>

            {/* Page Layout Tab */}
            {activeTab === 'page-layout' && (
              <div className="p-6 space-y-6">
                {/* Cover Page Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Page</h3>
                  
                  {/* Logo Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      * Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-sm text-gray-500">(595 x 80 px, max 2MB)</span>
                      {logo && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">Uploaded</span>
                        </div>
                      )}
                    </div>
                    {logo && (
                      <div className="mt-3 p-2 border border-gray-200 rounded-lg inline-block">
                        <img src={logo} alt="Logo preview" className="h-12 object-contain" />
                      </div>
                    )}
                  </div>

                  {/* Lab Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lab Name *
                    </label>
                    <input
                      type="text"
                      value={labName}
                      onChange={(e) => setLabName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter lab name"
                      required
                    />
                  </div>

                  {/* Lab Address */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lab Address
                    </label>
                    <textarea
                      value={labAddress}
                      onChange={(e) => setLabAddress(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter lab address"
                    />
                  </div>

                  {/* Cover Page Design */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Cover Page Design
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      {coverDesigns.map((design) => (
                        <button
                          key={design.id}
                          onClick={() => setSelectedCoverDesign(design.id)}
                          className={`relative aspect-[3/4] border-2 rounded-lg overflow-hidden transition-all ${
                            selectedCoverDesign === design.id
                              ? 'border-pink-500 ring-2 ring-pink-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-full h-full bg-gradient-to-br ${design.gradient} flex items-center justify-center`}>
                            <div className="text-white text-center">
                              <FileText className="h-8 w-8 mx-auto mb-2" />
                              <p className="text-xs font-medium">{design.name}</p>
                            </div>
                          </div>
                          {selectedCoverDesign === design.id && (
                            <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-1">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Color */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Theme Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                      />
                      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                        <Palette className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{themeColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Generated Tag */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Tag
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="ai-tag"
                        checked={aiGeneratedTag}
                        onChange={(e) => setAiGeneratedTag(e.target.checked)}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                      <label htmlFor="ai-tag" className="ml-2 text-sm text-gray-700">
                        AI Generated Tag
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Structure and Field Tab */}
            {activeTab === 'structure' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Structure and Field</h3>
                  
                  {/* Email Address */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  {/* Footer Text */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Footer Text
                    </label>
                    <div className="relative">
                      <textarea
                        value={footerText}
                        onChange={(e) => {
                          if (e.target.value.length <= 80) {
                            setFooterText(e.target.value)
                          }
                        }}
                        rows={2}
                        maxLength={80}
                        className="w-full px-4 py-2 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Enter footer text"
                      />
                      <span className={`absolute bottom-2 right-2 text-xs ${
                        footerText.length >= 80 ? 'text-red-500' : 'text-gray-400'
                      }`}>
                        {footerText.length} / 80
                      </span>
                    </div>
                  </div>

                  {/* Select Fields */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Fields
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          id="test-history"
                          checked={testHistoryGraph}
                          onChange={(e) => setTestHistoryGraph(e.target.checked)}
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                        />
                        <label htmlFor="test-history" className="ml-3 text-sm text-gray-700 flex-1 cursor-pointer">
                          Test History Graph
                        </label>
                        {testHistoryGraph && <Check className="h-4 w-4 text-green-600" />}
                      </div>
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          id="doctor-report"
                          checked={doctorReport}
                          onChange={(e) => setDoctorReport(e.target.checked)}
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                        />
                        <label htmlFor="doctor-report" className="ml-3 text-sm text-gray-700 flex-1 cursor-pointer">
                          Doctor's Report
                        </label>
                        {doctorReport && <Check className="h-4 w-4 text-green-600" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Disclaimer</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                        {disclaimer}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-between items-center px-6 pb-6">
              <button 
                onClick={generatePDFReport}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-6">
          {/* Cover Page Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card sticky top-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Cover Page</h3>
            <div className="aspect-[3/4] border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg">
              <div 
                className="w-full h-full flex flex-col items-center justify-between p-8" 
                style={{ backgroundColor: `${themeColor}15` }}
              >
                {/* Logo Section */}
                <div className="w-full flex justify-center">
                  {logo ? (
                    <img src={logo} alt="Lab Logo" className="h-12 object-contain" />
                  ) : (
                    <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Title Section */}
                <div className="text-center space-y-3 flex-1 flex flex-col justify-center">
                  <div className={`inline-block mx-auto px-4 py-2 rounded-lg bg-gradient-to-r ${coverDesigns[selectedCoverDesign].gradient}`}>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-lg">+</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: themeColor }}>
                      SMART
                    </h2>
                    <h3 className="text-xl font-semibold text-gray-700">
                      HEALTH REPORT
                    </h3>
                  </div>
                  {aiGeneratedTag && (
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      AI Generated
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">{labName || 'Lab Name'}</p>
                    {labAddress && (
                      <p className="text-xs text-gray-600 mt-1">{labAddress}</p>
                    )}
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="w-full flex justify-center">
                  <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-0.5">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Summary */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Theme Color:</span>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded border border-gray-300" 
                    style={{ backgroundColor: themeColor }}
                  ></div>
                  <span className="font-medium">{themeColor}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Design:</span>
                <span className="font-medium">{coverDesigns[selectedCoverDesign].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fields Enabled:</span>
                <span className="font-medium">
                  {[testHistoryGraph && 'Graph', doctorReport && 'Report'].filter(Boolean).join(', ') || 'None'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default IVFSuccessReport
