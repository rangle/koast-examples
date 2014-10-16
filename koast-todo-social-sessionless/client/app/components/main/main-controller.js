'use strict';

angular.module('erg.main-ctrl', [
  'koast'
])

.controller('MainCtrl', function ($log, koast, $state) {
  var scope = this;
  scope.user = koast.user;
  console.log('user is?', koast.user);
  scope.showRegistrationForm = true;

  scope.login = function (form) {
    koast.user.loginLocal(form)
      .then(function (response) {
        $log.info('response:', response);
        $log.info('koast:', koast.user);
      })
      .then(null, $log.error);
  };

  scope.loginWith = function (provider) {
    koast.user.initiateOauthAuthentication(provider, $state.current.name);
  };

  scope.register = function (reg) {

    var username = reg.username;
    $log.debug(username);
    koast.user.checkUsernameAvailability(username)
      .then(function (isAvailable) {
        if (isAvailable) {
          scope.usernameTaken = false;
          koast.user.registerSocial(reg);
        } else {
          scope.usernameTaken = true;
        }
      })
      .then(null, $log.error);
  };

  scope.logout = function () {
    koast.user.logout()
      .then(null, $log.error);
  };
});
