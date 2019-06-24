'use strict';

(function () {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWizard = document.querySelector('.setup-wizard'); // Svg вьюбокс волшебника
  var wizardCoat = setupWizard.querySelector('.wizard-coat'); // Мантия волшебника
  var wizardEye = setupWizard.querySelector('.wizard-eyes'); // Глаза волшебника
  var wizardFireball = document.querySelector('.setup-fireball-wrap'); // Фаерболл волшебника
  var similarList = document.querySelector('.setup-similar-list'); // Контейнер всех волшебников
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item'); // Шаблон волшебника Document-fragmet
  var similar = document.querySelector('.setup-similar');
  similar.classList.remove('hidden'); // Показываем похожих волшебников

  // Генерируем рандомные свойства объекта волшебников в массив
  var getGenerationObjects = function (name, surname, coat, eye) {
    var arrObj = [];

    for (var i = 0; i < 4; i++) {
      var randomName = name[Math.floor(Math.random() * name.length)];
      var randomSurname = surname[Math.floor(Math.random() * surname.length)];
      var randomCoatColor = coat[Math.floor(Math.random() * coat.length)];
      var randomEyeColor = eye[Math.floor(Math.random() * eye.length)];

      var obj = {
        name: randomName + ' ' + randomSurname,
        coatColor: randomCoatColor,
        eyesColor: randomEyeColor
      };

      arrObj.push(obj);
    }

    return arrObj;
  };

  var wizards = getGenerationObjects(names, surnames, coatColors, eyesColors);

  // Создаем разметку из шаблона для похожего волшебника
  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // Рендерим шаблоны в Document-fragmet
  var renderWizardElement = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }

    return fragment;
  };

  similarList.appendChild(renderWizardElement());

  window.colorize('coat-color', wizardCoat, coatColors);
  window.colorize('eyes-color', wizardEye, eyesColors);
  window.colorize('fireball-color', wizardFireball, fireballsColors);
})();
