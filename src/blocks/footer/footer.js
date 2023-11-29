const mapFooter = document.querySelector('#footer-map');

if (mapFooter) ymaps.ready(initYaMap);


function initYaMap() {
  const pointAddress = [59.986484, 30.287868];
  let myMap = new ymaps.Map('footer-map', {

    center: pointAddress,
    zoom: 13,
    controls: [],
  });
  const placemarkAddress = new ymaps.Placemark(pointAddress, {}, {
    iconLayout: 'default#image',
    //iconImageHref: './assets/img/icons/map-baloon.svg',
    // iconImageSize: [144, 68],
    // iconImageOffset: [-70, -68]
  });

  myMap.geoObjects.add(placemarkAddress);
};