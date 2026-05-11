const SUPABASE_URL = 'https://tlmidazvewettxhlwbvx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const kirimnama = document.getElementById('kirimnama');

kirimnama.addEventListener('click', async function(){
  const nama = document.getElementById('nama').value;
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from('users')
    .upsert({
      id: user.id,
      email: user.email,
      nama: nama,
      status: 'online'
    }).select(nama).eq(id,id).single();
    
  window.alert(data.nama);
});