const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Business intelligence and reporting
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Analytics & Reporting Module</h3>
          <p className="text-muted-foreground">
            This module will contain comprehensive analytics including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Revenue and booking analytics</li>
            <li>Agent performance metrics</li>
            <li>Customer behavior insights</li>
            <li>Service popularity reports</li>
            <li>Geographic performance analysis</li>
            <li>Custom report builder</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Analytics