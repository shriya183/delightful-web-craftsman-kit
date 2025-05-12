
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

// Helper function to clean up auth state
export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
      if (event === 'SIGNED_IN') {
        toast.success('Signed in successfully');
        // Fetch user profile with setTimeout to avoid potential deadlocks
        if (currentSession?.user) {
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();
              
              if (error) {
                console.error('Error fetching profile:', error);
                return;
              }
              
              setProfile(data);
            } catch (err) {
              console.error('Error in profile fetch:', err);
            }
          }, 0);
        }
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        toast.info('Signed out');
      }
    });
    
    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch user profile if signed in
      if (currentSession?.user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error);
            return;
          }
          
          setProfile(data);
        } catch (err) {
          console.error('Error in profile fetch:', err);
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Ignore errors during sign out
      }
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setProfile({ ...profile, ...updates });
      toast.success('Profile updated successfully');
      
      return { error: null };
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
      return { error };
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signOut,
    updateProfile
  };
};
