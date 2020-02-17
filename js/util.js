'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var getRandomElementOfArray = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  var shuffleArray = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  var getRandomLengthArray = function (array) {
    return shuffleArray(array).slice(getRandomNumber(0, array.length - 1));
  };

  var collectElements = function (data, callBackFunction) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (element) {
      fragment.appendChild(callBackFunction(element));
    });
    return fragment;
  };

  var flexNormalize = function (number, forms) {
    number = Number(number);
    if (number % 100 === 11) {
      return forms[0];
    }
    var remainder = number % 10;
    switch (true) {
      case remainder === 0 || remainder > 4:
        return forms[0];
      case remainder === 1:
        return forms[1];
      default:
        return forms[2];
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElementOfArray: getRandomElementOfArray,
    shuffleArray: shuffleArray,
    getRandomLengthArray: getRandomLengthArray,
    collectElements: collectElements,
    flexNormalize: flexNormalize,
    ESCAPE_KEY: ESCAPE_KEY,
    ENTER_KEY: ENTER_KEY
  };
})();
