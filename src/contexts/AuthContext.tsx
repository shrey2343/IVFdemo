import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'doctor' | 'admin' | 'wetlab'
  profile: {
    firstName: string
    lastName: string
    phone?: string
    specialization?: string
    hospital?: string
    licenseNumber?: string
    bio?: string
  }
  plan: {
    type: 'per-cycle' | 'cycle-bundle' | 'annual'
    name: string
    cyclesRemaining: number | 'unlimited'
    expiryDate: string
    isActive: boolean
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType?: 'doctor' | 'wetlab') => Promise<boolean>
  signup: (name: string, email: string, password: string, plan?: any, role?: 'doctor' | 'wetlab', additionalData?: any) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  canAddPatient: () => boolean
  useCycle: () => boolean
  updatePlan: (planId: string, planData: any) => void
  getCurrentPlan: () => User['plan'] | null
  updateProfile: (profileData: Partial<User['profile']> & { name?: string; email?: string }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: 'doctor' | 'wetlab' = 'doctor'): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock authentication - in real app, this would be an API call
    let mockUser: User | null = null
    
    if ((email === 'doctor@example.com' && (password === 'Doctor@123' || password === 'Shrey@2343') && userType === 'doctor')) {
      mockUser = {
        id: '1',
        name: 'Dr. Sarah Johnson',
        email: email,
        role: 'doctor',
        profile: {
          firstName: 'Dr. Sarah',
          lastName: 'Johnson',
          phone: '+1 (555) 123-4567',
          specialization: 'Reproductive Endocrinology',
          hospital: 'City Medical Center',
          licenseNumber: 'MD123456',
          bio: 'Experienced fertility specialist with over 10 years in reproductive medicine.'
        },
        plan: {
          type: 'per-cycle',
          name: 'Demo Plan',
          cyclesRemaining: 5,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isActive: true
        }
      }
    } else if (email === 'wetlab@example.com' && (password === 'Wetlab@123' || password === 'Shrey@2343') && userType === 'wetlab') {
      mockUser = {
        id: '2',
        name: 'IVF 360 Wet Lab',
        email: email,
        role: 'wetlab',
        profile: {
          firstName: 'IVF 360',
          lastName: 'Wet Lab',
          phone: '+1 (555) 987-6543',
          specialization: 'IVF Testing & Analysis',
          hospital: 'Reproductive Testing Center',
          licenseNumber: 'WL789012',
          bio: 'Leading wet laboratory specializing in IVF testing, embryo analysis, and genetic screening.'
        },
        plan: {
          type: 'per-cycle',
          name: 'Demo Plan',
          cyclesRemaining: 5,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isActive: true
        }
      }
    }
    
    if (mockUser) {
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string, plan?: any, role: 'doctor' | 'wetlab' = 'doctor', additionalData?: any): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock signup - in real app, this would be an API call
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: role, // Use the selected role
      profile: {
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || '',
        phone: '',
        specialization: additionalData?.specialization || additionalData?.labName || (role === 'doctor' ? 'Reproductive Endocrinology' : 'IVF Testing & Analysis'),
        hospital: additionalData?.hospital || additionalData?.labAddress || (role === 'doctor' ? '' : 'Reproductive Testing Center'),
        licenseNumber: additionalData?.licenseNumber || additionalData?.certificationNumber || '',
        bio: ''
      },
      plan: plan ? {
        type: plan.id,
        name: plan.name,
        cyclesRemaining: plan.id === 'annual' ? 'unlimited' : (plan.id === 'per-cycle' ? 1 : 100),
        expiryDate: plan.id === 'annual' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true
      } : {
        type: 'per-cycle',
        name: 'Per Cycle Plan',
        cyclesRemaining: 0,
        expiryDate: new Date().toISOString().split('T')[0],
        isActive: false
      }
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const canAddPatient = (): boolean => {
    if (!user || !user.plan.isActive) return false
    
    // Check if plan has expired
    const today = new Date()
    const expiryDate = new Date(user.plan.expiryDate)
    if (today > expiryDate) return false
    
    // Check cycles remaining
    if (user.plan.cyclesRemaining === 'unlimited') return true
    if (typeof user.plan.cyclesRemaining === 'number' && user.plan.cyclesRemaining > 0) return true
    
    return false
  }

  const useCycle = (): boolean => {
    if (!user || user.plan.cyclesRemaining === 'unlimited') return true
    
    if (typeof user.plan.cyclesRemaining === 'number' && user.plan.cyclesRemaining > 0) {
      const updatedUser = {
        ...user,
        plan: {
          ...user.plan,
          cyclesRemaining: user.plan.cyclesRemaining - 1
        }
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return true
    }
    
    return false
  }

  const updatePlan = (planId: string, planData: any) => {
    if (!user) return

    let newPlan
    
    // Handle billing page plan IDs
    if (planId.includes('per-sample') || planId.includes('per-case')) {
      newPlan = {
        type: 'per-cycle' as const,
        name: planData?.name || 'Per Sample Plan',
        cyclesRemaining: 10, // Give 10 cycles for per-sample plans
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true
      }
    } else if (planId.includes('monthly')) {
      newPlan = {
        type: 'cycle-bundle' as const,
        name: planData?.name || 'Monthly Subscription',
        cyclesRemaining: 'unlimited' as const, // Monthly plans have unlimited cycles
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true
      }
    } else if (planId.includes('yearly')) {
      newPlan = {
        type: 'annual' as const,
        name: planData?.name || 'Yearly Subscription',
        cyclesRemaining: 'unlimited' as const,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true
      }
    } else {
      // Fallback for legacy plan types
      switch (planId) {
        case 'per-cycle':
          newPlan = {
            type: 'per-cycle' as const,
            name: 'Per Cycle Plan',
            cyclesRemaining: 1,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isActive: true
          }
          break
        case 'cycle-bundle':
          newPlan = {
            type: 'cycle-bundle' as const,
            name: 'Cycle Bundle',
            cyclesRemaining: 100,
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isActive: true
          }
          break
        case 'annual':
          newPlan = {
            type: 'annual' as const,
            name: 'Annual Subscription',
            cyclesRemaining: 'unlimited' as const,
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isActive: true
          }
          break
        default:
          return
      }
    }

    const updatedUser = {
      ...user,
      plan: newPlan
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const updateProfile = async (profileData: Partial<User['profile']> & { name?: string; email?: string }): Promise<boolean> => {
    if (!user) return false
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      const updatedUser: User = {
        ...user,
        name: profileData.name || user.name,
        email: profileData.email || user.email,
        profile: {
          ...user.profile,
          ...profileData
        }
      }
      
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const getCurrentPlan = () => {
    return user?.plan || null
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    canAddPatient,
    useCycle,
    updatePlan,
    getCurrentPlan,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}