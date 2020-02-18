'use strict';

(function () {
  var NUMBER_OF_MOCKS = 8;

  var getRandomNumber = window.util.getRandomNumber;
  var getRandomElementOfArray = window.util.getRandomElementOfArray;
  var getRandomLengthArray = window.util.getRandomLengthArray;

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

  window.data = {
    mocks: createMocks(NUMBER_OF_MOCKS)
  };
})();
