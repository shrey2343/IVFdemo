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
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

const Billing = () => {
  const { updatePlan, getCurrentPlan } = useAuth()
  const { showSuccess, showError } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedTest, setSelectedTest] = useState<string>('pgt-a') // Default to PGT-A
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const currentPlan = getCurrentPlan() || {
    type: 'per-cycle',
    name: 'Per Cycle Plan',
    cyclesRemaining: 0,
    expiryDate: '2024-01-15',
    isActive: false
  }

  const testBasedPlans = {
    'pgt-a': {
      name: 'PGT-A (Preimplantation Genetic Testing for Aneuploidy)',
      description: 'Screens embryos for chromosomal abnormalities',
      icon: '🧬',
      color: 'blue',
      plans: [
        {
          id: 'pgt-a-per-sample',
          name: 'Per Sample Plan',
          description: 'Pay per embryo analysis',
          price: '₹3,000',
          unit: 'per embryo',
          bulkPrice: '₹3,00,000 for 100 samples',
          features: [
            'Single embryo analysis',
            'Basic reporting',
            'Email support',
            'Standard processing time'
          ],
          popular: false
        },
        {
          id: 'pgt-a-monthly',
          name: 'Monthly Subscription',
          description: 'Fixed monthly cost with sample limit',
          price: '₹1,50,000',
          unit: 'per month',
          sampleLimit: 'up to 50 embryos',
          features: [
            'Up to 50 embryos per month',
            'Advanced reporting',
            'Priority support',
            'Faster processing',
            'Data export'
          ],
          popular: true
        },
        {
          id: 'pgt-a-yearly',
          name: 'Yearly Subscription',
          description: 'Best value for high-volume users',
          price: '₹15,00,000',
          unit: 'per year',
          features: [
            'Unlimited embryos',
            'Premium reporting',
            '24/7 phone support',
            'Fastest processing',
            'Advanced analytics',
            'API access'
          ],
          popular: false
        }
      ]
    },
    'pgt-m': {
      name: 'PGT-M (Preimplantation Genetic Testing for Monogenic Disorders)',
      description: 'Tests for specific genetic disorders',
      icon: '🔬',
      color: 'green',
      plans: [
        {
          id: 'pgt-m-per-sample',
          name: 'Per Case Plan',
          description: 'Pay per case analysis',
          price: '₹10,000',
          unit: 'per case',
          bulkPrice: '₹10,00,000 for 100 samples',
          features: [
            'Single case analysis',
            'Basic reporting',
            'Email support',
            'Standard processing time'
          ],
          popular: false
        },
        {
          id: 'pgt-m-monthly',
          name: 'Monthly Subscription',
          description: 'Fixed monthly cost for regular testing',
          price: '₹2,50,000',
          unit: 'per month',
          features: [
            'Unlimited cases per month',
            'Advanced reporting',
            'Priority support',
            'Faster processing',
            'Data export'
          ],
          popular: true
        },
        {
          id: 'pgt-m-yearly',
          name: 'Yearly Subscription',
          description: 'Best value for specialized clinics',
          price: '₹25,00,000',
          unit: 'per year',
          features: [
            'Unlimited cases',
            'Premium reporting',
            '24/7 phone support',
            'Fastest processing',
            'Advanced analytics',
            'API access'
          ],
          popular: false
        }
      ]
    },
    'pgt-sr': {
      name: 'PGT-SR (Preimplantation Genetic Testing for Structural Rearrangements)',
      description: 'Detects chromosomal structural abnormalities',
      icon: '🧪',
      color: 'purple',
      plans: [
        {
          id: 'pgt-sr-per-sample',
          name: 'Per Sample Plan',
          description: 'Pay per embryo analysis',
          price: '₹6,000',
          unit: 'per embryo',
          bulkPrice: '₹6,00,000 for 100 samples',
          features: [
            'Single embryo analysis',
            'Basic reporting',
            'Email support',
            'Standard processing time'
          ],
          popular: false
        },
        {
          id: 'pgt-sr-monthly',
          name: 'Monthly Subscription',
          description: 'Fixed monthly cost with comprehensive coverage',
          price: '₹2,00,000',
          unit: 'per month',
          features: [
            'Unlimited embryos per month',
            'Advanced reporting',
            'Priority support',
            'Faster processing',
            'Data export'
          ],
          popular: true
        },
        {
          id: 'pgt-sr-yearly',
          name: 'Yearly Subscription',
          description: 'Best value for structural analysis',
          price: '₹20,00,000',
          unit: 'per year',
          features: [
            'Unlimited embryos',
            'Premium reporting',
            '24/7 phone support',
            'Fastest processing',
            'Advanced analytics',
            'API access'
          ],
          popular: false
        }
      ]
    }
  }

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

  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '06',
      expiryYear: '2026',
      isDefault: false
    }
  ]

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setShowConfirmation(true)
  }

  const confirmPlanSelection = () => {
    const currentTestPlans = testBasedPlans[selectedTest as keyof typeof testBasedPlans]
    const plan = currentTestPlans?.plans.find(p => p.id === selectedPlan)
    if (plan && selectedPlan) {
      try {
        updatePlan(selectedPlan, plan)
        showSuccess(
          'Plan Updated Successfully!', 
          `You have successfully upgraded to ${plan.name} for ${currentTestPlans.name}. You can now add patients and use the platform features.`
        )
        setShowConfirmation(false)
        setSelectedPlan(null)
      } catch (error) {
        console.error('Plan update error:', error)
        showError(
          'Plan Update Failed', 
          'There was an error updating your plan. Please try again or contact support.'
        )
      }
    } else {
      showError(
        'Invalid Plan Selection', 
        'Please select a valid plan and try again.'
      )
    }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Plans */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Test-Based Pricing Plans</h2>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                Change Plan
              </button>
            </div>
            
            {/* Test Selection Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
              {Object.entries(testBasedPlans).map(([testKey, testData]) => (
                <button
                  key={testKey}
                  onClick={() => setSelectedTest(testKey)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
                    selectedTest === testKey
                      ? `bg-${testData.color}-600 text-white shadow-md`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <span className="text-lg">{testData.icon}</span>
                  <span className="font-medium text-sm">
                    {testKey.toUpperCase().replace('-', '-')}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Test Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {testBasedPlans[selectedTest as keyof typeof testBasedPlans].name}
              </h3>
              <p className="text-gray-600 text-sm">
                {testBasedPlans[selectedTest as keyof typeof testBasedPlans].description}
              </p>
            </div>
            
            {/* Plans for Selected Test */}
            <div className="space-y-6">
              {testBasedPlans[selectedTest as keyof typeof testBasedPlans].plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.01 }}
                  className={`relative border-2 rounded-xl p-6 transition-all duration-200 ${
                    plan.popular 
                      ? `border-${testBasedPlans[selectedTest as keyof typeof testBasedPlans].color}-300 bg-${testBasedPlans[selectedTest as keyof typeof testBasedPlans].color}-50 shadow-lg` 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-6 z-10">
                      <span className={`bg-${testBasedPlans[selectedTest as keyof typeof testBasedPlans].color}-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between">
                    {/* Plan Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      
                      <div className="flex items-baseline mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">{plan.unit}</span>
                      </div>
                      
                      {(plan as any).bulkPrice && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-green-800">
                            Bulk Pricing: {(plan as any).bulkPrice}
                          </p>
                        </div>
                      )}

                      {(plan as any).sampleLimit && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-blue-800">
                            Sample Limit: {(plan as any).sampleLimit}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Features and Button */}
                    <div className="ml-8 min-w-0 flex-shrink-0" style={{ width: '300px' }}>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button 
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                          currentPlan.type === plan.id
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : `bg-${testBasedPlans[selectedTest as keyof typeof testBasedPlans].color}-600 text-white hover:bg-${testBasedPlans[selectedTest as keyof typeof testBasedPlans].color}-700`
                        }`}
                        disabled={currentPlan.type === plan.id}
                      >
                        {currentPlan.type === plan.id ? 'Current Plan' : 'Select Plan'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Current Plan & Payment Methods */}
        <div className="space-y-6">
          {/* Current Plan Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Plan Status</h2>
            
            {/* Current Test & Plan */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PGT-A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Per Sample Plan</h3>
                    <p className="text-xs text-gray-600">PGT-A Testing</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  currentPlan.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {currentPlan.isActive ? 'Active' : 'Expired'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Pricing</p>
                  <p className="font-medium text-gray-900">₹3,000 per embryo</p>
                </div>
                <div>
                  <p className="text-gray-600">Usage</p>
                  <p className="font-medium text-gray-900">Pay per use</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Plan Status: <span className="font-medium">{currentPlan.isActive ? 'Active' : 'Expired'}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Expires: <span className="font-medium">{new Date(currentPlan.expiryDate).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
            
            {/* Plan Recommendations */}
            {!currentPlan.isActive && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                  <p className="text-sm text-yellow-800">
                    Your plan has expired. Upgrade to continue using our services.
                  </p>
                </div>
              </div>
            )}
            
            {currentPlan.isActive && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Consider upgrading to Monthly or Yearly plans for better value
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Monthly plans offer up to 50 embryos with advanced features
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <button 
                onClick={() => setSelectedTest('pgt-a')}
                className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                {currentPlan.isActive ? 'Upgrade Plan' : 'Activate Plan'}
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Switch Test Type
              </button>
            </div>
          </motion.div>
          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
              <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                Add New
              </button>
            </div>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-10 h-6 rounded ${
                      method.type === 'visa' ? 'bg-blue-600' : 'bg-red-600'
                    } flex items-center justify-center mr-3`}>
                      <span className="text-white text-xs font-bold uppercase">
                        {method.type}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        •••• {method.last4}
                      </p>
                      <p className="text-xs text-gray-500">
                        {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Invoice History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Invoice History</h2>
          <button className="flex items-center px-4 py-2 text-pink-600 hover:text-pink-700 font-medium">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </button>
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

      {/* Plan Selection Confirmation Modal */}
      {showConfirmation && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
          >
            {(() => {
              const currentTestPlans = testBasedPlans[selectedTest as keyof typeof testBasedPlans]
              const plan = currentTestPlans?.plans.find(p => p.id === selectedPlan)
              return plan ? (
                <>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${currentTestPlans.color}-400 to-${currentTestPlans.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl">{currentTestPlans.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Plan Selection</h3>
                    <p className="text-gray-600">You've selected {plan.name} for {currentTestPlans.name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Test:</span>
                      <span className="font-bold text-gray-900">{selectedTest.toUpperCase().replace('-', '-')}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Plan:</span>
                      <span className="font-bold text-gray-900">{plan.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Price:</span>
                      <span className="font-bold text-gray-900">{plan.price} {plan.unit}</span>
                    </div>
                    {(plan as any).bulkPrice && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-1">Bulk Pricing:</p>
                        <p className="text-xs text-gray-600">{(plan as any).bulkPrice}</p>
                      </div>
                    )}
                    {(plan as any).sampleLimit && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-1">Sample Limit:</p>
                        <p className="text-xs text-gray-600">{(plan as any).sampleLimit}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setShowConfirmation(false)
                        setSelectedPlan(null)
                      }}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmPlanSelection}
                      className={`flex-1 py-3 px-4 bg-${currentTestPlans.color}-600 text-white rounded-lg hover:bg-${currentTestPlans.color}-700 transition-colors`}
                    >
                      Confirm Selection
                    </button>
                  </div>
                </>
              ) : null
            })()}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Billing