'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FiHome, FiSettings, FiUsers, FiFileText, FiLogOut, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  }, [router]);

  const navItems = [
    { name: 'Portfolio', href: '/admin/portfolio', icon: <FiFileText className="w-5 h-5" /> },
    { name: 'Users', href: '/admin/users', icon: <FiUsers className="w-5 h-5" /> },
  ];

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [status, router, isLoginPage]);

  useEffect(() => {
    // Close sidebar when route changes
    setSidebarOpen(false);
  }, [pathname]);

  // Add a class to the body when in admin panel
  useEffect(() => {
    document.body.classList.add('admin-panel');
    return () => {
      document.body.classList.remove('admin-panel');
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0613] to-[#0c0c7a]/10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7784e4]"></div>
      </div>
    );
  }

  // If we're on the login page, just render the children (the login form)
  if (isLoginPage) {
    return <>{children}</>;
  }
  
  // If there's no session and we're not on the login page, don't show anything
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0613] to-[#0c0c7a]/10">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-[#0a0613] text-white z-30 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-[#1a1a2e]">
            <Link href="/admin" className="text-2xl font-bold gradient-text">
              Revoult Studio
            </Link>
            <button 
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-[#1a1a2e] text-white'
                    : 'text-[#b8c5ff] hover:bg-[#1a1a2e] hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-[#1a1a2e]">
            <div className="relative">
              <button
                className="flex items-center w-full p-2 rounded-lg hover:bg-[#1a1a2e] transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-[#1a1a2e] flex items-center justify-center text-sm font-medium">
                  {session.user?.name?.[0] || 'A'}
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-white">{session.user?.name || 'Admin'}</p>
                  <p className="text-xs text-[#b8c5ff]">Administrator</p>
                </div>
                <FiChevronDown className={`ml-auto transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0a0613] rounded-lg shadow-lg border border-[#1a1a2e] overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-left text-[#b8c5ff] hover:bg-[#1a1a2e] hover:text-white"
                  >
                    <FiLogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <header className="bg-[#0a0613] border-b border-[#1a1a2e] sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden text-white p-2 rounded-md hover:bg-[#1a1a2e]"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 flex justify-between items-center">
              <h1 className="text-xl font-bold text-white ml-4 lg:ml-0">
                {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h1>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#7784e4] hover:bg-[#5f6bc9] transition-colors"
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <div className="bg-[#0a0613] bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 border border-[#1a1a2e] shadow-lg">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
