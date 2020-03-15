'use strict';

(function () {
  var updatePins = window.pins.update;
  var debounce = window.util.debounce;

  var Prices = {
    LOW: 10000,
    HIGH: 50000
  };
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingFeaturesCheckboxes = document.querySelectorAll('#housing-features .map__checkbox');
  var checkedFeatures = [];

  var updateCheckedFeatures = function () {
    checkedFeatures = document.querySelectorAll('#housing-features .map__checkbox:checked');
    checkedFeatures = Array.from(checkedFeatures).map(function (element) {
      return element.value;
    });
  };

  var filterByOffer = function (pinData) {
    return pinData.hasOwnProperty('offer');
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

  var filterByGuests = function (pinData) {
    return housingGuestsSelect.value === 'any' || pinData.offer.guests === Number(housingGuestsSelect.value);
  };

  var filterByFeatures = function (pinData) {
    return checkedFeatures.every(function (feature) {
      return pinData.offer.features.includes(feature);
    });
  };

  var filterPins = function (pins) {
    return pins.filter(filterByOffer)
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByFeatures);
  };

  housingTypeSelect.addEventListener('change', debounce(function () {
    updatePins(filterPins);
  }));

  housingPriceSelect.addEventListener('change', debounce(function () {
    updatePins(filterPins);
  }));

  housingRoomsSelect.addEventListener('change', debounce(function () {
    updatePins(filterPins);
  }));

  housingGuestsSelect.addEventListener('change', debounce(function () {
    updatePins(filterPins);
  }));

  housingFeaturesCheckboxes.forEach(function (element) {
    element.addEventListener('click', debounce(function () {
      updateCheckedFeatures();
      updatePins(filterPins);
    }));
  });


})();
