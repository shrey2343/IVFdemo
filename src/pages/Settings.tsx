import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

const Settings = () => {
  const { user, updateProfile, isLoading } = useAuth()
  const { showSuccess, showError } = useToast()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    hospital: '',
    licenseNumber: '',
    bio: ''
  })

  // Initialize profile data from user context
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        email: user.email || '',
        phone: user.profile.phone || '',
        specialization: user.profile.specialization || '',
        hospital: user.profile.hospital || '',
        licenseNumber: user.profile.licenseNumber || '',
        bio: user.profile.bio || ''
      })
    }
  }, [user])

  const [paymentMethods, setPaymentMethods] = useState([
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
  ])

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    testResults: true,
    appointments: true,
    billing: true,
    marketing: false
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = async () => {
    try {
      const success = await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        name: `${profileData.firstName} ${profileData.lastName}`,
        email: profileData.email,
        phone: profileData.phone,
        specialization: profileData.specialization,
        hospital: profileData.hospital,
        licenseNumber: profileData.licenseNumber,
        bio: profileData.bio
      })

      if (success) {
        showSuccess(
          'Profile Updated Successfully!',
          'Your profile information has been saved.'
        )
      } else {
        showError(
          'Update Failed',
          'There was an error updating your profile. Please try again.'
        )
      }
    } catch (error) {
      showError(
        'Update Failed',
        'There was an error updating your profile. Please try again.'
      )
    }
  }

  const handleNotificationToggle = (field: string) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }))
  }

  const addPaymentMethod = () => {
    // Handle adding new payment method
    console.log('Add payment method')
  }

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id))
  }

  const setDefaultPaymentMethod = (id: number) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Settings Navigation - Top Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Settings Content */}
      <div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <ProfileTab 
                profileData={profileData} 
                onUpdate={handleProfileUpdate}
                onSave={handleSaveProfile}
                isLoading={isLoading}
              />
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <SecurityTab 
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <BillingTab 
                paymentMethods={paymentMethods}
                onAdd={addPaymentMethod}
                onRemove={removePaymentMethod}
                onSetDefault={setDefaultPaymentMethod}
              />
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <NotificationsTab 
                notifications={notifications}
                onToggle={handleNotificationToggle}
              />
            )}
          </motion.div>
      </div>
    </div>
  )
}

// Profile Tab Component
const ProfileTab = ({ profileData, onUpdate, onSave, isLoading }: any) => (
  <div>
    <div className="flex items-center mb-6">
      <User className="h-6 w-6 text-pink-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
    </div>
    
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => onUpdate('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => onUpdate('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialization
          </label>
          <input
            type="text"
            value={profileData.specialization}
            onChange={(e) => onUpdate('specialization', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital/Clinic
          </label>
          <input
            type="text"
            value={profileData.hospital}
            onChange={(e) => onUpdate('hospital', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medical License Number
        </label>
        <input
          type="text"
          value={profileData.licenseNumber}
          onChange={(e) => onUpdate('licenseNumber', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) => onUpdate('bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Tell us about your experience and expertise"
        />
      </div>
      
      <div className="flex justify-end">
        <motion.button
          onClick={onSave}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
            isLoading
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-pink-600 text-white hover:bg-pink-700'
          }`}
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </div>
  </div>
)
// Security Tab Component
const SecurityTab = ({ showPassword, setShowPassword }: any) => (
  <div>
    <div className="flex items-center mb-6">
      <Shield className="h-6 w-6 text-pink-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
    </div>
    
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Two-Factor Authentication</h3>
        <p className="text-blue-700 text-sm mb-4">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Enable 2FA
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Sessions</h3>
        <div className="space-y-3">
          {[
            { device: 'MacBook Pro', location: 'San Francisco, CA', time: '2 hours ago', current: true },
            { device: 'iPhone 13', location: 'San Francisco, CA', time: '1 day ago', current: false },
            { device: 'iPad Pro', location: 'Los Angeles, CA', time: '3 days ago', current: false }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  {session.device} {session.current && <span className="text-green-600">(Current)</span>}
                </p>
                <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
              </div>
              {!session.current && (
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Update Security
        </motion.button>
      </div>
    </div>
  </div>
)

// Billing Tab Component
const BillingTab = ({ paymentMethods, onAdd, onRemove, onSetDefault }: any) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <CreditCard className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Billing & Payment</h2>
      </div>
      <motion.button
        onClick={onAdd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Payment Method
      </motion.button>
    </div>
    
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
        <div className="space-y-3">
          {paymentMethods.map((method: any) => (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center">
                <div className={`w-12 h-8 rounded ${
                  method.type === 'visa' ? 'bg-blue-600' : 'bg-red-600'
                } flex items-center justify-center mr-4`}>
                  <span className="text-white text-xs font-bold uppercase">
                    {method.type}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    •••• •••• •••• {method.last4}
                    {method.isDefault && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <button
                    onClick={() => onSetDefault(method.id)}
                    className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => onRemove(method.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: '2024-03-01', description: 'Monthly Subscription', amount: '₹8,218.00', status: 'Paid' },
                { date: '2024-02-01', description: 'Monthly Subscription', amount: '₹8,218.00', status: 'Paid' },
                { date: '2024-01-01', description: 'Monthly Subscription', amount: '₹8,218.00', status: 'Paid' }
              ].map((invoice, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-600 hover:text-pink-700">
                    <button>Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

// Notifications Tab Component
const NotificationsTab = ({ notifications, onToggle }: any) => (
  <div>
    <div className="flex items-center mb-6">
      <Bell className="h-6 w-6 text-pink-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
    </div>
    
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive notifications via text message' }
          ].map((pref) => (
            <div key={pref.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{pref.label}</p>
                <p className="text-sm text-gray-500">{pref.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[pref.key as keyof typeof notifications]}
                  onChange={() => onToggle(pref.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
        <div className="space-y-4">
          {[
            { key: 'testResults', label: 'Test Results', description: 'Get notified when test results are available' },
            { key: 'appointments', label: 'Appointments', description: 'Reminders for upcoming appointments' },
            { key: 'billing', label: 'Billing Updates', description: 'Payment confirmations and billing alerts' },
            { key: 'marketing', label: 'Marketing Communications', description: 'Product updates and promotional content' }
          ].map((type) => (
            <div key={type.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{type.label}</p>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[type.key as keyof typeof notifications]}
                  onChange={() => onToggle(type.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </motion.button>
      </div>
    </div>
  </div>
)

export default Settings