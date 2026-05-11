const nama = document.getElementById('nama').value;
kirimnama = document.getElementById('kirimnama');

kirimnama.addEventListener('click', function(){
    const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from('users')
    .insert({
      id: user.id,
      email: user.email,
      nama: nama,
      status: 'online'
    }).select(nama).eq(id,id).single();
    
  window.alert(data.nama);
});