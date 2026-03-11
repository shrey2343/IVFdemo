import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  TestTube, 
  Users, 
  Activity,
  Menu,
  X,
  LogOut
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Test Analysis', href: '/analysis', icon: TestTube },
    { name: 'Patient Records', href: '/patients', icon: Users },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:transform-none`}
      >
        <div className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-pink-600" />
            <span className="text-lg lg:text-xl font-bold text-gray-900">IVF Analytics</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-4 lg:mt-8 px-2 lg:px-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 lg:px-4 py-3 mb-2 rounded-lg transition-colors text-sm lg:text-base ${
                  isActive
                    ? 'bg-pink-50 text-pink-700 border-r-2 border-pink-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-md"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">
              <span className="text-xs lg:text-sm text-gray-500 truncate max-w-32 lg:max-w-none">{user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 lg:space-x-2 text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout