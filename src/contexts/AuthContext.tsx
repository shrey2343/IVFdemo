import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'doctor' | 'admin'
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
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, plan?: any) => Promise<boolean>
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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock authentication - in real app, this would be an API call
    if (email === 'doctor@example.com' && password === 'password') {
      const mockUser: User = {
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
          name: 'Per Cycle Plan',
          cyclesRemaining: 0,
          expiryDate: '2024-01-15', // Expired date
          isActive: false
        }
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string, plan?: any): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock signup - in real app, this would be an API call
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: 'doctor',
      profile: {
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || '',
        phone: '',
        specialization: '',
        hospital: '',
        licenseNumber: '',
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
          cyclesRemaining: 100, // Default to 100 cycles bundle
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