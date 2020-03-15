'use strict';

(function () {

  var setupElement = function (element, getLimits, callback) {
    element.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        var limits = getLimits();
        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };
        var mouseMoveHandler = function (moveEvt) {
          moveEvt.preventDefault();
          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };
          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };
          if (element.offsetTop - shift.y >= limits.top && element.offsetTop - shift.y <= limits.bottom) {
            element.style.top = (element.offsetTop - shift.y) + 'px';
          }
          if (element.offsetLeft - shift.x >= limits.left && element.offsetLeft - shift.x <= limits.right) {
            element.style.left = (element.offsetLeft - shift.x) + 'px';
          }
          callback();
        };

        var mouseUpHandler = function (upEvt) {
          upEvt.preventDefault();
          window.removeEventListener('mousemove', mouseMoveHandler);
          window.removeEventListener('mouseup', mouseUpHandler);
          callback();
        };
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
      }
    });
  };

  window.dragNDrop = {
    setupElement: setupElement
  };

})();
