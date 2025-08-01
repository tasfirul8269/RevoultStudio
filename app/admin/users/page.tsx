'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2, FiUser, FiUserX, FiUserCheck } from 'react-icons/fi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface User {
  _id: string;
  email: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from /api/admin/list-users');
        const res = await fetch('/api/admin/list-users');
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          const errorData = await res.text();
          console.error('Error response:', errorData);
          throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('Users data received:', data);
        setUsers(data);
      } catch (error: any) {
        console.error('Error fetching users:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`Failed to load users: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (isDeleting) return;
    
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      buttons: [
        {
          label: 'Delete',
          className: 'bg-red-500 text-white px-4 py-2 rounded mr-2',
          onClick: async () => {
            try {
              setIsDeleting(userId);
              const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
              });

              if (res.ok) {
                setUsers(users.filter(user => user._id !== userId));
                toast.success('User deleted successfully');
              } else {
                throw new Error('Failed to delete user');
              }
            } catch (error) {
              console.error('Error deleting user:', error);
              toast.error('Failed to delete user');
            } finally {
              setIsDeleting(null);
            }
          }
        },
        {
          label: 'Cancel',
          className: 'bg-gray-500 text-white px-4 py-2 rounded',
          onClick: () => {}
        }
      ]
    });
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-[#b8c5ff]">
            Manage user accounts and permissions
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/users/add')}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-[#1a1a2e] rounded-lg text-sm font-medium text-white bg-[#1a1a2e] hover:bg-[#24243d] transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add New User
        </button>
      </div>

      <div className="bg-[#0a0613] bg-opacity-50 border border-[#1a1a2e] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#1a1a2e]">
            <thead className="bg-[#1a1a2e] bg-opacity-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#b8c5ff] uppercase tracking-wider">
                  Email
                </th>

                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#b8c5ff] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a2e]">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-sm text-[#b8c5ff]">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiUserX className="w-8 h-8 text-[#7784e4]" />
                      <p>No users found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-[#1a1a2e] hover:bg-opacity-30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[#7784e4]">
                          <FiUser className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.email}</div>
                          <div className="text-xs text-[#b8c5ff]">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => router.push(`/admin/users/${user._id}`)}
                          className="text-[#b8c5ff] hover:text-white"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={isDeleting === user._id}
                          className="text-red-400 hover:text-red-500 disabled:opacity-50"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
