import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

// 장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", (event) => {
  event.stopPropagation();
});

window.addEventListener("click", () => {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

//검색
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStartEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

searchStartEl.addEventListener("click", showSearch);

searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});

searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  stopScroll();
  headerMenuEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

function playScroll() {
  document.documentElement.classList.remove("fixed");
}

function stopScroll() {
  document.documentElement.classList.add("fixed");
}

// Animation
function calculateFrame() {
  let x = 0;
  let y = 0;
  let frames = "";

  for (let i = 0; i < 60; i++) {
    frames += `${((100 / 60) * i).toFixed(2)}% { background-position: ${x}${x === 0 ? "" : "px"} ${y}${y === 0 ? "" : "px"}; }\n`;
    if (x <= -500) {
      x = 0;
      y -= 100;
      continue;
    }
    x -= 100;
  }

  return frames;
}

document.styleSheets[2].insertRule(`@keyframes sprite-icon {${calculateFrame()}}`);

//헤더 메뉴 토글
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", () => {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

//헤더 검색
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");
searchTextFieldEl.addEventListener("click", () => {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});
searchCancelEl.addEventListener("click", () => {
  headerEl.classList.remove("searching--mobile");
});

//
window.addEventListener("resize", function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

//
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");

navMenuToggleEl.addEventListener("click", function () {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", (event) => {
  event.stopPropagation();
});
navMenuShadowEl.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navEl.classList.add("menuing");
}

function hideNavMenu() {
  navEl.classList.remove("menuing");
}

// 요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => {
  io.observe(el);
});

//비디오 재생
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

//Compare section data 렌더링
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color:${color};"></li>`;
  });

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}"class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

const navigationEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /*html*/ `<li>
    <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /*html*/ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();

const mapEls = document.querySelectorAll("footer .navigations .map");
mapEls.forEach((el) => {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", () => {
    el.classList.toggle("active");
  });
});
