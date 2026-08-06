import { useState } from 'react';
import { ShoppingCart, User, Store, Package, Truck, Shield } from 'lucide-react';
import { Button } from '../../app/components/ui/button';
import { Input } from '../../app/components/ui/input';
import { Label } from '../../app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../app/components/ui/tabs';
import { useAuth, UserRole } from '../../lib/auth-context';

export function LoginPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role: UserRole) => {
    login(email, password, role);

    // Navigate to appropriate dashboard
    const dashboards: Record<UserRole, string> = {
      customer: 'home',
      vendor: 'vendor-dashboard',
      supplier: 'supplier-dashboard',
      delivery: 'delivery-dashboard',
      admin: 'admin-dashboard'
    };
    onNavigate(dashboards[role]);
  };

  const roleInfo: Record<UserRole, { icon: any; title: string; desc: string; demo: string }> = {
    customer: {
      icon: User,
      title: 'Customer Login',
      desc: 'Order groceries from local stores',
      demo: 'Demo: customer@example.com / password'
    },
    vendor: {
      icon: Store,
      title: 'Vendor Login',
      desc: 'Manage your kirana store',
      demo: 'Demo: vendor@example.com / password'
    },
    supplier: {
      icon: Package,
      title: 'Supplier Login',
      desc: 'Supply products to vendors',
      demo: 'Demo: supplier@example.com / password'
    },
    delivery: {
      icon: Truck,
      title: 'Delivery Partner',
      desc: 'Manage your deliveries',
      demo: 'Demo: delivery@example.com / password'
    },
    admin: {
      icon: Shield,
      title: 'Admin Login',
      desc: 'System administration',
      demo: 'Demo: admin@example.com / password'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Branding */}
          <div className="bg-gradient-to-br from-green-600 to-green-500 p-12 text-white flex flex-col justify-center">
            <div className="mb-8">
              <ShoppingCart className="w-16 h-16 mb-4" />
              <h1 className="text-4xl font-bold mb-4">Local Kirana Connect</h1>
              <p className="text-green-50 text-lg">
                Empowering local businesses with digital solutions
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">For Customers</h3>
                  <p className="text-sm text-green-50">Order from nearby stores, delivered fast</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">For Vendors</h3>
                  <p className="text-sm text-green-50">Grow your business online</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">For Suppliers</h3>
                  <p className="text-sm text-green-50">Connect with multiple vendors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-12">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => onNavigate('home')}
            >
              ← Back to Home
            </Button>

            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="customer">
                  <User className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="vendor">
                  <Store className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="supplier">
                  <Package className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="delivery">
                  <Truck className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <Shield className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>

              {(['customer', 'vendor', 'supplier', 'delivery', 'admin'] as UserRole[]).map(role => {
                const info = roleInfo[role];
                const Icon = info.icon;
                return (
                  <TabsContent key={role} value={role} className="space-y-4">
                    <div className="text-center mb-6">
                      <Icon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h2 className="text-2xl font-bold text-gray-900">{info.title}</h2>
                      <p className="text-gray-600 mt-1">{info.desc}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`${role}-email`}>Email</Label>
                        <Input
                          id={`${role}-email`}
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${role}-password`}>Password</Label>
                        <Input
                          id={`${role}-password`}
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">{info.demo}</p>
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleLogin(role)}
                      >
                        Sign In
                      </Button>

                      <div className="text-center text-sm text-gray-600">
                        Don't have an account? <button className="text-green-600 font-semibold">Sign Up</button>
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
