pr = document.getElementById('pr');
pu = document.getElementById('pu');
profil = document.getElementById('profiltombol');

ui = document.getElementById('ui');
prutama = document.getElementById('prutama');
puutama = document.getElementById('puutama');
profilutama = document.getElementById('profil');

pr.addEventListener('click', function(){
    prutama.classList.add('muncul');
    puutama.classList.add('hilang');
    profilutama.classList.add('hilang');
    ui.classList.add('hilang');

    prutama.classList.remove('hilang');
    puutama.classList.remove('muncul');
    profilutama.classList.remove('muncul');
    ui.classList.remove('muncul');
});

pu.addEventListener('click', function(){
    prutama.classList.add('hilang');
    puutama.classList.add('muncul');
    profilutama.classList.add('hilang');
    ui.classList.add('hilang');

    prutama.classList.remove('muncul');
    puutama.classList.remove('hilang');
    profilutama.classList.remove('muncul');
    ui.classList.remove('muncul');
});

profil.addEventListener('click',function(){
    prutama.classList.add('hilang');
    puutama.classList.add('hilang');
    profilutama.classList.add('muncul');
    ui.classList.add('hilang');

    prutama.classList.remove('muncul');
    puutama.classList.remove('muncul');
    profilutama.classList.remove('hilang');
    ui.classList.remove('muncul');
});