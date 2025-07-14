import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              CleanEase Pro
            </h1>
            <p className="text-gray-600">
              Smart Cleaning CRM Platform
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout