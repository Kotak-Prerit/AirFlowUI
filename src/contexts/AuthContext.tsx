import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load user data from localStorage on app start
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        
        // If user has token but avatar URL is old or invalid, fetch fresh data
        const shouldRefreshUser = !userData.avatarUrl || 
          !userData.avatarUrl.startsWith('https://res.cloudinary.com/') ||
          userData.avatarUrl.includes('1762941215'); // Old timestamp
        
        if (shouldRefreshUser && savedToken) {
          // Fetch fresh user data from server
          fetchUserProfile(savedToken);
        } else {
          // Clean avatar URL to ensure it's valid
          const cleanUserData = {
            ...userData,
            avatarUrl: userData.avatarUrl && userData.avatarUrl.trim() !== '' && userData.avatarUrl.startsWith('http') 
              ? userData.avatarUrl 
              : null
          };
          
          setToken(savedToken);
          setUser(cleanUserData);
          
          // Update localStorage with cleaned data if it was modified
          if (JSON.stringify(cleanUserData) !== JSON.stringify(userData)) {
            localStorage.setItem('auth_user', JSON.stringify(cleanUserData));
          }
        }
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  // Function to fetch fresh user profile from server
  const fetchUserProfile = async (authToken: string) => {
    try {
      const response = await fetch(`https://airflow-ob6u.onrender.com/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          console.log('Fetched fresh user data:', data.user);
          setToken(authToken);
          setUser(data.user);
          localStorage.setItem('auth_token', authToken);
          localStorage.setItem('auth_user', JSON.stringify(data.user));
        }
      } else {
        // Token might be invalid, clear storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const login = (newToken: string, userData: User) => {
    // Ensure avatarUrl is properly handled
    const cleanUserData = {
      ...userData,
      avatarUrl: userData.avatarUrl && userData.avatarUrl.trim() !== '' ? userData.avatarUrl : null
    };
    
    setToken(newToken);
    setUser(cleanUserData);
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(cleanUserData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        ...userData,
        // Ensure avatarUrl is properly cleaned
        avatarUrl: userData.avatarUrl !== undefined 
          ? (userData.avatarUrl && userData.avatarUrl.trim() !== '' ? userData.avatarUrl : null)
          : user.avatarUrl
      };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      updateUser,
      isAuthenticated: !!token && !!user
    }}>
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
