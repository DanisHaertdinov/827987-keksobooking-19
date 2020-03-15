'use strict';

(function () {
  var ACTIVE_MAIN_MAP_PIN_HEIGHT = 84;
  var ENTER_KEY = window.util.ENTER_KEY;
  var MAP_TOP_COORDINATE = 130;
  var MAP_BOTTOM_COORDINATE = 630;
  var MAP_LEFT_COORDINATE = 0;
  var INACTIVE_MAIN_MAP_PIN_STYLES = {
    LEFT: '570px',
    TOP: '375px'
  };
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var mainMapPin = map.querySelector('.map__pin--main');
  var isPageActivated = false;
  var activateFormElements = window.util.activateFormElements;
  var disableFormElements = window.util.disableFormElements;
  var removeMapCard = window.card.remove;
  var setupDragNDrop = window.dragNDrop.setupElement;
  var renderPins = window.pins.render;
  var removePins = window.pins.remove;

  var getMapLimits = function () {
    return {
      right: map.offsetWidth - mainMapPin.offsetWidth / 2,
      top: MAP_TOP_COORDINATE - ACTIVE_MAIN_MAP_PIN_HEIGHT,
      left: MAP_LEFT_COORDINATE - mainMapPin.offsetWidth / 2,
      bottom: MAP_BOTTOM_COORDINATE - ACTIVE_MAIN_MAP_PIN_HEIGHT,
    };
  };

  var setAdAddress = function () {
    var addressInput = adForm.querySelector('#address');
    var x = mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2;
    var y = isPageActivated ? mainMapPin.offsetTop + ACTIVE_MAIN_MAP_PIN_HEIGHT : mainMapPin.offsetTop + mainMapPin.offsetHeight / 2;
    addressInput.value = Math.ceil(x) + ', ' + Math.ceil(y);
  };

  var mainMapPinLeftMouseDownHandler = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      activatePage();
    }
  };

  var mainMapPinEnterPressHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
      setAdAddress();
    }
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderPins();
    activateFormElements(adForm);
    isPageActivated = true;
    mainMapPin.removeEventListener('keydown', mainMapPinEnterPressHandler);
    mainMapPin.removeEventListener('mousedown', mainMapPinLeftMouseDownHandler);
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disableFormElements(adForm);
    disableFormElements(filterForm);
    isPageActivated = false;
    mainMapPin.addEventListener('keydown', mainMapPinEnterPressHandler);
    mainMapPin.addEventListener('mousedown', mainMapPinLeftMouseDownHandler);
    adForm.reset();
    filterForm.reset();
    removeMapCard();
    removePins();
    mainMapPin.style.left = INACTIVE_MAIN_MAP_PIN_STYLES.LEFT;
    mainMapPin.style.top = INACTIVE_MAIN_MAP_PIN_STYLES.TOP;
    setAdAddress();
  };

  deactivatePage();
  setupDragNDrop(mainMapPin, getMapLimits, setAdAddress);

  window.map = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
