describe('authentication', function() {

  describe('authentication on orders', function() {

    it('should receive order', inject(function($http, $httpBackend) {

      var $scope = {};
      var order = {
        trip_id: '1111'
      }

      $http.post('http://localhost/orders', order)
        .then(function(data, status, headers, config) {
          $scope.ticket = data.data
        })
        .catch(function(data, status, headers, config) {
          $scope.valid = false;
      });

      $httpBackend
        .when('POST', 'http://localhost/orders', order)
        .respond(201, { trip_id: '1111' });

      // $httpBackend.flush();

      expect($httpBackend.flush).not.toThrow();

    }));

    it('should not receive order', inject(function($http, $httpBackend) {

      var $scope = {};
      var order = {
        trip_id: '1111'
      }

      $http.post('http://localhost/orders', order)
        .then(function(data, status, headers, config) {
          $scope.ticket = data.data
        })
        .catch(function(data, status, headers, config) {
          $scope.valid = false;
      });

      $httpBackend
        .when('POST', 'http://localhost/orders', order)
        .respond(201, { trip_id: '1111' });

      $httpBackend.flush();

      expect($httpBackend.flush).toThrow();

    }));

    it('should view order', inject(function($http, $httpBackend) {

      var $scope = {};
      var order = {
        trip_id: '1111'
      }

      $http.post('http://localhost/orders', order)
        .then(function(data, status, headers, config) {
          $scope.ticket = data.data
        })
        .catch(function(data, status, headers, config) {
          $scope.valid = false;
      });

      $httpBackend
        .when('POST', 'http://localhost/orders', order)
        .respond(201, { trip_id: '1111' });

      $httpBackend.flush();

      expect($scope.ticket).toEqual({ trip_id: '1111' });

    }));

    it('should not view order', inject(function($http, $httpBackend) {

      var $scope = {};
      var order = {
        trip_id: '1111'
      }

      $http.post('http://localhost/orders', order)
        .then(function(data, status, headers, config) {
          $scope.ticket = data.data
        })
        .catch(function(data, status, headers, config) {
          $scope.valid = false;
      });

      $httpBackend
        .when('POST', 'http://localhost/orders', order)
        .respond(201, { trip_id: '1111' });

      // $httpBackend.flush();

      expect($scope.ticket).not.toBeDefined();

    }));

    it('should provide reserved ticket', inject(function($http, $httpBackend) {

      var $scope = {};

      $http.get('http://localhost/orders')
        .then(function(data, status, headers, config) {
          $scope.valid = true;
          $scope.response = data.data;
        })
        .catch(function(data, status, headers, config) {
          $scope.valid = false;
      });

      $httpBackend
        .when('GET', 'http://localhost/orders')
        .respond(200, { trip_id: '12345' });

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect($scope.response).toEqual({ trip_id: '12345' });

    }));

    it('should not provide reserved ticket', inject(function($http, $httpBackend) {

      var $scope = {};

      $http.get('http://localhost/orders')
        .then(function(data, status, headers, config) {
          $scope.valid = true;
          $scope.response = data.data;
        })
        .catch(function(data, status, headers, config) {
          $scope.valid = false;
      });

      $httpBackend
        .when('GET', 'http://localhost/orders')
        .respond(200, { trip_id: '12345' });

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect($scope.response).toEqual({ trip_id: '12345' });

    }));

  });

});
