const ketik = document.getElementById('ketik');
const pribadi = document.getElementById('pribadi');
const publik = document.getElementById('publik');
const kirim = document.getElementById('kirim_ide');
const kembali = document.getElementById('kembali');
const kembali2 = document.getElementById('kembali2');

const ui = document.getElementById('ui');
const sesiketik = document.getElementById('sesiketik0');
const rumahPribadi = document.getElementById('rumahPribadi');

ketik.addEventListener('click', function(){
    sesiketik.classList.add('muncul');
    sesiketik.classList.remove('hilang');

    ui.classList.add('hilang');
    ui.classList.remove('muncul');

    rumahPribadi.classList.add('hilang');
    rumahPribadi.classList.remove('muncul');
});
publik.addEventListener('click', function(){
    ui.classList.add('muncul');
    ui.classList.remove('hilang');

    sesiketik.classList.add('hilang');
    sesiketik.classList.remove('muncul');

    rumahPribadi.classList.add('hilang');
    rumahPribadi.classList.remove('muncul');
});

pribadi.addEventListener('click', function(){
    ui.classList.add('hilang');
    ui.classList.remove('muncul');

    sesiketik.classList.add('hilang');
    sesiketik.classList.remove('muncul');

    rumahPribadi.classList.add('muncul');
    rumahPribadi.classList.remove('hilang');
});

kembali.addEventListener('click', function(){
    ui.classList.add('muncul');
    ui.classList.remove('hilang');

    sesiketik.classList.add('hilang');
    sesiketik.classList.remove('muncul');

    rumahPribadi.classList.add('hilang');
    rumahPribadi.classList.remove('muncul');
});

kembali2.addEventListener('click', function(){
    ui.classList.add('muncul');
    ui.classList.remove('hilang');

    sesiketik.classList.add('hilang');
    sesiketik.classList.remove('muncul');

    rumahPribadi.classList.add('hilang');
    rumahPribadi.classList.remove('muncul');
});

