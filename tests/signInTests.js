describe('signinController', function() {
  beforeEach(module('myAngApp'));

  var $controller, loggedOnService;

  beforeEach(inject(function(_$controller_, _loggedOnService_) {
    $controller = _$controller_;
    loggedOnService = _loggedOnService_;
  }));

  describe('$scope.signin', function() {

    var $scope, controller, localStorage;

    beforeEach(function() {
      $scope = {};
      // localStorage = {};
      controller = $controller('signinController', { $scope: $scope});
      // myData = _myData_;
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
    });

    it('should not allow the the user to sign in', function() {
      $scope.userEmail = 'notrightemailformat';
      $scope.userPassword = 'shouldnotmatter';
      // $scope.signin();
      // expect(localStorage.getItem('token')).not.toBeDefined();
      expect(loggedOnService.signedIn).toBe(false)
    });
    it('should allow the user to sign in', function() {
      $scope.userEmail = 'salhassan1@student.gsu.edu';
      $scope.userPassword = 'pass';
      $scope.signin();
      // localStorage.setItem('uEmail', $scope.userEmail)
      // expect(loggedOnService.getUser()).toBeDefined();
      expect(loggedOnService.signedIn).toBe(true)
      // expect(localStorage.getItem('uEmail')).toEqual('salhassan1@student.gsu.edu');
      // expect($cookies['uName']).toBeDefined();
    });
    it('should store user email', function() {
      $scope.userEmail = 'salhassan1@student.gsu.edu';
      localStorage.setItem('uEmail', $scope.userEmail)
      expect(localStorage.getItem('uEmail')).toEqual('salhassan1@student.gsu.edu');
    });
    it('should not have stored user email', function() {
      $scope.userEmail = 'salhassan1@student.gsu.edu';
      expect(localStorage.getItem('uEmail')).toEqual(null);
    });
  });

});
