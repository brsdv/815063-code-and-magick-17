'use strict';

var setupDialog = document.querySelector('.setup');
var dialogHandle = setupDialog.querySelector('.upload');
var closeDialog = setupDialog.querySelector('.setup-close');
var shopElement = document.querySelector('.setup-artifacts-shop');
var artifactsElement = document.querySelector('.setup-artifacts');
var draggedItem = null;

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordinate = {
    x: evt.clientX,
    y: evt.clientY
  };

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

  var clickCloseHandler = function (evtClick) {
    evtClick.preventDefault();
    setupDialog.style.left = startCoordinate.x + 'px'; // Беру стартовые координаты, но они уже измененные и получается совсес не стартовые
    setupDialog.style.top = startCoordinate.y + 'px';
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
  closeDialog.addEventListener('click', clickCloseHandler);
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
