"use strict";

var html = document.querySelector('html');
var classBlockScroll = "js-block-scroll";
function blockScrollBody() {
  if (!html.classList.contains(classBlockScroll)) {
    html.classList.add(classBlockScroll);
  }
}
;
function unblockScrollBody() {
  if (html.classList.contains(classBlockScroll)) {
    html.classList.remove(classBlockScroll);
  }
}
;
function toggleBlockScrollBody() {
  if (html.classList.contains(classBlockScroll)) {
    html.classList.remove(classBlockScroll);
  } else {
    html.classList.add(classBlockScroll);
  }
}
;
"use strict";
"use strict";

var previousPosition = document.documentElement.scrollTop;
function scrollHeader(header) {
  var currentPosition = document.documentElement.scrollTop;
  if (previousPosition > currentPosition || window.scrollY < 100) {
    header.classList.remove('js-scroll');
  } else {
    header.classList.add('js-scroll');
  }
  previousPosition = currentPosition;
}
"use strict";

var time = 1000; // ms
var step = 1;
function outNum(num, elem) {
  var n = 0;
  var t = Math.round(time / (num / step));
  var interval = setInterval(function () {
    n = n + step;
    if (n === num) clearInterval(interval);
    if (elem.id === "value1") {
      elem.innerHTML = n + "+";
    } else {
      elem.innerHTML = n;
    }
  }, t);
}
function callback(entry) {
  var id = entry.target.id;
  var target = entry.target;
  if (id === "value1") outNum(100, target);
  if (id === "value2") outNum(38, target);
  if (id === "value3") outNum(24, target);
  if (id === "value4") outNum(5, target);
  if (entry.isIntersecting) observer.unobserve(target);
}
;
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(callback);
}, {
  threshold: 0.5
});
var values = document.querySelectorAll(".about-us-statistics__value");
if (values) {
  values.forEach(function (value) {
    return observer.observe(value);
  });
}
"use strict";

var mySwiper;
var swiperClients = document.querySelector('.clients__box');
mySwiper = new Swiper(swiperClients, {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    types: "bullets"
  },
  // Откл функционала, если слайдов меньше, чем нужно
  watchOverflow: true,
  // Брейк поинты (адаптив)
  breakpoints: {
    320: {
      slidesPerView: 2.5,
      spaceBetween: 16
    },
    480: {
      slidesPerView: 3.5,
      spaceBetween: 16
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 32
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 32
    },
    1100: {
      slidesPerView: 6,
      spaceBetween: 32
    }
  }
});
"use strict";

var accordionItems = document.querySelectorAll('.accordion__item'); // список элементов аккордиона

if (accordionItems) {
  var toggleClass = function toggleClass(item) {
    return item.classList.toggle('js-accordion-active');
  };
  accordionItems.forEach(function (accordionItem) {
    accordionItem.addEventListener('click', function () {
      return toggleClass(accordionItem);
    });
  });
}
"use strict";

var mapFooter = document.querySelector('#footer-map');
if (mapFooter) ymaps.ready(initYaMap);
function initYaMap() {
  var pointAddress = [59.986484, 30.287868];
  var myMap = new ymaps.Map('footer-map', {
    center: pointAddress,
    zoom: 13,
    controls: []
  });
  var placemarkAddress = new ymaps.Placemark(pointAddress, {}, {
    iconLayout: 'default#image'
    //iconImageHref: './assets/img/icons/map-baloon.svg',
    // iconImageSize: [144, 68],
    // iconImageOffset: [-70, -68]
  });

  myMap.geoObjects.add(placemarkAddress);
}
;
"use strict";

var header = document.querySelector('header.header');
if (header) {
  var closeMobileMenu = function closeMobileMenu() {
    menu.classList.remove(menuActiveClass);
    unblockScrollBody();
    header.classList.remove(menuActiveClass);
  };
  var menu = header.querySelector('.header__nav');
  var burger = header.querySelector('.header__burger');
  var menuClose = header.querySelector('.header__nav-close');
  var navLinks = header.querySelectorAll(".header__nav-link");
  var menuActiveClass = "js-menu-open";
  ;
  burger.addEventListener('click', function () {
    header.classList.add(menuActiveClass);
    menu.classList.add(menuActiveClass);
    blockScrollBody();

    // if (menu.classList.contains(menuActiveClass)) {
    //   let mc = new Hammer(menu);
    //   mc.get('swipe').set({
    //     direction: Hammer.DIRECTION_ALL,
    //   });
    //   mc.on('swipeup', closeMobileMenu);
    // }
  });

  menuClose.addEventListener('click', closeMobileMenu);
  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", closeMobileMenu);
  });
  window.addEventListener('scroll', function () {
    return scrollHeader(header);
  });
}