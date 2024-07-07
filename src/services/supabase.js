import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nytrozanebeldwxbqoou.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dHJvemFuZWJlbGR3eGJxb291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMzE3NTIsImV4cCI6MjAzMjgwNzc1Mn0.pkf2hIGG73Pl_VRWJyewNZt9iAJIz8GqcUARq-Hmxc0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
