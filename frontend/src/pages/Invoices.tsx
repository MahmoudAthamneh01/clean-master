import { useTranslation } from '../store/languageStore'

const Invoices = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t('invoices.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          Billing and invoice management system
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Invoice Management Module</h3>
          <p className="text-muted-foreground">
            This module will contain the complete invoicing system including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Invoice generation and management</li>
            <li>PDF invoice creation</li>
            <li>WhatsApp invoice delivery</li>
            <li>Payment tracking and status</li>
            <li>Tax calculations</li>
            <li>Recurring invoices</li>
            <li>Payment reminders</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Invoices