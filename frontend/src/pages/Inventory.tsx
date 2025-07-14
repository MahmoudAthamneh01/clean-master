const Inventory = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
        <p className="text-muted-foreground mt-2">
          Stock and supply management system
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Inventory Module</h3>
          <p className="text-muted-foreground">
            This module will contain the inventory management system including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Product and supply tracking</li>
            <li>Stock level monitoring</li>
            <li>Low stock alerts</li>
            <li>Supplier management</li>
            <li>Cost tracking</li>
            <li>Expiry date monitoring</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Inventory