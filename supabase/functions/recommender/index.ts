import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = Deno.env.get("MY_SUPABASE_URL")!;
const supabaseKey = Deno.env.get("MY_SUPABASE_ANON_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    const { search } = await req.json();

    const { data, error } = await supabase
      .from("charities")
      .select("organisation_number, charity_name, charity_activities")
      .ilike("charity_activities", `%${search}%`)
      .limit(5);

    if (error) throw error;

    return new Response(JSON.stringify({ results: data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});
