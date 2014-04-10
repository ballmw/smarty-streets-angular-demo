angular.module('org.crossroads.smartyStreets.services', ['ngResource', 'smartyStreetsConfig']);

/*
 * FACTORIES
 */

angular.module('org.crossroads.smartyStreets.services').factory('SmartyStreetsSuggestionFactory',function($resource, $q, SmartyToken) {
  var smartyStreets = $resource('https://autocomplete-api.smartystreets.com/suggest',
  {
    'auth-id': SmartyToken,
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
})
.factory('SmartyStreetsValidationFactory',function($resource, $q, SmartyToken) {
  var smartyStreets = $resource('https://api.smartystreets.com/street-address',
  {
    'auth-token': SmartyToken,
    street:'1600 Amphitheatre Parkway',
    street2:'',
    city:"Mountain View",
    state:'CA',
    zipcode:'',
    candidates:'10',
    callback:'JSON_CALLBACK'
  },
  {get:{method:'JSONP',isArray:true}});

  var doValidation = function (address) {
    var defer = $q.defer();
    var promise = smartyStreets.get(
      {
        street:address.addressLine1,
        street2:address.addressLine2,
        city:address.city,
        state:address.state,
        zipcode:address.zipCode
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

angular.module('org.crossroads.smartyStreets.controllers', ['org.crossroads.smartyStreets.services', 'mgcrea.ngStrap.typeahead']);

/*
 * CONTROLLERS
 */

angular.module('org.crossroads.smartyStreets.controllers').controller('AddressFormController',
    function ($scope, SmartyStreetsSuggestionFactory, SmartyStreetsValidationFactory) {
        $scope.getAddress = function (searchString) {
            return SmartyStreetsSuggestionFactory.getSuggestions(searchString)
                .then(function (result) {
                    return result.suggestions;
                });
        };

        $scope.$on('$typeahead.select', function(event, address, index){
            $scope.address = address;
            $scope.populateFields();
        });

        $scope.populateFields = function () {
            $scope.address.city = $scope.addressSearchResult.city;
            $scope.address.state = $scope.addressSearchResult.state;
            $scope.address.addressLine1 = $scope.addressSearchResult.street_line;
            $scope.addressSearchResult = $scope.addressSearchResult.street_line;
        };

        //CONSIDER MOVING STATE (as in OHIO) HERE
        //make it a typeahead, with validation

        $scope.validateAddress = function () {
            return SmartyStreetsValidationFactory.doValidation($scope.address).then(function (result) {
                //HANDLE AMBIGUIOUS RESULTS - consider angular-strap model
                $scope.addressSearchResult = result[0].delivery_line_1;
                $scope.address.addressLine1 = result[0].delivery_line_1;
                $scope.address.city = result[0].components.city_name;
                $scope.address.state = result[0].components.state_abbreviation;
                $scope.address.zipCode = result[0].components.zipcode + '-' + result[0].components.plus4_code;
            });
        };

        $scope.$watch('address.state', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.validateAddress();
            }
        }, true);

    });

angular.module('org.crossroads.smartyStreets.directives', ['org.crossroads.smartyStreets.controllers']);

/*
 * DIRECTIVES
 */

angular.module('org.crossroads.smartyStreets.directives').directive('crdsValidatedAddress', function(){
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    controller: 'AddressFormController',
    templateUrl: '/templates/address-form.tpl.html'
  };
});

angular.module('CrossroadsUserForm', ['org.crossroads.smartyStreets'])
.controller('CrossroadsUserFormController', function($scope){
  $scope.form = {
    address: {}
  };
  $scope.submit = function(){
    //Call Service to revalidate

  };
});
