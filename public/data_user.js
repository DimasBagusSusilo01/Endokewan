const supabase = window.supabase.createClient(
  'https://tlmidazvewettxhlwbvx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM'
);

// simpan session global
let currentSession = null;
supabase.auth.exchangeCodeForSession(
    window.location.href
  );
// pantau auth
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    console.log("Logged in:", session.user.email)
    // User is authorized
  } else {
    // Redirect to login page if no session
    console.log(window.location.href)
    console.log(localStorage)
    console.log(SUPABASE_URL)
  }
})

// function SELALU ADA
window.kirimnama = async function () {

  // cek session saat tombol ditekan
  if (!currentSession) {

    alert("Belum login");
    return;

  }

  const nama =
    document.getElementById("nama").value;

  if (!nama.trim()) {

    alert("Nama kosong");
    return;

  }

  const { data, error } = await supabase
    .from("DataPengguna")
    .upsert({
      id: currentSession.user.id,
      email: currentSession.user.email,
      nama: nama,
      status: "online"
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    alert(error.message);
  } else {
    alert(data.nama);
  }
};