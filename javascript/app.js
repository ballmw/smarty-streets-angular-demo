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

    $scope.doAutoComplete = function () {
    	//$scope.debounce(function () {
        $scope.smartyStreetsSuggestions = $scope.smartyStreets.get(
        	{
        		prefix:$scope.$parent.addressLine1
        	},
        	function(){
		    }
        );
    	//}, 5000);
    };

    $scope.autofill = function ($suggestion) {
        	$scope.$parent.addressLine1 = $suggestion.street_line
        	$scope.$parent.city = $suggestion.city
        	$scope.$parent.state = $suggestion.state
    };
};

SmartyStreets.factory('debounce', ['$timeout', function ($timeout) {
        return function(fn, timeout, apply){ // debounce fn
            timeout = angular.isUndefined(timeout) ? 0 : timeout;
            apply = angular.isUndefined(apply) ? true : apply; // !!default is true! most suitable to my experience
            var nthCall = 0;
            return function(){ // intercepting fn
                var that = this;
                var argz = arguments;
                nthCall++;
                var later = (function(version){
                    return function(){
                        if (version === nthCall){
                            return fn.apply(that, argz);
                        }
                    };
                })(nthCall);
                return $timeout(later, timeout, apply);
            };
        };
    }]);