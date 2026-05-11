nama = document.getElementById('nama');
async function cekUser() {

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from('users')
    .upsert({
      id: user.id,
      email: user.email,
      nama: user.user_metadata.full_name,
      status: 'online'
    });

}

cekUser();