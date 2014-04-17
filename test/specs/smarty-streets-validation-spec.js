describe('services', function() {
    beforeEach(module('org.crossroads.smartyStreets.services'));

    it('should exist', inject(function(SmartyStreetsValidationFactory) {
        expect(SmartyStreetsValidationFactory).not.toBe(null);
    }));
});