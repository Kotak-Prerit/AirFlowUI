import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminStats {
  totalComponents: number;
  totalUsers: number;
  activeComponents: number;
  adminUsers: number;
  inactiveComponents: number;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  avatarUrl: string | null;
}

interface AdminDashboardData {
  adminUser: AdminUser;
  stats: AdminStats;
}

export default function AdminDashboard() {
  const { userID } = useParams<{ userID: string }>();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('AdminDashboard - userID from params:', userID);
    console.log('AdminDashboard - current user:', user);
    console.log('AdminDashboard - token exists:', !!token);
    
    // Check if user is authenticated and is admin
    if (!user || !token) {
      console.log('AdminDashboard - No user or token, redirecting to signin');
      navigate('/signin');
      return;
    }

    if (user.role !== 'admin') {
      console.log('AdminDashboard - User is not admin, redirecting to dashboard');
      navigate('/dashboard');
      return;
    }

    // Check if accessing own dashboard or if user is admin
    if (user.id !== userID && user.role !== 'admin') {
      console.log('AdminDashboard - Access denied, redirecting to dashboard');
      navigate('/dashboard');
      return;
    }

    console.log('AdminDashboard - All checks passed, fetching admin dashboard');
    fetchAdminDashboard();
  }, [user, token, userID, navigate]);

  const fetchAdminDashboard = async () => {
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_API_URL || 'https://airflow-ob6u.onrender.com/api';
      const apiUrl = `${baseURL}/admin/dashboard/${userID}`;
      
      console.log('fetchAdminDashboard - Making API call to:', apiUrl);
      console.log('fetchAdminDashboard - With token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('fetchAdminDashboard - Response status:', response.status);
      console.log('fetchAdminDashboard - Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('fetchAdminDashboard - Error response:', errorText);
        
        if (response.status === 401) {
          console.log('fetchAdminDashboard - 401 Unauthorized, logging out');
          logout();
          navigate('/signin');
          return;
        }
        throw new Error(`HTTP ${response.status}: Failed to fetch admin dashboard data`);
      }

      const data = await response.json();
      console.log('fetchAdminDashboard - Success data:', data);
      
      if (data.success) {
        setDashboardData(data.data);
      } else {
        throw new Error(data.message || 'Failed to load dashboard');
      }
    } catch (err) {
      console.error('Admin dashboard error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Access Error</h1>
          <p className="text-zinc-400 mb-6">{error || 'Failed to load admin dashboard'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { adminUser, stats } = dashboardData;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-zinc-400">Welcome, {adminUser.username}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Components</p>
                <p className="text-2xl font-bold text-white">{stats.totalComponents}</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Active Components</p>
                <p className="text-2xl font-bold text-green-400">{stats.activeComponents}</p>
              </div>
              <div className="p-3 bg-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Admin Users</p>
                <p className="text-2xl font-bold text-amber-400">{stats.adminUsers}</p>
              </div>
              <div className="p-3 bg-amber-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Component Management</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Create, edit, and manage UI components in the library.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/admin/codeEditor')}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Create New Component
              </button>
              <button
                onClick={() => navigate('/admin/components')}
                className="w-full px-4 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Manage Components
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">User Management</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Manage user accounts and administrative privileges.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/admin/users')}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Manage Users
              </button>
              <button
                onClick={() => navigate('/admin/roles')}
                className="w-full px-4 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Role Management
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">System Overview</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Monitor system health and view analytics.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/admin/analytics')}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                View Analytics
              </button>
              <button
                onClick={() => navigate('/admin/settings')}
                className="w-full px-4 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                System Settings
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity - Placeholder for future implementation */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <div className="text-zinc-400 text-4xl mb-4">📊</div>
            <p className="text-zinc-500">Activity monitoring coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}