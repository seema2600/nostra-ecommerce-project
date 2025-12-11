// ----- TOP BANNER CLOSE (collections page) -----
const banner = document.getElementById("topBanner");
const bannerClose = document.getElementById("bannerClose");

if (banner && bannerClose) {
  bannerClose.addEventListener("click", () => {
    banner.style.display = "none";
  });
}
// ----- MOBILE NAV -----
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navClose = document.getElementById("navClose");

// OPEN MENU
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

// CLOSE MENU
if (navClose && navMenu) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
}

// CLOSE MENU WHEN A LINK IS CLICKED
if (navMenu) {
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// ----- SMOOTH SCROLL FOR SAME-PAGE LINKS ON HOME -----
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      const el = document.querySelector(targetId);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  });
});

// ----- HERO SLIDER (HOME PAGE) -----
const heroSlider = document.querySelector(".hero-slider");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let heroIndex = 0;
const heroSlides = document.querySelectorAll(".hero-slide");
const heroSlidesCount = heroSlides.length;

function updateHeroSlide() {
  if (heroSlider) {
    heroSlider.style.transform = `translateX(-${heroIndex * 100}%)`;
  }
}

if (heroPrev && heroNext && heroSlider && heroSlidesCount > 0) {
  heroPrev.addEventListener("click", () => {
    heroIndex = (heroIndex - 1 + heroSlidesCount) % heroSlidesCount;
    updateHeroSlide();
  });

  heroNext.addEventListener("click", () => {
    heroIndex = (heroIndex + 1) % heroSlidesCount;
    updateHeroSlide();
  });

  // Auto play
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlidesCount;
    updateHeroSlide();
  }, 6000);
}

// ----- MOST WANTED CAROUSEL (HOME PAGE) -----
const mwCarousel = document.getElementById("mwCarousel");
const mwPrev = document.getElementById("mwPrev");
const mwNext = document.getElementById("mwNext");

if (mwCarousel && mwPrev && mwNext) {
  mwPrev.addEventListener("click", () => {
    mwCarousel.scrollBy({ left: -220, behavior: "smooth" });
  });
  mwNext.addEventListener("click", () => {
    mwCarousel.scrollBy({ left: 220, behavior: "smooth" });
  });
}

// ----- COLLECTIONS PAGE: SEARCH + FILTERS -----
const occasionCheckboxes = document.querySelectorAll(".filter-occasion");
const colorCheckboxes = document.querySelectorAll(".filter-color");
const searchInput = document.getElementById("searchInput");
const collectionCards = document.querySelectorAll(".collection-card");

function applyFilters() {
  if (collectionCards.length === 0) return;

  const activeOccasions = Array.from(occasionCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  const activeColors = Array.from(colorCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  const searchText = (searchInput?.value || "").toLowerCase().trim();

  collectionCards.forEach((card) => {
    const occasion = card.dataset.occasion;
    const color = card.dataset.color;
    const name = (card.dataset.name || "").toLowerCase();

    const occasionMatch =
      activeOccasions.length === 0 || activeOccasions.includes(occasion);

    const colorMatch =
      activeColors.length === 0 || activeColors.includes(color);

    const searchMatch = searchText === "" || name.includes(searchText);

    if (occasionMatch && colorMatch && searchMatch) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

occasionCheckboxes.forEach((cb) =>
  cb.addEventListener("change", applyFilters)
);
colorCheckboxes.forEach((cb) =>
  cb.addEventListener("change", applyFilters)
);
if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
  // run once at start
  applyFilters();
}