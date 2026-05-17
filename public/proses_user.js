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
  .select('*')
  .eq('email', currentSession.user.email)
  .maybeSingle();

  if (dbError) {
    console.log(dbError);
    return;
  }

  const pemain =
    document.getElementById('pemain');
  const pemain2 = document.getElementById('pemain2');
  const login =
    document.getElementById('login');
  const ui = document.getElementById('ui');

if (userData) {
  pemain.textContent = userData.nama;
  pemain2.textContent = userData.nama;
  login.classList.add('hilang');
  login.classList.remove('muncul');
  ui.classList.remove('hilang');
  ui.classList.add('muncul');
}else{
  login.classList.remove('hilang');
  login.classList.add('muncul');
  ui.classList.add('hilang');
  ui.classList.remove('muncul');
}
}

initAuth();