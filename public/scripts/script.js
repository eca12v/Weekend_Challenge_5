var myApp=angular.module('myApp', []);
// controller for add pet view
myApp.controller('addController', ['$scope', '$http', function($scope, $http){
  $scope.addRecord = function(){
    event.preventDefault();
    // get the user input and store in an object
    var objectToSend ={
      name: $scope.nameIn,
      animal: $scope.animalIn,
      age: $scope.ageIn,
      image: $scope.imageIn
    };
    // make a call to server with object to be stored in DB
    $http({
      method: 'POST',
      url: '/addPet',
      data: objectToSend
    });
    //clears input fields
    $scope.nameIn='';
    $scope.animalIn='';
    $scope.ageIn='';
    $scope.imageIn='';
  };
}]);
// controller for show pets view
myApp.controller( 'viewController', [ '$scope', '$http', function( $scope, $http ){
  // uncomment below to get sorting in table to work, screws up the delete button though.  not sure how to get the $index to work corectly when sorting is on
  $scope.sortType = 'name';
  $scope.sortReverse = true;
  $scope.allTheRecords = [];
  $scope.viewPets = function(){
    // get call to push document data from database into an array that is linked to ng-repeat in show pets view
    $http({
      method: 'GET',
      url: '/getRecords',
    }).then( function( response ){
      $scope.allTheRecords = response.data;
      console.log( $scope.allTheRecords );
    }, function myError( response ){
      console.log( response.statusText );
    });
  };
  //function to delete pets in table.
  $scope.deletePet = function(record){
    // Initially was using $index to delete but had to change to record because sorting crewed up the $index
    console.log(record._id + '  ' + $scope.allTheRecords.indexOf(record));
    var index = $scope.allTheRecords.indexOf(record);
    var petToDelete = $scope.allTheRecords[index];
    //console.log(petToDelete._id);
    var petId = {id: petToDelete._id};
    $http({
      method: 'POST',
      url: '/deletePet',
      data: petId
    });
    $scope.allTheRecords.splice(index, 1);
  };
}]);
