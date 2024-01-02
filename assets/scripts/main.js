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

var phoneInputs = document.querySelectorAll('input[data-tel-input]');
var getInputNumbersValue = function getInputNumbersValue(input) {
  return input.value.replace(/\D/g, "");
};
var onPhoneInput = function onPhoneInput(evt) {
  var input = evt.target;
  var inputNumbersValue = getInputNumbersValue(input);
  var formattedInputValue = "";
  var selectionStart = input.selectionStart;
  if (!inputNumbersValue) input.value = "";
  if (input.value.length !== selectionStart) {
    if (evt.data && /\D/g.test(evt.data)) {
      input.value = formattedInputValue;
    }
    return;
  }
  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    // Российские номера
    if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
    var firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
    formattedInputValue = firstSymbols + " ";
    if (inputNumbersValue[0] === "8") {
      //phoneInputs[0].setAttribute("pattern", ".{17,}");
      //console.log(phoneInputs[0].getAttribute("pattern"));
    }
    if (inputNumbersValue.length > 1) {
      formattedInputValue += "(" + inputNumbersValue.slice(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ") " + inputNumbersValue.slice(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += "-" + inputNumbersValue.slice(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += "-" + inputNumbersValue.slice(9, 11);
    }

    // Не российские номера
  } else formattedInputValue = "+" + inputNumbersValue;
  input.value = formattedInputValue;
};

// Стирание первого символа
var onPhoneKeyDown = function onPhoneKeyDown(evt) {
  var input = evt.target;
  if (evt.keyCode === 8 && getInputNumbersValue(input).length === 1) {
    input.value = "";
  }
};

// Вставка цифр в любое место
var onPhonePaste = function onPhonePaste(evt) {
  var pasted = evt.clipboardData || window.clipboardData;
  var input = evt.target;
  var inputNumbersValue = getInputNumbersValue(input);
  if (pasted) {
    var pastedText = pasted.getData("Text");
    if (/\D/g.test(pastedText)) {
      input.value = inputNumbersValue;
    }
  }
};
phoneInputs.forEach(function (input) {
  input.addEventListener('input', onPhoneInput);
  input.addEventListener("keydown", onPhoneKeyDown);
  input.addEventListener("paste", onPhonePaste);
});
"use strict";

var time = 1000; // ms
var step = 1;
function outNum(num, elem) {
  var n = 0;
  var t = Math.round(time / (num / step));
  var interval = setInterval(function () {
    n = n + step;
    if (n === num) clearInterval(interval);
    elem.id === "value1" ? elem.innerHTML = n + "+" : elem.innerHTML = n;
  }, t);
}
function callback(entry) {
  var id = entry.target.id;
  var target = entry.target;
  if (id === "value1") outNum(20, target);
  if (id === "value2") outNum(6, target);
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

// Подключен axios.min.js в шаблоне
var TOKEN = "6439049822:AAHuQyECo9HqHDpzRcj9qwrt384oisaNJYY";
var CHAT_ID = "-1002094796235";
var URL_API = "https://api.telegram.org/bot".concat(TOKEN, "/sendMessage");
var feedback = document.getElementById("feedback");
if (feedback) {
  var submitQuestion = function submitQuestion() {
    var submit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var feedbackContainer = feedback.querySelector(".feedback__container");
    var messageSuccess = feedback.querySelector(".body-success");
    var messageError = feedback.querySelector(".body-error");
    var alert;
    submit ? alert = messageSuccess : alert = messageError;
    feedbackContainer.classList.add("hidden");
    alert.classList.add("visible");
    setTimeout(function () {
      feedbackContainer.classList.remove("hidden");
      alert.classList.remove("visible");
    }, 5000);
  };
  var sendMsgTelegram = function sendMsgTelegram(evt) {
    evt.preventDefault();
    var form = evt.target;
    var message = "<b>\u0417\u0430\u044F\u0432\u043A\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430 \u041E\u041E\u041E \u0421\u0438\u0441\u0442\u0435\u043C\u0430 - \u0420\u0430\u0434\u0438\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435</b>\n";
    message += "<b>\u0418\u043C\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F:</b> ".concat(form.name.value, "\n");
    message += "<b>\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</b> ".concat(form.phone.value, "\n");
    axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message
    }).then(function () {
      submitQuestion();
    })["catch"](function (err) {
      console.warn(err);
      submitQuestion(false);
    });
    form.reset();
  };
  feedback.addEventListener('submit', sendMsgTelegram);
  ;
  ;
}
"use strict";

var mapFooter = document.querySelector('#footer-map');
if (mapFooter) {
  ymaps.ready(initYaMap);
  var footerCopyrightYear = document.querySelector("#footer .footer__copyright > span");
  footerCopyrightYear.textContent = "\xA9 \u041E\u041E\u041E \xAB\u0421\u0438\u0441\u0442\u0435\u043C\u0430\xBB, ".concat(new Date().getFullYear()); //© ООО «Система», 2023
}

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
  });
  menuClose.addEventListener('click', closeMobileMenu);
  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", closeMobileMenu);
  });
}
"use strict";

