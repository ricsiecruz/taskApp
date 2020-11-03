// var app = angular.module('taskApp', ['ui.router']);
var app = angular.module('taskApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  console.log('er')
  $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'src/assets/main.html'
        })
        .state('home.list', {
            url: '/list',
            templateUrl: 'assets/task.group.detailed.html'
        })
        .state('home.third', {
            url: '/third',
            templateUrl: 'src/assets/task.group.detailed.html'
        })


  // App.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$uibTooltipProvider', '$sceDelegateProvider',
  //   function ($stateProvider, $urlRouterProvider, $httpProvider, $uibTooltipProvider, $sceDelegateProvider) {
  //       // Tooltips and Popovers configuration
  //       $httpProvider.interceptors.push('interceptor');
  //       $uibTooltipProvider.options({
  //           appendToBody: true
  //       });
  //       // Router configration
  //       $urlRouterProvider.otherwise('/main');
  //       $urlRouterProvider.when('/settings', '/settings/basic-profile');
  //       $urlRouterProvider.when('/admin/', '/admin/dashboard');
  //       $urlRouterProvider.when('/admin', '/admin/dashboard');
  //       $sceDelegateProvider.resourceUrlWhitelist([
  //           // Allow same origin resource loads.
  //           'self',
  //           // Allow loading from our assets domain.  Notice the difference between * and **.
  //           'https://countryapi.gear.host/**'
  //       ]);

  //       $stateProvider
  //           .state('main', {
  //               url: '/main',
  //               views: {
  //                   'header': {
  //                       templateUrl: 'assets/views/header.html',
  //                       controller: 'MainHeaderCtrl'
  //                   },
  //                   'main': {
  //                       templateUrl: 'assets/views/main.html',
  //                       controller: 'MainCtrl'
  //                   },
  //                   'footer': {
  //                       templateUrl: 'assets/views/footer.html'
  //                   }
  //               }, 
  //                data:{
  //                   requiresUserLogin: false
  //               },
  //           })
  //           .state('main.main', {
  //               url: '/main',
  //               views: {
  //                   'main': {
  //                       templateUrl: 'assets/views/main.html'
  //                   }
  //               }
  //           })
  //           .state('signup', {
  //               url: '/signup',
  //               views:
  //               {
  //                   'header': {
  //                       templateUrl: 'assets/views/header.html',
  //                       controller: 'MainHeaderCtrl'
  //                   },
  //                   'main': {
  //                       templateUrl: 'assets/views/signup.html',
  //                       controller: 'signUpCtrl'
  //                   },
  //                   'footer': {
  //                       templateUrl: 'assets/views/footer.html'
  //                   }
  //               },
  //               data:{
  //                   mustbeLoggedOut: true
  //               }
  //           })
});

'use strict'
// var app = angular.module('taskApp', ['ui.router']);
app.factory('localdb', localdb);
app.controller('mainCtrl',mainCtrl); 

function mainCtrl($scope, localdb) {
  var vm = this;
  vm.name = '';
  vm.data = localdb.select('sample');
  vm.eid=0;
  vm.enableEdit=false;
  
  vm.submit = submit;
  vm.remove = remove;
  vm.update = updateName;
  vm.editClick=editClik;
  vm.readVariable=readVariable;

  function readVariable(id, name){
        vm.eid = id
        vm.name = name;
        console.log(id, name);  //it works!
    }

  function submit(name) {
    console.log('Submit is called');
    localdb.insert('sample', {
      name: name,
      _id: parseInt(Math.random() * 1000)
    });
    vm.name='';
    vm.data = localdb.select('sample');
  }
  function editClik(name,id){
    console.log(name,id);
    vm.name=name;
    vm.eid=id;
     vm.enableEdit=true;
  }
  function remove(id) {
    var result = localdb.delete('sample', id);
    if (result) {
      vm.data = localdb.select('sample');
    }
  }

  function updateName(id, name) {
    console.log(id,name);
    var result = localdb.update('sample', id, {
      name: name
    });
    if(result){
      vm.name='';
      vm.eid=0;
      vm.enableEdit=false;
      vm.data = localdb.select('sample');
    }
    else{
      alert('update failed');
    }
  }
}

function localdb() {
  return {
    insert: insert,
    select: getLDB,
    delete: removeItem,
    update: update,
  };

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  function createLDB(collection, data) {
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      console.log('insertion', JSON.stringify(data));
      localStorage.setItem(collection, JSON.stringify(data));
    } else {
      console.log('no localstorage support')
    }
  }

  function getLDB(collection, mode) {
    if (typeof(Storage) !== "undefined") {
      var data = JSON.parse(localStorage.getItem(collection));
      if (data) {
        if (typeof mode != 'undefined' && mode == 'native') {
          return data;
        }
        var result = [];
        //console.log(data);
        Object.keys(data).forEach(function(key) {
          result.push(data[key]);
        });
        return result;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function retriveLDB(collection, id) {
    if (typeof id != 'undefined' && typeof collection != 'undefined') {
      if (getLDB(collection)[id] != 'undefined') {
        return getLDB(collection)[id];
      } else {
        return {};
      }
    } else return null;
  }

  function insert(collection, item) {
    var data = getLDB(collection, 'native');
    console.log(data);
    if (data) {
      console.log('if working');
      if (typeof item._id == 'undefined') {
        item._id = 'uid'
        data['uid'] = item;
      } else {
        console.log('if fata', data);
        data[item._id] = item;
      }
      console.log('data found', data);
      createLDB(collection, data);
    } else {
      console.log('else working');
      data = {};
      if (typeof item._id == 'undefined') {
        item._id = 'uid';
        data['uid'] = item;
      } else {
        data[item._id] = item;
      }
      createLDB(collection, data);
    }

  }

  function update(collection, id, item) {
    console.log(collection, id, item);
    if (typeof collection != 'undefined' && typeof id != 'undefined' && typeof item != 'undefined') {
      var data = getLDB(collection, 'native');
      if (data && data[id]) {
        Object.keys(item).forEach(function(element) {
          data[id][element] = item[element];
        });
        console.log(data);
        createLDB(collection, data);
        return data;
      } else {
        return false;
      }

    }
  }

  function removeItem(collection, id) {
    console.log('remove data working');
    if (typeof collection != 'undefined' && typeof id != 'undefined') {
      var data = getLDB(collection, 'native');
      console.log(data);
      if (data[id]) {
        delete data[id];
        createLDB(collection, data)
        return true;
      } else {
        return false;
      }
    } else return false;

  }
}