describe('mainController', function() {
  beforeEach(module('myAngApp'));

  var $controller, $location;

  beforeEach(inject(function(_$controller_, _$location_) {
    $controller = _$controller_;
    $location = _$location_
    // $location.path('/index.html');
    // $rootScope = _$rootScope_;
  }));

  describe('view all bus availability', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      // $location = {};
      controller = $controller('mainController', { $scope: $scope });
      // browser().navigateTo('/');

      spyOn($location, 'path').and.callThrough();
      // spyOn($location, 'search');
    });

    it('allows the user to navigate to and view all bus availabilities', function() {

      $location.path('/bus');
      expect($location.path()).toBe('/bus')

    });
    it('does not allow the user to navigate to and view all bus availabilities', function() {

      $location.path('/');
      expect($location.path()).not.toBe('/bus')

    });
  });

});
