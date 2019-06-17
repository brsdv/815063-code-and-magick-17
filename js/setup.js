'use strict';

var ENTER_KEY = 13; // Код клавишы ENTER
var ESC_KEY = 27; // Код клавишы ESC

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var profileWizard = document.querySelector('.setup'); // DOM-элемент поп-апа
var setupWizard = document.querySelector('.setup-wizard'); // DOM-элемент svg-контейнера (вьюбокса) Волшебника
var wizardCoat = setupWizard.querySelector('.wizard-coat'); // DOM-элемент мантии Волшебника
var wizardEye = setupWizard.querySelector('.wizard-eyes'); // DOM-элемент глаз Волшебника
var wizardFireball = document.querySelector('.setup-fireball-wrap'); // DOM-элемент фаерболла Волшебника
var profileOpen = document.querySelector('.setup-open'); // DOM-элемент иконки профиля
var profileClose = profileWizard.querySelector('.setup-close'); // DOM-элемент иконки-крестика в поп-апе
var setupUserName = profileWizard.querySelector('.setup-user-name'); // DOM-элемент поля ввода имени Волшебника

var similarContainer = document.querySelector('.setup-similar');
similarContainer.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

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

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardElement = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }

  return fragment;
};

similarList.appendChild(renderWizardElement());

// Функция обработчика события на кнопку ESC (вызывать не нужно!)
var PopupKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEY && document.activeElement !== setupUserName) {
    closePopup();
  }
};

var openPopup = function () {
  profileWizard.classList.remove('hidden');
  document.addEventListener('keydown', PopupKeydownHandler);
};

var closePopup = function () {
  profileWizard.classList.add('hidden');
  document.removeEventListener('keydown', PopupKeydownHandler);
};

// Добавляю обработчик на клик, чтобы открыть поп-ап, в обработчике вызываю функцию которая добавляет обработчик на ESC
profileOpen.addEventListener('click', function () {
  openPopup();
});

// Добавляю обработчик на иконку профиля, когда она в фокусе открывать поп-ап по нажантию ENTER
profileOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    openPopup();
  }
});

// Добавляю обработчик на клик, чтобы закрыть поп-ап, в обработчике вызываю функцию которая удаляет обработчик на ESC
profileClose.addEventListener('click', function () {
  closePopup();
});

// Добавляю обработчик на кнопку-крестик в поп-апе, когда она в фокусе закрывать поп-ап по нажантию ENTER
profileClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    closePopup();
  }
});

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

/* Добавляю обработчики на клик по мантии, глаза и фаербол волшебника, у которого будет
меняться рандомно цвет, скрытое поле input так же будет принимать это значение цвета */
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
