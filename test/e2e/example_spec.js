describe('SmartyStreetsAutocomplate', function() {
    it('should populate all other fields', function() {
        browser.get('/test/scenarios/address_form/');

        element(by.model('addressSearchResult')).sendKeys('3500 Madison Road, Cincinnati OH');



        element(by.repeater('match in $matches').row(0)).click();

        var city = element(by.model('address.city'));
        var state = element(by.model('address.state'));
        var zip = element(by.model('address.zip'));

        city.getAttribute('value').then(function(value) {
            expect(value).toEqual('Cincinnati');
        });

        state.getAttribute('value').then(function(value) {
            expect(value).toEqual('OH');
        });

        zip.getAttribute('value').then(function(value) {
            expect(value).toEqual('45209');
        });

    });
});
