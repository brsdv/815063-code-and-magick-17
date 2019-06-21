'use strict';

var ENTER_KEY = 13; // Код клавишы ENTER
var ESC_KEY = 27; // Код клавишы ESC

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var profileStartX; // Переменная для стартовой координаты X
var profileStartY; // Переменная для стартовой координаты Y
var profileWizard = document.querySelector('.setup'); // Поп-ап профиль
var setupWizard = document.querySelector('.setup-wizard'); // Svg вьюбокс волшебника
var wizardCoat = setupWizard.querySelector('.wizard-coat'); // Мантия волшебника
var wizardEye = setupWizard.querySelector('.wizard-eyes'); // Глаза волшебника
var wizardFireball = document.querySelector('.setup-fireball-wrap'); // Фаерболл волшебника
var profileOpen = document.querySelector('.setup-open'); // Иконка профиля
var profileClose = profileWizard.querySelector('.setup-close'); // Иконка закрытия поп-апа
var setupUserName = profileWizard.querySelector('.setup-user-name'); // Поле ввода имени Волшебника
var similarList = document.querySelector('.setup-similar-list'); // Контейнер всех волшебников
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); // Шаблон волшебника Document-fragmet
var similar = document.querySelector('.setup-similar');
similar.classList.remove('hidden'); // Показываем похожих волшебников

// Генерируем рандомные свойства объекта волшебников в массив
var getGenerationRandomObjects = function (name, surname, coat, eye) {
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

var wizards = getGenerationRandomObjects(names, surnames, coatColors, eyesColors);

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

similarList.appendChild(renderWizardElement()); // Вставляем Document-fragmet в разметку

// Закрытие поп-апа на ESC если не активно поле ввода имени
var PopupKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEY && document.activeElement !== setupUserName) {
    closePopup();
  }
};

// Записываем начальные координаты поп-апу
var setStartPosition = function () {
  profileWizard.style.left = profileStartX + 'px';
  profileWizard.style.top = profileStartY + 'px';
};

var openPopup = function () {
  profileWizard.classList.remove('hidden');
  document.addEventListener('keydown', PopupKeydownHandler);

  // Запоминаем координаты поп-апа при открытии
  profileStartX = profileWizard.offsetLeft;
  profileStartY = profileWizard.offsetTop;
};

var closePopup = function () {
  profileWizard.classList.add('hidden');
  document.removeEventListener('keydown', PopupKeydownHandler);
  setStartPosition();
};

profileOpen.addEventListener('click', function () {
  openPopup();
});

profileOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    openPopup();
  }
});

profileClose.addEventListener('click', function () {
  closePopup();
});

profileClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    closePopup();
  }
});

// Записываем рондомные цвета для стилей и скрытых input'ов
var setupWizardColor = function (attr, wizard, random) {
  var setupWizardInputs = document.querySelector('.setup-player').querySelectorAll('input');

  if (attr !== 'fireball-color') {
    wizard.style.fill = random;
  } else {
    wizard.style.background = random;
  }

  for (var i = 0; i < setupWizardInputs.length; i++) {
    var input = setupWizardInputs[i].getAttribute('name');

    if (input === attr) {
      setupWizardInputs[i].value = random;
    }
  }
};

wizardCoat.addEventListener('click', function (evt) {
  var randomCoat = coatColors[Math.floor(Math.random() * coatColors.length)];

  evt.preventDefault();

  setupWizardColor('coat-color', wizardCoat, randomCoat);
});

wizardEye.addEventListener('click', function (evt) {
  var randomEye = eyesColors[Math.floor(Math.random() * eyesColors.length)];

  evt.preventDefault();

  setupWizardColor('eyes-color', wizardEye, randomEye);
});

wizardFireball.addEventListener('click', function (evt) {
  var randomFireball = fireballsColors[Math.floor(Math.random() * fireballsColors.length)];

  evt.preventDefault();

  setupWizardColor('fireball-color', wizardFireball, randomFireball);
});
