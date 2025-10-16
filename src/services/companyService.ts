import { supabase } from '../lib/supabase';

export interface Company {
  id?: string;
  name: string;
  industry_type: string;
  active_modules?: string[];
  subscription_tier?: string;
  settings?: any;
  created_at?: string;
  updated_at?: string;
}

export const companyService = {
  async createCompany(company: Company) {
    const { data, error } = await supabase
      .from('companies')
      .insert({
        name: company.name,
        industry_type: company.industry_type,
        active_modules: company.active_modules || [],
        subscription_tier: company.subscription_tier || 'basic',
        settings: company.settings || {},
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCompany(companyId: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateCompany(companyId: string, updates: Partial<Company>) {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', companyId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleModule(companyId: string, moduleName: string, enable: boolean) {
    const company = await this.getCompany(companyId);
    if (!company) throw new Error('Company not found');

    const activeModules = company.active_modules || [];
    let updatedModules: string[];

    if (enable) {
      updatedModules = [...new Set([...activeModules, moduleName])];
    } else {
      updatedModules = activeModules.filter((m: string) => m !== moduleName);
    }

    return this.updateCompany(companyId, { active_modules: updatedModules });
  },

  async getActiveModules(companyId: string) {
    const company = await this.getCompany(companyId);
    return company?.active_modules || [];
  },
};
