'use strict';

// -------- DOM ELEMENTS --------

var setup = document.querySelector('.setup');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupSimilarList = document.querySelector('.setup-similar-list');

var setupSimilar = document.querySelector('.setup-similar');

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

// -------- UTILITIES --------

var seedToInt = function (seed, length) {
  return Math.floor(seed * length);
};

// -------- CONSTRUCTORS --------

/**
 * Generates Wizard dependong on random seeds
 *
 * @param {number} seed1 - float number from 0 to 1
 * @param {number} seed2 - the same
 * @param {number} seed3 - the same
 * @param {number} seed4 - the same
 *
 * @return {Wizard} Wizard object
 */
var initWizard = function (seed1, seed2, seed3, seed4) {
  var nameIndex = seedToInt(seed1, NAMES.length);
  var familyNameIndex = seedToInt(seed2, FAMILY_NAMES.length);
  var coatColorIndex = seedToInt(seed3, COAT_COLORS.length);
  var eyesColorIndex = seedToInt(seed4, EYE_COLORS.length);

  return {
    name: NAMES[nameIndex] + ' ' + FAMILY_NAMES[familyNameIndex],
    coatColor: COAT_COLORS[coatColorIndex],
    eyesColor: EYE_COLORS[eyesColorIndex]
  };
};

var initWizards = function (count) {
  var res = [];

  for (var i = 1; i <= count; i++) {
    res.push(initWizard(Math.random(), Math.random(), Math.random(), Math.random()));
  }

  return res;
};

// -------- DOM --------

var showSetup = function () {
  setup.classList.remove('hidden');
};

var showSetupSimilar = function () {
  setupSimilar.classList.remove('hidden');
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
  for (var i = 0; i <= wizards.length - 1; i++) {
    domFragment.appendChild(initWizardElement(wizards[i]));
  }
  return domFragment;
};

// -------- MAIN FLOW --------

var wizards = initWizards(WIZARD_COUNT);

var wizardsFragment = initWizardsFragment(wizards);

setupSimilarList.appendChild(wizardsFragment);

showSetup();

showSetupSimilar();
