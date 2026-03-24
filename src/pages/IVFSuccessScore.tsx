import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { useToast } from '../contexts/ToastContext'

const IVFSuccessScore = () => {
  const { sampleId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)

  // Mock data - in real app, this would come from API
  const analysisData = {
    sampleId: sampleId || 'S001',
    patientName: 'Sarah Johnson',
    age: 34,
    amh: 2.1,
    previousCycles: 1,
    diagnosis: 'Unexplained infertility',
    predictedSuccessRate: 62,
    embryos: [
      {
        id: 'E1',
        score: 92,
        geneticStatus: 'Euploid',
        recommendation: 'Transfer',
        recommendationType: 'success',
        implantationProbability: 68,
        miscarriageRisk: 8
      },
      {
        id: 'E2',
        score: 85,
        geneticStatus: 'Euploid',
        recommendation: 'Backup',
        recommendationType: 'warning',
        implantationProbability: 62,
        miscarriageRisk: 10
      },
      {
        id: 'E3',
        score: 60,
        geneticStatus: 'Mosaic',
        recommendation: 'Consider',
        recommendationType: 'caution',
        implantationProbability: 45,
        miscarriageRisk: 18
      },
      {
        id: 'E4',
        score: 30,
        geneticStatus: 'Aneuploid',
        recommendation: 'Reject',
        recommendationType: 'danger',
        implantationProbability: 15,
        miscarriageRisk: 45
      }
    ],
    selectedEmbryo: 'E1',
    alerts: [
      { type: 'warning', message: 'Mosaic Embryo Present' },
      { type: 'caution', message: 'Lower AMH Level Noted' }
    ],
    transferWindow: 'Day 5-6',
    estimatedSuccess: 65
  }

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'caution':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'danger':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'warning':
      case 'caution':
        return <AlertTriangle className="h-4 w-4" />
      case 'danger':
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>IVF Success Score Analysis - ${analysisData.sampleId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0 0 20px 0;
              font-size: 32px;
            }
            .patient-info {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 20px;
              font-size: 14px;
            }
            .success-rate {
              text-align: right;
              font-size: 48px;
              font-weight: bold;
            }
            .section {
              margin: 30px 0;
            }
            .section-title {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-bottom: 20px;
              border-bottom: 2px solid #667eea;
              padding-bottom: 10px;
            }
            .embryo-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            .embryo-table th {
              background: #f3f4f6;
              padding: 15px;
              text-align: left;
              font-weight: 600;
              border-bottom: 2px solid #e5e7eb;
            }
            .embryo-table td {
              padding: 15px;
              border-bottom: 1px solid #e5e7eb;
            }
            .embryo-table tr:hover {
              background: #f9fafb;
            }
            .score {
              font-size: 24px;
              font-weight: bold;
            }
            .recommendation {
              display: inline-flex;
              align-items: center;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 500;
            }
            .rec-success { background: #d1fae5; color: #065f46; }
            .rec-warning { background: #fef3c7; color: #92400e; }
            .rec-caution { background: #fed7aa; color: #9a3412; }
            .rec-danger { background: #fee2e2; color: #991b1b; }
            .alert-box {
              padding: 15px;
              border-radius: 8px;
              margin: 10px 0;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .alert-warning { background: #fef3c7; border-left: 4px solid #f59e0b; }
            .alert-caution { background: #fed7aa; border-left: 4px solid #ea580c; }
            .details-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin: 20px 0;
            }
            .detail-card {
              padding: 20px;
              background: #f9fafb;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
            }
            .detail-label {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 5px;
            }
            .detail-value {
              font-size: 18px;
              font-weight: 600;
              color: #111827;
            }
            .transfer-rec {
              background: #d1fae5;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              font-size: 18px;
              font-weight: 600;
              color: #065f46;
              margin: 20px 0;
            }
            @media print {
              body { background: white; }
              .container { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AI-Powered IVF Decision Dashboard</h1>
              <div class="patient-info">
                <div>
                  <strong>Age:</strong> ${analysisData.age} | 
                  <strong>AMH:</strong> ${analysisData.amh} ng/ml | 
                  <strong>Previous Cycles:</strong> ${analysisData.previousCycles} | 
                  <strong>Diagnosis:</strong> ${analysisData.diagnosis}
                </div>
                <div class="success-rate">
                  Predicted IVF Success Rate: ${analysisData.predictedSuccessRate}% ✓
                </div>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Embryo Ranking</h2>
              <table class="embryo-table">
                <thead>
                  <tr>
                    <th>Embryo</th>
                    <th>Score</th>
                    <th>Genetic Status</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  ${analysisData.embryos.map(embryo => `
                    <tr>
                      <td><strong>${embryo.id}</strong></td>
                      <td><span class="score">${embryo.score}%</span></td>
                      <td>${embryo.geneticStatus}</td>
                      <td>
                        <span class="recommendation rec-${embryo.recommendationType}">
                          ${embryo.recommendation}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="section">
              <h2 class="section-title">Embryo Details - Selected: ${analysisData.selectedEmbryo}</h2>
              <div class="details-grid">
                <div class="detail-card">
                  <div class="detail-label">Chromosomally Normal (PGT-A)</div>
                  <div class="detail-value">✓ Yes</div>
                </div>
                <div class="detail-card">
                  <div class="detail-label">Implantation Probability</div>
                  <div class="detail-value">${analysisData.embryos[0].implantationProbability}%</div>
                </div>
                <div class="detail-card">
                  <div class="detail-label">Optimal Morphology Score</div>
                  <div class="detail-value">✓ Yes</div>
                </div>
                <div class="detail-card">
                  <div class="detail-label">Low Miscarriage Risk</div>
                  <div class="detail-value">${analysisData.embryos[0].miscarriageRisk}%</div>
                </div>
              </div>

              <div class="transfer-rec">
                Best Transfer Window: ${analysisData.transferWindow}
              </div>

              <div class="detail-card">
                <div class="detail-label">Outcome Simulation</div>
                <div class="detail-value">Estimated Success with ${analysisData.selectedEmbryo}: ${analysisData.estimatedSuccess}%</div>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Alerts</h2>
              ${analysisData.alerts.map(alert => `
                <div class="alert-box alert-${alert.type}">
                  ⚠ ${alert.message}
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
              <p>Generated on ${new Date().toLocaleDateString()} | Sample ID: ${analysisData.sampleId}</p>
              <p>This report is for informational purposes only. Consult with your healthcare provider for medical decisions.</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      const blob = new Blob([reportHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `IVF_Success_Score_${analysisData.sampleId}_${new Date().toISOString().split('T')[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      showToast('Analysis downloaded successfully!', 'success')
    } catch (error) {
      console.error('Error downloading analysis:', error)
      showToast('Error downloading analysis', 'error')
    } finally {
      setIsDownloading(false)
    }
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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">IVF Success Score Analysis</h1>
            <p className="text-gray-600 mt-1">Sample ID: {analysisData.sampleId} - {analysisData.patientName}</p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download Analysis</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Main Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">AI-Powered IVF Decision Dashboard</h2>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-6 text-sm">
              <span><strong>Age:</strong> {analysisData.age}</span>
              <span><strong>AMH:</strong> {analysisData.amh} ng/ml</span>
              <span><strong>Previous Cycles:</strong> {analysisData.previousCycles}</span>
              <span><strong>Diagnosis:</strong> {analysisData.diagnosis}</span>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold flex items-center space-x-2">
                <span>Predicted IVF Success Rate: {analysisData.predictedSuccessRate}%</span>
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Embryo Ranking */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Embryo Ranking</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Embryo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Genetic Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.embryos.map((embryo) => (
                  <tr 
                    key={embryo.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      embryo.id === analysisData.selectedEmbryo ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className="text-lg font-bold text-gray-900">{embryo.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-2xl font-bold text-gray-900">{embryo.score}%</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{embryo.geneticStatus}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-lg border ${getRecommendationColor(embryo.recommendationType)}`}>
                        {getRecommendationIcon(embryo.recommendationType)}
                        <span>{embryo.recommendation}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerts */}
          <div className="mt-6 space-y-3">
            {analysisData.alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                    : 'bg-orange-50 border-orange-200 text-orange-800'
                }`}
              >
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{alert.message}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Embryo Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Embryo Details
            </h3>
            <p className="text-sm text-gray-600 mb-4">Selected Embryo: <span className="font-bold text-gray-900">{analysisData.selectedEmbryo}</span></p>
            
            {/* Embryo Images */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Day 3</span>
                  </div>
                </div>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Blastocyst</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">Chromosomally Normal (PGT-A)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">Implantation Probability: <strong>{analysisData.embryos[0].implantationProbability}%</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">Optimal Morphology Score</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">Low Miscarriage Risk: <strong>{analysisData.embryos[0].miscarriageRisk}%</strong></span>
              </div>
            </div>

            {/* Transfer Recommendation */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Transfer Recommendation</h4>
              <p className="text-green-700 font-medium">Best Transfer Window: {analysisData.transferWindow}</p>
            </div>

            {/* Outcome Simulation */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Outcome Simulation</h4>
              <p className="text-blue-700">Estimated Success with {analysisData.selectedEmbryo}: <strong>{analysisData.estimatedSuccess}%</strong></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default IVFSuccessScore
