'use strict';

(function () {
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similar = document.querySelector('.setup-similar');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat'); // Мантия волшебника
  var wizardEye = setupWizard.querySelector('.wizard-eyes'); // Глаза волшебника
  var wizardFireball = document.querySelector('.setup-fireball-wrap'); // Фаерболл волшебника
  var similarList = document.querySelector('.setup-similar-list'); // Контейнер всех волшебников
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item'); // Шаблон волшебника Document-fragmet
  similar.classList.remove('hidden');

  // Тасование массива Фишера-Йетса
  var shuffle = function (arr) {
    var j;
    var temp;

    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }

    return arr;
  };

  // Создаем разметку из шаблона для похожего волшебника
  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var loadHandler = function (wizLoad) {
    var fragment = document.createDocumentFragment();
    var randElement = shuffle(wizLoad);

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(createWizard(randElement[i]));
    }

    similarList.appendChild(fragment);
  };

  var errorHandler = function (wizErr) {
    var errorElement = document.createElement('div');
    errorElement.style.backgroundColor = 'red';
    errorElement.style.borderBottom = '3px solid #a94545';
    errorElement.style.color = 'white';
    errorElement.style.fontSize = '24px';
    errorElement.style.textAlign = 'center';
    errorElement.style.padding = '5px';
    errorElement.textContent = wizErr;
    similar.appendChild(errorElement);

    throw new Error(wizErr);
  };

  window.backend.load(loadHandler, errorHandler);

  window.colorize('coat-color', wizardCoat, coatColors);
  window.colorize('eyes-color', wizardEye, eyesColors);
  window.colorize('fireball-color', wizardFireball, fireballsColors);
})();
