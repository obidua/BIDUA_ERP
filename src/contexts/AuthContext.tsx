import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, signIn, signUp, signOut, onAuthStateChange } from '../lib/supabase';
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

  const loadUserData = async (authUserId: string) => {
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
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setAuthUser(session.user);
          await loadUserData(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthUser(session?.user || null);

      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { user: authUser } = await signIn(email, password);
      if (authUser) {
        await loadUserData(authUser.id);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const handleSignUp = async (email: string, password: string, userData: any) => {
    try {
      const { user: authUser } = await signUp(email, password, userData);
      if (authUser) {
        await userAPI.create({
          id: authUser.id,
          email,
          ...userData,
        });
        await loadUserData(authUser.id);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setAuthUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const refreshUser = async () => {
    if (authUser) {
      await loadUserData(authUser.id);
    }
  };

  const value = {
    user,
    authUser,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
