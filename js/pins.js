'use strict';

(function () {
  var activateFormElements = window.util.activateFormElements;
  var removeElementsByClassName = window.util.removeElementsByClassName;
  var collectElements = window.util.collectElements;
  var removeMapCard = window.card.remove;
  var loadPins = window.data.get;
  var createMapPin = window.pin.create;

  var PINS_TO_SHOW = 5;
  var map = document.querySelector('.map');
  var filterForm = document.querySelector('.map__filters');
  var offers = [];

  var showPins = function (pinsData) {
    map.querySelector('.map__pins').appendChild(collectElements(pinsData.slice(0, PINS_TO_SHOW), createMapPin));
  };

  var pinsLoadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var pinsLoadSuccessHandler = function (response) {
    offers = response.slice();
    showPins(offers);
    activateFormElements(filterForm);
  };

  var renderPins = function () {
    loadPins(pinsLoadSuccessHandler, pinsLoadErrorHandler);
  };

  var removePins = function () {
    removeElementsByClassName('map__pin:not(.map__pin--main)');
  };

  var updatePins = function (callback) {
    var updatedPins = callback(offers);
    removeMapCard();
    removePins();
    showPins(updatedPins);
  };

  window.pins = {
    render: renderPins,
    remove: removePins,
    update: updatePins
  };

})();