var loader = document.getElementById('loader');
function hideLoader() {
  loader.classList.add('hide');
  setTimeout(function () {
    loader.remove();
  }, 500);
}
;
if (loader) window.addEventListener('load', hideLoader);
"use strict";

var popup = document.getElementById("popup");
if (popup) {
  var _document$querySelect;
  var popupClose = function popupClose() {
    popup.classList.remove("js-popup-open");
    unblockScrollBody();
    formPopup.reset();
  };
  var submitPopup = function submitPopup() {
    var submit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var popupContainer = popup.querySelector(".popup__container");
    var messageSuccess = popup.querySelector(".body-success");
    var messageError = popup.querySelector(".body-error");
    var alert;
    submit ? alert = messageSuccess : alert = messageError;
    popupContainer.classList.add("hidden");
    alert.classList.add("visible");
    setTimeout(function () {
      alert.classList.remove("visible");
      popupClose();
    }, 5000);
  };
  var sendMsgTelegram = function sendMsgTelegram(evt) {
    evt.preventDefault();
    var form = evt.target;
    var message = "<b>\u0417\u0430\u044F\u0432\u043A\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430 \u041E\u041E\u041E \u0421\u0438\u0441\u0442\u0435\u043C\u0430 | \u0420\u0430\u0434\u0438\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435</b>\n";
    if (productTitle) message += "<b>\u041E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435:</b> ".concat(productTitle, "\n");
    message += "<b>\u0418\u043C\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F:</b> ".concat(form.name.value, "\n");
    message += "<b>\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</b> ".concat(form.phone.value, "\n");
    axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message
    }).then(function () {
      submitPopup();
    })["catch"](function (err) {
      console.warn(err);
      submitPopup(false);
    });
    form.reset();
  };
  popup.addEventListener('submit', sendMsgTelegram);
  var btnsOpen = document.querySelectorAll(".popup-open");
  var closePopup = popup.querySelector(".popup__close");
  var formPopup = popup.querySelector("form");
  btnsOpen.forEach(function (btnOpen) {
    btnOpen.addEventListener("click", function () {
      popup.classList.add("js-popup-open");
      blockScrollBody();
    });
  });
  closePopup.addEventListener("click", popupClose);
  document.body.addEventListener('click', function (evt) {
    if (evt.target === popup) popupClose();
  });
  ;
  var productTitle = (_document$querySelect = document.querySelector("h1.product-page__title")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent;
  ;
}
"use strict";

var productPage = document.querySelector('.product-page');
if (productPage) {
  var slider = productPage.querySelector('.product-page__slider-wrap');
  new Swiper(slider, {
    pagination: {
      el: slider.nextElementSibling,
      clickable: true
    },
    navigation: {
      prevEl: ".slider-nav__prev",
      nextEl: ".slider-nav__next"
    },
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    initialSlide: 0
  });
}