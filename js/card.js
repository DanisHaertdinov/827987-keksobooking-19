'use strict';

(function () {
  var ESCAPE_KEY = window.util.ESCAPE_KEY;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var flexNormalize = window.util.flexNormalize;
  var collectElements = window.util.collectElements;
  var removeElementsByClassName = window.util.removeElementsByClassName;


  var roomsFlexNormalize = function (number) {
    var forms = ['комнат', 'комната', 'комнаты'];
    return flexNormalize(number, forms);
  };

  var guestsFlexNormalize = function (number) {
    var forms = ['гостей', 'гостя', 'гостей'];
    return flexNormalize(number, forms);
  };

  var offerTypeListMap = {
    'flat': 'Квартира',

    'bungalo': 'Бунгало',

    'house': 'Дом',

    'palace': 'Дворец',

  };

  var createMapCardFeature = function (featureData) {
    return mapCardTemplate
    .querySelector('.popup__feature--' + featureData)
    .cloneNode(true);
  };

  var createMapCardPhoto = function (photoSource) {
    var photo = mapCardTemplate.querySelector('.popup__photo').cloneNode(true);
    photo.src = photoSource;
    return photo;
  };


  var showMapCard = function (offerData) {
    var rooms = offerData.offer.rooms;
    var guests = offerData.offer.guests;
    var mapCard = mapCardTemplate.cloneNode(true);
    mapCard.querySelector('.popup__title').textContent = offerData.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = offerData.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
    mapCard.querySelector('.popup__type').textContent = offerTypeListMap[offerData.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = rooms + ' ' + roomsFlexNormalize(rooms) + ' для ' + guests + ' ' + guestsFlexNormalize(guests);
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('.popup__features').appendChild(collectElements(offerData.offer.features, createMapCardFeature));
    mapCard.querySelector('.popup__description').textContent = offerData.offer.description;
    mapCard.querySelector('.popup__photos').innerHTML = '';
    mapCard.querySelector('.popup__photos').appendChild(collectElements(offerData.offer.photos, createMapCardPhoto));
    mapCard.querySelector('.popup__avatar').src = offerData.author.avatar;
    removeMapCard();
    mapCard.querySelector('.popup__close').addEventListener('click', function () {
      removeMapCard();
    });
    document.addEventListener('keydown', mapCardEscPressHandler);
    map.insertBefore(mapCard, mapFiltersContainer);
  };

  var removeMapCard = function () {
    if (map.querySelector('.map__card')) {
      removeElementsByClassName('map__card');
      document.removeEventListener('keydown', mapCardEscPressHandler);
    }
  };

  var mapCardEscPressHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      removeMapCard();
    }
  };

  window.card = {
    show: showMapCard,
    remove: removeMapCard,
    escPressHandler: mapCardEscPressHandler
  };

})();
