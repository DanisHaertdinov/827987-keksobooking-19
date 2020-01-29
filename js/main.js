'use strict';

var NUMBER_OF_MOCKS = 8;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementOfArray = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var shuffleArray = function (array) {
  var j;
  var temp;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

var getRandomLengthArray = function (array) {
  return shuffleArray(array).slice(getRandomNumber(0, array.length - 1));
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
      title: getRandomElementOfArray(this.TITLES),
      address: this.location.x + ', ' + this.location.y,
      price: getRandomNumber(this.PRICE.MIN, this.PRICE.MAX),
      type: getRandomElementOfArray(this.TYPES),
      rooms: getRandomNumber(this.ROOMS.MIN, this.ROOMS.MAX),
      guests: getRandomNumber(this.GUESTS.MIN, this.GUESTS.MAX),
      checkIn: getRandomElementOfArray(this.CHECK_TIMES),
      checkOut: getRandomElementOfArray(this.CHECK_TIMES),
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
  var mocksArray = [];
  for (var i = 0; i < number; i++) {
    mocksArray.push(baseMock.createNewMock());
  }
  return mocksArray;
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

var showPins = function (mocks) {
  var fragment = document.createDocumentFragment();
  mocks.forEach(function (mock) {
    fragment.appendChild(createNewPin(mock));
  });
  map.querySelector('.map__pins').appendChild(fragment);
};

var mocks = createMocks(NUMBER_OF_MOCKS);
console.log(mocks);
map.classList.remove('map--faded');
showPins(mocks);
