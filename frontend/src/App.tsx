import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { useLanguageStore } from './store/languageStore'

// Layouts
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'

// Dashboard Pages
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Customers from './pages/Customers'
import Invoices from './pages/Invoices'
import Inventory from './pages/Inventory'
import Tickets from './pages/Tickets'
import PricingRules from './pages/PricingRules'
import AutomationRules from './pages/AutomationRules'
import ChatbotBuilder from './pages/ChatbotBuilder'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

// Components
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore()
  const { language, direction, initializeLanguage } = useLanguageStore()

  useEffect(() => {
    // Initialize language and direction from localStorage or browser
    initializeLanguage()
    
    // Check authentication status
    checkAuth()
  }, [initializeLanguage, checkAuth])

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = direction
    document.documentElement.lang = language
  }, [language, direction])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route index element={<Navigate to="login" replace />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AdminLayout />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="customers" element={<Customers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="pricing-rules" element={<PricingRules />} />
          <Route path="automation-rules" element={<AutomationRules />} />
          <Route path="chatbot-builder" element={<ChatbotBuilder />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App