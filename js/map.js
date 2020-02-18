'use strict';

var ACTIVE_MAIN_MAP_PIN_HEIGHT = 84;
var ENTER_KEY = window.util.ENTER_KEY;
var MAP_TOP_COORDINATE = 130;
var MAP_BOTTOM_COORDINATE = 630;
var MAP_LEFT_COORDINATE = 0;
var map = document.querySelector('.map');
var adFilterForm = document.querySelector('.ad-form');
var mainMapPin = map.querySelector('.map__pin--main');
var isPageActivated = false;
var mocks = window.data.mocks;
var collectElements = window.util.collectElements;
var createMapPin = window.pin.create;
var activatePageFormElements = window.form.activatePageElements;
var disablePageFormElements = window.form.disablePageElements;
var mapLimits = {
  right: map.offsetWidth - mainMapPin.offsetWidth / 2,
  top: MAP_TOP_COORDINATE - ACTIVE_MAIN_MAP_PIN_HEIGHT,
  left: MAP_LEFT_COORDINATE - mainMapPin.offsetWidth / 2,
  bottom: MAP_BOTTOM_COORDINATE - ACTIVE_MAIN_MAP_PIN_HEIGHT,
};

var showPins = function (mocksData) {
  map.querySelector('.map__pins').appendChild(collectElements(mocksData, createMapPin));
};

var setAdAddress = function () {
  var addressInput = adFilterForm.querySelector('#address');
  var x = mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2;
  var y = isPageActivated ? mainMapPin.offsetTop + ACTIVE_MAIN_MAP_PIN_HEIGHT : mainMapPin.offsetTop + mainMapPin.offsetHeight / 2;
  addressInput.value = Math.ceil(x) + ', ' + Math.ceil(y);
};

var mainMapPinLeftMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    if (!isPageActivated) {
      activatePage();
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mainMapPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (mainMapPin.offsetTop - shift.y >= mapLimits.top && mainMapPin.offsetTop - shift.y <= mapLimits.bottom) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      }
      if (mainMapPin.offsetLeft - shift.x >= mapLimits.left && mainMapPin.offsetLeft - shift.x <= mapLimits.right) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      }
      setAdAddress();
    };

    var mainMapPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.removeEventListener('mousemove', mainMapPinMouseMoveHandler);
      window.removeEventListener('mouseup', mainMapPinMouseUpHandler);
      setAdAddress();
    };
    window.addEventListener('mousemove', mainMapPinMouseMoveHandler);
    window.addEventListener('mouseup', mainMapPinMouseUpHandler);
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
  adFilterForm.classList.remove('ad-form--disabled');
  activatePageFormElements();
  showPins(mocks);
  isPageActivated = true;
  mainMapPin.removeEventListener('keydown', mainMapPinEnterPressHandler);
};

disablePageFormElements();
setAdAddress();
mainMapPin.addEventListener('mousedown', mainMapPinLeftMouseDownHandler);
mainMapPin.addEventListener('keydown', mainMapPinEnterPressHandler);


