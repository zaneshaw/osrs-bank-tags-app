import supabase from '@/supabase';
import type { BankTabResponse } from '@/types';

export async function getBankTab(tabId: string): Promise<BankTabResponse> {
  const { data, error } = await supabase.from('bank_tabs').select('*').eq('id', tabId).single();

  if (error) {
    throw error;
  }
  return data;
}
