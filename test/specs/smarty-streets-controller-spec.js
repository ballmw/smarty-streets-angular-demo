describe('controllers', function () {
    var $scope, ctrl, mockSuggestionFactory, mockValidationFactory, deferredSuggestions, deferredValidations;

    /*
     Provide the typeahead directive as the controller is dependent upon it.
     */
    beforeEach(function () {
        angular.module('mgcrea.ngStrap.typeahead', []);
    });

    /*
     The controller's module
     */
    beforeEach(module('org.crossroads.smartyStreets.controllers'));

    /*
     Build the dependencies for the controller
     */
    beforeEach(inject(function ($controller, $rootScope, $q) {
        //Create a new scope that will be recreated before each test
        $scope = $rootScope.$new();

        //Create two mock factories for suggestions and validation
        mockSuggestionFactory = {
            getSuggestions: function (str) {
                deferredSuggestions = $q.defer();
                return deferredSuggestions.promise;
            }
        };

        mockValidationFactory = {
            doValidation: function (address) {
                deferredValidations = $q.defer();
                return deferredValidations.promise;
            }
        }

        //Spying on these methods will allow us to ensure they've been called
        spyOn(mockSuggestionFactory, 'getSuggestions').andCallThrough();
        spyOn(mockValidationFactory, 'doValidation').andCallThrough();

        //Declare the controller and inject the two factories
        ctrl = $controller('AddressFormController', {
            $scope: $scope,
            SmartyStreetsSuggestionFactory: mockSuggestionFactory, //mock factory
            SmartyStreetsValidationFactory: mockValidationFactory //mock factory
        });

    }));

    it('should not have an empty address', function () {
        expect($scope.address).not.toBe(null);
    });

    it('should match a single address', function () {
        var result = $scope.getAddress('abc');
        var mockSuggestions = {"suggestions": [
            {"text": "3500 Madison Rd, Cincinnati OH", "street_line": "3500 Madison Rd", "city": "Cincinnati", "state": "OH"}
        ]}
        deferredSuggestions.resolve(mockSuggestions);
        $scope.$digest();
        expect(mockSuggestionFactory.getSuggestions).toHaveBeenCalledWith('abc');
        expect($scope.addresses).toBe(mockSuggestions.suggestions);
        expect($scope.address).toBe(mockSuggestions.suggestions[0]);
        result.then(function (returned) {
            expect(returned.length).toBe(0);
        })
    });


    it('should find a set of addresses', function () {
        var result = $scope.getAddress('abc');
        var mockSuggestions = {"suggestions": [
            {"text": "3500 Madison Rd, Cincinnati OH", "street_line": "3500 Madison Rd", "city": "Cincinnati", "state": "OH"},
            {"text": "3500 Madison Rd, Cincinnati OH", "street_line": "3500 Madison Rd", "city": "Cincinnati", "state": "OH"}
        ]}

        deferredSuggestions.resolve(mockSuggestions);
        $scope.$digest();
        expect(mockSuggestionFactory.getSuggestions).toHaveBeenCalledWith('abc');
        expect($scope.addresses).toBe(mockSuggestions.suggestions);

        expect($scope.address).toEqual({});
        result.then(function (returned) {
            expect(returned).toBe(mockSuggestions);
        });
    });

    it('should validate an address', function () {
        $scope.validateAddress();

        var address = {};
        $scope.address = {};

        var mockSuggestions = [
            {"input_index": 0, "candidate_index": 0, "delivery_line_1": "3500 Madison Rd", "last_line": "Cincinnati OH 45209-1120", "delivery_point_barcode": "452091120006", "components": {"primary_number": "3500", "street_name": "Madison", "street_suffix": "Rd", "city_name": "Cincinnati", "state_abbreviation": "OH", "zipcode": "45209", "plus4_code": "1120", "delivery_point": "00", "delivery_point_check_digit": "6"}, "metadata": {"record_type": "S", "zip_type": "Standard", "county_fips": "39061", "county_name": "Hamilton", "carrier_route": "C012", "congressional_district": "02", "rdi": "Commercial", "elot_sequence": "0047", "elot_sort": "A", "latitude": 39.15857, "longitude": -84.42132, "precision": "Zip9", "time_zone": "Eastern", "utc_offset": -5.0, "dst": true}, "analysis": {"dpv_match_code": "Y", "dpv_footnotes": "AABB", "dpv_cmra": "N", "dpv_vacant": "N", "active": "Y"}}
        ];

        deferredValidations.resolve(mockSuggestions);
        $scope.$digest();
        expect(mockValidationFactory.doValidation).toHaveBeenCalledWith(address);
        expect($scope.address.street_line).toBe(mockSuggestions[0].delivery_line_1);
        expect($scope.address.city).toBe(mockSuggestions[0].components.city_name);
        expect($scope.address.state).toBe(mockSuggestions[0].components.state_abbreviation);
        expect($scope.address.zipCode).toBe(mockSuggestions[0].components.zipcode + '-' + mockSuggestions[0].components.plus4_code);
    });

    it('should assign an address when selected from a list', function () {
        var addresses = [
            {"text": "3500 Madison Rd, Cincinnati OH", "street_line": "3500 Madison Rd", "city": "Cincinnati", "state": "OH"},
            {"text": "3500 Madison Rd, Riley KS", "street_line": "3500 Madison Rd", "city": "Riley", "state": "KS"},
            {"text": "3500 Madison Rd, Ridgeway IA", "street_line": "3500 Madison Rd", "city": "Ridgeway", "state": "IA"},
            {"text": "3500 Madison Rd, Ridgeway VA", "street_line": "3500 Madison Rd", "city": "Ridgeway", "state": "VA"},
            {"text": "3500 Madison Rd, Rochelle GA", "street_line": "3500 Madison Rd", "city": "Rochelle", "state": "GA"},
            {"text": "3500 W Madison Rd, Riverdale MI", "street_line": "3500 W Madison Rd", "city": "Riverdale", "state": "MI"},
            {"text": "3500 Madison Rd, Rainbow City AL", "street_line": "3500 Madison Rd", "city": "Rainbow City", "state": "AL"}
        ];
        $scope.addresses = addresses;
        var childScope = $scope.$new();
        childScope.$emit('$typeahead.select', {}, 3);
        $scope.$digest();

        expect($scope.address).toBe(addresses[3])
    });

    it('should watch the address and call validate', function () {
        $scope.$digest();

        $scope.address = {"text": "3500 Madison Rd, Cincinnati OH", "street_line": "3500 Madison Rd", "city": "Cincinnati", "state": "OH"};
        $scope.address.city = "Mason";

        spyOn($scope, 'validateAddress');

        $scope.$digest();
        expect($scope.validateAddress).toHaveBeenCalled();
    });
});