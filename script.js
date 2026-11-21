// 1. ORIGINAL IPHONE MODELLARI VA ULARGA MOS ORIGINAL RASMLAR BAZASI
const iphoneModels = [
  {
    name: "iPhone 16 Pro Max",
    isNew: true,
    tagline: "Eng katta Super Retina XDR displey va A18 Pro kuchi.",
    price: "$1,199 dan",
    colors: ["#bfa48f", "#c2bcb2", "#3c3c3d", "#f2f1ed"],
    img: "https://images.unsplash.com/photo-1726828537956-61ae115d7d7a?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "iPhone 16 Pro",
    isNew: true,
    tagline: "Titan korpus, Kamera boshqaruvi va 4K 120 kadr/s video.",
    price: "$999 dan",
    colors: ["#bfa48f", "#c2bcb2", "#3c3c3d", "#f2f1ed"],
    img: "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "iPhone 16 Plus",
    isNew: true,
    tagline: "Keng 6.7 dyuymli ekran va kun bo‘yi yetadigan batareya.",
    price: "$899 dan",
    colors: ["#9db4f0", "#b0d4c8", "#f4b8d0", "#fafafa", "#353538"],
    img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "iPhone 16",
    isNew: true,
    tagline: "Yangi A18 chipi, Action tugmasi va 48 MP Fusion kamera.",
    price: "$799 dan",
    colors: ["#9db4f0", "#b0d4c8", "#f4b8d0", "#fafafa", "#353538"],
    img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "iPhone 15 Pro Max",
    isNew: false,
    tagline: "5x optik zum va aerokosmik titan mustahkamligi.",
    price: "$1,099 dan",
    colors: ["#8e8d8a", "#3d4555", "#f2f1ed", "#2b2b2c"],
    img: "https://images.unsplash.com/photo-1695048133021-be2def43f3b2?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "iPhone 15 Pro",
    isNew: false,
    tagline: "A17 Pro protsessori bilan o‘yinlar va foto yangi darajada.",
    price: "$899 dan",
    colors: ["#8e8d8a", "#3d4555", "#f2f1ed", "#2b2b2c"],
    img: "https://images.unsplash.com/photo-1695048132853-026f93f40f7f?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "iPhone 15",
    isNew: false,
    tagline: "Dynamic Island, USB-C va 48 MP asosiy kamera.",
    price: "$699 dan",
    colors: ["#f7d6e0", "#f9f3c2", "#d8eedc", "#d3e5f5", "#353538"],
    img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "iPhone 14",
    isNew: false,
    tagline: "Ishonchli tezlik, ajoyib tungi suratlar va yorqin displey.",
    price: "$599 dan",
    colors: ["#a7c1d9", "#e5ddea", "#f9e479", "#2c2c2e", "#faf6f2"],
    img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=85"
  }
];

// 2. TELEFONLAR RO'YXATINI CHIZISH (BOSILGANDA ALOHIDA REGISTRATSIYA OYNASIGA O'TADI)
function renderLineup() {
  const grid = document.getElementById("lineupGrid");
  if (!grid) return;

  grid.innerHTML = iphoneModels.map(phone => `
    <div class="phone-card" onclick="goToRegister('${phone.name}')">
      <div>
        <div class="phone-img-wrap">
          <img src="${phone.img}" alt="${phone.name}" loading="lazy">
        </div>
        <div class="color-dots">
          ${phone.colors.map(c => `<span style="background:${c};"></span>`).join("")}
        </div>
        <p class="badge-new">${phone.isNew ? "Yangi" : "&nbsp;"}</p>
        <h3>${phone.name}</h3>
        <p class="phone-tagline">${phone.tagline}</p>
      </div>
      <div>
        <p class="phone-price">${phone.price}</p>
        <span class="card-buy-btn">Tanlash va ro‘yxatdan o‘tish</span>
      </div>
    </div>
  `).join("");
}

// Alohida ro'yxatdan o'tish oynasiga o'tkazuvchi funksiya
function goToRegister(modelName) {
  window.location.href = `register.html?model=${encodeURIComponent(modelName)}`;
}

