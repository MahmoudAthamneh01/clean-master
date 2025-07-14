const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground mt-2">
          Application configuration and preferences
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Settings & Configuration</h3>
          <p className="text-muted-foreground">
            This module will contain system settings including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>WhatsApp API configuration</li>
            <li>Email and SMS settings</li>
            <li>Company information and branding</li>
            <li>User roles and permissions</li>
            <li>Language and localization</li>
            <li>Integration settings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings