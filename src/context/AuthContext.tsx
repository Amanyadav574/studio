
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd verify a token here
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userToStore } = user;
      setCurrentUser(userToStore);
      sessionStorage.setItem('currentUser', JSON.stringify(userToStore));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid email or password.",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    router.push('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
