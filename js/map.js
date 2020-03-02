'use strict';

(function () {
  var ACTIVE_MAIN_MAP_PIN_HEIGHT = 84;
  var ENTER_KEY = window.util.ENTER_KEY;
  var ESCAPE_KEY = window.util.ESCAPE_KEY;
  var MAP_TOP_COORDINATE = 130;
  var MAP_BOTTOM_COORDINATE = 630;
  var MAP_LEFT_COORDINATE = 0;
  var INACTIVE_MAIN_MAP_PIN_STYLES = {
    LEFT: '570px',
    TOP: '375px'
  };
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');
  var filterForm = document.querySelector('.map__filters');
  var mainMapPin = map.querySelector('.map__pin--main');
  var isPageActivated = false;
  var get = window.data.get;
  var post = window.data.post;
  var collectElements = window.util.collectElements;
  var removeElementsByClassName = window.util.removeElementsByClassName;
  var createMapPin = window.pin.create;
  var activatePageFormElements = window.form.activatePageElements;
  var disablePageFormElements = window.form.disablePageElements;
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var mapLimits = {
    right: map.offsetWidth - mainMapPin.offsetWidth / 2,
    top: MAP_TOP_COORDINATE - ACTIVE_MAIN_MAP_PIN_HEIGHT,
    left: MAP_LEFT_COORDINATE - mainMapPin.offsetWidth / 2,
    bottom: MAP_BOTTOM_COORDINATE - ACTIVE_MAIN_MAP_PIN_HEIGHT,
  };
  var removeMapCard = window.card.remove;

  var showPins = function (pinsData) {
    map.querySelector('.map__pins').appendChild(collectElements(pinsData, createMapPin));
  };

  var requestErrorHandler = function (errorText) {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    errorMessage.querySelector('.error__message').textContent = errorText;
    errorMessage.querySelector('.error__button').addEventListener('click', function () {
      window.removeEventListener('click', errorMessageClickHandler);
      window.removeEventListener('keydown', errorMessageEscPressHandler);
      errorMessage.remove();
    });
    var errorMessageClickHandler = function () {
      window.removeEventListener('click', errorMessageClickHandler);
      errorMessage.remove();
    };
    var errorMessageEscPressHandler = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        window.removeEventListener('keydown', errorMessageEscPressHandler);
        errorMessage.remove();
      }
    };

    window.addEventListener('click', errorMessageClickHandler);
    window.addEventListener('keydown', errorMessageEscPressHandler);
    document.body.appendChild(errorMessage);
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
    adForm.classList.remove('ad-form--disabled');
    activatePageFormElements();
    get(showPins, requestErrorHandler);
    isPageActivated = true;
    mainMapPin.removeEventListener('keydown', mainMapPinEnterPressHandler);
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disablePageFormElements();
    isPageActivated = false;
    mainMapPin.addEventListener('keydown', mainMapPinEnterPressHandler);
    mainMapPin.addEventListener('mousedown', mainMapPinLeftMouseDownHandler);
    adForm.reset();
    filterForm.reset();
    removeMapCard();
    removeElementsByClassName('map__pin:not(.map__pin--main)');
    mainMapPin.style.left = INACTIVE_MAIN_MAP_PIN_STYLES.LEFT;
    mainMapPin.style.top = INACTIVE_MAIN_MAP_PIN_STYLES.TOP;
    setAdAddress();
  };

  var adFormPostHandler = function () {
    var successMessage = successMessageTemplate.cloneNode(true);

    var successMessageClickHandler = function () {
      window.removeEventListener('click', successMessageClickHandler);
      window.removeEventListener('keydown', successMessageEscPressHandler);
      successMessage.remove();
    };
    var successMessageEscPressHandler = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        window.removeEventListener('click', successMessageClickHandler);
        window.removeEventListener('keydown', successMessageEscPressHandler);
        successMessage.remove();
      }
    };

    window.addEventListener('click', successMessageClickHandler);
    window.addEventListener('keydown', successMessageEscPressHandler);
    document.body.appendChild(successMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    post(new FormData(adForm), adFormPostHandler, requestErrorHandler);
    deactivatePage();
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatePage();
  });

  deactivatePage();

})();
