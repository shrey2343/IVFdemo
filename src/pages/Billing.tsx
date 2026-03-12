import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Calendar, 
  DollarSign, 
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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const currentPlan = getCurrentPlan() || {
    type: 'per-cycle',
    name: 'Per Cycle Plan',
    cyclesRemaining: 0,
    expiryDate: '2024-01-15',
    isActive: false
  }

  const plans = [
    {
      id: 'per-cycle',
      name: 'Per Cycle Plan',
      description: 'Pay as you go for each analysis cycle',
      price: '₹2,075',
      unit: 'per cycle',
      features: [
        'Single cycle analysis',
        'Basic reporting',
        'Email support',
        'Standard processing time'
      ],
      color: 'blue',
      popular: false
    },
    {
      id: 'cycle-bundle',
      name: 'Cycle Bundle',
      description: 'Best value for regular users',
      price: '₹1,245',
      unit: 'per cycle',
      originalPrice: '₹2,075',
      bundles: [
        { cycles: 100, price: '₹1,24,500', discount: '40%' },
        { cycles: 200, price: '₹2,07,500', discount: '50%' },
        { cycles: 300, price: '₹2,49,000', discount: '60%' }
      ],
      features: [
        'Bulk cycle purchase',
        'Advanced reporting',
        'Priority support',
        'Faster processing',
        'Data export'
      ],
      color: 'purple',
      popular: true
    },
    {
      id: 'annual',
      name: 'Annual Subscription',
      description: 'Unlimited access for serious professionals',
      price: '₹82,917',
      unit: 'per year',
      features: [
        'Unlimited cycles',
        'Premium reporting',
        '24/7 phone support',
        'Fastest processing',
        'Advanced analytics',
        'API access',
        'Custom integrations'
      ],
      color: 'green',
      popular: false
    }
  ]

  const billingStats = [
    { label: 'Current Plan', value: currentPlan.name, icon: CheckCircle, color: currentPlan.isActive ? 'green' : 'red' },
    { label: 'Cycles Remaining', value: String(currentPlan.cyclesRemaining), icon: TrendingUp, color: currentPlan.isActive ? 'blue' : 'red' },
    { label: 'Plan Expires', value: new Date(currentPlan.expiryDate).toLocaleDateString(), icon: Calendar, color: currentPlan.isActive ? 'orange' : 'red' },
    { label: 'Total Spent', value: '₹1,06,821.00', icon: DollarSign, color: 'purple' }
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
    const plan = plans.find(p => p.id === selectedPlan)
    if (plan && selectedPlan) {
      try {
        updatePlan(selectedPlan, plan)
        showSuccess(
          'Plan Updated Successfully!', 
          `You have successfully upgraded to ${plan.name}. You can now add patients and access all features.`
        )
        setShowConfirmation(false)
        setSelectedPlan(null)
      } catch (error) {
        showError(
          'Plan Update Failed', 
          'There was an error updating your plan. Please try again.'
        )
      }
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

      {/* Genetic Testing Costs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Genetic Testing Costs</h2>
            <p className="text-sm text-gray-600 mt-1">NGS Data Analysis pricing for genetic testing services</p>
          </div>
          <div className="text-sm text-gray-500">
            Prices in Indian Rupees (₹)
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-xs">PGT-A</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">PGT-A</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">Preimplantation Genetic Testing for Aneuploidy</div>
                  <div className="text-xs text-gray-500 mt-1">Chromosomal abnormality screening</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">₹2,000 – ₹8,000</div>
                  <div className="text-xs text-gray-500">Average: ₹5,000</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Per embryo
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-pink-600 hover:text-pink-700 font-medium mr-3">
                    Request Quote
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 font-medium">
                    Details
                  </button>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-xs">PGT-M</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">PGT-M</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">Preimplantation Genetic Testing for Monogenic Disorders</div>
                  <div className="text-xs text-gray-500 mt-1">Single gene disorder testing</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">₹5,000 – ₹20,000</div>
                  <div className="text-xs text-gray-500">Average: ₹12,500</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Per case / family
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-pink-600 hover:text-pink-700 font-medium mr-3">
                    Request Quote
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 font-medium">
                    Details
                  </button>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold text-xs">PGT-SR</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">PGT-SR</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">Preimplantation Genetic Testing for Structural Rearrangements</div>
                  <div className="text-xs text-gray-500 mt-1">Chromosomal structural abnormality testing</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">₹4,000 – ₹15,000</div>
                  <div className="text-xs text-gray-500">Average: ₹9,500</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    Per embryo
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-pink-600 hover:text-pink-700 font-medium mr-3">
                    Request Quote
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 font-medium">
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Important Notes</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Prices may vary based on complexity and laboratory requirements</li>
                  <li>Bulk testing discounts available for multiple embryos</li>
                  <li>Additional charges may apply for expedited processing</li>
                  <li>Insurance coverage varies - please check with your provider</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
              <h2 className="text-xl font-bold text-gray-900">Available Plans</h2>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                Change Plan
              </button>
            </div>
            
            <div className="space-y-6">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.01 }}
                  className={`relative border-2 rounded-xl p-6 transition-all duration-200 ${
                    plan.popular 
                      ? 'border-purple-300 bg-purple-50 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-6 z-10">
                      <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
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
                        {plan.originalPrice && (
                          <span className="text-lg text-gray-500 line-through ml-3">{plan.originalPrice}</span>
                        )}
                      </div>
                      
                      {plan.bundles && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-3">Bundle Options:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {plan.bundles.map((bundle, index) => (
                              <div key={index} className="p-2 rounded-lg border border-purple-200 bg-white">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span className="font-bold text-purple-600 text-sm">{bundle.cycles}</span>
                                    <span className="text-xs text-gray-600 ml-1">cycles</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-gray-900 text-sm">{bundle.price}</div>
                                    <div className="text-xs text-green-600 font-medium">Save {bundle.discount}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
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
                            : `bg-${plan.color}-600 text-white hover:bg-${plan.color}-700`
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
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{currentPlan.name}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Cycles Remaining: <span className="font-medium">{currentPlan.cyclesRemaining}</span>
              </p>
              <p className="text-sm text-gray-600">
                Expires: <span className="font-medium">{new Date(currentPlan.expiryDate).toLocaleDateString()}</span>
              </p>
            </div>
            
            {typeof currentPlan.cyclesRemaining === 'number' && currentPlan.cyclesRemaining < 10 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                  <p className="text-sm text-yellow-800">
                    Low cycles remaining! Consider upgrading your plan.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                Upgrade Plan
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Add Cycles
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
              const plan = plans.find(p => p.id === selectedPlan)
              return plan ? (
                <>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${plan.color}-400 to-${plan.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Plan Selection</h3>
                    <p className="text-gray-600">You've selected the {plan.name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Plan:</span>
                      <span className="font-bold text-gray-900">{plan.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Price:</span>
                      <span className="font-bold text-gray-900">{plan.price} {plan.unit}</span>
                    </div>
                    {plan.bundles && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Bundle Options Available:</p>
                        {plan.bundles.map((bundle, index) => (
                          <div key={index} className="text-xs text-gray-600 mb-1">
                            • {bundle.cycles} cycles for {bundle.price} (Save {bundle.discount})
                          </div>
                        ))}
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
                      className={`flex-1 py-3 px-4 bg-${plan.color}-600 text-white rounded-lg hover:bg-${plan.color}-700 transition-colors`}
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