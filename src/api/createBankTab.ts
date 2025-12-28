import supabase from '@/supabase';
import type { CreateBankTagPayload } from '@/types';

export async function createBankTab(payload: CreateBankTagPayload) {
  const { data, error } = await supabase
    .from('bank-tabs')
    .insert([
      {
        ...payload,
        likes: 0,
      },
    ])
    .select()
    .single();
  if (error) {
    throw error;
  }
  return [data, error];
}
