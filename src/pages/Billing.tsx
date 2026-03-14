import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

const Billing = () => {
  const { getCurrentPlan } = useAuth()
  const { showSuccess } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [activeTab, setActiveTab] = useState('pay-per-sample')
  const [showAllInvoices, setShowAllInvoices] = useState(false)
  const [showFeatures, setShowFeatures] = useState<string | null>(null)
  
  const currentPlan = getCurrentPlan() || {
    type: 'per-cycle',
    name: 'Per Cycle Plan',
    cyclesRemaining: 0,
    expiryDate: '2024-01-15',
    isActive: false
  }

  const [selectedTests, setSelectedTests] = useState<string[]>(['pgt-a'])
  const [volumeSamples, setVolumeSamples] = useState(20)
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false)
  const [enterpriseFormData, setEnterpriseFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })

  const testTypes = {
    'pgt-a': {
      name: 'PGT-A',
      fullName: 'Preimplantation Genetic Testing for Aneuploidy',
      description: 'Screens embryos for chromosomal abnormalities',
      icon: '🧬',
      price: 5000
    },
    'pgt-m': {
      name: 'PGT-M',
      fullName: 'Preimplantation Genetic Testing for Monogenic Disorders',
      description: 'Tests for specific genetic disorders',
      icon: '🔬',
      price: 12000
    },
    'pgt-sr': {
      name: 'PGT-SR',
      fullName: 'Preimplantation Genetic Testing for Structural Rearrangements',
      description: 'Detects chromosomal structural abnormalities',
      icon: '🧪',
      price: 8000
    }
  }

  const pricingPlans = [
    {
      id: 'pay-per-sample',
      name: 'Pay Per Sample',
      description: 'Perfect for occasional testing needs',
      icon: '💳',
      color: 'blue',
      popular: false,
      features: [
        'Pay only for what you use',
        'No monthly commitments',
        'Basic reporting',
        'Email support',
        'Standard processing time'
      ]
    },
    {
      id: 'clinic-volume',
      name: 'Clinic Volume Plan',
      description: 'Volume discounts for regular testing',
      icon: '📊',
      color: 'green',
      popular: true,
      features: [
        '2% discount per 20 samples',
        'Flexible sample selection',
        'Advanced reporting',
        'Priority support',
        'Faster processing',
        'Monthly billing'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      description: 'Annual subscription with premium features',
      icon: '🏢',
      color: 'purple',
      popular: false,
      features: [
        'Custom pricing',
        'Unlimited samples',
        'Premium reporting',
        '24/7 phone support',
        'Fastest processing',
        'Advanced analytics',
        'API access',
        'Dedicated account manager'
      ]
    }
  ]

  const billingStats = [
    { label: 'Current Plan', value: currentPlan.name, icon: CheckCircle, color: currentPlan.isActive ? 'green' : 'red' },
    { label: 'Cycles Remaining', value: String(currentPlan.cyclesRemaining), icon: TrendingUp, color: currentPlan.isActive ? 'blue' : 'red' },
    { label: 'Plan Expires', value: new Date(currentPlan.expiryDate).toLocaleDateString(), icon: Calendar, color: currentPlan.isActive ? 'orange' : 'red' },
    { label: 'Total Spent', value: '₹1,06,821.00', icon: IndianRupee, color: 'purple' }
  ]

  const invoices = [
    {
      id: 'INV-2024-003',
      date: '2024-03-01',
      description: 'Monthly Subscription - Pro Plan',
      amount: '₹8,218.00',
      status: 'paid',
      dueDate: '2024-03-01'
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-01',
      description: 'Monthly Subscription - Pro Plan',
      amount: '₹8,218.00',
      status: 'paid',
      dueDate: '2024-02-01'
    },
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      description: 'Monthly Subscription - Pro Plan',
      amount: '₹8,218.00',
      status: 'paid',
      dueDate: '2024-01-01'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      description: 'Monthly Subscription - Pro Plan',
      amount: '₹8,218.00',
      status: 'overdue',
      dueDate: '2023-12-01'
    }
  ]

  const calculatePayPerSamplePrice = () => {
    return selectedTests.reduce((total, testKey) => {
      return total + testTypes[testKey as keyof typeof testTypes].price
    }, 0)
  }

  const calculateVolumeDiscount = (samples: number) => {
    const discountTiers = Math.floor(samples / 20)
    return discountTiers * 2 // 2% per 20 samples
  }

  const calculateVolumePrice = () => {
    const basePrice = selectedTests.reduce((total, testKey) => {
      return total + (testTypes[testKey as keyof typeof testTypes].price * volumeSamples)
    }, 0)
    
    const discount = calculateVolumeDiscount(volumeSamples)
    const discountAmount = (basePrice * discount) / 100
    return basePrice - discountAmount
  }

  const handleEnterpriseFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEnterpriseFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleEnterpriseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    showSuccess(
      'Form Submitted Successfully!',
      'Thank you for your interest. Our sales team will get back to you within 24 hours.'
    )
    setShowEnterpriseForm(false)
    setEnterpriseFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600 mt-2">Manage your subscription and view billing history</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="monthly">This Month</option>
            <option value="quarterly">This Quarter</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
      </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {billingStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pricing Plans with Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Choose Your Pricing Plan</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {pricingPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(plan.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
                activeTab === plan.id
                  ? `bg-${plan.color}-600 text-white shadow-md`
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <span className="text-lg">{plan.icon}</span>
              <span className="font-medium text-sm">
                {plan.id === 'pay-per-sample' ? 'Pay Per Sample' : 
                 plan.id === 'clinic-volume' ? 'Volume Plan' : 'Enterprise'}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'pay-per-sample' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay Per Sample</h3>
                <p className="text-gray-600">Perfect for occasional testing needs</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Test Type:</label>
                  <div className="relative">
                    <select
                      value={selectedTests[0] || ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedTests([e.target.value])
                        } else {
                          setSelectedTests([])
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="">Choose a test...</option>
                      {Object.entries(testTypes).map(([testKey, test]) => (
                        <option key={testKey} value={testKey}>
                          {test.icon} {test.name} - ₹{test.price.toLocaleString()}/sample
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {selectedTests.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 text-center">
                    <div className="text-sm text-blue-700 mb-2">Price per sample:</div>
                    <div className="text-3xl font-bold text-blue-900 mb-4">
                      ₹{calculatePayPerSamplePrice().toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-700 mb-4">
                      <span>Features</span>
                      <button
                        onClick={() => setShowFeatures(showFeatures === 'pay' ? null : 'pay')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                    {showFeatures === 'pay' && (
                      <div className="bg-white rounded-lg p-3 text-left text-sm text-gray-700 mb-4">
                        <ul className="space-y-1">
                          <li>• Pay only for what you use</li>
                          <li>• No monthly commitments</li>
                          <li>• Basic reporting</li>
                          <li>• Email support</li>
                          <li>• Standard processing time</li>
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        showSuccess('Plan Selected!', 'You have selected the Pay Per Sample plan.')
                      }}
                      className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Select Plan
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'clinic-volume' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Clinic Volume Plan</h3>
                <p className="text-gray-600">Volume discounts for regular testing</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Test Type:</label>
                  <div className="relative">
                    <select
                      value={selectedTests[0] || ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedTests([e.target.value])
                        } else {
                          setSelectedTests([])
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
                    >
                      <option value="">Choose a test...</option>
                      {Object.entries(testTypes).map(([testKey, test]) => (
                        <option key={testKey} value={testKey}>
                          {test.icon} {test.name} - ₹{test.price.toLocaleString()}/sample
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                    Monthly Samples: {volumeSamples}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="20"
                    value={volumeSamples}
                    onChange={(e) => setVolumeSamples(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>0</span>
                    <span className="font-medium text-green-600">
                      {calculateVolumeDiscount(volumeSamples)}% discount
                    </span>
                    <span>200</span>
                  </div>
                </div>

                {selectedTests.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center">
                    <div className="text-sm text-green-700 mb-2">Monthly total:</div>
                    <div className="text-3xl font-bold text-green-900 mb-4">
                      ₹{calculateVolumePrice().toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-700 mb-4">
                      <span>Features</span>
                      <button
                        onClick={() => setShowFeatures(showFeatures === 'volume' ? null : 'volume')}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                    {showFeatures === 'volume' && (
                      <div className="bg-white rounded-lg p-3 text-left text-sm text-gray-700 mb-4">
                        <ul className="space-y-1">
                          <li>• 2% discount per 20 samples</li>
                          <li>• Flexible sample selection</li>
                          <li>• Advanced reporting</li>
                          <li>• Priority support</li>
                          <li>• Faster processing</li>
                          <li>• Monthly billing</li>
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        showSuccess('Plan Selected!', 'You have selected the Clinic Volume Plan.')
                      }}
                      className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Select Plan
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'enterprise' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Package</h3>
                <p className="text-gray-600">Annual subscription with premium features</p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">Custom Enterprise Solution</h4>
                  <p className="text-sm text-purple-700 mb-4">
                    Get a tailored pricing plan based on your specific needs and volume requirements.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-purple-700 mb-4">
                    <span>Features</span>
                    <button
                      onClick={() => setShowFeatures(showFeatures === 'enterprise' ? null : 'enterprise')}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                  {showFeatures === 'enterprise' && (
                    <div className="bg-white rounded-lg p-3 text-left text-sm text-gray-700 mb-4">
                      <ul className="space-y-1">
                        <li>• Custom pricing</li>
                        <li>• Unlimited samples</li>
                        <li>• Premium reporting</li>
                        <li>• 24/7 phone support</li>
                        <li>• Fastest processing</li>
                        <li>• Advanced analytics</li>
                        <li>• API access</li>
                        <li>• Dedicated account manager</li>
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={() => setShowEnterpriseForm(true)}
                    className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Contact Sales Team
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Invoice History - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
          <button 
            onClick={() => setShowAllInvoices(true)}
            className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center"
          >
            View All →
          </button>
        </div>
        
        <div className="space-y-3">
          {invoices.slice(0, 3).map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(invoice.status)}
                <div>
                  <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-xs text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{invoice.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* All Invoices Modal */}
      {showAllInvoices && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">All Invoices</h3>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 text-pink-600 hover:text-pink-700 font-medium">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </button>
                <button
                  onClick={() => setShowAllInvoices(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {invoice.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(invoice.status)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button className="text-pink-600 hover:text-pink-700 font-medium">
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-700 font-medium">
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Enterprise Contact Form Modal */}
      {showEnterpriseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Sales Team</h3>
              <p className="text-gray-600">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleEnterpriseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={enterpriseFormData.name}
                  onChange={handleEnterpriseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={enterpriseFormData.email}
                  onChange={handleEnterpriseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={enterpriseFormData.company}
                  onChange={handleEnterpriseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={enterpriseFormData.phone}
                  onChange={handleEnterpriseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows={3}
                  value={enterpriseFormData.message}
                  onChange={handleEnterpriseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEnterpriseForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Billing