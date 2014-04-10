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
