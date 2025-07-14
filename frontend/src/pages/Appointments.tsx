import { useTranslation } from '../store/languageStore'

const Appointments = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t('appointments.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage all your appointments and bookings
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Appointments Module</h3>
          <p className="text-muted-foreground">
            This module will contain the full appointment management system including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Appointment listing with filters</li>
            <li>New appointment creation form</li>
            <li>Appointment status updates</li>
            <li>Agent assignment</li>
            <li>Calendar view</li>
            <li>WhatsApp integration for booking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Appointments