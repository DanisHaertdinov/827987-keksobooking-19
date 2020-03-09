'use strict';

(function () {
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var updatePins = window.pins.update;
  var Prices = {
    LOW: 10000,
    HIGH: 50000
  };

  var filterByType = function (pinData) {
    return housingTypeSelect.value === 'any' || pinData.offer.type === housingTypeSelect.value;
  };

  var filterByPrice = function (pinData) {
    switch (housingPriceSelect.value) {
      case 'low':
        return pinData.offer.price < Prices.LOW;
      case 'middle':
        return pinData.offer.price >= Prices.LOW && pinData.offer.price <= Prices.HIGH;
      case 'high':
        return pinData.offer.price > Prices.HIGH;
      default:
        return true;
    }
  };

  var filterByRooms = function (pinData) {
    return housingRoomsSelect.value === 'any' || pinData.offer.rooms === Number(housingRoomsSelect.value);
  };

  var filterPins = function (pins) {
    return pins.filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRooms);
  };

  housingTypeSelect.addEventListener('change', function () {
    updatePins(filterPins);
  });

  housingPriceSelect.addEventListener('change', function () {
    updatePins(filterPins);
  });

  housingRoomsSelect.addEventListener('change', function () {
    updatePins(filterPins);
  });


})();
