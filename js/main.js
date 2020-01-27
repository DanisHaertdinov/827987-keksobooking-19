'use strict';

var NUMBER_OF_MOCKS = 8;
var mocks = [];
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomLengthArray = function (array) {
  return array.concat().splice(getRandomNumber(0, array.length - 1, getRandomNumber(0, array.length - 1)));
};

var baseMock = {
  avatarCount: 0,
  TITLES: [
    'Квартира',
    'Бунгало',
    'Дворец',
    'Дом',
    'Землянка',
    'Лофт',
    'Хижина',
    'Вигвам'
  ],
  X: {
    MIN: 30,
    MAX: 1150
  },
  Y: {
    MIN: 130,
    MAX: 630
  },
  PRICE: {
    MIN: 1000,
    MAX: 100000
  },
  TYPES: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],
  ROOMS: {
    MIN: 1,
    MAX: 5
  },
  GUESTS: {
    MIN: 1,
    MAX: 5
  },
  CHECK_TIMES: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  DESCRIPTION: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit consectetur adipiscing elit consectetur adipiscing elit',
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],

  getMockAvatar: function () {
    return {
      avatar: 'img/avatars/user0' + ++this.avatarCount + '.png'
    };
  },

  getMockOffer: function () {
    this.location = {
      x: getRandomNumber(this.X.MIN, this.X.MAX),
      y: getRandomNumber(this.Y.MIN, this.Y.MAX)
    };
    return {
      title: this.TITLES[getRandomNumber(0, this.TITLES.length - 1)],
      address: this.location.x + ', ' + this.location.y,
      price: getRandomNumber(this.PRICE.MIN, this.PRICE.MAX),
      type: this.TYPES[getRandomNumber(0, this.TYPES.length - 1)],
      rooms: getRandomNumber(this.ROOMS.MIN, this.ROOMS.MAX),
      guests: getRandomNumber(this.GUESTS.MIN, this.GUESTS.MAX),
      checkIn: this.CHECK_TIMES[getRandomNumber(0, this.CHECK_TIMES.length - 1)],
      checkOut: this.CHECK_TIMES[getRandomNumber(0, this.CHECK_TIMES.length - 1)],
      features: getRandomLengthArray(this.FEATURES),
      description: this.DESCRIPTION,
      photos: getRandomLengthArray(this.PHOTOS)
    };
  },

  createNewMock: function () {
    return {
      author: this.getMockAvatar(),
      offer: this.getMockOffer(),
      location: this.location
    };
  }
};

var createMocks = function (number) {
  for (var i = 0; i < number; i++) {
    mocks.push(baseMock.createNewMock());
  }
};

var createNewPin = function (mock) {
  var newPin = mapPin.cloneNode(true);
  var newPinImg = newPin.querySelector('img');
  newPin.style.top = mock.location.y - MAP_PIN_HEIGHT + 'px';
  newPin.style.left = mock.location.x - MAP_PIN_WIDTH / 2 + 'px';
  newPinImg.src = mock.author.avatar;
  newPinImg.alt = mock.offer.title;
  return newPin;
};

var showPins = function () {
  var fragment = document.createDocumentFragment();
  mocks.forEach(function (mock) {
    fragment.appendChild(createNewPin(mock));
  });
  map.querySelector('.map__pins').appendChild(fragment);
};

var init = function () {
  createMocks(NUMBER_OF_MOCKS);
  map.classList.remove('map--faded');
  showPins();
};

init();
