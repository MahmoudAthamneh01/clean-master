const Tickets = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
        <p className="text-muted-foreground mt-2">
          Customer support and issue tracking
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Ticket System Module</h3>
          <p className="text-muted-foreground">
            This module will contain the support ticket system including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Ticket creation and management</li>
            <li>WhatsApp message to ticket conversion</li>
            <li>Agent assignment and tracking</li>
            <li>Priority and category management</li>
            <li>Resolution tracking</li>
            <li>Customer satisfaction feedback</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Tickets