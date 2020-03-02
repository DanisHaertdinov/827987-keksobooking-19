'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomsSelect = adForm.querySelector('#room_number');
  var guestsSelect = adForm.querySelector('#capacity');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');

  var disablePageFormElements = function () {
    document.querySelectorAll('fieldset,input,select').forEach(function (element) {
      element.disabled = true;
    });
  };

  var activatePageFormElements = function () {
    document.querySelectorAll('fieldset,input,select').forEach(function (element) {
      element.disabled = false;
    });
  };

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
    roomsSelect.setCustomValidity(validateText);
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

  window.form = {
    activatePageElements: activatePageFormElements,
    disablePageElements: disablePageFormElements
  };

})();
