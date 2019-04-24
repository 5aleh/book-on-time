describe('enterInfoController', function() {
  beforeEach(module('myAngApp'));

  var $controller, loggedOnService;

  beforeEach(inject(function(_$controller_, _loggedOnService_) {
    $controller = _$controller_;
    loggedOnService = _loggedOnService_;
  }));

  describe('choose available seats', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};

      controller = $controller('enterInfoController', { $scope: $scope });

    });

    it('allows the user to choose available seats', function() {

      expect($scope.tripSeats[0]).toBe('Row 8 Seat 8C')

    });
    it('does not allow the user to open ticket after entering personal info', function() {

      expect($scope.tripSeats[0]).not.toBe('Not An Available Seat')

    });
  });

});
