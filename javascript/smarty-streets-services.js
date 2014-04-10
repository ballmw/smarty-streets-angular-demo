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
    smartyStreets.get(
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
