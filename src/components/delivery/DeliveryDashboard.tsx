import { useState } from 'react';
import {
  LayoutDashboard, Package, MapPin, IndianRupee, TrendingUp,
  Bell, LogOut, CheckCircle, Navigation, Clock
} from 'lucide-react';
import { Button } from '../../app/components/ui/button';
import { Badge } from '../../app/components/ui/badge';
import { Card } from '../../app/components/ui/card';
import { useAuth } from '../../lib/auth-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../app/components/ui/table';

type DeliveryTab = 'dashboard' | 'active' | 'completed' | 'earnings';

export function DeliveryDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DeliveryTab>('dashboard');

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const stats = [
    { label: 'Today Deliveries', value: '8', icon: Package, color: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Today Earnings', value: '₹640', icon: IndianRupee, color: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'This Month', value: '125', icon: TrendingUp, color: 'bg-purple-100', iconColor: 'text-purple-600' },
    { label: 'Rating', value: '4.7★', icon: CheckCircle, color: 'bg-orange-100', iconColor: 'text-orange-600' },
  ];

  const activeDeliveries = [
    {
      id: '#ORD002',
      customer: 'Rahul Gupta',
      address: 'B-205, Blue Heights, Delhi',
      amount: 280,
      distance: '2.5 km',
      otp: '4567',
      status: 'Picked Up'
    },
    {
      id: '#ORD004',
      customer: 'Priya Singh',
      address: 'A-101, Green Apartments, Delhi',
      amount: 150,
      distance: '1.2 km',
      otp: '8923',
      status: 'Assigned'
    },
  ];

  const completedDeliveries = [
    { id: '#ORD001', customer: 'Priya Singh', amount: 425, earnings: 35, time: '10:30 AM' },
    { id: '#ORD005', customer: 'Amit Kumar', amount: 320, earnings: 30, time: '11:45 AM' },
    { id: '#ORD008', customer: 'Neha Sharma', amount: 580, earnings: 45, time: '02:15 PM' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl text-green-600">Delivery Panel</h2>
          <p className="text-sm text-gray-600">{user?.name}</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'active', icon: Package, label: 'Active Deliveries', badge: '2' },
              { id: 'completed', icon: CheckCircle, label: 'Completed' },
              { id: 'earnings', icon: IndianRupee, label: 'Earnings' },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as DeliveryTab)}
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
            <p className="text-sm text-gray-600">Manage your deliveries</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-600">Delivery Partner</p>
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

              {/* Active Deliveries */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Active Deliveries</h3>
                <div className="space-y-4">
                  {activeDeliveries.map(delivery => (
                    <div key={delivery.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{delivery.id}</h4>
                            <Badge variant={delivery.status === 'Picked Up' ? 'default' : 'secondary'}>
                              {delivery.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{delivery.customer}</p>
                        </div>
                        <span className="text-lg font-bold text-green-600">₹{delivery.amount}</span>
                      </div>
                      <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{delivery.address}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Navigation className="w-4 h-4" />
                            {delivery.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            OTP: <span className="font-bold text-green-600">{delivery.otp}</span>
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {delivery.status === 'Assigned' && (
                            <Button size="sm" className="bg-green-600">Pick Up Order</Button>
                          )}
                          {delivery.status === 'Picked Up' && (
                            <Button size="sm" className="bg-green-600">Complete Delivery</Button>
                          )}
                          <Button size="sm" variant="outline">Navigate</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Today's Completed */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Completed Today</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Earnings</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedDeliveries.map(delivery => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.customer}</TableCell>
                        <TableCell>₹{delivery.amount}</TableCell>
                        <TableCell className="font-semibold text-green-600">₹{delivery.earnings}</TableCell>
                        <TableCell>{delivery.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="space-y-4">
              {activeDeliveries.map(delivery => (
                <Card key={delivery.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">{delivery.id}</h4>
                        <Badge variant={delivery.status === 'Picked Up' ? 'default' : 'secondary'}>
                          {delivery.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{delivery.customer}</p>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{delivery.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Order Amount</p>
                      <p className="text-2xl font-bold text-green-600">₹{delivery.amount}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Distance</p>
                      <p className="font-semibold">{delivery.distance}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Delivery OTP</p>
                      <p className="font-semibold text-green-600 text-lg">{delivery.otp}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {delivery.status === 'Assigned' && (
                      <Button className="flex-1 bg-green-600">
                        <Package className="w-4 h-4 mr-2" />
                        Pick Up Order
                      </Button>
                    )}
                    {delivery.status === 'Picked Up' && (
                      <Button className="flex-1 bg-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Delivery
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      Navigate
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-sm text-gray-600 mb-2">Today's Earnings</h3>
                  <p className="text-3xl font-bold text-green-600">₹640</p>
                  <p className="text-sm text-gray-500 mt-1">8 deliveries</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-sm text-gray-600 mb-2">This Week</h3>
                  <p className="text-3xl font-bold text-blue-600">₹3,850</p>
                  <p className="text-sm text-gray-500 mt-1">42 deliveries</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-sm text-gray-600 mb-2">This Month</h3>
                  <p className="text-3xl font-bold text-purple-600">₹15,000</p>
                  <p className="text-sm text-gray-500 mt-1">125 deliveries</p>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Earnings History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Deliveries</TableHead>
                      <TableHead>Total Distance</TableHead>
                      <TableHead>Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { date: '23 May 2026', deliveries: 8, distance: '18.5 km', earnings: 640 },
                      { date: '22 May 2026', deliveries: 12, distance: '25.2 km', earnings: 920 },
                      { date: '21 May 2026', deliveries: 9, distance: '20.1 km', earnings: 710 },
                      { date: '20 May 2026', deliveries: 10, distance: '22.8 km', earnings: 780 },
                    ].map((day, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{day.date}</TableCell>
                        <TableCell>{day.deliveries} orders</TableCell>
                        <TableCell>{day.distance}</TableCell>
                        <TableCell className="font-semibold text-green-600">₹{day.earnings}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
