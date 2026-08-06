import { useState } from 'react';
import { AuthProvider } from '../lib/auth-context';
import { CartProvider } from '../lib/cart-context';
import { LandingPage } from '../components/customer/LandingPage';
import { LoginPage } from '../components/auth/LoginPage';
import { VendorDashboard } from '../components/vendor/VendorDashboard';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { SupplierDashboard } from '../components/supplier/SupplierDashboard';
import { DeliveryDashboard } from '../components/delivery/DeliveryDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'vendor-dashboard':
        return <VendorDashboard onNavigate={setCurrentPage} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case 'supplier-dashboard':
        return <SupplierDashboard onNavigate={setCurrentPage} />;
      case 'delivery-dashboard':
        return <DeliveryDashboard onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="size-full">
          {renderPage()}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}