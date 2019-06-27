'use strict';

(function () {
  var profileStartX; // Стартовая координата X
  var profileStartY; // Стартовая координата Y
  var setupDialog = document.querySelector('.setup');
  var form = setupDialog.querySelector('.setup-wizard-form');
  var dialogHandle = setupDialog.querySelector('.upload');
  var profileOpen = document.querySelector('.setup-open'); // Иконка профиля
  var profileClose = setupDialog.querySelector('.setup-close'); // Иконка закрытия поп-апа
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  // Записываем начальные координаты поп-апa
  var setStartPosition = function () {
    setupDialog.style.left = profileStartX + 'px';
    setupDialog.style.top = profileStartY + 'px';
  };

  // Закрытие поп-апа на ESC если не активно поле ввода имени
  var PopupKeydownHandler = function (evt) {
    window.util.escKeyEvent(evt, closePopup);
  };

  var openPopup = function () {
    setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', PopupKeydownHandler);
    // Запоминаем координаты поп-апа при открытии
    profileStartX = setupDialog.offsetLeft;
    profileStartY = setupDialog.offsetTop;
  };

  var closePopup = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', PopupKeydownHandler);
    setStartPosition();
  };

  profileOpen.addEventListener('click', function () {
    openPopup();
  });

  profileOpen.addEventListener('keydown', function (evt) {
    window.util.enterKeyEvent(evt, openPopup);
  });

  profileClose.addEventListener('click', function () {
    closePopup();
  });

  profileClose.addEventListener('keydown', function (evt) {
    window.util.enterKeyEvent(evt, closePopup);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinate = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Флаг закрузки аватара
    var dragged = false;

    var mouseMoveHandler = function (evtMove) {
      evtMove.preventDefault();
      dragged = true;

      var shift = {
        x: startCoordinate.x - evtMove.clientX,
        y: startCoordinate.y - evtMove.clientY
      };

      startCoordinate = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
      setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
    };

    var mouseUpHandler = function (evtUp) {
      evtUp.preventDefault();

      // Если флаг true сбрасываем дефолтное поводение загрузки аватара
      if (dragged) {
        var ClickPreventDefaultHandler = function (evtDrag) {
          evtDrag.preventDefault();
          dialogHandle.removeEventListener('click', ClickPreventDefaultHandler);
        };
        dialogHandle.addEventListener('click', ClickPreventDefaultHandler);
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });

  var successHandler = function () {
    closePopup();
  };

  var errorHandler = function (err) {
    var setupFooter = document.querySelector('.setup-footer');
    var errorElement = document.createElement('div');
    errorElement.style.backgroundColor = 'red';
    errorElement.style.borderBottom = '3px solid #a94545';
    errorElement.style.color = 'white';
    errorElement.style.fontSize = '20px';
    errorElement.style.textAlign = 'center';
    errorElement.style.padding = '5px';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = err;
    setupFooter.appendChild(errorElement);

    throw new Error(err);
  };

  form.addEventListener('submit', function (evt) {
    var formData = new FormData(form);

    window.backend.save(formData, successHandler, errorHandler);

    evt.preventDefault();
  });
})();
