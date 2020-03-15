'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var DEBOUNCE_INTERVAL = 500;

  var collectElements = function (data, callBackFunction) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (element) {
      fragment.appendChild(callBackFunction(element));
    });
    return fragment;
  };

  var removeElementsByClassName = function (className) {
    var elements = document.querySelectorAll('.' + className);
    if (elements.length > 0) {
      elements.forEach(function (element) {
        element.remove();
      });
    }
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

  var disableFormElements = function (form) {
    form.querySelectorAll('fieldset,input,select').forEach(function (element) {
      element.disabled = true;
    });
  };

  var activateFormElements = function (form) {
    form.querySelectorAll('fieldset,input,select').forEach(function (element) {
      element.disabled = false;
    });
  };

  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    collectElements: collectElements,
    flexNormalize: flexNormalize,
    removeElementsByClassName: removeElementsByClassName,
    ESCAPE_KEY: ESCAPE_KEY,
    ENTER_KEY: ENTER_KEY,
    activateFormElements: activateFormElements,
    disableFormElements: disableFormElements,
    debounce: debounce
  };
})();
