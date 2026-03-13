import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Star, Zap, Crown } from 'lucide-react'

interface Plan {
  id: string
  name: string
  description: string
  price: string
  unit: string
  testType: string
  testName: string
  testIcon: string
  bulkPrice?: string
  sampleLimit?: string
  features: string[]
  color: string
  popular: boolean
  icon: any
}

interface PlanSelectionProps {
  onPlanSelect: (plan: Plan) => void
  selectedPlan?: Plan | null
}

const PlanSelection = ({ onPlanSelect, selectedPlan }: PlanSelectionProps) => {
  const [selectedTest, setSelectedTest] = useState<string>('pgt-a')

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
          testType: 'pgt-a',
          testName: 'PGT-A',
          testIcon: '🧬',
          bulkPrice: '₹3,00,000 for 100 samples',
          features: [
            'Single embryo analysis',
            'Basic reporting',
            'Email support',
            'Standard processing time'
          ],
          color: 'blue',
          popular: false,
          icon: Zap
        },
        {
          id: 'pgt-a-monthly',
          name: 'Monthly Subscription',
          description: 'Fixed monthly cost with sample limit',
          price: '₹1,50,000',
          unit: 'per month',
          testType: 'pgt-a',
          testName: 'PGT-A',
          testIcon: '🧬',
          sampleLimit: 'up to 50 embryos',
          features: [
            'Up to 50 embryos per month',
            'Advanced reporting',
            'Priority support',
            'Faster processing',
            'Data export'
          ],
          color: 'blue',
          popular: true,
          icon: Star
        },
        {
          id: 'pgt-a-yearly',
          name: 'Yearly Subscription',
          description: 'Best value for high-volume users',
          price: '₹15,00,000',
          unit: 'per year',
          testType: 'pgt-a',
          testName: 'PGT-A',
          testIcon: '🧬',
          features: [
            'Unlimited embryos',
            'Premium reporting',
            '24/7 phone support',
            'Fastest processing',
            'Advanced analytics',
            'API access'
          ],
          color: 'blue',
          popular: false,
          icon: Crown
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
          testType: 'pgt-m',
          testName: 'PGT-M',
          testIcon: '🔬',
          bulkPrice: '₹10,00,000 for 100 samples',
          features: [
            'Single case analysis',
            'Basic reporting',
            'Email support',
            'Standard processing time'
          ],
          color: 'green',
          popular: false,
          icon: Zap
        },
        {
          id: 'pgt-m-monthly',
          name: 'Monthly Subscription',
          description: 'Fixed monthly cost for regular testing',
          price: '₹2,50,000',
          unit: 'per month',
          testType: 'pgt-m',
          testName: 'PGT-M',
          testIcon: '🔬',
          features: [
            'Unlimited cases per month',
            'Advanced reporting',
            'Priority support',
            'Faster processing',
            'Data export'
          ],
          color: 'green',
          popular: true,
          icon: Star
        },
        {
          id: 'pgt-m-yearly',
          name: 'Yearly Subscription',
          description: 'Best value for specialized clinics',
          price: '₹25,00,000',
          unit: 'per year',
          testType: 'pgt-m',
          testName: 'PGT-M',
          testIcon: '🔬',
          features: [
            'Unlimited cases',
            'Premium reporting',
            '24/7 phone support',
            'Fastest processing',
            'Advanced analytics',
            'API access'
          ],
          color: 'green',
          popular: false,
          icon: Crown
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
          testType: 'pgt-sr',
          testName: 'PGT-SR',
          testIcon: '🧪',
          bulkPrice: '₹6,00,000 for 100 samples',
          features: [
            'Single embryo analysis',
            'Basic reporting',
            'Email support',
            'Standard processing time'
          ],
          color: 'purple',
          popular: false,
          icon: Zap
        },
        {
          id: 'pgt-sr-monthly',
          name: 'Monthly Subscription',
          description: 'Fixed monthly cost with comprehensive coverage',
          price: '₹2,00,000',
          unit: 'per month',
          testType: 'pgt-sr',
          testName: 'PGT-SR',
          testIcon: '🧪',
          features: [
            'Unlimited embryos per month',
            'Advanced reporting',
            'Priority support',
            'Faster processing',
            'Data export'
          ],
          color: 'purple',
          popular: true,
          icon: Star
        },
        {
          id: 'pgt-sr-yearly',
          name: 'Yearly Subscription',
          description: 'Best value for structural analysis',
          price: '₹20,00,000',
          unit: 'per year',
          testType: 'pgt-sr',
          testName: 'PGT-SR',
          testIcon: '🧪',
          features: [
            'Unlimited embryos',
            'Premium reporting',
            '24/7 phone support',
            'Fastest processing',
            'Advanced analytics',
            'API access'
          ],
          color: 'purple',
          popular: false,
          icon: Crown
        }
      ]
    }
  }

  const handlePlanSelect = (plan: Plan) => {
    onPlanSelect(plan)
  }

  const currentTestPlans = testBasedPlans[selectedTest as keyof typeof testBasedPlans]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
        <p className="text-lg text-white/80 mb-6">
          First select your genetic test type, then choose the pricing plan that fits your needs.
        </p>
        
        {/* Test Selection Tabs */}
        <div className="flex justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-8 max-w-2xl mx-auto">
          {Object.entries(testBasedPlans).map(([testKey, testData]) => (
            <button
              key={testKey}
              onClick={() => setSelectedTest(testKey)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                selectedTest === testKey
                  ? testData.color === 'blue'
                    ? 'bg-blue-600 text-white shadow-md'
                    : testData.color === 'green'
                      ? 'bg-green-600 text-white shadow-md'
                      : testData.color === 'purple'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
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
        <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">
            {currentTestPlans.name}
          </h3>
          <p className="text-white/80 text-sm">
            {currentTestPlans.description}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {currentTestPlans.plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative border-2 rounded-2xl p-8 cursor-pointer transition-all duration-200 backdrop-blur-sm ${
              selectedPlan?.id === plan.id
                ? 'border-pink-400 bg-white/30 shadow-lg'
                : plan.popular 
                  ? plan.color === 'blue'
                    ? 'border-blue-400 bg-white/20 shadow-md'
                    : plan.color === 'green'
                      ? 'border-green-400 bg-white/20 shadow-md'
                      : plan.color === 'purple'
                        ? 'border-purple-400 bg-white/20 shadow-md'
                        : 'border-gray-400 bg-white/20 shadow-md'
                  : 'border-white/30 bg-white/10 hover:border-white/50 hover:shadow-md hover:bg-white/20'
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-8 z-10">
                <span className={`text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg ${
                  plan.color === 'blue'
                    ? 'bg-blue-600'
                    : plan.color === 'green'
                      ? 'bg-green-600'
                      : plan.color === 'purple'
                        ? 'bg-purple-600'
                        : 'bg-gray-600'
                }`}>
                  <Star className="h-4 w-4 mr-1" />
                  Most Popular
                </span>
              </div>
            )}

            {selectedPlan?.id === plan.id && (
              <div className="absolute -top-4 right-8 z-10">
                <div className="bg-pink-600 text-white rounded-full p-2 shadow-lg">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
            )}
            
            <div className="flex items-start justify-between">
              {/* Plan Info */}
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  plan.color === 'blue'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                    : plan.color === 'green'
                      ? 'bg-gradient-to-r from-green-400 to-green-600'
                      : plan.color === 'purple'
                        ? 'bg-gradient-to-r from-purple-400 to-purple-600'
                        : 'bg-gradient-to-r from-gray-400 to-gray-600'
                }`}>
                  <span className="text-2xl">{plan.testIcon}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/80 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/80 ml-2">{plan.unit}</span>
                  </div>
                  
                  {plan.bulkPrice && (
                    <div className="mb-4 p-3 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-400/30">
                      <p className="text-sm font-medium text-green-300">
                        Bulk Pricing: {plan.bulkPrice}
                      </p>
                    </div>
                  )}

                  {plan.sampleLimit && (
                    <div className="mb-4 p-3 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-400/30">
                      <p className="text-sm font-medium text-blue-300">
                        Sample Limit: {plan.sampleLimit}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Features and Button */}
              <div className="ml-8 min-w-0 flex-shrink-0" style={{ width: '350px' }}>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-white/90">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    selectedPlan?.id === plan.id
                      ? 'bg-pink-600 text-white shadow-lg hover:bg-pink-700'
                      : plan.color === 'blue'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                        : plan.color === 'green'
                          ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
                          : plan.color === 'purple'
                            ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md'
                            : 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-md'
                  }`}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-green-500/20 backdrop-blur-sm border border-green-400/50 rounded-xl"
        >
          <div className="flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
            <p className="text-lg font-medium text-white">
              {selectedPlan.name} for {selectedPlan.testName} selected! Continue with payment to activate your account.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default PlanSelection