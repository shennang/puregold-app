//filename: supabaseClient.jsx

/*import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qpoxjpvxookokfdknwra.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;*/

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient();

export default supabase;
