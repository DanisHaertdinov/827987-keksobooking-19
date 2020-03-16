'use strict';

(function () {
  var post = window.data.post;
  var deactivatePage = window.map.deactivatePage;
  var resetFormImages = window.images.reset;

  var ESCAPE_KEY = window.util.ESCAPE_KEY;

  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');
  var roomsSelect = adForm.querySelector('#room_number');
  var guestsSelect = adForm.querySelector('#capacity');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

  var checkRoomsValidity = function () {
    var rooms = Number(roomsSelect.value);
    var guests = Number(guestsSelect.value);
    var validateText = '';
    if (rooms !== 100 && rooms < guests) {
      validateText = 'Комнат не может быть меньше чем гостей!';
    } else if (guests && rooms === 100) {
      validateText = 'Сто комнат не для гостей!';
    } else if (!guests && rooms !== 100) {
      validateText = 'Сто комнат не для гостей!';
    }
    guestsSelect.setCustomValidity(validateText);
  };

  var offerPriceListMap = {
    'flat': 1000,

    'bungalo': 0,

    'house': 5000,

    'palace': 10000,

  };

  var changePriceInput = function (value) {
    priceInput.min = offerPriceListMap[value];
    priceInput.placeholder = offerPriceListMap[value];
  };

  var synchronizeTimeSelects = function (changedSelect) {
    if (changedSelect === timeInSelect) {
      timeOutSelect.value = timeInSelect.value;
    } else {
      timeInSelect.value = timeOutSelect.value;
    }
  };

  typeSelect.addEventListener('input', function (evt) {
    changePriceInput(evt.target.value);
  });

  roomsSelect.addEventListener('input', function () {
    checkRoomsValidity();
  });

  guestsSelect.addEventListener('input', function () {
    checkRoomsValidity();
  });

  timeInSelect.addEventListener('input', function (evt) {
    synchronizeTimeSelects(evt.target);
  });

  timeOutSelect.addEventListener('input', function (evt) {
    synchronizeTimeSelects(evt.target);
  });

  var adFormPostSuccessHandler = function () {
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
    deactivatePage();
  };

  var adFormPostErrorHandler = function (errorText) {
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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    post(new FormData(adForm), adFormPostSuccessHandler, adFormPostErrorHandler);
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatePage();
  });

  adForm.addEventListener('reset', function () {
    resetFormImages();
    changePriceInput('flat');
  });

})();
