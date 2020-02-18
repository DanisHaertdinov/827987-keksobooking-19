'use strict';

var ACTIVE_MAIN_MAP_PIN_HEIGHT = 84;
var map = document.querySelector('.map');
var adFilterForm = document.querySelector('.ad-form');
var mainMapPin = map.querySelector('.map__pin--main');
var isPageActivated = false;
var mocks = window.data.mocks;
var ENTER_KEY = window.util.ENTER_KEY;

var collectElements = window.util.collectElements;
var createMapPin = window.pin.create;
var activatePageFormElements = window.form.activatePageElements;
var disablePageFormElements = window.form.disablePageElements;

var showPins = function (mocksData) {
  map.querySelector('.map__pins').appendChild(collectElements(mocksData, createMapPin));
};

var setAdAddress = function () {
  var addressInput = adFilterForm.querySelector('#address');
  var x = mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2;
  var y = isPageActivated ? mainMapPin.offsetTop + ACTIVE_MAIN_MAP_PIN_HEIGHT : mainMapPin.offsetTop + mainMapPin.offsetHeight / 2;
  addressInput.value = Math.floor(x) + ', ' + Math.floor(y);
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adFilterForm.classList.remove('ad-form--disabled');
  activatePageFormElements();
  showPins(mocks);
  isPageActivated = true;
  mainMapPin.removeEventListener('mousedown', mainMapPinLeftMouseDownHandler);
  mainMapPin.removeEventListener('keydown', mainMapPinEnterPressHandler);
};

var mainMapPinLeftMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();
    setAdAddress();
  }
};

var mainMapPinEnterPressHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
    setAdAddress();
  }
};

disablePageFormElements();
setAdAddress();
mainMapPin.addEventListener('mousedown', mainMapPinLeftMouseDownHandler);
mainMapPin.addEventListener('keydown', mainMapPinEnterPressHandler);


