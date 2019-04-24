var app = angular.module('myAngApp', ['ngRoute', 'ngCookies', 'ngStorage', 'ngAnimate', 'ui.bootstrap']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller: "mainController"
    })
    .when("/my-profile", {
        templateUrl : "my-profile.html",
        controller: "profileController"
    })
    .when("/change-password", {
        templateUrl : "change-password.html",
        controller: "passwordController"
    })
    .when("/sign-in", {
        templateUrl : "sign-in.html",
        controller: "signinController"
    })
    .when("/register", {
        templateUrl : "register.html",
        controller: "registerController"
    })
    .when("/bus", {
        templateUrl : "bus.html",
        controller: "busController"
    })
    .when("/flight", {
        templateUrl : "flight.html",
        controller: "flightController"
    })
    .when("/train", {
        templateUrl : "train.html",
        controller: "trainController"
    })
    .when("/enter-info", {
        templateUrl : "enterInfo.html",
        controller: "enterInfoController"
    })
    .when("/landing-page", {
        templateUrl : "landing-page.html",
        controller: "landingpageController"
    });
})

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = "Bearer" + " " + localStorage.getItem('token');
}])

// .run(function($http, $rootScope){
//   var bus_tickets = [];
//   var ticket = {}
//   console.log(ticket)
//   $http.get("http://localhost:3000/trips/").then(function(data) {
//     trips = data.data.trips
//    for (pep in trips) {
//      if (trips[pep].trip_type === "Flight") {
//        console.log(trips[pep].location_from)
//        ticket = trips[pep]
//        bus_tickets.push(trips[pep])
//        // console.log(ticket)
//      }
//    }
//    $rootScope.$broadcast('API-loaded');
// }).catch(function(err){
//     console.log(err)
// })
//
// console.log(bus_tickets)
// })

.service('loggedOnService', function() {

  var uName = 'Sign In';
  var uEmail;
  var uPassword;
  var signedIn = false;

  addUser = function(newUser) {
    uName = newUser
  };

  getUser = function() {
    return uName
  };

  return {
    addUser: addUser,
    getUser: getUser,
    uName: uName,
    uEmail: uEmail,
    uPassword: uPassword,
    signedIn: signedIn
  };

})



.service('tripsService', ['$http', '$rootScope', function($http, $rootScope) {
  var trip = {
    day: "Monday",
    location_from: "Texas",
    location_to: "Cali",
    departure_time: "2:00",
    arrival_time: "7:00",
    total_seats: "44",
    price: "700"
  }

  var trip2 = {
    day: "Monday",
    location_from: "Texas",
    location_to: "Cali",
    departure_time: "2:00",
    arrival_time: "7:00",
    total_seats: "44",
    price: "900"
  }

  let bus_trips = []
  let flight_trips = []
  let train_trips = []
  // $rootScope.$on('$viewContentLoaded', function() {
     // bus_trips.push(trip)
     // bus_trips.push(trip2)

   let test_bus = {}
   console.log(test_bus)
  // bus_tickets.push(ticket)
  // $scope.bus_tickets = bus_tickets
  // console.log(bus_tickets[0])

  $http.get("http://localhost:3000/trips/").then(function(data) {
    console.log(data)
    // console.log(data.data.users[0].description)
    trips = data.data.trips
   for (pep in trips) {
     if (trips[pep].trip_type === "Flight") {
       //test_bus = trips[pep]
       console.log(test_bus)

       console.log(trips[pep].location_from)
       // x = {
       //   day: "Tuesday",
       //   location_from: trips[pep].location_from,
       //   location_to: trips[pep].location_to,
       //   departure_time: trips[pep].departure_time,
       //   arrival_time: trips[pep].arrival_time,
       //   total_seats: trips[pep].total_seats,
       //   price: "" + trips[pep].price
       // }
       //localStorage.setItem('trip', JSON.stringify(trips[pep]))
       // localStorage.setItem('trip', JSON.stringify(x))
       // console.log(x)
       // console.log(trips[pep])
       // bus_tickets.push(x)
        flight_trips.push(trips[pep])
        // $rootScope.$broadcast('api_loaded');
        // return
     }
     else if (trips[pep].trip_type === "Bus") {
       bus_trips.push(trips[pep])
     }
     else {
       train_trips.push(trips[pep])
     }
   }
})
console.log(test_bus)
// });
//bus_tickets.push(test_bus)
//console.log(bus_tickets)
// localStorage.reset()
// bus_tickets.push(JSON.parse(localStorage.getItem('trip')))

getBusTrips = function() {
  return bus_trips
}

getFlightTrips = function() {
  return flight_trips
}

getTrainTrips = function() {
  return train_trips
}

return {
  getBusTrips: getBusTrips,
  getFlightTrips: getFlightTrips,
  getTrainTrips: getTrainTrips
}
}])

