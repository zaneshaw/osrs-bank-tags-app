import supabase from '@/supabase';
import type { BankTabResponse } from '@/types';

export async function filterBankTabs(category: string): Promise<BankTabResponse[]> {
  let query = supabase.from('bank-tabs').select('*').order('created_at', { ascending: false });

  // Category filter (only when a real tag is selected)
  if (category !== '') {
    query = query.contains('tags', [category]);
  }

  //   // Search by name OR exact tag match
  //   if (searchString.trim() !== '') {
  //     query = query.or(`name.ilike.%${searchString}%,tags.cs.{${searchString}}`);
  //   }

  const { data, error } = await query;
  console.log('Filtered Data:', data);

  if (error) {
    throw error;
  }

  return data;
}
