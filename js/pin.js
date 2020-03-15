'use strict';

(function () {
  var showMapCard = window.card.show;

  var ESCAPE_KEY = window.util.ESCAPE_KEY;
  var MAP_PIN_HEIGHT = 70;
  var MAP_PIN_WIDTH = 50;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var activePin;

  var createMapPin = function (pinData) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    mapPin.style.top = pinData.location.y - MAP_PIN_HEIGHT + 'px';
    mapPin.style.left = pinData.location.x - MAP_PIN_WIDTH / 2 + 'px';
    mapPinImg.src = pinData.author.avatar;
    mapPinImg.alt = pinData.offer.title;
    mapPin.addEventListener('click', function () {
      activatePin(mapPin);
      showMapCard(pinData);
    });
    return mapPin;
  };

  var activatePin = function (pin) {
    if (activePin) {
      deactivatePin();
    }
    pin.classList.add('map__pin--active');
    activePin = pin;
    document.addEventListener('keydown', activePinEscPressHandler);
  };

  var deactivatePin = function () {
    activePin.classList.remove('map__pin--active');
    activePin = undefined;
    document.removeEventListener('keydown', activePinEscPressHandler);
  };

  var activePinEscPressHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      deactivatePin();
    }
  };

  window.pin = {
    create: createMapPin
  };

})();
