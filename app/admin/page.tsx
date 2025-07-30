'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the portfolio page
    router.push('/admin/portfolio');
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0613]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7784e4] mx-auto mb-4"></div>
        <p className="text-[#b8c5ff]">Redirecting to portfolio...</p>
      </div>
    </div>
  );
}
