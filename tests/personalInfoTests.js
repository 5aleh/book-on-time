describe('enterInfoController', function() {
  beforeEach(module('myAngApp'));

  var $controller, loggedOnService;

  beforeEach(inject(function(_$controller_, _loggedOnService_) {
    $controller = _$controller_;
    loggedOnService = _loggedOnService_;
  }));

  describe('personal info page', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};

      controller = $controller('enterInfoController', { $scope: $scope });

    });

    it('allows the user to enter personal info', function() {

      $scope.userTicketName = "Vicky"
      $scope.openTicket();
      expect($scope.userTicketName).toBe('Vicky')

    });
    it('does not allow the user to open ticket after entering personal info', function() {

      $scope.userTicketName = "Test"
      expect($scope.check('form')).not.toBeDefined()

    });
  });

});
