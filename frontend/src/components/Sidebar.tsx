import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Package, 
  Ticket, 
  DollarSign, 
  Zap, 
  Bot, 
  BarChart3, 
  Settings,
  X
} from 'lucide-react'
import { useTranslation } from '../store/languageStore'
import { cn } from '../utils/cn'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navigation = [
  { name: 'nav.dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'nav.appointments', href: '/appointments', icon: Calendar },
  { name: 'nav.customers', href: '/customers', icon: Users },
  { name: 'nav.invoices', href: '/invoices', icon: FileText },
  { name: 'nav.inventory', href: '/inventory', icon: Package },
  { name: 'nav.tickets', href: '/tickets', icon: Ticket },
  { name: 'nav.pricing_rules', href: '/pricing-rules', icon: DollarSign },
  { name: 'nav.automation_rules', href: '/automation-rules', icon: Zap },
  { name: 'nav.chatbot_builder', href: '/chatbot-builder', icon: Bot },
  { name: 'nav.analytics', href: '/analytics', icon: BarChart3 },
  { name: 'nav.settings', href: '/settings', icon: Settings },
]

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <>
      {/* Sidebar for mobile */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-primary">CleanEase Pro</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'nav-link',
                    isActive && 'active'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t(item.name)}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar