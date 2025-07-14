import { useEffect, useState } from 'react'
import { Calendar, Users, DollarSign, AlertTriangle, MessageSquare, Package, FileText } from 'lucide-react'
import { useTranslation } from '../store/languageStore'
import { DashboardStats } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'

// Mock data for demonstration
const mockStats: DashboardStats = {
  total_appointments_today: 12,
  total_appointments_upcoming: 28,
  total_revenue_month: 15750,
  total_customers: 245,
  pending_tickets: 3,
  unread_messages: 7,
  low_stock_items: 2,
  overdue_invoices: 1,
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary',
  trend,
}: {
  title: string
  value: string | number
  icon: any
  color?: 'primary' | 'success' | 'warning' | 'danger'
  trend?: { value: number; isPositive: boolean }
}) => {
  const colorClasses = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
  }

  return (
    <div className="card">
      <div className="card-content p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <p className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStats(mockStats)
      setIsLoading(false)
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t('dashboard.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('dashboard.welcome')}, CleanEase Pro
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.total_appointments_today')}
          value={stats?.total_appointments_today || 0}
          icon={Calendar}
          color="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.upcoming_appointments')}
          value={stats?.total_appointments_upcoming || 0}
          icon={Calendar}
          color="success"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.total_revenue_month')}
          value={`${stats?.total_revenue_month?.toLocaleString() || 0} SAR`}
          icon={DollarSign}
          color="success"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.total_customers')}
          value={stats?.total_customers || 0}
          icon={Users}
          color="primary"
          trend={{ value: 6, isPositive: true }}
        />
      </div>

      {/* Additional stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.pending_tickets')}
          value={stats?.pending_tickets || 0}
          icon={AlertTriangle}
          color="warning"
        />
        <StatCard
          title={t('dashboard.unread_messages')}
          value={stats?.unread_messages || 0}
          icon={MessageSquare}
          color="primary"
        />
        <StatCard
          title="Low Stock Items"
          value={stats?.low_stock_items || 0}
          icon={Package}
          color="warning"
        />
        <StatCard
          title="Overdue Invoices"
          value={stats?.overdue_invoices || 0}
          icon={FileText}
          color="danger"
        />
      </div>

      {/* Recent activity section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent appointments */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Apartment Cleaning</p>
                    <p className="text-sm text-muted-foreground">Ahmed Al-Rashid</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">2:00 PM</p>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent messages */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Recent WhatsApp Messages</h3>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">+966 50 123 4567</p>
                    <p className="text-sm text-muted-foreground">
                      "I need to reschedule my appointment for tomorrow..."
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard