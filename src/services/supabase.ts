import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.warn('Synora: Supabase credentials are not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

export const getVendors = async () => {
  const { data, error } = await supabase.from('vendors').select('*');
  if (error) throw error;
  return data;
};

export const getOrganizers = async () => {
  const { data, error } = await supabase.from('organizers').select('*');
  if (error) throw error;
  return data;
};

export const getEvents = async () => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) throw error;
  return data;
};
