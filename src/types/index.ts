export interface Patient {
  id: number
  name: string
  age: number
  email: string
  phone: string
  lastVisit: string
  status: 'active' | 'monitoring' | 'completed' | 'inactive'
  treatmentStage: string
  nextAppointment: string
  recentTests: string[]
}

export interface TestResult {
  id: number
  patientId: number
  testType: string
  value: string
  referenceRange: string
  status: 'normal' | 'low' | 'high' | 'borderline'
  interpretation: string
  date: string
  notes?: string
}

export interface DashboardStats {
  totalPatients: number
  testsThisMonth: number
  successRate: number
  pendingResults: number
}

export interface TestType {
  id: string
  name: string
  description: string
  referenceRanges: {
    min: number
    max: number
    unit: string
  }
}