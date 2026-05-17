const SUPABASE_URL =
      "https://tlmidazvewettxhlwbvx.supabase.co";
const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true
    }
  }
);
let currentSession = null;
async function initAuth() {

    await new Promise(resolve =>
      setTimeout(resolve, 3000)
    );
  
    const { data, error } =
      await supabase.auth.getSession();
  
    currentSession = data.session;
  
    if (!currentSession) {
      alert("Session tidak ditemukan");
      return;
    }
  
    console.log(
      "LOGIN:",
      currentSession.user.email
    );
  
    // Ambil data pengguna
    const {
    data: userData,
    error: dbError
  } = await supabase
    .from("DataPengguna")
    .select(`
    id, email, nama, status,
    PesanPengguna(
        id,pesan_publik,pesan_private
    )`);
  
    if (dbError) {
      console.log(dbError);
      return;
    }
}
initAuth()
const ui = document.getElementById('ui');
const pesan = document.getElementById('pesan'); 
const pesan_priv = document.getElementById('pesan_priv');
const kirim_ide = document.getElementById('kirim_ide');
const popup = document.getElementById('popup');
const sesiketik0 = document.getElementById('sesiketik0');
const yes = document.getElementById('yes');
const no = document.getElementById('no');

kirim_ide.addEventListener('click', function(){
    popup.classList.add('muncul');
    popup.classList.remove('hilang');
    sesiketik0.classList.add('hilang');
    sesiketik0.classList.remove('muncul');
});

function tutupPopup(){
    popup.classList.remove('muncul');
    popup.classList.add('hilang');
    ui.classList.add('muncul');
    ui.classList.remove('hilang');
}
 
async function muatSemuaPesanPublik() {
    const { data, error } = await supabase
        .from('PesanPengguna')
        .select(`pesan_publik,
        DataPengguna(nama)`)
        .not('pesan_publik', 'is', null); 

    if (error) {
        console.error('Gagal memuat pesan:', error.message);
        return;
    }
    pesan.innerHTML = '';

    data.forEach((baris) => {
        const elemenPesan = document.createElement('p');
        elemenPesan.textContent = baris.DataPengguna.nama + baris.pesan_publik + '[publik]';
        elemenPesan.className = 'isi-pesan-publik'; 
        
        pesan.appendChild(elemenPesan);
    });
}
//muatSemuaPesanPublik()

async function muatSemuaPesanPribadi() {
  const { data, error } = await supabase
      .from('PesanPengguna')
      .select('pesan_publik')
      .not('pesan_private', 'is', null); 

  if (error) {
      console.error('Gagal memuat pesan:', error.message);
      return;
  }
  pesan_priv.innerHTML = '';

  data.forEach((baris) => {
      const elemenPesan = document.createElement('p');
      elemenPesan.textContent = '[Me]' + baris.pesan_private;
      elemenPesan.className = 'isi-pesan-private'; 
      
      pesan_priv.appendChild(elemenPesan);
  });
}
if (ui.classList.contains('muncul') && sesiketik.classList.contains('hilang') && rumahPribadi.classList.contains('hilang')){
  muatSemuaPesanPublik();
}else if(ui.classList.contains('hilang') && sesiketik.classList.contains('hilang') && rumahPribadi.classList.contains('muncul')){
  muatSemuaPesanPribadi();
}
yes.addEventListener('click', async function(){
    const input_ide = document.getElementById('input_ide').value;
    const { data, error } = await supabase
        .from("PesanPengguna")
        .insert({
            id: currentSession.user.id,
            pesan_publik: input_ide
        }).select('*')
        .eq('id', currentSession.user.id)
        .maybeSingle();

    if (error){
        console.log(error);
        alert('error bos! ' + error.message);
        return; 
    }
    
    await muatSemuaPesanPublik(); 
    tutupPopup();
});

no.addEventListener('click', async function(){
    const input_ide = document.getElementById('input_ide').value;
    const { data, error } = await supabase
        .from("PesanPengguna")
        .insert({
            id: currentSession.user.id,
            pesan_private: input_ide
        }).select('*')
        .eq('id', currentSession.user.id)
        .maybeSingle();

    if (error){
        console.log(error);
        alert('error bos! ' + error.message);
        return; 
    }
    await muatSemuaPesanPribadi();
    tutupPopup();
});

