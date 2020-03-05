'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var prepareRequest = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var get = function (successHandler, errorHandler) {
    var xhr = prepareRequest(successHandler, errorHandler);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var post = function (data, successHandler, errorHandler) {
    var xhr = prepareRequest(successHandler, errorHandler);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    get: get,
    post: post
  };
})();
