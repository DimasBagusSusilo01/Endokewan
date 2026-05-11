import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const SUPABASE_URL = 'https://tlmidazvewettxhlwbvx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.kirimnama = async function () {

  try {

    const nama = document.getElementById('nama').value;

    if (!nama.trim()) {
      alert("Nama kosong");
      return;
    }

    // CEK SESSION DULU
    const sessionResult = await supabase.auth.getSession();

    console.log("SESSION:", sessionResult.data.session);

    if (!sessionResult.data.session) {

      alert("Session tidak ada");
      return;

    }

    // AMBIL USER
    const userResult = await supabase.auth.getUser();

    console.log("USER:", userResult.data.user);

    const user = userResult.data.user;

    if (!user) {

      alert("Belum login");
      return;

    }

    // SIMPAN DATABASE
    const dbResult = await supabase
      .from('DataPengguna')
      .upsert({
        id: user.id,
        email: user.email,
        nama: nama,
        status: 'online'
      })
      .select()
      .single();

    console.log(dbResult);

    if (dbResult.error) {

      console.error(dbResult.error);
      alert("Gagal mengirim data");

    } else {

      alert(dbResult.data.nama);

    }

  } catch (err) {

    console.error(err);
    alert("Terjadi error");

  }

};