import { Menu, Bell, User, LogOut, Settings, Globe } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useLanguageStore } from '../store/languageStore'
import { useState } from 'react'

interface HeaderProps {
  onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuthStore()
  const { language, setLanguage } = useLanguageStore()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
  }

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar'
    setLanguage(newLang)
    setShowLangMenu(false)
  }

  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">
      {/* Left side - Menu button */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 rounded-md hover:bg-gray-100 flex items-center space-x-2"
          >
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </button>
          
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border py-1 z-50">
              <button
                onClick={toggleLanguage}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
              >
                {language === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-md hover:bg-gray-100 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-50">
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header