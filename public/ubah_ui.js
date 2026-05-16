const ketik = document.getElementById('ketik');
const pribadi = document.getElementById('pribadi');
const publik = document.getElementById('publik');
const kirim = document.getElementById('kirim_ide');
const kembali = document.getElementById('kembali');

const ui = document.getElementById('ui');
sesiketik = document.getElementById('sesiketik');

ketik.addEventListener('click', function(){
    sesiketik.classList.add('muncul');
    sesiketik.classList.remove('hilang');

    ui.classList.add('hilang');
    ui.classList.remove('muncul');
});

kembali.addEventListener('click', function(){
    ui.classList.add('muncul');
    ui.classList.remove('hilang');

    sesiketik.classList.add('hilang');
    sesiketik.classList.remove('muncul');
});
