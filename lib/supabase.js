import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase yapılandırması eksik. NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY değişkenlerini tanımlayın.",
  );
}

if (!/^https:\/\/[^\s]+\.supabase\.co\/?$/.test(supabaseUrl)) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL geçersiz. Supabase Dashboard içindeki https://...supabase.co URL'sini kullanın.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
