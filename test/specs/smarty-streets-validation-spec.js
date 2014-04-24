describe('services', function() {
    beforeEach(module('org.crossroads.smartyStreets.services'));

    var $httpBackend;
    beforeEach(function () {
        module('ngResource');
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
        })
    });

    it('should exist', inject(function(SmartyStreetsValidationFactory) {
        expect(SmartyStreetsValidationFactory).not.toBe(null);
    }));

    describe('validation service', function () {
        var mockSuggestions = [{"input_index":0,"candidate_index":0,"delivery_line_1":"3500 Madison Rd","last_line":"Cincinnati OH 45209-1120","delivery_point_barcode":"452091120006","components":{"primary_number":"3500","street_name":"Madison","street_suffix":"Rd","city_name":"Cincinnati","state_abbreviation":"OH","zipcode":"45209","plus4_code":"1120","delivery_point":"00","delivery_point_check_digit":"6"},"metadata":{"record_type":"S","zip_type":"Standard","county_fips":"39061","county_name":"Hamilton","carrier_route":"C012","congressional_district":"02","rdi":"Commercial","elot_sequence":"0047","elot_sort":"A","latitude":39.15857,"longitude":-84.42132,"precision":"Zip9","time_zone":"Eastern","utc_offset":-5.0,"dst":true},"analysis":{"dpv_match_code":"Y","dpv_footnotes":"AABB","dpv_cmra":"N","dpv_vacant":"N","active":"Y"}}];

        it('should get address suggestions', inject(function (SmartyStreetsValidationFactory) {
            $httpBackend.expectJSONP('https://api.smartystreets.com/street-address?auth-token=5041104821260679536&callback=JSON_CALLBACK&candidates=10&city=Cincinnati&state=OH&street=3500+Madison+Rd')
                .respond(mockSuggestions);


            SmartyStreetsValidationFactory.doValidation({street_line: "3500 Madison Rd", city: "Cincinnati", state: "OH"}).then(function (result) {
                suggestions = result;
            })

            $httpBackend.flush();

            expect(suggestions.length).toEqual(mockSuggestions.length);

        }));
    });
});