'use strict';

(function () {
  var ENTER_KEY = 13; // Код клавишы ENTER
  var ESC_KEY = 27; // Код клавишы ESC
  var setupUserName = document.querySelector('.setup-user-name'); // Поле ввода имени Волшебника

  window.util = {
    escKeyEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY && document.activeElement !== setupUserName) {
        action();
      }
    },
    enterKeyEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    }
  };
})();
