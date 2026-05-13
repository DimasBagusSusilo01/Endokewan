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
let currentSession = null;
async function initAuth() {
      await new Promise(resolve =>
        setTimeout(resolve, 3000)
      );
      
      const { data, error } =
        await supabase.auth.getSession();
      //console.log("SESSION:", data.session);
      //console.log("ERROR:", error);
      //console.log("URL:", window.location.href);
     // console.log("LOCALSTORAGE:", localStorage);
      currentSession = data.session;
      if (!currentSession) {
        alert("Session tidak ditemukan");
        return;
      }
      console.log(
        "LOGIN:",
        currentSession.user.email
      );
    }   
initAuth();

const { data_dalam, error } =
        await supabase
          .from("DataPengguna").select('*');

const pemain = document.getElementById('pemain'); 
const login = document.getElementById('login');
if (data_dalam.email == currentSession.user).email{
  pemain.textContent = data_dalam.nama;
  login.classList.add('hilang');
}
else{
  
}