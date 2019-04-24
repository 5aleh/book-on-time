describe('busController', function() {
  beforeEach(module('myAngApp'));

  var $controller, $location;

  beforeEach(inject(function(_$controller_, _$location_) {
    $controller = _$controller_;
    $location = _$location_
    // $location.path('/index.html');
    // $rootScope = _$rootScope_;
  }));

  describe('view bus info', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      // $location = {};
      controller = $controller('busController', { $scope: $scope });
      // browser().navigateTo('/');

      spyOn($location, 'path').and.callThrough();
      // spyOn($location, 'search');
    });

    it('allows the user to navigate to and view bus info page', function() {

      trip = {
        _id: '1234'
      }
      $scope.bookBusTrip(trip);
      expect($location.path()).toBe('/sign-in')

    });
    it('does not allow the user to navigate to and view bus info page', function() {

      expect($location.path()).not.toBe('/sign-in')

    });
  });

});
