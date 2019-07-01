'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // мс

  var lastTimeout;

  // Добавление тайм-аута при клике на цвет
  window.debounce = function (diff) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(diff, DEBOUNCE_INTERVAL);
  };
})();
