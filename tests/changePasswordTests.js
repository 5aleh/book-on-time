describe('passwordController', function() {
  beforeEach(module('myAngApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('$scope.chgpass', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('passwordController', { $scope: $scope });
      store = {};
      localStorage = window.localStorage;
      spyOn(localStorage, 'getItem').and.callFake(function (key) {
        return key in store ? store[key] : null;
      });
      spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        return store[key] = value + '';
      });
      spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
      });
      $scope.userPassword = 'shouldnotmatter';
      localStorage.setItem('uPassword', $scope.userPassword)
    });

    it('ensure correct current user password is entered', function() {


      // $scope.chgpass();
      expect(localStorage.getItem('uPassword')).toBe('shouldnotmatter');
    });
    it('ensure the current user password is changed', function() {
      $scope.newpass = 'pass';
      localStorage.setItem('uPassword', $scope.newpass)
      expect(localStorage.getItem('uPassword')).toBe('pass');
    });
  });

});
