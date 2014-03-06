var SmartyStreets = angular.module('SmartyStreets', ['ngResource']);

function SmartyStreetsValidation($scope, $resource) {
  $scope.smartyStreets = $resource('https://api.smartystreets.com/street-address',
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

  $scope.doSearch = function () {
    $scope.smartyStreetsResults = $scope.smartyStreets.get(
      {
        street:$scope.addressLine1,
        street2:$scope.addressLine2,
        city:$scope.city,
        state:$scope.state,
        zipcode:$scope.zipCode
      },

      function(){
        //Currently assuming non-ambiguous results AND valid results
        $scope.addressLine1 = $scope.smartyStreetsResults[0].delivery_line_1;
        $scope.city = $scope.smartyStreetsResults[0].components.city_name;
        $scope.state = $scope.smartyStreetsResults[0].components.state_abbreviation;
        $scope.zipCode = $scope.smartyStreetsResults[0].components.zipcode + '-' + $scope.smartyStreetsResults[0].components.plus4_code;
      }
    );
  };
}

function SmartyStreetsAutocomplete($scope, $resource) {
  $scope.smartyStreets = $resource('https://autocomplete-api.smartystreets.com/suggest',
  {
    'auth-id':'5041104821260679536',
    prefix:'1600 Amphitheatre Parkway',
    callback:'JSON_CALLBACK'
  },
  {get:{method:'JSONP'}});
  $scope.setStyle = function() {return {}};
  $scope.doAutoCompleteSelection = function ($event) {
    if ($event.keyCode == 9) // Tab key
    {
      $scope.smartyStreetsSuggestions.suggestions = "";
    }
    else if ($event.keyCode == 40) // Down arrow
    {
    }
    else if ($event.keyCode == 38) // Up arrow
    {
    }
  }

  $scope.doAutoComplete = _.debounce(function ($event) {
    $scope.smartyStreetsSuggestions = $scope.smartyStreets.get(
      {
        prefix:$scope.$parent.addressLine1
      },
      function(){
      }
    );
  }, 250);


  $scope.autofill = function ($suggestion) {
    $scope.$parent.addressLine1 = $suggestion.street_line
    $scope.$parent.city = $suggestion.city
    $scope.$parent.state = $suggestion.state
    $scope.smartyStreetsSuggestions.suggestions = "";
    $scope.$parent.doSearch();
  };
};
