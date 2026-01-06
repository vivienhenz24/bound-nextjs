"use client"

export default function ProductsView() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our suite of tools and services designed to help you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product cards will go here */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Product 1</h3>
            <p className="text-muted-foreground mb-4">
              Description of your first product or service
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Product 2</h3>
            <p className="text-muted-foreground mb-4">
              Description of your second product or service
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Product 3</h3>
            <p className="text-muted-foreground mb-4">
              Description of your third product or service
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
