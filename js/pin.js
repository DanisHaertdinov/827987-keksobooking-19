'use strict';

(function () {
  var MAP_PIN_HEIGHT = 70;
  var MAP_PIN_WIDTH = 50;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var showMapCard = window.card.showMapCard;

  var createMapPin = function (pinData) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    mapPin.style.top = pinData.location.y - MAP_PIN_HEIGHT + 'px';
    mapPin.style.left = pinData.location.x - MAP_PIN_WIDTH / 2 + 'px';
    mapPinImg.src = pinData.author.avatar;
    mapPinImg.alt = pinData.offer.title;
    mapPin.addEventListener('click', function () {
      showMapCard(pinData);
    });
    return mapPin;
  };

  window.pin = {
    createMapPin: createMapPin
  };

})();
