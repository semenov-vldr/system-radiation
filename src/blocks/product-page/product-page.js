const productPage = document.querySelector('.product-page');

if (productPage) {

  const slider = productPage.querySelector('.product-page__slider-wrap');

  let swiper = new Swiper(slider, {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    effect: "fade",

    navigation: {
      prevEl: '.slider-nav__prev',
      nextEl: '.slider-nav__next',
    },

    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    initialSlide: 0,
  });

}




