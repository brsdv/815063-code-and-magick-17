'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var profileWizard = document.querySelector('.setup');
profileWizard.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

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

similarListElement.appendChild(renderWizardElement());

var similarList = document.querySelector('.setup-similar');
similarList.classList.remove('hidden');
