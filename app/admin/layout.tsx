'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FiHome, FiSettings, FiUsers, FiFileText, FiLogOut, FiMenu, FiX, FiChevronDown, FiUser } from 'react-icons/fi';
import Image from 'next/image';
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0613] to-[#0c0c7a]/10 flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 z-30 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
        style={{ height: '100vh' }}
      >
        <div className="flex-1 flex flex-col bg-[#0a0613] text-white overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-[#1a1a2e]">
            <Link href="/admin" className="flex items-center h-full">
              <Image 
                src="/HorizontalLogo.png" 
                alt="Revoult Studio" 
                width={150}
                height={40}
                className="object-contain h-full w-auto py-2"
                priority
              />
            </Link>
            <button 
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-[#1a1a2e] text-white'
                    : 'text-gray-300 hover:bg-[#1a1a2e]'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User dropdown */}
          <div className="p-4 border-t border-[#1a1a2e] relative">
            <button
              className="flex items-center w-full p-2 rounded-lg hover:bg-[#1a1a2e] transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-[#1a1a2e] flex items-center justify-center">
                <FiUser className="w-4 h-4" />
              </div>
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-white">
                  {session?.user?.name || 'Administrator'}
                </p>
              </div>
              <FiChevronDown 
                className={`ml-auto w-5 h-5 text-gray-400 transition-transform ${
                  dropdownOpen ? 'transform rotate-180' : ''
                }`} 
              />
            </button>

            {dropdownOpen && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#0a0613] rounded-lg shadow-lg border border-[#1a1a2e] overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-left text-red-400 hover:bg-[#1a1a2e] transition-colors"
                >
                  <FiLogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
          
          {/* Footer with Logo */}
          <div className="p-4 border-t border-[#1a1a2e] text-center">
            <div className="flex justify-center">
              <Image 
                src="/HorizontalLogo.png" 
                alt="Revoult Studio" 
                width={120}
                height={32}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} Revoult Studio</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64 overflow-y-auto h-screen">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-[#0a0613] border-b border-[#1a1a2e] lg:hidden">
          <button
            className="p-2 text-gray-400 rounded-md hover:bg-[#1a1a2e] hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-medium text-white">
            {navItems.find((item) => item.href === pathname)?.name || 'Dashboard'}
          </h1>
          <div className="w-6"></div> {/* For alignment */}
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="bg-[#0a0613] bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 border border-[#1a1a2e] shadow-lg">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
