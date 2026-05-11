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

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Belum login");
      return;
    }
 const { data, error } = await supabase.auth.getSession();
console.log("SESSION:", data.session);
const { data: userData } = await supabase.auth.getUser();
console.log("USER:", userData.user);
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

      console.error("Error:", error.message);
      alert("Gagal mengirim data");

    } else {

      alert(data.nama);

    }

  } catch (err) {

    console.error(err);
    alert("Terjadi error");

  }

};