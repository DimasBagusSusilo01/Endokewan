tombol = document.getElementById('Login');
terminal = document.getElementById('login');
tombol.addEventListener('click', function(){
    terminal.classList.toggle('aktif');
});

utama = document.getElementById('utama');
kotakTentang = document.getElementById('kotakTentang');
kembali = document.getElementById('kembali');
tentang = document.getElementById('tentang');

tentang.addEventListener('click', function(){
  utama.classList.add('hilang');
  utama.classList.remove('muncul');
  
  kotakTentang.classList.add('muncul');
  kotakTentang.classList.remove('hilang');
});

kembali.addEventListener('click', function(){
  utama.classList.remove('hilang');
  utama.classList.add('muncul');
  
  kotakTentang.classList.remove('muncul');
  kotakTentang.classList.add('hilang');
});


