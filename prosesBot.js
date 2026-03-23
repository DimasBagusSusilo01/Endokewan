import {ketikTeks} from './scriptindex.js';
function getIntent(text) {
  text = text.toLowerCase();

  if (/siapa.*(pencipta|membuat|buat|cipta)/.test(text)) {
    return "creator";
  }
  if (/apa.*(endokewan|kamu)/.test(text)) {
    return "definition";
  }
  if (/mengapa.*endokewan/.test(text)) {
    return "reason";
  }
  return "unknown";
}

function getResponse(intent) {
  switch(intent) {
    case "creator":
      return "Pencipta kami adalah Pak Sbubu Ananas. Beliau adalah ayah yang hebat dan baik!";
    case "definition":
      return "Kami adalah mahakarya Pak Sbubu yang paling sempurna!";
    case "reason":
      return "Endokewan diciptakan untuk mengatasi gangguan depresi orang orang. Yah mirip Tamagochi sih.";
    default:
      return "Maaf, aku belum mengerti pertanyaanmu. Tunggu update berikutnya ya!";
  }
}

function jawab(pertanyaan) {
  const intent = getIntent(pertanyaan);
  return getResponse(intent);
}

//console.log(jawab("siapa penciptamu??"));
// → Penciptaku adalah Mr. X

const kirim = document.getElementById("kirim");
kirim.onclick= function(){
  const user = document.getElementById("inputbot").value;
  const jawaban = jawab(user);
  ketikTeks(jawaban,'output');
}