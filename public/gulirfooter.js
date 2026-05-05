function gulir(el) {
  const navigasi = document.getElementById("navigasi");
  const peluncur = document.querySelector(".peluncur");
  const wrapper = document.getElementById("bungkus");

  // reset tombol aktif
  document.querySelectorAll(".tombol").forEach(t => t.classList.remove("aktif"));
  el.classList.add("aktif");

  // reset slide
  wrapper.classList.remove("left-slide", "center-slide", "right-slide");

  const index = Number(el.dataset.index);

  if (index === 0) wrapper.classList.add("left-slide");
  if (index === 1) wrapper.classList.add("center-slide");
  if (index === 2) wrapper.classList.add("right-slide");

  // posisi peluncur
  const btn = el.getBoundingClientRect();
  const nav = navigasi.getBoundingClientRect();
  const x = btn.left - nav.left + btn.width / 2;

  peluncur.style.left = `${x}px`;
}
window.addEventListener("load", () => {
  const tombolTengah = document.querySelector('.tombol[data-index="1"]');
  gulir(tombolTengah);
});
