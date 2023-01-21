import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hfwqidqyjzkrtjnbzrlv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmd3FpZHF5anprcnRqbmJ6cmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQyNzk0NTgsImV4cCI6MTk4OTg1NTQ1OH0.7ew5G4keC4BBHcNC_kPxvalXymN4Y8C4Vu63wsyNu3A"
);