describe('modalController', function() {
  beforeEach(module('myAngApp'));

  var $controller, $location;

  beforeEach(inject(function(_$controller_, _$location_) {
    $controller = _$controller_;
    $location = _$location_;
  }));

  describe('print function', function() {

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

    it('should close the modal when the user prints', function() {

      $scope.sendTicket();
      expect(modalInstance.close).toHaveBeenCalled();

    });
    it('should not close the modal if the user has not printed or been sent email ', function() {

      expect(modalInstance.close).not.toHaveBeenCalled();

    });
  });

});
