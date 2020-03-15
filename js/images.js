'use strict';

(function () {
  var DEFAULT_USER_AVATAR = 'img/muffin-grey.svg';
  var OFFER_IMAGE_WIDTH = 70;
  var OFFER_IMAGE_HEIGHT = 70;

  var avatarChooser = document.querySelector('#avatar');
  var userAvatar = document.querySelector('.ad-form-header__preview img');
  var offerImageChooser = document.querySelector('#images');
  var offerImageWrapper = document.querySelector('.ad-form__photo');

  var changeAvatar = function (imageFile) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      userAvatar.src = reader.result;
    });

    reader.readAsDataURL(imageFile);
  };

  avatarChooser.addEventListener('change', function () {
    changeAvatar(avatarChooser.files[0]);
  });

  var changeOfferImage = function (imageFile) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var offerImage = document.createElement('img');
      offerImage.width = OFFER_IMAGE_WIDTH;
      offerImage.height = OFFER_IMAGE_HEIGHT;
      offerImage.src = reader.result;
      offerImageWrapper.innerHTML = '';
      offerImageWrapper.appendChild(offerImage);
    });

    reader.readAsDataURL(imageFile);
  };

  offerImageChooser.addEventListener('change', function () {
    changeOfferImage(offerImageChooser.files[0]);
  });

  var resetImages = function () {
    userAvatar.src = DEFAULT_USER_AVATAR;
    offerImageWrapper.innerHTML = '';
  };

  window.images = {
    reset: resetImages
  };

})();
