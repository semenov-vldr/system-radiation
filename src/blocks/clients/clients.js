let mySwiper;

const swiperClients = document.querySelector('.clients__box');

mySwiper = new Swiper(swiperClients, {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    types: "bullets",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  // Откл функционала, если слайдов меньше, чем нужно
  watchOverflow: true,

  // Брейк поинты (адаптив)
  breakpoints: {
    320: {
      slidesPerView: 2.5,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 3.5,
      spaceBetween: 16,
    },

    640: {
      slidesPerView: 4,
      spaceBetween: 32,
    },

    768: {
      slidesPerView: 5,
      spaceBetween: 32,
    },

    1100: {
      slidesPerView: 6,
      spaceBetween: 32,
    },
  }

});