// 3. KARUSEL BOSHQARUVI (SLIDER + AUTOPLAY + DOTS)
let slideIndex = 0;

function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  if (!track) return;

  const slides = track.querySelectorAll(".c-card");
  const totalSlides = slides.length;

  dotsWrap.innerHTML = Array.from({ length: totalSlides }, (_, i) =>
    `<span class="c-dot ${i === 0 ? 'active' : ''}" onclick="moveCarousel(${i})"></span>`
  ).join("");

  window.moveCarousel = function(idx) {
    const visibleCount = window.innerWidth <= 860 ? 1 : 2;
    const maxIndex = Math.max(0, totalSlides - visibleCount);
    if (idx > maxIndex) slideIndex = 0;
    else if (idx < 0) slideIndex = maxIndex;
    else slideIndex = idx;

    const cardWidth = slides[0].offsetWidth + 22;
    track.style.transform = `translateX(-${slideIndex * cardWidth}px)`;

    document.querySelectorAll(".c-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === slideIndex);
    });
  };

  prevBtn.addEventListener("click", () => moveCarousel(slideIndex - 1));
  nextBtn.addEventListener("click", () => moveCarousel(slideIndex + 1));

  // Har 4.5 soniyada avtomatik siljiydi
  setInterval(() => {
    moveCarousel(slideIndex + 1);
  }, 4500);

  window.addEventListener("resize", () => moveCarousel(slideIndex));
}

// 4. MOBIL MENYU (HAMBURGER)
function initMobileNav() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("navMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// 5. REGISTER.HTML UCHUN TANLANGAN TELEFONNI KO'RSATISH VA FORMANI TEKSHIRISH
function initRegisterPage() {
  const selectEl = document.getElementById("modelSelect");
  if (!selectEl) return;

  const params = new URLSearchParams(window.location.search);
  const modelFromUrl = params.get("model");

  if (modelFromUrl) {
    selectEl.value = modelFromUrl;
  }
  updateSelectedPhonePreview();
}

function updateSelectedPhonePreview() {
  const selectEl = document.getElementById("modelSelect");
  const box = document.getElementById("selectedDeviceBox");
  if (!selectEl || !box) return;

  const chosenName = selectEl.value;
  const found = iphoneModels.find(m => m.name === chosenName) || iphoneModels[0];

  box.style.display = "flex";
  document.getElementById("selPhoneImg").src = found.img;
  document.getElementById("selPhoneName").textContent = found.name;
  document.getElementById("selPhonePrice").textContent = found.price;
}

function handleRegistration(e) {
  e.preventDefault();
  const pass = document.getElementById("passInput").value;
  const confirmPass = document.getElementById("confirmPass").value;
  const errorEl = document.getElementById("formError");

  if (pass !== confirmPass) {
    errorEl.textContent = "Parollar bir-biriga mos kelmadi. Qaytadan tekshiring.";
    return;
  }

  errorEl.textContent = "";
  const fullName = `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`;
  const model = document.getElementById("modelSelect").value;
  const storage = document.getElementById("storageSelect").value;
  const color = document.getElementById("colorSelect").value;
  const email = document.getElementById("emailInput").value;

  document.getElementById("appleRegisterForm").style.display = "none";
  document.getElementById("selectedDeviceBox").style.display = "none";

  const successBox = document.getElementById("successCard");
  successBox.style.display = "block";
  document.getElementById("successSummary").innerHTML = `
    Hurmatli <strong>${fullName}</strong>, sizning <strong>${email}</strong> Apple ID hisobingiz yaratildi.<br><br>
    Tanlangan qurilma: <strong>${model} (${storage}, ${color})</strong>. Tez orada operatorlarimiz bog‘lanadi.
  `;
}

// BARCHA FUNKSIYALARNI ISHGA TUSHIRISH
document.addEventListener("DOMContentLoaded", () => {
  renderLineup();
  initCarousel();
  initMobileNav();
  initRegisterPage();
});
