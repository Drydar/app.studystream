<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const SUPABASE_URL = "https://lbexzmnhqiwbegftqvmg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZXh6bW5ocWl3YmVnZnRxdm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTMzMzIsImV4cCI6MjA1NTkyOTMzMn0.RfdSkjQIVx-Bk3q5R0cbKfnB_8ji7znQrLrdASKrMl8";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);