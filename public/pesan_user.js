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
        nama,pesan_publik,pesan_private
    )`);
  
    if (dbError) {
      console.log(dbError);
      return;
    }
}
initAuth()
const kirim_ide = document.getElementById('kirim_ide');
const popup = document.getElementById('popup');
kirim_ide.addEventListener('click', function(){
    popup.classList.add('muncul');
    popup.classList.remove('hilang');
    const yes = document.getElementById('yes');
    const no = document.getElementById('no');
    const input_ide = document.getElementById('input_ide').value;
    yes.addEventListener('click', async function(){
        const { data, error } =
        await supabase
          .from("PesanPengguna")
          .insert({
            id: currentSession.user.id,
            pesan_publik: input_ide
          });
        if (error){
            console.log(error);
            alert('error bos! ', error)
        }
    });
    no.addEventListener('click',async function(){
        const { data, error } =
        await supabase
          .from("PesanPengguna")
          .insert({
            id: currentSession.user.id,
            pesan_private: input_ide
          });
        if (error){
            console.log(error);
            alert('error bos ', error)
        }
    });
});