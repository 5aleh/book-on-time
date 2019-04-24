describe('mainController', function() {
  beforeEach(module('myAngApp'));

  var $controller, loggedOnService;

  beforeEach(inject(function(_$controller_, _loggedOnService_) {
    $controller = _$controller_;
    loggedOnService = _loggedOnService_;
  }));

  describe('sign out function', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};

      controller = $controller('mainController', { $scope: $scope });

    });

    it('allows the user to sign out', function() {

      loggedOnService.addUser("Saleh")
      $scope.signOut();
      expect(loggedOnService.getUser()).toBe('Sign In')

    });
    it('does not allow the user to sign out', function() {

      loggedOnService.addUser("Saleh")
      expect(loggedOnService.getUser()).not.toBe('Sign In')

    });
  });

});