.controller("registerController", ['$scope', '$http', '$window', 'loggedOnService', '$cookies', '$location', '$localStorage', function($scope, $http, $window, loggedOnService, $cookies, $location, $localStorage) {
  // $scope.userName = "Saleh";
  if(localStorage.getItem('signedIn')=='true'){
    $location.path('/')
  }
  console.log("Register functions being handled");
  $scope.test = "Saleh";
  $scope.newUser = function() {
      var user = {
        name: $scope.userName,
        email: $scope.userEmail,
        password: $scope.userPassword
      }
      //console.log(user);
      $http.post("http://localhost:3000/users/signup",  user).then(function(data){
        console.log(data);
        console.log(data.data.createdUser.name)
        $http.post("http://localhost:3000/users/signin",  user).then(function(data) {
          // console.log("stuff")
          // console.log(data)
          // console.log($location.path())
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('signedIn', true)
          localStorage.setItem('uName', data.data.name)
          localStorage.setItem('uId', data.data.userId)
          localStorage.setItem('uEmail', data.data.email)
          $location.path('/')
        })
        // console.log(data.data.createdUser._id)
        // console.log(data.data.createdUser.email)
        // loggedOnService.addUser(data.data.createdUser.name)
        // $cookies.put('uId', data.data.createdUser._id)
        // $cookies.put('uEmail', data.data.createdUser.email)
        // $cookies.put('uPassword', data.data.createdUser.password)
        // $cookies.put('signedIn', true)
        // $cookies.put('uName', data.data.createdUser.name);
        // loggedOnService.signedIn = true;
        // $window.location.href = '#!';
    }).catch(function(err){
      alert(err.data.message)
      console.log(err)
    })
      }
}])

.controller("profileController", ['$scope', '$http', '$cookies', 'loggedOnService', '$location', function($scope, $http, $cookies, loggedOnService, $location) {
  // $scope.userName = "Saleh";
  if(localStorage.getItem('signedIn') == undefined){
    $location.path('/')
  }
  $scope.test = "Saleh";

  $scope.userName = localStorage.getItem('uName')
  $scope.userEmail = localStorage.getItem('uEmail')
  $scope.userPhone = ""
  // $scope.userName = $cookies.get('uName')
  // $scope.userEmail = $cookies.get('uEmail')
  // $scope.userPhone = $cookies.get('uPhone')
  // $scope.userDescription = $cookies.get('uDescription')

  // console.log(loggedOnService.getUser())

  // $scope.signedIn = loggedOnService.signedIn
  // $scope.signedIn = JSON.parse($cookies.get('signedIn'))
  $scope.signedIn = localStorage.getItem('signedIn')
  $scope.signOut = function() {
    // $cookies.put('uName', 'Sign In')
    // loggedOnService.addUser('Sign In')
    // loggedOnService.signedIn = false
    // $cookies.put('signedIn', false)
    // $cookies.remove('uId')
    loggedOnService.addUser('Sign In')
    loggedOnService.signedIn = false
    localStorage.clear()
    console.log('Clicked Sign Out Button')
  };

  $scope.userUpdate = function() {
      var user = {
        name: $scope.userName,
        email: $scope.userEmail
        // description: $scope.userDescription,
        // phone: $scope.userPhone
      }

      patch = [
        {propName: "name", value: user.name},
        {propName: "email", value: user.email}
        // {propName: "description", value: user.description},
        // {propName: "phone", value: user.phone}
      ]

      console.log(patch);
      $http.patch("http://localhost:3000/users/" + localStorage.getItem('uId'),  patch).then(function(data){
        //console.log(user);
        console.log(data);
      }).catch( err => {
        console.log(err);
      })

  }
}])

