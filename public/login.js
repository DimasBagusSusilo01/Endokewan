import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://tlmidazvewettxhlwbvx.supabase.co/rest/v1/', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM')

const daftar = document.getElementById('daftar');
daftar.addEventListener('click', async function(){
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://firemux-001.web.app/game.html', 
    },
  });
  
  if (error) console.error('Error login:', error.message);
});