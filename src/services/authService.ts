import { supabase } from '../lib/supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends LoginCredentials {
  username: string;
  fullName: string;
  companyId: string;
  role?: string;
  department?: string;
}

export const authService = {
  async signUp(data: SignUpData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          full_name: data.fullName,
          company_id: data.companyId,
          role: data.role || 'employee',
          department: data.department || '',
        },
      },
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: userError } = await supabase.from('users').insert({
        id: authData.user.id,
        company_id: data.companyId,
        email: data.email,
        username: data.username,
        full_name: data.fullName,
        role: data.role || 'employee',
        department: data.department || '',
        is_active: true,
      });

      if (userError) throw userError;
    }

    return authData;
  },

  async signIn(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*, companies(*)')
        .eq('id', data.user.id)
        .maybeSingle();

      if (userError) throw userError;

      return { auth: data, user: userData };
    }

    return { auth: data, user: null };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: userData, error } = await supabase
      .from('users')
      .select('*, companies(*)')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;

    return userData;
  },

  async updateProfile(userId: string, updates: Partial<SignUpData>) {
    const { error } = await supabase
      .from('users')
      .update({
        username: updates.username,
        full_name: updates.fullName,
        department: updates.department,
      })
      .eq('id', userId);

    if (error) throw error;
  },

  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((async (event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*, companies(*)')
          .eq('id', session.user.id)
          .maybeSingle();

        callback(userData);
      } else {
        callback(null);
      }
    }));
  },
};
