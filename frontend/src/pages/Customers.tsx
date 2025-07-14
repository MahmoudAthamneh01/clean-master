import { useTranslation } from '../store/languageStore'

const Customers = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t('customers.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive customer relationship management
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Customer CRM Module</h3>
          <p className="text-muted-foreground">
            This module will contain the complete customer management system including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Customer database with search and filters</li>
            <li>Customer profiles with history</li>
            <li>Contact preferences (WhatsApp, Phone, Email)</li>
            <li>Customer ratings and feedback</li>
            <li>Booking history and statistics</li>
            <li>Customer segmentation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Customers