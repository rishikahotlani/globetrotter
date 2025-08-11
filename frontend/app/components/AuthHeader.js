'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUser, clearAuth } from '../lib/auth';

export default function AuthHeader() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    window.location.href = '/';
  };

  if (!mounted) {
    return (
      <header className="bg-white shadow-sm border-b border-[#FFEEA9] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌍</span>
              <span className="font-bold text-xl text-[#FF7D29]">GlobalTrotter</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-[#FFEEA9] rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-[#FFBF78] rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-[#FFEEA9] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌍</span>
            <span className="font-bold text-xl text-[#FF7D29]">GlobalTrotter</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/cities" className="text-[#FF7D29] hover:text-[#FFBF78] font-medium transition-colors">
              Discover Cities
            </Link>
            <Link href="/activities" className="text-[#FF7D29] hover:text-[#FFBF78] font-medium transition-colors">
              Find Activities
            </Link>
            <Link href="/trips" className="text-[#FF7D29] hover:text-[#FFBF78] font-medium transition-colors">
              My Trips
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-[#FF7D29] font-medium">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-[#FFBF78] hover:text-[#FF7D29] font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-[#FF7D29] hover:text-[#FFBF78] font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="bg-[#FF7D29] text-[#FEFFD2] px-4 py-2 rounded-lg hover:bg-[#FFBF78] transition-colors font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
