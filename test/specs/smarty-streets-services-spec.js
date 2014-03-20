describe('services', function() {
    beforeEach(module('org.crossroads.smartyStreets.services'));

    it('should exist', inject(function(SmartyStreetsSuggestionFactory) {
        expect(SmartyStreetsSuggestionFactory).not.toBe(null);
    }));
});