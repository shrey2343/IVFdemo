import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Activity,
  Menu,
  X,
  LogOut,
  Settings,
  CreditCard,
  Bell
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
    { name: 'Add Patient', href: '/add-patient', icon: UserPlus },
    { name: 'Patient Records', href: '/patients', icon: Users },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:transform-none flex flex-col`}
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
        
        {/* Navigation Links */}
        <nav className="flex-1 mt-4 lg:mt-8 px-2 lg:px-4">
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

        {/* Logout Button at Bottom */}
        <div className="p-2 lg:p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 lg:px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors text-sm lg:text-base"
          >
            <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </div>
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
            
            {/* Enhanced User Profile Section */}
            <div className="flex items-center space-x-3 ml-auto">
              {/* User Avatar and Info */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 rounded-full border border-pink-100 hover:shadow-md transition-all duration-200">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm lg:text-base">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </span>
                  </div>
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                
                {/* User Info */}
                <div className="hidden sm:block text-left">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {user?.name || 'User'}
                    </p>
                    {/* Role Badge */}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {user?.role === 'doctor' ? 'Doctor' : 'Admin'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">
                    {user?.profile?.specialization || 'IVF Specialist'}
                  </p>
                </div>
              </div>
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