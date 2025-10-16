import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, signIn, signUp, signOut, onAuthStateChange, checkConnection } from '../lib/supabase';
import { userAPI } from '../services/api';
import type { User } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  username: string;
  role: string;
  company_id: string;
  department_id: string | null;
  avatar_url: string | null;
  is_active: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  authUser: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async (authUserId: string, authUserEmail: string, retryCount = 0) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    try {
      const userData = await userAPI.getById(authUserId);
      if (userData) {
        setUser({
          id: userData.id,
          email: userData.email,
          full_name: userData.full_name,
          username: userData.username,
          role: userData.role,
          company_id: userData.company_id,
          department_id: userData.department_id,
          avatar_url: userData.avatar_url,
          is_active: userData.is_active,
        });
        setError(null);
      } else {
        console.error('User profile not found in database for auth user:', authUserId);
        setError('User profile not found. Please contact your administrator.');
        await supabase.auth.signOut();
        setUser(null);
        setAuthUser(null);
      }
    } catch (error: any) {
      console.error('Error loading user data:', error);

      if (retryCount < MAX_RETRIES && error.message?.includes('network')) {
        console.log(`Retrying to load user data... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
        return loadUserData(authUserId, authUserEmail, retryCount + 1);
      }

      const errorMessage = error.message?.includes('network')
        ? 'Network connection issue. Please check your internet connection and try again.'
        : error.message?.includes('timeout')
        ? 'Database connection timeout. Please try again.'
        : 'Failed to load user profile. Please try again.';

      setError(errorMessage);
      await supabase.auth.signOut();
      setUser(null);
      setAuthUser(null);
    }
  };

  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    let mounted = true;

    const initializeAuth = async () => {
      try {
        loadingTimeout = setTimeout(() => {
          if (loading && mounted) {
            console.error('Auth initialization timeout after 20 seconds');
            setError('Connection timeout. Please check your internet connection and refresh the page.');
            setLoading(false);
          }
        }, 20000);

        const isConnected = await checkConnection();
        if (!isConnected && mounted) {
          console.warn('Database connection check failed, but continuing with auth...');
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to connect to authentication service. Please try again.');
          setLoading(false);
          return;
        }

        if (session?.user && mounted) {
          setAuthUser(session.user);
          await loadUserData(session.user.id, session.user.email || '');
        }
      } catch (error: any) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          const errorMessage = error.message?.includes('fetch')
            ? 'Network error. Please check your connection and try again.'
            : error.message || 'Failed to initialize authentication.';
          setError(errorMessage);
        }
      } finally {
        clearTimeout(loadingTimeout);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      setAuthUser(session?.user || null);

      if (session?.user) {
        setLoading(true);
        await loadUserData(session.user.id, session.user.email || '');
        setLoading(false);
      } else {
        setUser(null);
        setError(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { user: authUser } = await signIn(email, password);
      if (authUser) {
        await loadUserData(authUser.id, authUser.email || '');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const handleSignUp = async (email: string, password: string, userData: any) => {
    try {
      setError(null);
      const { user: authUser } = await signUp(email, password, userData);
      if (authUser) {
        await userAPI.create({
          id: authUser.id,
          email,
          ...userData,
        });
        await loadUserData(authUser.id, authUser.email || '');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setAuthUser(null);
      setError(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const refreshUser = async () => {
    if (authUser) {
      await loadUserData(authUser.id, authUser.email || '');
    }
  };

  const value = {
    user,
    authUser,
    loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
