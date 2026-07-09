const ketik = document.getElementById('ketik');
const pribadi = document.getElementById('pribadi');
const kirim = document.getElementById('kirim_ide');
const kembali = document.getElementById('kembali');
const kembali2 = document.getElementById('kembali2');
const game = document.getElementById('game');

const room = document.getElementById('room');
const ui = document.getElementById('ui');
const sesiketik = document.getElementById('sesiketik0');
const rumahPribadi = document.getElementById('rumahPribadi');

function gantiMenu(menuAktif) {
    const semuaMenu = [ui, sesiketik, rumahPribadi, room];
    
    semuaMenu.forEach(menu => {
        if (menu === menuAktif) {
            menu.classList.add('muncul');
            menu.classList.remove('hilang');
        } else {
            menu.classList.add('hilang');
            menu.classList.remove('muncul');
        }
    });
}

ketik.addEventListener('click', () => gantiMenu(sesiketik));
pribadi.addEventListener('click', () => gantiMenu(rumahPribadi));
game.addEventListener('click', () => gantiMenu(room));

kembali.addEventListener('click', () => gantiMenu(ui));
kembali2.addEventListener('click', () => gantiMenu(ui));