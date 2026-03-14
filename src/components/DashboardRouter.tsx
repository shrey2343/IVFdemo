import { useAuth } from '../contexts/AuthContext'
import Dashboard from '../pages/Dashboard'
import WetLabDashboard from '../pages/WetLabDashboard'

const DashboardRouter = () => {
  const { user } = useAuth()

  if (!user) {
    return <Dashboard /> // Fallback
  }

  switch (user.role) {
    case 'wetlab':
      return <WetLabDashboard />
    case 'doctor':
    case 'admin':
    default:
      return <Dashboard />
  }
}

export default DashboardRouter