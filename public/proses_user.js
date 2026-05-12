const SUPABASE_URL =
      "https://tlmidazvewettxhlwbvx.supabase.co";
const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM";

const supabase =
  window.supabase.createClient(
    SUPABASE_URL, SUPABASE_ANON_KEY,
        {
          auth: {
            flowType: 'pkce',
            detectSessionInUrl: true,
            persistSession: true
          }
        }
      );
      
const { data, error } =
        await supabase
          .from("DataPengguna")