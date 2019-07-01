'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIRE_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.similar = document.querySelector('.setup-similar');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat'); // Мантия волшебника
  var wizardEye = setupWizard.querySelector('.wizard-eyes'); // Глаза волшебника
  var wizardFireball = document.querySelector('.setup-fireball-wrap'); // Фаерболл волшебника
  var similarList = document.querySelector('.setup-similar-list'); // Контейнер всех волшебников
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item'); // Шаблон волшебника Document-fragmet

  // Создание разметки из шаблона для похожего волшебника
  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Редеринг похожего волшебника в Document-fragmet
  var renderWizard = function (wizards) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizards.length > 4 ? 4 : wizards.length;
    similarList.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }

    window.similar.classList.remove('hidden');
    return fragment;
  };

  // Добавляем всех похожих волшебников в DOM
  window.render = function (wizards) {
    similarList.appendChild(renderWizard(wizards));
  };

  // Объект для передачи текущего цвета
  var wizardChange = {
    onCoatChange: function (color) {},
    onEyesChange: function (color) {}
  };

  // Получаем рандомный цвет из массива
  var getRandomElement = function (arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  };

  // Записываем рондомные цвета для скрытых input'ов
  var inputColor = function (attribute, color) {
    var wizardInputs = document.querySelector('.setup-player').querySelectorAll('input');

    for (var i = 0; i < wizardInputs.length; i++) {
      var inputName = wizardInputs[i].name;
      if (inputName === attribute) {
        wizardInputs[i].value = color;
      }
    }
  };

  wizardCoat.addEventListener('click', function () {
    var currentColor = getRandomElement(COAT_COLORS);
    wizardCoat.style.fill = currentColor;

    inputColor('coat-color', currentColor);

    wizardChange.onCoatChange(currentColor);
  });

  wizardEye.addEventListener('click', function () {
    var currentColor = getRandomElement(EYES_COLORS);
    wizardEye.style.fill = currentColor;

    inputColor('eyes-color', currentColor);

    wizardChange.onEyesChange(currentColor);
  });

  wizardFireball.addEventListener('click', function () {
    var currentColor = getRandomElement(FIRE_COLORS);
    wizardFireball.style.background = currentColor;

    inputColor('fireball-color', currentColor);
  });

  window.wizard = wizardChange;
  return wizardChange;
})();
