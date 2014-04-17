describe('services', function () {
    beforeEach(module('org.crossroads.smartyStreets.services'));

    var $httpBackend;
    beforeEach(function () {
        module('ngResource');
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
        })
    });

    it('should exist', inject(function (SmartyStreetsSuggestionFactory) {
        expect(SmartyStreetsSuggestionFactory).not.toBe(null);
    }));


    describe('suggestion service', function () {

        var mockSuggestions = {"suggestions": [
            {"text": "3500 Madison Rd, Cincinnati OH", "street_line": "3500 Madison Rd", "city": "Cincinnati", "state": "OH"},
            {"text": "3500 Madison Rd, Riley KS", "street_line": "3500 Madison Rd", "city": "Riley", "state": "KS"},
            {"text": "3500 Madison Rd, Ridgeway IA", "street_line": "3500 Madison Rd", "city": "Ridgeway", "state": "IA"},
            {"text": "3500 Madison Rd, Ridgeway VA", "street_line": "3500 Madison Rd", "city": "Ridgeway", "state": "VA"},
            {"text": "3500 Madison Rd, Rochelle GA", "street_line": "3500 Madison Rd", "city": "Rochelle", "state": "GA"},
            {"text": "3500 W Madison Rd, Riverdale MI", "street_line": "3500 W Madison Rd", "city": "Riverdale", "state": "MI"},
            {"text": "3500 Madison Rd, Rainbow City AL", "street_line": "3500 Madison Rd", "city": "Rainbow City", "state": "AL"}
        ]}

        it('should get address suggestions', inject(function (SmartyStreetsSuggestionFactory) {
            $httpBackend.expectJSONP('https://autocomplete-api.smartystreets.com/suggest?auth-id=5041104821260679536&callback=JSON_CALLBACK&prefix=3500+Madison+Rd')
                .respond(mockSuggestions);


            SmartyStreetsSuggestionFactory.getSuggestions("3500 Madison Rd").then(function (result) {
                suggestions = result;
            })
            $httpBackend.flush();

            expect(suggestions.suggestions.length).toEqual(mockSuggestions.suggestions.length);

        }));
    });
});