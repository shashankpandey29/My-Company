import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  Session,
  Profile,
  getStoredSession,
  setStoredSession,
  registerAccount,
  authenticateAccount,
  getProfileById,
  updateProfileInStore,
  updateAccountPassword,
} from '../lib/storage';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone?: string,
    company?: string,
    industry?: string
  ) => Promise<{ error: Error | null; requiresConfirmation?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session on mount
    const savedSession = getStoredSession();
    if (savedSession && savedSession.user) {
      setSession(savedSession);
      setUser(savedSession.user);
      const userProfile = getProfileById(savedSession.user.id);
      setProfile(userProfile);
    }
    setLoading(false);
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone?: string,
    company?: string,
    _industry?: string
  ): Promise<{ error: Error | null; requiresConfirmation?: boolean }> => {
    const res = registerAccount(email, password, fullName, phone, company);
    if ('error' in res) {
      return { error: new Error(res.error), requiresConfirmation: false };
    }

    const newSession: Session = {
      access_token: `token_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      user: res.user,
    };

    setStoredSession(newSession);
    setSession(newSession);
    setUser(res.user);
    setProfile(res.profile);

    return { error: null, requiresConfirmation: false };
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    const res = authenticateAccount(email, password);
    if ('error' in res) {
      return { error: new Error(res.error) };
    }

    const newSession: Session = {
      access_token: `token_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      user: res.user,
    };

    setStoredSession(newSession);
    setSession(newSession);
    setUser(res.user);
    setProfile(res.profile);

    return { error: null };
  };

  const signOut = async () => {
    setStoredSession(null);
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
    // Local mock password reset
    if (!email.trim()) {
      return { error: new Error('Please enter a valid email address.') };
    }
    return { error: null };
  };

  const updatePassword = async (newPassword: string): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('User is not authenticated.') };
    const success = updateAccountPassword(user.id, newPassword);
    if (!success) {
      return { error: new Error('Failed to update password.') };
    }
    return { error: null };
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('User is not authenticated.') };
    const updated = updateProfileInStore(user.id, updates);
    if (!updated) {
      return { error: new Error('Profile record not found.') };
    }
    setProfile(updated);
    return { error: null };
  };

  const refreshProfile = async () => {
    if (user) {
      const refreshed = getProfileById(user.id);
      setProfile(refreshed);
    }
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isAdmin,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
