angular.module('taskApp', ['ngStorage'])
  .controller('MainCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {

    // Set a total score variable equal to zero
    $scope.total = 0;

    // NOTE: use d3.js for data visualization in widget

    var gameData = [
      {
        "level": "Level One",
        "points": 30,
        "max": 100,
        "completed": false
      },
      {
        "level": "Level Two",
        "points": 50,
        "max": 100,
        "completed": false   
      }
    ];

    // tie the game JSON to the view
    $scope.gameData = gameData; 
    
    // tie the view to ngModule which saves the JSON to localStorage
    $localStorage.gameData = gameData;

    // loop through the gameData and sum all the values where the key = 'points'



    console.log("Your current score is: " + $scope.total)
    $localStorage.total = $scope.total;

    $scope.addToLevel = function(level, num){
       $scope.levelPoints = gameData[level].points += num;
       console.log("You have " + $scope.levelPoints + " points in Level");
    }


    // create a function that loops the json to check if the points >= max 
      // and if so
        // then change completed to true
   
    $scope.calcTotal = function(){
        for (var i in $scope.gameData){
          var level = $scope.gameData[i];
          $scope.total += level.points;
      }
      $localStorage.total = $scope.total;
    };


    $scope.calcTotal();



  }])