document.addEventListener("DOMContentLoaded", async () => {
const SUPABASE_URL = 'https://tlmidazvewettxhlwbvx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM';

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  // TUNGGU EVENT AUTH
  supabase.auth.onAuthStateChange(async (event, session) => {

    console.log("EVENT:", event);
    console.log("SESSION:", session);

    // kalau belum ada session jangan lanjut
    if (!session) return;

    // sekarang aman
    window.kirimnama = async function () {

      const nama =
        document.getElementById("nama").value;

      if (!nama.trim()) {

        alert("Nama kosong");
        return;

      }

      const { data, error } = await supabase
        .from("DataPengguna")
        .upsert({
          id: session.user.id,
          email: session.user.email,
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

  });

});

</script>
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function cekSession() {

  const { data, error } =
    await supabase.auth.getSession();

  console.log("SESSION:", data.session);

  if (!data.session) {

    alert("Session hilang");

    window.location.href = "index.html";

    return;

  }

  console.log(data.session.user);

}

cekSession();

window.kirimnama = async function () {

  try {

    const nama =
      document.getElementById('nama').value;

    if (!nama.trim()) {

      alert("Nama kosong");
      return;

    }

    const { data: sessionData } =
      await supabase.auth.getSession();

    const user = sessionData.session.user;

    const { data, error } = await supabase
      .from('DataPengguna')
      .upsert({
        id: user.id,
        email: user.email,
        nama: nama,
        status: 'online'
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert(data.nama);
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi error");
  }
};
