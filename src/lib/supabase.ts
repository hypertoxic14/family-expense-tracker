import { createClient } from '@supabase/supabase-js'

// Replace these with YOUR actual Supabase credentials
const supabaseUrl = 'https://gfgqpuxnrylfyybtcroa.supabase.co'  // YOUR PROJECT URL HERE
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZ3FwdXhucnlsZnl5YnRjcm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MjI2OTksImV4cCI6MjA3NTM5ODY5OX0.wcj9aUZoLivCz4QQiSLtMqUTrD2kh_5odDuSoP3NvC8'  // YOUR ANON KEY HERE

export const supabase = createClient(supabaseUrl, supabaseKey)
