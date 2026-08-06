import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'customer' | 'vendor' | 'supplier' | 'delivery' | 'admin';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  shopName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login - in real app, this would call an API
    const mockUsers: Record<UserRole, User> = {
      customer: {
        id: 1,
        name: "Priya Singh",
        email: "priya@example.com",
        role: "customer",
        phone: "+91 98765 43200"
      },
      vendor: {
        id: 1,
        name: "Rajesh Sharma",
        email: "rajesh@example.com",
        role: "vendor",
        phone: "+91 98765 43210",
        shopName: "Sharma Kirana Store"
      },
      supplier: {
        id: 1,
        name: "Vikram Malhotra",
        email: "vikram@example.com",
        role: "supplier",
        phone: "+91 98765 43220"
      },
      delivery: {
        id: 1,
        name: "Ravi Kumar",
        email: "ravi@example.com",
        role: "delivery",
        phone: "+91 98765 43230"
      },
      admin: {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        phone: "+91 98765 43240"
      }
    };

    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
