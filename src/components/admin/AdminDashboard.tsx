import { useState } from 'react';
import {
  LayoutDashboard, Users, Store, Package, Truck, Settings, Bell,
  LogOut, TrendingUp, IndianRupee, ShoppingCart, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { Button } from '../../app/components/ui/button';
import { Badge } from '../../app/components/ui/badge';
import { Card } from '../../app/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { vendors, suppliers, deliveryPartners, orders, analyticsData } from '../../lib/mock-data';
import { useAuth } from '../../lib/auth-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../app/components/ui/table';

type AdminTab = 'dashboard' | 'vendors' | 'suppliers' | 'delivery' | 'customers' | 'analytics';

export function AdminDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const stats = [
    { label: 'Total Revenue', value: '₹12.5L', icon: IndianRupee, color: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Total Orders', value: '1,250', icon: ShoppingCart, color: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Active Vendors', value: '85', icon: Store, color: 'bg-purple-100', iconColor: 'text-purple-600' },
    { label: 'Customers', value: '2,450', icon: Users, color: 'bg-orange-100', iconColor: 'text-orange-600' },
  ];

  const orderStatusData = [
    { name: 'Delivered', value: 750, color: '#16a34a' },
    { name: 'In Transit', value: 320, color: '#3b82f6' },
    { name: 'Processing', value: 120, color: '#f59e0b' },
    { name: 'Pending', value: 60, color: '#ef4444' },
  ];

  const recentActivities = [
    { type: 'vendor', message: 'New vendor registration: Fresh Mart', time: '5 min ago', status: 'pending' },
    { type: 'order', message: 'Order #ORD123 completed', time: '12 min ago', status: 'success' },
    { type: 'supplier', message: 'Supplier request from Wholesale Co.', time: '1 hour ago', status: 'pending' },
    { type: 'delivery', message: 'Delivery partner joined: Ravi Kumar', time: '2 hours ago', status: 'success' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl text-green-600">Admin Panel</h2>
          <p className="text-sm text-gray-600">System Control</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'vendors', icon: Store, label: 'Vendors', badge: '5' },
              { id: 'suppliers', icon: Package, label: 'Suppliers' },
              { id: 'delivery', icon: Truck, label: 'Delivery Partners' },
              { id: 'customers', icon: Users, label: 'Customers' },
              { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-red-500 text-white">{item.badge}</Badge>
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
            <p className="text-sm text-gray-600">Manage your entire platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">8</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-600">Administrator</p>
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

              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Revenue Trend (Monthly)</h3>
                  <ResponsiveContainer width="100%" height={250}>
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
                  <h3 className="font-bold text-lg mb-4">Order Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => entry.name}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Recent Activity & Pending Approvals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === 'success' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Pending Approvals</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'Vendor', name: 'Fresh Mart Store', action: 'Registration' },
                      { type: 'Supplier', name: 'Wholesale Foods', action: 'Verification' },
                      { type: 'Vendor', name: 'Green Valley', action: 'Product Upload' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.type} - {item.action}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <XCircle className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Top Vendors */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Top Performing Vendors</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map(vendor => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.owner}</TableCell>
                        <TableCell>{vendor.city}</TableCell>
                        <TableCell>{vendor.totalOrders}</TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1">
                            ⭐ {vendor.rating}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'vendors' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Button variant="outline">All Vendors</Button>
                  <Button variant="outline">Pending Approval (5)</Button>
                  <Button variant="outline">Active</Button>
                  <Button variant="outline">Suspended</Button>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  + Add Vendor
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vendors.map(vendor => (
                  <Card key={vendor.id} className="overflow-hidden">
                    <img src={vendor.image} alt={vendor.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold">{vendor.name}</h3>
                          <p className="text-sm text-gray-600">{vendor.owner}</p>
                        </div>
                        {vendor.verified && (
                          <Badge className="bg-green-100 text-green-700">✓ Verified</Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">{vendor.address}</p>
                        <p className="text-gray-600">{vendor.phone}</p>
                        <div className="flex justify-between pt-2 border-t">
                          <span>{vendor.totalProducts} Products</span>
                          <span>{vendor.totalOrders} Orders</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">View</Button>
                        <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">All Suppliers</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Vendors</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map(supplier => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.productsSupplied}</TableCell>
                      <TableCell>{supplier.totalVendors}</TableCell>
                      <TableCell>⭐ {supplier.rating}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {activeTab === 'delivery' && (
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Delivery Partners</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Total Deliveries</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Earnings (Month)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryPartners.map(partner => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell>{partner.phone}</TableCell>
                      <TableCell>{partner.vehicle}</TableCell>
                      <TableCell>{partner.totalDeliveries}</TableCell>
                      <TableCell>⭐ {partner.rating}</TableCell>
                      <TableCell>₹{partner.earnings.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">{partner.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Revenue Analytics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Platform Growth</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { month: 'Jan', vendors: 45, customers: 850 },
                      { month: 'Feb', vendors: 52, customers: 1120 },
                      { month: 'Mar', vendors: 61, customers: 1450 },
                      { month: 'Apr', vendors: 73, customers: 1890 },
                      { month: 'May', vendors: 85, customers: 2450 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="vendors" stroke="#8b5cf6" strokeWidth={2} />
                      <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
