// Mock data for Local Kirana Connect

export const categories = [
  { id: 1, name: "Groceries", icon: "🛒" },
  { id: 2, name: "Vegetables", icon: "🥕" },
  { id: 3, name: "Fruits", icon: "🍎" },
  { id: 4, name: "Dairy", icon: "🥛" },
  { id: 5, name: "Beverages", icon: "☕" },
  { id: 6, name: "Snacks", icon: "🍿" },
];

export const products = [
  {
    id: 1,
    name: "Tata Salt",
    category: "Groceries",
    price: 25,
    stock: 150,
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400",
    vendor: "Sharma Kirana Store",
    rating: 4.5,
    unit: "1kg"
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 40,
    stock: 50,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
    vendor: "Green Valley Store",
    rating: 4.2,
    unit: "1kg"
  },
  {
    id: 3,
    name: "Amul Milk",
    category: "Dairy",
    price: 28,
    stock: 200,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    vendor: "Sharma Kirana Store",
    rating: 4.8,
    unit: "500ml"
  },
  {
    id: 4,
    name: "Red Apples",
    category: "Fruits",
    price: 120,
    stock: 75,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
    vendor: "Green Valley Store",
    rating: 4.6,
    unit: "1kg"
  },
  {
    id: 5,
    name: "Britannia Biscuits",
    category: "Snacks",
    price: 15,
    stock: 300,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    vendor: "Modern Kirana",
    rating: 4.4,
    unit: "100g"
  },
  {
    id: 6,
    name: "Tea Powder",
    category: "Beverages",
    price: 180,
    stock: 100,
    image: "https://images.unsplash.com/photo-1594631661960-6eb4d4344f9f?w=400",
    vendor: "Sharma Kirana Store",
    rating: 4.7,
    unit: "500g"
  },
];

export const vendors = [
  {
    id: 1,
    name: "Sharma Kirana Store",
    owner: "Rajesh Sharma",
    address: "123, Main Market, Sector 15",
    city: "Delhi",
    phone: "+91 98765 43210",
    rating: 4.5,
    distance: "0.5 km",
    verified: true,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
    deliveryTime: "15-20 min",
    totalProducts: 450,
    totalOrders: 1250
  },
  {
    id: 2,
    name: "Green Valley Store",
    owner: "Amit Kumar",
    address: "456, Green Park Extension",
    city: "Delhi",
    phone: "+91 98765 43211",
    rating: 4.3,
    distance: "1.2 km",
    verified: true,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400",
    deliveryTime: "20-25 min",
    totalProducts: 320,
    totalOrders: 890
  },
  {
    id: 3,
    name: "Modern Kirana",
    owner: "Sunita Verma",
    address: "789, Shopping Complex, Phase 2",
    city: "Gurgaon",
    phone: "+91 98765 43212",
    rating: 4.7,
    distance: "2.0 km",
    verified: true,
    image: "https://images.unsplash.com/photo-1583988388961-59e85e1d3c98?w=400",
    deliveryTime: "25-30 min",
    totalProducts: 580,
    totalOrders: 2100
  },
];

export const orders = [
  {
    id: "#ORD001",
    customerId: 1,
    customerName: "Priya Singh",
    vendor: "Sharma Kirana Store",
    vendorId: 1,
    items: 5,
    total: 425,
    status: "Delivered",
    date: "2026-05-20",
    paymentMethod: "Online",
    deliveryAddress: "A-101, Green Apartments, Delhi"
  },
  {
    id: "#ORD002",
    customerId: 2,
    customerName: "Rahul Gupta",
    vendor: "Green Valley Store",
    vendorId: 2,
    items: 3,
    total: 280,
    status: "In Transit",
    date: "2026-05-23",
    paymentMethod: "COD",
    deliveryAddress: "B-205, Blue Heights, Delhi"
  },
  {
    id: "#ORD003",
    customerId: 3,
    customerName: "Anjali Mehta",
    vendor: "Modern Kirana",
    vendorId: 3,
    items: 8,
    total: 680,
    status: "Processing",
    date: "2026-05-23",
    paymentMethod: "Online",
    deliveryAddress: "C-45, Park View, Gurgaon"
  },
  {
    id: "#ORD004",
    customerId: 1,
    customerName: "Priya Singh",
    vendor: "Sharma Kirana Store",
    vendorId: 1,
    items: 2,
    total: 150,
    status: "Pending",
    date: "2026-05-23",
    paymentMethod: "Online",
    deliveryAddress: "A-101, Green Apartments, Delhi"
  },
];

export const suppliers = [
  {
    id: 1,
    name: "Wholesale Foods India",
    contact: "Vikram Malhotra",
    phone: "+91 98765 43220",
    email: "contact@wholesalefoods.com",
    productsSupplied: 250,
    totalVendors: 45,
    rating: 4.6,
    verified: true
  },
  {
    id: 2,
    name: "Fresh Farm Suppliers",
    contact: "Neha Kapoor",
    phone: "+91 98765 43221",
    email: "info@freshfarm.com",
    productsSupplied: 180,
    totalVendors: 32,
    rating: 4.4,
    verified: true
  },
];

export const deliveryPartners = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "+91 98765 43230",
    vehicle: "Bike",
    totalDeliveries: 450,
    rating: 4.7,
    status: "Active",
    earnings: 15000
  },
  {
    id: 2,
    name: "Suresh Yadav",
    phone: "+91 98765 43231",
    vehicle: "Scooter",
    totalDeliveries: 380,
    rating: 4.5,
    status: "Active",
    earnings: 12500
  },
];

export const notifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #ORD004 has been placed",
    time: "5 min ago",
    read: false,
    type: "order"
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "Fresh Tomatoes stock below 10 units",
    time: "1 hour ago",
    read: false,
    type: "alert"
  },
  {
    id: 3,
    title: "Payment Received",
    message: "₹425 received for Order #ORD001",
    time: "2 hours ago",
    read: true,
    type: "payment"
  },
];

export const analyticsData = {
  todaySales: 2500,
  todayOrders: 45,
  totalCustomers: 1250,
  totalVendors: 85,
  totalSuppliers: 12,
  totalDeliveryPartners: 25,
  monthlyRevenue: 125000,
  pendingApprovals: 5,
  activeOrders: 32,
  completedOrders: 1180,
  salesData: [
    { month: "Jan", sales: 45000 },
    { month: "Feb", sales: 52000 },
    { month: "Mar", sales: 48000 },
    { month: "Apr", sales: 61000 },
    { month: "May", sales: 55000 },
  ],
  topProducts: [
    { name: "Tata Salt", sales: 450 },
    { name: "Amul Milk", sales: 380 },
    { name: "Tea Powder", sales: 320 },
    { name: "Rice", sales: 290 },
  ]
};
