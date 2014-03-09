var SmartyStreets = angular.module('SmartyStreets', ['ngResource','mgcrea.ngStrap.typeahead']);

/*
 * FACTORIES
 */

SmartyStreets.factory('SmartyStreetsSuggestionFactory',function($resource, $q) {
  var smartyStreets = $resource('https://autocomplete-api.smartystreets.com/suggest',
  {
    'auth-id':'5041104821260679536',
    prefix:'1600 Amphitheatre Parkway',
    callback:'JSON_CALLBACK'
  },
  {get:{method:'JSONP'}});

  getSuggestions = function (suggestion) {
    var defer = $q.defer();
    smartyStreets.get(
      {
        prefix:suggestion
      },
      function(result){
        defer.resolve(result);
      }
    );
    return defer.promise;
  };
  return {
    getSuggestions : getSuggestions
  };
});

SmartyStreets.factory('SmartyStreetsValidationFactory',function($resource, $q) {
  var smartyStreets = $resource('https://api.smartystreets.com/street-address',
  {
    'auth-token':'5041104821260679536',
    street:'1600 Amphitheatre Parkway',
    street2:'',
    city:"Mountain View",
    state:'CA',
    zipcode:'',
    candidates:'10',
    callback:'JSON_CALLBACK'
  },
  {get:{method:'JSONP',isArray:true}});

  doValidation = function ($scope) {
    var defer = $q.defer();
    smartyStreets.get(
      {
        street:$scope.address.addressLine1,
        street2:$scope.address.addressLine2,
        city:$scope.address.city,
        state:$scope.address.state,
        zipcode:$scope.address.zipCode
      },
      function(result){
        defer.resolve(result);
      }
    );
    return defer.promise;
  };
  return {
    doValidation : doValidation
  };
});

/*
 * CONTROLLERS
 */
SmartyStreets.controller('FormController', function($scope, SmartyStreetsSuggestionFactory, SmartyStreetsValidationFactory) {
  $scope.address = '';
  $scope.getAddress = function(searchString){
    return SmartyStreetsSuggestionFactory.getSuggestions(searchString).then(function(result){
      return result.suggestions;
    });
  };

  $scope.populateFields = function(){
    $scope.address.city = $scope.address.addressLine1.city;
    $scope.address.state = $scope.address.addressLine1.state;
    $scope.address.addressLine1 = $scope.address.addressLine1.street_line;
    $scope.validateAddress();
  };

  //CONSIDER MOVING STATE HERE
  //make it a typeahead, with validation

  $scope.validateAddress = function(){
    return SmartyStreetsValidationFactory.doValidation($scope).then(function(result){
      //HANDLE AMBIGUIOUS RESULTS
      $scope.address.addressLine1 = result[0].delivery_line_1;
      $scope.address.city = result[0].components.city_name;
      $scope.address.state = result[0].components.state_abbreviation;
      $scope.address.zipCode = result[0].components.zipcode + '-' + result[0].components.plus4_code;
    });
  };
});
