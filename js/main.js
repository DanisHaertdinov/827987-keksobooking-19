'use strict';

var NUMBER_OF_MOCKS = 8;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;
var ENTER_KEY = 'Enter';
var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var mapFiltersContainer = map.querySelector('.map__filters-container');
var adFilterForm = document.querySelector('.ad-form');
var roomsSelect = adFilterForm.querySelector('#room_number');
var guestsSelect = adFilterForm.querySelector('#capacity');
var mainMapPin = map.querySelector('.map__pin--main');
var isPageActivated = false;

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

var collectElements = function (data, callBackFunction) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (element) {
    fragment.appendChild(callBackFunction(element));
  });
  return fragment;
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
    MIN: 0,
    MAX: 1200
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

var createMapPin = function (mock) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var newPinImg = mapPin.querySelector('img');
  mapPin.style.top = mock.location.y - MAP_PIN_HEIGHT + 'px';
  mapPin.style.left = mock.location.x - MAP_PIN_WIDTH / 2 + 'px';
  newPinImg.src = mock.author.avatar;
  newPinImg.alt = mock.offer.title;
  return mapPin;
};

var showPins = function (mocks) {
  map.querySelector('.map__pins').appendChild(collectElements(mocks, createMapPin));
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adFilterForm.classList.remove('ad-form--disabled');
  setPageElementsDisableValue(false);
  showPins(mocks);
  isPageActivated = true;
};

// var flexNormalize = function (number, forms) {
//   number = Number(number);
//   if (number % 100 === 11) {
//     return forms[0];
//   }
//   var remainder = number % 10;
//   switch (true) {
//     case remainder === 0 || remainder > 4:
//       return forms[0];
//     case remainder === 1:
//       return forms[1];
//     default:
//       return forms[2];
//   }
// };

// var roomsFlexNormalize = function (number) {
//   var forms = ['комнат', 'комната', 'комнаты'];
//   return flexNormalize(number, forms);
// };

// var guestsFlexNormalize = function (number) {
//   var forms = ['гостей', 'гостя', 'гостей'];
//   return flexNormalize(number, forms);
// };

// var offerTypeListMap = {
//   'flat': 'Квартира',

//   'bungalo': 'Бунгало',

//   'house': 'Дом',

//   'palace': 'Дворец',

// };

// var createMapCardFeature = function (featureData) {
//   return mapCardTemplate
//   .querySelector('.popup__feature--' + featureData)
//   .cloneNode(true);
// };

// var createMapCardPhoto = function (photoSource) {
//   var photo = mapCardTemplate.querySelector('.popup__photo').cloneNode(true);
//   photo.src = photoSource;
//   return photo;
// };

// var showMapCard = function (offerData) {
//   var rooms = offerData.offer.rooms;
//   var guests = offerData.offer.guests;
//   var mapCard = mapCardTemplate.cloneNode(true);
//   mapCard.querySelector('.popup__title').textContent = offerData.offer.title;
//   mapCard.querySelector('.popup__text--address').textContent = offerData.offer.address;
//   mapCard.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
//   mapCard.querySelector('.popup__type').textContent = offerTypeListMap[offerData.offer.type];
//   mapCard.querySelector('.popup__text--capacity').textContent = rooms + ' ' + roomsFlexNormalize(rooms) + ' для ' + guests + ' ' + guestsFlexNormalize(guests);
//   mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkIn + ', выезд до ' + offerData.offer.checkOut;
//   mapCard.querySelector('.popup__features').innerHTML = '';
//   mapCard.querySelector('.popup__features').appendChild(collectElements(offerData.offer.features, createMapCardFeature));
//   mapCard.querySelector('.popup__description').textContent = offerData.offer.description;
//   mapCard.querySelector('.popup__photos').innerHTML = '';
//   mapCard.querySelector('.popup__photos').appendChild(collectElements(offerData.offer.photos, createMapCardPhoto));
//   mapCard.querySelector('.popup__avatar').src = offerData.author.avatar;

//   map.insertBefore(mapCard, mapFiltersContainer);
// };

var setPageElementsDisableValue = function (value) {
  document.querySelectorAll('fieldset,input,select').forEach(function (element) {
    element.disabled = value;
  });
};

mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    setAdAddress();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
    setAdAddress();
  }
});

var setAdAddress = function () {
  var addressInput = adFilterForm.querySelector('#address');
  var x = mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2;
  var y = isPageActivated ? mainMapPin.offsetTop + mainMapPin.offsetHeight : mainMapPin.offsetTop + mainMapPin.offsetHeight / 2;
  addressInput.value = Math.floor(x) + ', ' + Math.floor(y);
};

var checkRoomsValidity = function () {
  var rooms = Number(roomsSelect.value);
  var guests = Number(guestsSelect.value);
  if (rooms !== 100 && rooms < guests) {
    roomsSelect.setCustomValidity('Комнат не может быть меньше чем гостей!');
    return;
  } else if (guests && rooms !== 100) {
    roomsSelect.setCustomValidity('');
    return;
  } else {
    roomsSelect.setCustomValidity('Сто комнат не для гостей!');
    return;
  }
};

roomsSelect.addEventListener('input', function () {
  checkRoomsValidity();
});

guestsSelect.addEventListener('input', function () {
  checkRoomsValidity();
});

setPageElementsDisableValue(true);
setAdAddress();
var mocks = createMocks(NUMBER_OF_MOCKS);
// activateMap();
// showMapCard(mocks[0]);
