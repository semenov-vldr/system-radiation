const productPage = document.querySelector('.product-page');

if (productPage) {

  const slider = productPage.querySelector('.product-page__slider-wrap');

  new Swiper(slider, {
    pagination: {
      el: slider.nextElementSibling,
      clickable: true,
    },

    navigation: {
      prevEl: ".slider-nav__prev",
      nextEl: ".slider-nav__next",
    },

    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    initialSlide: 0,
  });

}