.controller("signinController", ['$scope', '$http', '$window', 'loggedOnService', '$cookies', '$location', '$localStorage', function($scope, $http, $window, loggedOnService, $cookies, $location, $localStorage) {
  // $scope.userName = "Saleh";
  if(localStorage.getItem('signedIn')=='true'){
    $location.path('/')
  }
  console.log("Sign In");
  console.log("This is a Major test");
  $scope.test = "Saleh";
  var path = '/'
  if(localStorage.getItem('returnPath')){
    path = localStorage.getItem('returnPath')
  }
  console.log("Path to return to: " + path)
  $scope.signin = function() {
    loggedOnService.signedIn = true;
    console.log("works");
      var user = {
        email: $scope.userEmail,
        password: $scope.userPassword
      }
      //console.log(user);
      //bool = false;
      console.log(user.email);
      console.log(user.password);
      console.log(user);
      $http.post("http://localhost:3000/users/signin",  user).then(function(data) {
        console.log("stuff")
        console.log(data)
        console.log($location.path())
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('signedIn', true)
        localStorage.setItem('uName', data.data.name)
        localStorage.setItem('uId', data.data.userId)
        localStorage.setItem('uEmail', data.data.email)
        $location.path(path)
        // console.log(localStorage.getItem('token'))
        // console.log(data.data.users[0].description)
       //  $scope.users = users = data.data.users
       // for (pep in users) {
       //   if (users[pep].email === user.email &&  users[pep].password === user.password) {
       //     //$state.go('/main.html');
       //     $cookies.put('uId', users[pep]._id)
       //     $cookies.put('signedIn', true)
       //     $cookies.put('uName', users[pep].name)
       //     $cookies.put('uEmail', users[pep].email)
       //     $cookies.put('uPassword', users[pep].password)
       //     // $cookies.put('uPhone', users[pep].phone)
       //     // $cookies.put('uDescription', users[pep].description)
       //     loggedOnService.addUser($cookies.get('uName'))
       //     loggedOnService.uEmail = $cookies.get('uEmail')
       //     loggedOnService.uPassword = $cookies.get('uPassword')
       //     // loggedOnService.uPhone = $cookies.get('uPhone')
       //     // loggedOnService.uDescription = $cookies.get('uDescription')
       //     console.log('wowza');
       //     loggedOnService.signedIn = true;
       //
       //     $window.location.href = '#!';
       //   }
       // }
    }).catch(function(err){
      alert("Cannot sign in")
      console.log(err)
    })
    console.log('wowzdfdfa');
      }
}])
.controller("mainController", ['$scope', '$http', 'loggedOnService', '$cookies', '$animate', '$interval', '$localStorage', function($scope, $http, loggedOnService, $cookies, $animate, $interval, $localStorage) {
  // $scope.userName = "Saleh";
  console.log("Main");
  $scope.test = "Saleh";

  // console.log(loggedOnService.signedIn)
  console.log(localStorage.getItem('token'))
  console.log(localStorage.getItem('signedIn'))
  $scope.signedIn = localStorage.getItem('signedIn')
  // $scope.signedIn = loggedOnService.signedIn
  // $scope.signedIn = JSON.parse($cookies.get('signedIn'))
  console.log($scope.signedIn)
  // console.log(loggedOnService.getUser())
  // console.log($cookies.get('signedIn'))
  if(localStorage.getItem('signedIn') == undefined) {
    $scope.signedIn = loggedOnService.signedIn
    $scope.signlink = "#!sign-in"
    name = loggedOnService.getUser()
  }
  else{
    // loggedOnService.signedIn = JSON.parse($cookies.get('signedIn'))
    // $scope.signedIn = JSON.parse($cookies.get('signedIn'))
    // loggedOnService.addUser($cookies.get('uName'))
    name = localStorage.getItem('uName')
    $scope.signlink = "#!"
  }
  console.log($scope.signedIn)
  // name = $cookies.get('uName')
  // name = loggedOnService.getUser()
  // name = localStorage.getItem('uName')

  // if(loggedOnService.getUSer() != 'Sign In'){
  $scope.userName = name
  // }
// $scope.user = " Test"

  $scope.signOut = function() {
    // $cookies.put('uName', 'Sign In')
    loggedOnService.addUser('Sign In')
    loggedOnService.signedIn = false
    localStorage.clear()
    // angular.forEach($cookies, function (v, k) {
    //   $cookies.remove(k);
    // });
    // $cookies.remove('uName');
    // $cookies.remove('uEmail');
    // $cookies.remove('signedIn');
    // $cookies.remove('uId');
    // $cookies.put('signedIn', false)
    console.log('clicked')
    // console.log()
  };

  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function(img) {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      // image: '//unsplash.it/' + newWidth + '/300',
      image: img,
      text: ['Book Busses','Book Trains','Book Flights'][slides.length % 3],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  // for (var i = 0; i < 3; i++) {
    $scope.addSlide("assets/img/Bus.jpg");
    $scope.addSlide("assets/img/Trainp.jpg");
    $scope.addSlide("assets/img/Bus.jpg");
  // }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }

}])
.controller("busController", ['$scope', '$http', 'loggedOnService', '$cookies', '$animate', '$interval', '$localStorage', '$window', 'tripsService', '$location', function($scope, $http, loggedOnService, $cookies, $animate, $interval, $localStorage, $window, tripsService, $location) {

  console.log("Bus Page Functions Working");
  $scope.signedIn = localStorage.getItem('signedIn')

  if(localStorage.getItem('signedIn') == undefined) {
    $scope.signedIn = loggedOnService.signedIn
    name = loggedOnService.getUser()
  }
  else{
    name = localStorage.getItem('uName')
  }
  $scope.userName = name

  // if($cookies.get('signedIn') == undefined) {
  //   $scope.signedIn = loggedOnService.signedIn
  //   $scope.userName = loggedOnService.getUser()
  // }
  // else{
  //   loggedOnService.signedIn = JSON.parse($cookies.get('signedIn'))
  //   $scope.signedIn = JSON.parse($cookies.get('signedIn'))
  //   loggedOnService.addUser($cookies.get('uName'))
  //   $scope.userName = $cookies.get('uName')
  // }

  $scope.signOut = function() {
    loggedOnService.addUser('Sign In')
    loggedOnService.signedIn = false
    localStorage.clear()
    // $cookies.remove('uName');
    // $cookies.remove('uEmail');
    // $cookies.remove('signedIn');
    // $cookies.remove('uId');
    console.log('clicked')
  };

$scope.bus_trips = tripsService.getBusTrips()
 console.log(tripsService.getBusTrips())

 $scope.bookBusTrip = function(trip) {
   console.log(trip._id)
   if(localStorage.getItem('signedIn')) {
     localStorage.setItem('tripId', trip._id)
     localStorage.setItem('createdTicket', true)
     $location.path('/enter-info')
   }
   else {
     localStorage.setItem('returnPath', '/bus')
     $location.path('/sign-in')
     alert("Must Sign In First")
   }
 }

}])
.controller("flightController", ['$scope', '$http', 'loggedOnService', '$cookies', '$animate', '$interval', '$localStorage', '$window', 'tripsService', '$location', function($scope, $http, loggedOnService, $cookies, $animate, $interval, $localStorage, $window, tripsService, $location) {

  console.log("Flight Page Functions Working");
  $scope.signedIn = localStorage.getItem('signedIn')

  if(localStorage.getItem('signedIn') == undefined) {
    $scope.signedIn = loggedOnService.signedIn
    name = loggedOnService.getUser()
  }
  else{
    name = localStorage.getItem('uName')
  }
  $scope.userName = name

  // if($cookies.get('signedIn') == undefined) {
  //   $scope.signedIn = loggedOnService.signedIn
  //   $scope.userName = loggedOnService.getUser()
  // }
  // else{
  //   loggedOnService.signedIn = JSON.parse($cookies.get('signedIn'))
  //   $scope.signedIn = JSON.parse($cookies.get('signedIn'))
  //   loggedOnService.addUser($cookies.get('uName'))
  //   $scope.userName = $cookies.get('uName')
  // }

  $scope.signOut = function() {
    loggedOnService.addUser('Sign In')
    loggedOnService.signedIn = false
    localStorage.clear()
    // $cookies.remove('uName');
    // $cookies.remove('uEmail');
    // $cookies.remove('signedIn');
    // $cookies.remove('uId');
    console.log('clicked')
  };

$scope.flight_trips = tripsService.getFlightTrips()
 console.log(tripsService.getFlightTrips())

 $scope.bookFlightTrip = function(trip) {
   console.log(trip._id)
   if(localStorage.getItem('signedIn')) {
     localStorage.setItem('tripId', trip._id)
     localStorage.setItem('createdTicket', true)
     $location.path('/enter-info')
   }
   else {
     localStorage.setItem('returnPath', '/flight')
     $location.path('/sign-in')
     alert("Must Sign In First")
   }
 }

}])
.controller("trainController", ['$scope', '$http', 'loggedOnService', '$cookies', '$animate', '$interval', '$localStorage', '$window', 'tripsService', '$location', function($scope, $http, loggedOnService, $cookies, $animate, $interval, $localStorage, $window, tripsService, $location) {

  console.log("Train Page Functions Working");
  $scope.signedIn = localStorage.getItem('signedIn')

  if(localStorage.getItem('signedIn') == undefined) {
    $scope.signedIn = loggedOnService.signedIn
    name = loggedOnService.getUser()
  }
  else{
    name = localStorage.getItem('uName')
  }
  $scope.userName = name

  // if($cookies.get('signedIn') == undefined) {
  //   $scope.signedIn = loggedOnService.signedIn
  //   $scope.userName = loggedOnService.getUser()
  // }
  // else{
  //   loggedOnService.signedIn = JSON.parse($cookies.get('signedIn'))
  //   $scope.signedIn = JSON.parse($cookies.get('signedIn'))
  //   loggedOnService.addUser($cookies.get('uName'))
  //   $scope.userName = $cookies.get('uName')
  // }

  $scope.signOut = function() {
    loggedOnService.addUser('Sign In')
    loggedOnService.signedIn = false
    localStorage.clear()
    // $cookies.remove('uName');
    // $cookies.remove('uEmail');
    // $cookies.remove('signedIn');
    // $cookies.remove('uId');
    console.log('clicked')
  };

$scope.train_trips = tripsService.getTrainTrips()
 console.log(tripsService.getTrainTrips())

 $scope.bookTrainTrip = function(trip) {
   console.log(trip._id)
   if(localStorage.getItem('signedIn')) {
     localStorage.setItem('tripId', trip._id)
     localStorage.setItem('createdTicket', true)
     $location.path('/enter-info')
   }
   else {
     localStorage.setItem('returnPath', '/train')
     $location.path('/sign-in')
     alert("Must Sign In First")
   }
 }

}])
.controller("enterInfoController", ['$scope', '$http', '$window', 'loggedOnService', '$localStorage', '$uibModal', '$location', function($scope, $http, $window, loggedOnService, $localStorage, $uibModal, $location) {

  if(localStorage.getItem('createdTicket') == undefined){
    $location.path('/')
  }
  $scope.openTicket = function() {
    console.log("clicked")
    console.log("Selected seat is: "+$scope.selectedSeat)

    patch = {
      trip_id: localStorage.getItem('tripId')
    }

    $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    $http.patch("http://localhost:3000/users/" + localStorage.getItem('uId') + "/tickets/add",  patch).then(function(data){
      //console.log(user);
      console.log(data);
      console.log(data.data.data._id)
      localStorage.setItem('ticketNumber', data.data.data._id)
      localStorage.setItem('userTicketName', $scope.userTicketName)
      localStorage.setItem('userTicketPhone', $scope.userTicketPhone)
      localStorage.setItem('userTicketEmail', $scope.userTicketEmail)
      localStorage.setItem('selectedSeat', $scope.selectedSeat)
      // $location.path('/enter-info')
    }).then(function(data){

      localStorage.setItem('createdTicket', true)
      var modalInstance =  $uibModal.open({
        templateUrl: "ticket-modal.html",
        controller: "modalController",
        scope: $scope,
        size: '',
      });

      modalInstance.result.then(function(response){
        localStorage.removeItem('createdTicket')
        alert(response)
        $location.path('/')
      }, function() {
        alert("Ticket Sent To Your Email")
        $location.path('/')
      });

    }).catch( err => {
      console.log(err.data.message);
      if(err.data.message == "Auth failed") {
        alert("You must sign in again");
        localStorage.setItem('returnPath', '/enter-info')
        $location.path('/sign-in')
      }
    })



  }

  $scope.tripSeats = ['Row 8 Seat 8C', 'Row 17 Seat 17A', 'Row 3 Seat 3D', 'Row 6 Seat 6C']

  $scope.check = function(form) {
    // console.log(form.seatnum.$invalid)
    console.log(form)
  }

  // var modalController =

  console.log("Enter User Info Functions Working");
  $scope.signedIn = localStorage.getItem('signedIn')

  if(localStorage.getItem('signedIn') == undefined) {
    $scope.signedIn = loggedOnService.signedIn
    name = loggedOnService.getUser()
  }
  else{
    name = localStorage.getItem('uName')
  }
  $scope.userName = name

  $scope.signOut = function() {
    loggedOnService.addUser('Sign In')
    loggedOnService.signedIn = false
    localStorage.clear()
    console.log('clicked')
  };

}])
.controller('modalController', ['$scope', '$uibModalInstance', '$localStorage', function($scope, $uibModalInstance, $localStorage) {

  $scope.ticketNumber = localStorage.getItem('ticketNumber')
  $scope.userTicketName = localStorage.getItem('userTicketName')
  $scope.userTicketPhone = localStorage.getItem('ticketNumber')
  $scope.userTicketEmail = localStorage.getItem('userTicketEmail')
  $scope.selectedSeat = localStorage.getItem('selectedSeat')

  $scope.sendTicket = function() {
    $uibModalInstance.close("Ticket Sent To Your Email");
  }

  $scope.printTicket = function() {
    $uibModalInstance.close("Ticket Printed");
  }

}])
.controller("passwordController", ['$scope', '$http', '$window', 'loggedOnService', '$cookies', '$location', function($scope, $http, $window, loggedOnService, $cookies, $location) {

  if(localStorage.getItem('signedIn') == undefined){
    $location.path('/')
  }
  // console.log($cookies.get('uPassword'))
  // console.log($cookies.get('uId'))

  // $scope.signedIn = $cookies.get('signedIn')
  // $scope.userName = $cookies.get('uName')
  console.log(localStorage.getItem('token'))
  $scope.signedIn = localStorage.getItem('signedIn')
  $scope.userName = localStorage.getItem('uName')
  $scope.chgpass = function() {
    var user = {
      email: localStorage.getItem('uEmail'),
      password: $scope.userPassword
    }
    console.log('clicked')
    $http.post("http://localhost:3000/users/signin",  user).then(function(data) {
      localStorage.setItem('token', data.data.token)
      patch = {
        password: $scope.newpass
    }

      console.log(patch);
      $http.patch("http://localhost:3000/users/" + localStorage.getItem('uId') + "/password",  patch).then(function(data){
        //console.log(user);
        console.log(data);
        $location.path('/my-profile')
      }).catch( err => {
        console.log(err);
      })
    }).catch(err => {
      alert("Incorrect Password")
      console.log(err)
    })

    // if($scope.userPassword == localStorage.getItem('uPassword')) {
    //
    // }

    // $window.location.href = '#!my-profile';

  }

  $scope.signOut = function() {
    loggedOnService.addUser('Sign In')
    loggedOnService.signedIn = false
    localStorage.clear()
    console.log('clicked')
  };

}])
// .directive('carouselControls', function() {
//   return {
//     restrict: 'A',
//     link: function (scope, element, attrs) {
//       scope.goNext = function() {
//         element.isolateScope().next();
//       };
//       scope.goPrev = function() {
//         element.isolateScope().prev();
//       };
//
//     }
//   };
// })
.directive('equal', [
function() {

var link = function($scope, $element, $attrs, ctrl) {

  var validate = function(viewValue) {
    var comparisonModel = $attrs.equal;
      console.log(viewValue + ':' + comparisonModel);

    if(!viewValue || !comparisonModel){
      // It's valid because we have nothing to compare against
      ctrl.$setValidity('equal', true);
    }

    // It's valid if model is lower than the model we're comparing against
    ctrl.$setValidity('equal', viewValue === comparisonModel );
    return viewValue;
  };

  ctrl.$parsers.unshift(validate);
  ctrl.$formatters.push(validate);

  $attrs.$observe('equal', function(comparisonModel){
        return validate(ctrl.$viewValue);
  });

};

return {
  require: 'ngModel',
  link: link
};
}])
.controller("landingpageController", ['$scope', '$http', function($scope, $http, $cookies) {

}]);
