describe('AngularJSController', function() {
    beforeEach(module('sampleApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
              $controller = _$controller_;
    }));

    describe('$scope.ID', function() {
        it('Check the scope object', function() {
            var $scope = {};
            var controller = $controller('AngularJSController', { $scope: $scope });
            expect($scope.ID).toEqual(5);
        });
    });
});
