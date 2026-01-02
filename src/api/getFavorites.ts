import supabase from '@/supabase';
import { type BankTabResponse } from '@/types';

export async function getFavorites(favoriteIds: string[]): Promise<BankTabResponse[]> {
  const { data, error } = await supabase.from('bank-tabs').select('*').in('id', favoriteIds);
  if (error) {
    throw error;
  }
  return data;
}
