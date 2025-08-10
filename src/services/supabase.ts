import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ahevnhivwdxdbfwxitrs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZXZuaGl2d2R4ZGJmd3hpdHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjEyMDgsImV4cCI6MjA3MDMzNzIwOH0.sfHeCHllPs0OUN82gRZMVGCd8lPbG8BxBkh1YFx0vb8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
