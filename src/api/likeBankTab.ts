// api/likeBankTab.ts
import supabase from '@/supabase';

export async function likeBankTab(tabId: string) {
  const { error } = await supabase.rpc('increment_likes', {
    tab_id: tabId,
  });

  if (error) throw error;
}
