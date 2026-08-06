import { useState } from 'react';
import {
  LayoutDashboard, Package, ShoppingCart, TrendingUp, Settings,
  Bell, LogOut, Plus, CheckCircle, XCircle, Truck
} from 'lucide-react';
import { Button } from '../../app/components/ui/button';
import { Badge } from '../../app/components/ui/badge';
import { Card } from '../../app/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../lib/auth-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../app/components/ui/table';

type SupplierTab = 'dashboard' | 'products' | 'orders' | 'vendors';

export function SupplierDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SupplierTab>('dashboard');

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const stats = [
    { label: 'Total Vendors', value: '45', icon: ShoppingCart, color: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Products Supply', value: '250', icon: Package, color: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Pending Orders', value: '12', icon: Truck, color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { label: 'Monthly Revenue', value: '₹8.5L', icon: TrendingUp, color: 'bg-purple-100', iconColor: 'text-purple-600' },
  ];

  const vendorRequests = [
    { id: 1, vendor: 'Sharma Kirana', product: 'Tata Salt - 1kg', quantity: 100, amount: 2500, status: 'Pending' },
    { id: 2, vendor: 'Green Valley Store', product: 'Rice - 5kg', quantity: 50, amount: 4500, status: 'Pending' },
    { id: 3, vendor: 'Modern Kirana', product: 'Sugar - 1kg', quantity: 80, amount: 3200, status: 'Approved' },
  ];

  const supplyData = [
    { month: 'Jan', supply: 45000 },
    { month: 'Feb', supply: 52000 },
    { month: 'Mar', supply: 48000 },
    { month: 'Apr', supply: 61000 },
    { month: 'May', supply: 55000 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl text-green-600">Supplier Panel</h2>
          <p className="text-sm text-gray-600">{user?.name}</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'products', icon: Package, label: 'Products' },
              { id: 'orders', icon: ShoppingCart, label: 'Orders', badge: '12' },
              { id: 'vendors', icon: TrendingUp, label: 'Vendors' },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as SupplierTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-orange-500">{item.badge}</Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-sm text-gray-600">Manage your supply operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-600">Supplier</p>
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mt-4 mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </Card>
                ))}
              </div>

              {/* Chart */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Supply Trend (Monthly)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={supplyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="supply" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Vendor Requests */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Recent Vendor Requests</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
                    View All
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.vendor}</TableCell>
                        <TableCell>{request.product}</TableCell>
                        <TableCell>{request.quantity} units</TableCell>
                        <TableCell>₹{request.amount}</TableCell>
                        <TableCell>
                          <Badge variant={request.status === 'Approved' ? 'default' : 'secondary'}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === 'Pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8">
                                <XCircle className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Your Products Catalog</h3>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { name: 'Tata Salt', category: 'Groceries', price: 22, stock: 5000 },
                  { name: 'Rice (Basmati)', category: 'Grains', price: 85, stock: 3000 },
                  { name: 'Sugar', category: 'Groceries', price: 38, stock: 4500 },
                  { name: 'Cooking Oil', category: 'Edible Oils', price: 160, stock: 2000 },
                  { name: 'Wheat Flour', category: 'Flour', price: 35, stock: 6000 },
                  { name: 'Pulses', category: 'Grains', price: 95, stock: 2500 },
                ].map((product, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">{product.stock} units</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-green-600">₹{product.price}/unit</span>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <Card className="p-6">
              <div className="flex gap-4 mb-6">
                {['All', 'Pending', 'Approved', 'In Transit', 'Delivered'].map(status => (
                  <Button key={status} variant="outline" size="sm">
                    {status}
                  </Button>
                ))}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...vendorRequests, ...vendorRequests].map((request, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">#SUP00{idx + 1}</TableCell>
                      <TableCell>{request.vendor}</TableCell>
                      <TableCell>{request.product}</TableCell>
                      <TableCell>{request.quantity} units</TableCell>
                      <TableCell className="font-semibold">₹{request.amount}</TableCell>
                      <TableCell>2026-05-{20 + (idx % 3)}</TableCell>
                      <TableCell>
                        <Badge variant={request.status === 'Approved' ? 'default' : 'secondary'}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {activeTab === 'vendors' && (
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Connected Vendors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Sharma Kirana Store', orders: 45, totalAmount: 125000, status: 'Active' },
                  { name: 'Green Valley Store', orders: 32, totalAmount: 89000, status: 'Active' },
                  { name: 'Modern Kirana', orders: 58, totalAmount: 156000, status: 'Active' },
                  { name: 'Fresh Mart', orders: 28, totalAmount: 72000, status: 'Active' },
                  { name: 'City Grocery', orders: 41, totalAmount: 98000, status: 'Active' },
                ].map((vendor, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold">{vendor.name}</h3>
                        <p className="text-sm text-gray-600">{vendor.orders} orders</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">{vendor.status}</Badge>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">Total Business</p>
                      <p className="text-xl font-bold text-green-600">₹{vendor.totalAmount.toLocaleString()}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
