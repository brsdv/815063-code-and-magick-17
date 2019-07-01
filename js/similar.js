'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizardsSave = [];

  // Определение ранга волшебника похожести
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  // Сортировка массива по рангу похожести и алфавитному порядку если волшебники одинаковые
  var updateWizards = function () {
    window.render(wizardsSave.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = wizardsSave.indexOf(right) - wizardsSave.indexOf(left);
      }

      return rankDiff;
    }));
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  var successHandler = function (dataLoad) {
    wizardsSave = dataLoad;
    updateWizards();
  };

  var errorHandler = function (message) {
    var errorElement = document.createElement('div');
    errorElement.style.backgroundColor = 'red';
    errorElement.style.borderBottom = '3px solid #a94545';
    errorElement.style.color = 'white';
    errorElement.style.fontSize = '24px';
    errorElement.style.textAlign = 'center';
    errorElement.style.padding = '5px';
    errorElement.textContent = message;
    window.similar.appendChild(errorElement);

    throw new Error(message);
  };

  window.backend.load(successHandler, errorHandler);
})();
