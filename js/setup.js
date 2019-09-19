'use strict';

// -------- CONSTANTS --------

var WIZARD_COUNT = 4;

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var FAMILY_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Мирабелла',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYE_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// -------- DOM ELEMENTS --------

var setupElement = document.querySelector('.setup');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupSimilarListElement = document.querySelector('.setup-similar-list');

var setupSimilarElement = document.querySelector('.setup-similar');

// -------- UTILITIES --------

/**
 * Generates random int number from 0 to maxBound
 *
 * @param {number} maxBound maximal int number to generate
 *
 * @return {number} random int number from 0 to maxBound
 */
var randomInt = function (maxBound) {
  return Math.floor(Math.random() * maxBound);
};

// -------- GENERATORS --------

var generateWizard = function () {
  var nameIndex = randomInt(NAMES.length);
  var familyNameIndex = randomInt(FAMILY_NAMES.length);
  var coatColorIndex = randomInt(COAT_COLORS.length);
  var eyesColorIndex = randomInt(EYE_COLORS.length);

  return {
    name: NAMES[nameIndex] + ' ' + FAMILY_NAMES[familyNameIndex],
    coatColor: COAT_COLORS[coatColorIndex],
    eyesColor: EYE_COLORS[eyesColorIndex]
  };
};

var generateWizards = function (count) {
  var res = [];

  for (var i = 0; i < count; i++) {
    res.push(generateWizard());
  }

  return res;
};

// -------- DOM --------

var showSetup = function () {
  setupElement.classList.remove('hidden');
};

var showSetupSimilar = function () {
  setupSimilarElement.classList.remove('hidden');
};

var initWizardElement = function (wizard) {
  var element = similarWizardTemplate.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').setAttribute('fill', wizard.coatColor);
  element.querySelector('.wizard-eyes').setAttribute('fill', wizard.eyesColor);

  return element;
};

var initWizardsFragment = function (wizards) {
  var domFragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    domFragment.appendChild(initWizardElement(wizards[i]));
  }
  return domFragment;
};

// -------- INITIALIZE --------

var init = function () {
  var wizards = generateWizards(WIZARD_COUNT);
  var wizardsFragment = initWizardsFragment(wizards);
  setupSimilarListElement.appendChild(wizardsFragment);
  showSetup();
  showSetupSimilar();
};

init();
