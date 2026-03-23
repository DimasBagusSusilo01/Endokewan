function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ubahMata(randomAngka){
  const mata1 = document.getElementById("mata1");
  const mata2 = document.getElementById("mata2");

  if (randomAngka == 3 || randomAngka == 6 || randomAngka == 9){
    mata1.style.height = "10px";
    mata2.style.height = "10px";

    await sleep(200);

    mata1.style.height = "60px";
    mata2.style.height = "60px";
  }
}

async function startRandomLoop() {
  let min = 0;
  let max = 10;

  let randomAngka = Math.floor(Math.random() * (max - min)) + min; 
  let randomDelay = Math.floor(Math.random() * 2) + 1;
  console.log(randomDelay);

  ubahMata(randomAngka);

  await sleep(1000);
  setTimeout(startRandomLoop, randomDelay);
}

startRandomLoop();

const hp = document.getElementById("hp");
  let rotX = 0;
  let rotY = 0;
  let locked = false;

  function roll(dir) {
    if (locked) return;
    locked = true;

    if (dir === "right") rotY -= 90;
    if (dir === "left")  rotY += 90;
    if (dir === "up")    rotX += 90;
    if (dir === "down")  rotX -= 90;

    hp.style.transform =
      `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    setTimeout(() => locked = false, 600);
  }

  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("pointerdown", () => {
      roll(btn.dataset.dir);
    });
  });
  
const hp2 = document.getElementById("hp2");
  let rot2X = 0;
  let rot2Y = 0;
  let locked2 = false;

  function roll2(dir) {
    if (locked2) return;
    locked2 = true;

    if (dir === "right") rot2Y -= 90;
    if (dir === "left")  rot2Y += 90;
    if (dir === "up")    rot2X += 90;
    if (dir === "down")  rot2X -= 90;

    hp2.style.transform =
      `rotateX(${rot2X}deg) rotateY(${rot2Y}deg)`;

    setTimeout(() => locked2 = false, 600);
  }

  document.querySelectorAll(".btn2").forEach(btn => {
    btn.addEventListener("pointerdown", () => {
      roll2(btn.dataset.dir);
    });
  });
  
const sprite = document.getElementById("sprite");
const frameSize = 128;
const columns = 4;
let interval = null;

function showFrame(frame) {
  const x = (frame % columns) * frameSize;
  const y = Math.floor(frame / columns) * frameSize;
  sprite.style.backgroundPosition = `-${x}px -${y}px`;
}

function playOnce(frames, speed = 150, onComplete) {
  clearInterval(interval);
  let i = 0;

  interval = setInterval(() => {
    showFrame(frames[i]);
    i++;
    if (i >= frames.length) {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, speed);
}

const idleAnimations = [
  [0, 2],
  [0, 2]
];

let idleIndex = 0;
let isIdle = false;

function startIdle() {
  if (isIdle) return;
  isIdle = true;

  function loopIdle() {
    if (!isIdle) return;

    playOnce(idleAnimations[idleIndex], 350, () => {
      idleIndex = (idleIndex + 1) % idleAnimations.length;
      loopIdle();
    });
  }
  loopIdle();
}

function stopIdle() {
  isIdle = false;
  clearInterval(interval);
}

const karakter = document.getElementById("sprite");

karakter.addEventListener("click", () => {
  stopIdle();
  playOnce([2, 7, 9, 7, 2], 100, () => {
    startIdle();
  });
});

startIdle();

let layarMati = false;
function power(){
    layarMati = !layarMati;
    document.getElementById("ui").classList.toggle("hidden",layarMati);
    const t = document.getElementById("toast");
    t.textContent = layarMati ? "Layar Mati" : "Layar Hidup";
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2000);
  }


function bagiTeks(teks, panjang ) {
  let hasil = "";

  while (teks.length > 0) {
    let potong = teks.slice(0, panjang);

    if (teks.length > panjang && teks[panjang] !== " ") {
      let i = panjang;
      while (i < teks.length && teks[i] !== " ") {
        potong += teks[i];
        i++;
      }
      teks = teks.slice(i + 1);
    } else {
      teks = teks.slice(panjang + 1);
    }

    hasil += potong + "<br><div class='garis'></div>";
  }
  return hasil;
}
let teks = "Hi semua! Namaku adalah Endokewan! Nama kalian siapa? Aku mohon untuk merawat diriku ya? Aku akan membuatmu nyaman dan suka dengan keimutanku!";
paragraf = document.getElementById("teks");
paragraf.innerHTML = bagiTeks(teks, 10);
paragraf.style.fontSize = "20px";

let output = "Hi! aku Gbot! Asistenmu dalam memahami Endokewan. ada yang bisa aku bantu?";
export async function ketikTeks(teks, elemenId) {
  const el = document.getElementById(elemenId);
  el.textContent = "";

  for (let i = 0; i < teks.length; i++) {
    el.textContent += teks[i];
    await sleep(50); 
  }
}

ketikTeks(output,'output');
