describe('modalController', function() {
  beforeEach(module('myAngApp'));

  var $controller, $location;

  beforeEach(inject(function(_$controller_, _$location_) {
    $controller = _$controller_;
    $location = _$location_;
  }));

  describe('check conformation page', function() {

    var $scope, controller, modalInstance;

    beforeEach(function() {

      modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('uibModalInstance.close'),
        dismiss: jasmine.createSpy('uibModalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('uibModalInstance.result.then')
        }
      }

      // modalInstance = jasmine.createSpyObj('modalInstance', ['close', 'dismiss', 'result.then']);

      $scope = {};

      controller = $controller('modalController', { $scope: $scope, $uibModalInstance: modalInstance });

      spyOn($location, 'path').and.callThrough();

    });

    it('ensures the user sees the conformation page', function() {

      expect($scope.ticketNumber).toBeDefined()

    });
    it('ensures the user does not see the conformation page', function() {

      expect($location.path()).not.toBe('/enter-info')

    });
  });

});
