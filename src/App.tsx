import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import PublicLayout from './components/PublicLayout'
import DashboardRouter from './components/DashboardRouter'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import TestAnalysis from './pages/TestAnalysis'
import PatientRecords from './pages/PatientRecords'
import PatientDetails from './pages/PatientDetails'
import AddPatient from './pages/AddPatient'
import Settings from './pages/Settings'
import Billing from './pages/Billing'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50"
          >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <PublicLayout>
                <Landing />
              </PublicLayout>
            } />
            <Route path="/blog" element={
              <PublicLayout>
                <Blog />
              </PublicLayout>
            } />
            <Route path="/contact" element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            } />
            <Route path="/terms" element={
              <PublicLayout>
                <Terms />
              </PublicLayout>
            } />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardRouter />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/add-patient" element={
              <ProtectedRoute>
                <Layout>
                  <AddPatient />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/patients" element={
              <ProtectedRoute>
                <Layout>
                  <PatientRecords />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/patients/:id" element={
              <ProtectedRoute>
                <Layout>
                  <PatientDetails />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/billing" element={
              <ProtectedRoute>
                <Layout>
                  <Billing />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/analysis" element={
              <ProtectedRoute>
                <Layout>
                  <TestAnalysis />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Redirect old routes */}
            <Route path="/app/*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </motion.div>
      </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App