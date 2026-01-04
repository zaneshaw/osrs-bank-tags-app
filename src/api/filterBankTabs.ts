import supabase from '@/supabase';
import type { BankTabResponse } from '@/types';

export async function filterBankTabs(category: string): Promise<BankTabResponse[]> {
  let query = supabase.from('bank_tabs').select('*').order('created_at', { ascending: false });

  // Category filter (only when a real tag is selected)
  if (category !== '') {
    query = query.contains('tags', [category]);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
