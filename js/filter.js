'use strict';

(function () {
  var housingTypeSelect = document.querySelector('#housing-type');
  var updatePins = window.pins.update;

  var filterByOfferType = function (pinData) {
    return housingTypeSelect.value === 'any' || pinData.offer.type === housingTypeSelect.value;
  };

  var filterPins = function (pins) {
    return pins.filter(filterByOfferType);
  };

  housingTypeSelect.addEventListener('change', function () {
    updatePins(filterPins);
  });

})();
