'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiSave, FiLock } from 'react-icons/fi';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      
      try {
        const res = await fetch(`/api/admin/users/${userId}`);
        if (res.ok) {
          const userData = await res.json();
          setFormData(prev => ({
            ...prev,
            email: userData.email,
            password: ''
          }));
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to load user data');
        router.push('/admin/users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Only include password if it's not empty
          ...(formData.password ? { password: formData.password } : {})
        }),
      });

      if (res.ok) {
        toast.success('User updated successfully');
        router.push('/admin/users');
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7784e4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-[#1a1a2e] hover:bg-[#24243e] transition-colors"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-white">Change Password</h1>
      </div>

      <div className="bg-[#0a0613] bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 border border-[#1a1a2e] shadow-xl max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-[#1a1a2e] bg-opacity-30 rounded-lg">
            <p className="text-sm text-[#b8c5ff] mb-1">Email</p>
            <p className="text-white font-medium">{formData.email}</p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#b8c5ff] mb-1">
              New Password (leave blank to keep current)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-[#7784e4]" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 bg-[#0a0613] border border-[#1a1a2e] rounded-lg text-white placeholder-[#4a4a6a] focus:outline-none focus:ring-2 focus:ring-[#7784e4] focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/admin/users')}
              className="px-4 py-2 border border-[#1a1a2e] rounded-lg text-white hover:bg-[#1a1a2e] transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-4 py-2 rounded-lg text-white bg-[#7784e4] hover:bg-[#5f6bc9] transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
