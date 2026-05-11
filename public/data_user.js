// GANTI DENGAN PUNYAMU
    const SUPABASE_URL =
      "https://tlmidazvewettxhlwbvx.supabase.co";

    const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWlkYXp2ZXdldHR4aGx3YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkyNjEsImV4cCI6MjA5MzkwNTI2MX0.iAiayUK-H1TppKLSdLDF1ugNzzBZ143Z-qwqGj1CPtM";

    // CLIENT SUPABASE
    const supabase =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
          auth: {

            // penting untuk google oauth
            flowType: 'pkce',

            // baca ?code= otomatis
            detectSessionInUrl: true,

            // simpan session
            persistSession: true

          }
        }
      );

    // session global
    let currentSession = null;

    // INIT AUTH
    async function initAuth() {

      // tunggu oauth selesai
      await new Promise(resolve =>
        setTimeout(resolve, 3000)
      );

      // ambil session
      const { data, error } =
        await supabase.auth.getSession();

      console.log("SESSION:", data.session);
      console.log("ERROR:", error);

      console.log("URL:", window.location.href);

      console.log("LOCALSTORAGE:", localStorage);

      currentSession = data.session;

      // kalau belum login
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

    // pantau perubahan auth
    supabase.auth.onAuthStateChange(
      (event, session) => {

        console.log("EVENT:", event);
        console.log("SESSION EVENT:", session);

        currentSession = session;

      }
    );

    // KIRIM DATA
    window.kirimnama = async function () {

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

      if (error) {

        console.error(error);

        alert(
          "Database error: " +
          error.message
        );

      } else {

        console.log(data);

        alert(
          "Berhasil simpan: " +
          data.nama
        );

      }

    };
