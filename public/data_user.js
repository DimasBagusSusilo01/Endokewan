const supabase = window.supabase.createClient('https://tlmidazvewettxhlwbvx.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM');

let currentSession = null;

// 1. Pantau perubahan auth secara aktif
supabase.auth.onAuthStateChange((event, session) => {
  currentSession = session; // Isi variabel global setiap kali status berubah
  
  if (session) {
    console.log("Logged in:", session.user.email);
  } else {
    console.log("User logged out atau session habis");
  }
});

// 2. Tangani penukaran kode (jika pakai OAuth)
async function handleAuth() {
  if (window.location.hash || window.location.search) {
    const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
    if (error) console.error("Auth error:", error.message);
  }
}
handleAuth();

// 3. Fungsi kirim nama
window.kirimnama = async function () {
  // Sekarang currentSession sudah terisi otomatis oleh onAuthStateChange
  if (!currentSession) {
    alert("Belum login! Silakan login terlebih dahulu.");
    return;
  }

  const nama = document.getElementById("nama").value;
  if (!nama.trim()) {
    alert("Nama tidak boleh kosong");
    return;
  }

  const { data, error } = await supabase
    .from("DataPengguna")
    .upsert({
      id: currentSession.user.id, // Ambil dari session
      email: currentSession.user.email,
      nama: nama,
      status: "online"
    })
    .select()
    .single();

  if (error) {
    console.error("Database error:", error);
    alert(error.message);
  } else {
    alert("Berhasil simpan: " + data.nama);
  }
};
