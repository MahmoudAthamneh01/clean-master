const AutomationRules = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Automation Rules</h1>
        <p className="text-muted-foreground mt-2">
          Workflow automation and business logic
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Automation Engine Module</h3>
          <p className="text-muted-foreground">
            This module will contain the automation system including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Trigger-based automation rules</li>
            <li>WhatsApp message automation</li>
            <li>Email and SMS notifications</li>
            <li>Appointment reminders</li>
            <li>Follow-up sequences</li>
            <li>Custom workflow builder</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AutomationRules