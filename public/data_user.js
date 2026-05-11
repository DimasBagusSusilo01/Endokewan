const supabase = window.supabase.createClient('https://tlmidazvewettxhlwbvx.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM'),{
          auth: {

            // penting untuk google oauth
            flowType: 'pkce',

            // baca ?code= otomatis
            detectSessionInUrl: true,

            // simpan session
            persistSession: true

          }
        };

let currentSession = null;

async function initAuth() {
  await new Promise(resolve =>
    setTimeout(resolve, 2000)
  );
  const { data, error } =
    await supabase.auth.getSession();

  if (error) {

    console.error(error);
    return;
  }
  currentSession = data.session;
  console.log(currentSession);
}
initAuth();

supabase.auth.onAuthStateChange(
  (event, session) => {
    currentSession = session;
    console.log(event);
    console.log(session);
  }
);

window.kirimnama = async function () {

  if (!currentSession) {
    alert("Belum login");
    return;
  }

  const nama =
    document.getElementById("nama").value;

  const { data, error } =
    await supabase
      .from("DataPengguna")
      .upsert({
        id: currentSession.user.id,
        email: currentSession.user.email,
        nama: nama,
        status: "online"
      })
      .select()
      .single();
  console.log(data, error);
};