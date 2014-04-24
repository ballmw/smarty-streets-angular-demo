angular.module('org.crossroads.smartyStreets.controllers', ['org.crossroads.smartyStreets.services', 'mgcrea.ngStrap.typeahead']);

/*
 * CONTROLLERS
 */

angular.module('org.crossroads.smartyStreets.controllers').controller('AddressFormController',
    function ($scope, SmartyStreetsSuggestionFactory, SmartyStreetsValidationFactory) {
        $scope.address = {};

        $scope.addresses = [];
        $scope.getAddress = function (searchString) {
            if (searchString != null && searchString != '') {
                return SmartyStreetsSuggestionFactory.getSuggestions(searchString)
                    .then(function (result) {
                        $scope.addresses = result.suggestions;
                        if (result.suggestions.length == 1) {
                            $scope.address = result.suggestions[0];
                            return [];
                        } else {
                            return result.suggestions;
                        }
                    });
            }
        };

        $scope.$on('$typeahead.select', function (event, address, index) {
            $scope.address = $scope.addresses[index];
        });

        $scope.validateAddress = function () {
            return SmartyStreetsValidationFactory.doValidation($scope.address).then(function (result) {
                if (angular.isArray(result) && result.length > 0) {
                    //HANDLE AMBIGUIOUS RESULTS - consider angular-strap model
                    //$scope.addressSearchResult = result[0].delivery_line_1;
                    $scope.address.street_line = result[0].delivery_line_1;
                    $scope.address.city = result[0].components.city_name;
                    $scope.address.state = result[0].components.state_abbreviation;
                    $scope.address.zipCode = result[0].components.zipcode + '-' + result[0].components.plus4_code;
                }
            }, function (error) {
                console.log('got an error in validation');
            });
        };

        $scope.$watch('address', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.validateAddress();
            }
        }, true);

    });
