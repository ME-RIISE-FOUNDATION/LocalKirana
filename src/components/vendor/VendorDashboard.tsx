import { useState } from 'react';
import {
  LayoutDashboard, Package, ShoppingCart, TrendingUp, Settings, Bell,
  LogOut, Plus, Search, Filter, AlertTriangle, IndianRupee, Users, ChevronDown
} from 'lucide-react';
import { Button } from '../../app/components/ui/button';
import { Input } from '../../app/components/ui/input';
import { Badge } from '../../app/components/ui/badge';
import { Card } from '../../app/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { products, orders, analyticsData } from '../../lib/mock-data';
import { useAuth } from '../../lib/auth-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../app/components/ui/table';

type VendorTab = 'dashboard' | 'products' | 'orders' | 'analytics' | 'settings';

export function VendorDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<VendorTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const vendorOrders = orders.filter(o => o.vendorId === 1);
  const vendorProducts = products.filter(p => p.vendor === user?.shopName);

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const stats = [
    { label: 'Today Sales', value: '₹2,500', icon: IndianRupee, change: '+12%', up: true },
    { label: 'Today Orders', value: '45', icon: ShoppingCart, change: '+8%', up: true },
    { label: 'Total Products', value: vendorProducts.length.toString(), icon: Package, change: '+3', up: true },
    { label: 'Low Stock Items', value: '12', icon: AlertTriangle, change: '-2', up: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl text-green-600">{user?.shopName}</h2>
          <p className="text-sm text-gray-600">{user?.name}</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'products', icon: Package, label: 'Products' },
              { id: 'orders', icon: ShoppingCart, label: 'Orders' },
              { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as VendorTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
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
            <p className="text-sm text-gray-600">Manage your store operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-600">Vendor</p>
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
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.up ? 'bg-green-100' : 'bg-orange-100'}`}>
                        <stat.icon className={`w-6 h-6 ${stat.up ? 'text-green-600' : 'text-orange-600'}`} />
                      </div>
                      <Badge variant={stat.up ? 'default' : 'secondary'} className={stat.up ? 'bg-green-100 text-green-700' : ''}>
                        {stat.change}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </Card>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Sales Trend</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={analyticsData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Top Products</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.topProducts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Recent Orders</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
                    View All
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorOrders.slice(0, 5).map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.items} items</TableCell>
                        <TableCell>₹{order.total}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'Delivered' ? 'default' :
                              order.status === 'In Transit' ? 'secondary' :
                              'outline'
                            }
                          >
                            {order.status}
                          </Badge>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vendorProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                        <Badge variant={product.stock > 50 ? 'default' : 'destructive'}>
                          {product.stock} units
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                {['All', 'Pending', 'Processing', 'In Transit', 'Delivered'].map(status => (
                  <Button key={status} variant="outline" size="sm">
                    {status}
                  </Button>
                ))}
              </div>

              <Card className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="max-w-xs truncate">{order.deliveryAddress}</TableCell>
                        <TableCell>{order.items} items</TableCell>
                        <TableCell className="font-semibold">₹{order.total}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.paymentMethod}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'Delivered' ? 'default' :
                              order.status === 'In Transit' ? 'secondary' :
                              'outline'
                            }
                          >
                            {order.status}
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
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Monthly Revenue</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Product Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.topProducts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Key Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">₹125K</p>
                    <p className="text-sm text-gray-600 mt-2">Monthly Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">1,250</p>
                    <p className="text-sm text-gray-600 mt-2">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">4.5★</p>
                    <p className="text-sm text-gray-600 mt-2">Average Rating</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-orange-600">95%</p>
                    <p className="text-sm text-gray-600 mt-2">Customer Satisfaction</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
