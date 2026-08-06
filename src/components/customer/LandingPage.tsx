import { ShoppingCart, MapPin, Clock, Star, Search, Package, Truck, Shield } from 'lucide-react';
import { Button } from '../../app/components/ui/button';
import { Input } from '../../app/components/ui/input';
import { products, vendors } from '../../lib/mock-data';
import { useCart } from '../../lib/cart-context';
import { useState } from 'react';

export function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { addToCart, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-600">Local Kirana Connect</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('stores')}>Stores</Button>
              <Button variant="ghost" onClick={() => onNavigate('login')}>Login</Button>
              <Button onClick={() => onNavigate('cart')} className="relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-4">Your Local Kirana,<br />Now Online</h2>
            <p className="text-xl mb-8 text-green-50">
              Order groceries from your neighborhood stores. Fresh products delivered to your doorstep in minutes.
            </p>
            <div className="flex items-center gap-2 bg-white rounded-lg p-2">
              <MapPin className="w-5 h-5 text-gray-400 ml-2" />
              <Input
                placeholder="Enter your delivery location..."
                className="border-0 focus-visible:ring-0"
              />
              <Button className="bg-green-600 hover:bg-green-700">Search Stores</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Package, title: "Wide Selection", desc: "1000+ products from local stores" },
              { icon: Truck, title: "Fast Delivery", desc: "Delivered in 15-30 minutes" },
              { icon: Shield, title: "Safe & Secure", desc: "100% secure payments" },
              { icon: Star, title: "Best Quality", desc: "Fresh and quality guaranteed" }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6">
                <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Stores */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Stores Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendors.map(vendor => (
              <div key={vendor.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <img src={vendor.image} alt={vendor.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{vendor.name}</h3>
                    {vendor.verified && <span className="text-green-600 text-xs">✓ Verified</span>}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{vendor.address}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {vendor.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {vendor.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {vendor.deliveryTime}
                    </span>
                  </div>
                  <Button className="w-full" onClick={() => onNavigate('products')}>
                    View Products
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular Products</h2>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-80">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="border-0 bg-transparent focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white border rounded-lg hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.vendor}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500">{product.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.stock} in stock)</span>
                  </div>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      vendor: product.vendor,
                      unit: product.unit
                    })}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Local Kirana Connect</h3>
              <p className="text-gray-400 text-sm">Connecting local stores with customers for a better shopping experience.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Business</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Register as Vendor</li>
                <li>Become a Supplier</li>
                <li>Delivery Partner</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 Local Kirana Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
