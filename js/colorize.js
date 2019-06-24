'use strict';

(function () {
  // Записываем рондомные цвета для стилей и скрытых input'ов
  window.colorize = function (attribute, elemWizard, arrColors) {
    var wizardInputs = document.querySelector('.setup-player').querySelectorAll('input');
    var rand = arrColors[Math.floor(Math.random() * arrColors.length)];

    if (attribute !== 'fireball-color') {
      elemWizard.style.fill = rand;
    } else {
      elemWizard.style.background = rand;
    }

    for (var i = 0; i < wizardInputs.length; i++) {
      var inputName = wizardInputs[i].getAttribute('name');

      if (inputName === attribute) {
        wizardInputs[i].value = rand;
      }
    }

    elemWizard.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.colorize(attribute, elemWizard, arrColors);
    });
  };
})();
