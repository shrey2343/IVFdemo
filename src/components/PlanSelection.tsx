import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Star, Zap, Crown } from 'lucide-react'

interface Plan {
  id: string
  name: string
  description: string
  price: string
  unit: string
  originalPrice?: string
  bundles?: Array<{
    cycles: number
    price: string
    discount: string
  }>
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
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null)

  const plans: Plan[] = [
    {
      id: 'per-cycle',
      name: 'Per Cycle Plan',
      description: 'Perfect for occasional users',
      price: '₹2,075',
      unit: 'per cycle',
      features: [
        'Single cycle analysis',
        'Basic reporting',
        'Email support',
        'Standard processing time',
        'Basic data export'
      ],
      color: 'blue',
      popular: false,
      icon: Zap
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
        'Advanced data export',
        'Custom reports'
      ],
      color: 'purple',
      popular: true,
      icon: Star
    },
    {
      id: 'annual',
      name: 'Annual Subscription',
      description: 'Unlimited access for professionals',
      price: '₹82,917',
      unit: 'per year',
      features: [
        'Unlimited cycles',
        'Premium reporting',
        '24/7 phone support',
        'Fastest processing',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        'Dedicated account manager'
      ],
      color: 'green',
      popular: false,
      icon: Crown
    }
  ]

  const handlePlanSelect = (plan: Plan) => {
    onPlanSelect(plan)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
        <p className="text-lg text-white/80">
          Select the plan that best fits your needs. You can upgrade or change plans anytime.
        </p>
      </div>

      <div className="space-y-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative border-2 rounded-2xl p-8 cursor-pointer transition-all duration-200 backdrop-blur-sm ${
              selectedPlan?.id === plan.id
                ? 'border-pink-400 bg-white/30 shadow-lg'
                : plan.popular 
                  ? 'border-purple-400 bg-white/20 shadow-md' 
                  : 'border-white/30 bg-white/10 hover:border-white/50 hover:shadow-md hover:bg-white/20'
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-8 z-10">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
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
                <div className={`w-16 h-16 bg-gradient-to-r from-${plan.color}-400 to-${plan.color}-600 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/80 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/80 ml-2">{plan.unit}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-white/60 line-through ml-3">{plan.originalPrice}</span>
                    )}
                  </div>
                  
                  {plan.bundles && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-white/90 mb-3">Bundle Options:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {plan.bundles.map((bundle, index) => (
                          <motion.div 
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className={`p-2 rounded-lg border cursor-pointer transition-all backdrop-blur-sm ${
                              selectedBundle === index 
                                ? 'border-purple-400 bg-white/30' 
                                : 'border-white/30 bg-white/10 hover:border-purple-400/50 hover:bg-white/20'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedBundle(index)
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="font-bold text-purple-300 text-sm">{bundle.cycles}</span>
                                <span className="text-xs text-white/70 ml-1">cycles</span>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-white text-sm">{bundle.price}</div>
                                <div className="text-xs text-green-300 font-medium">Save {bundle.discount}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
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
                      : `bg-${plan.color}-600 text-white hover:bg-${plan.color}-700 hover:shadow-md`
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
              {selectedPlan.name} selected! Continue with payment to activate your account.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default PlanSelection