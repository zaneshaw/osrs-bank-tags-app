if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  alert('VITE_SUPABASE_ANON_KEY is required');
  throw new Error('VITE_SUPABASE_ANON_KEY is required');
}
if (!import.meta.env.VITE_SUPABASE_URL) {
  alert('VITE_SUPABASE_URL is required');
  throw new Error('VITE_SUPABASE_URL is required');
}

if (!import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
  alert('VITE_SUPABASE_SERVICE_ROLE_KEY is required');
  throw new Error('VITE_SUPABASE_SERVICE_ROLE_KEY is required');
}

export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
