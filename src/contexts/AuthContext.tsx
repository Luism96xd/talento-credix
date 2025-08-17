
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  hasPermission: (module: string, permission: string) => boolean;
  hasRole: (role: string) => boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);
      if (profileError) throw profileError;

      if (profileData && profileData.length > 0) {
        const userProfile = profileData[0];

        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);

        if (rolesError) throw rolesError;

        const roles = rolesData?.map(r => r.role) || [];

        // Get permissions for each role
        const permissions: { [module: string]: string[] } = {};

        for (const role of roles) {
          const { data: permsData, error: permsError } = await supabase
            .from('module_permissions')
            .select('module, permission')
            .eq('role', role);

          if (!permsError && permsData) {
            permsData.forEach(perm => {
              if (!permissions[perm.module]) {
                permissions[perm.module] = [];
              }
              if (!permissions[perm.module].includes(perm.permission)) {
                permissions[perm.module].push(perm.permission);
              }
            });
          }
        }
        setProfile({
          id: userProfile.id,
          email: userProfile.email,
          gender: userProfile.gender,
          full_name: userProfile.full_name,
          department: userProfile.department,
          roles: roles || [],
          permissions: permissions || {}
        });
      }
    } catch (error) {
      console.log("Hubo un error")
      console.error('Error fetching user profile:', error);

      // Fallback: try to get basic profile data
      try {
        const { data: basicProfile, error: basicError } = await supabase
          .from('profiles' as any)
          .select('*')
          .eq('id', userId)
          .single();

        if (!basicError && basicProfile) {
          const { data: rolesData } = await supabase
            .from('user_roles' as any)
            .select('role')
            .eq('user_id', userId);

          setProfile({
            id: basicProfile.id,
            email: basicProfile.email,
            gender: basicProfile.gender,
            full_name: basicProfile.full_name,
            department: basicProfile.department,
            roles: rolesData?.map((r: any) => r.role) || [],
            permissions: {}
          });
        }
      } catch (fallbackError) {
        console.error('Fallback profile fetch failed:', fallbackError);
        setProfile(null);
      }
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };


  const hasPermission = (module: string, permission: string): boolean => {
    if (!profile) return false;
    return profile.permissions[module]?.includes(permission) ||
      profile.permissions[module]?.includes('admin') || false;
  };

  const hasRole = (role: string): boolean => {
    if (!profile) return false;
    return profile.roles.includes(role);
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signOut,
    hasPermission,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
