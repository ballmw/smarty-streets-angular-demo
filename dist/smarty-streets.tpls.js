angular.module('org.crossroads.smartyStreets.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/address-form.tpl.html',
    "<div class=\"form-group\">\n" +
    "  <label for=\"AddressLine1\">Address Line 1</label>\n" +
    "  <input\n" +
    "  autocomplete=\"off\"\n" +
    "  type=\"text\"\n" +
    "  class=\"form-control\"\n" +
    "  id=\"AddressSearch\"\n" +
    "  ng-model=\"addressSearchResult\"\n" +
    "  data-animation=\"am-flip-x\"\n" +
    "  ng-options=\"result as result.text for result in getAddress($viewValue)\"\n" +
    "  placeholder=\"Enter Address Line 1\"\n" +
    "  bs-typeahead\n" +
    "  >\n" +
    "</div>\n" +
    "<input autocomplete=\"on\" type=\"text\" disabled class=\"form-control\" id=\"AddressLine1\" placeholder=\"Enter Address Line 1\" ng-model=\"address.addressLine1\">\n" +
    "<div class=\"form-group\">\n" +
    "<label for=\"AddressLine2\">Address Line 2</label>\n" +
    "<input autocomplete=\"on\" type=\"text\" class=\"form-control\" id=\"AddressLine2\" placeholder=\"Enter Address Line 2\" ng-model=\"address.addressLine2\">\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "<label for=\"City\">City</label>\n" +
    "<input autocomplete=\"on\" type=\"text\" class=\"form-control\" id=\"City\" placeholder=\"Enter City\" ng-model=\"address.city\">\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "<label for=\"State\">State</label>\n" +
    "<select autocomplete=\"on\" class=\"form-control\" name=\"State\" id=\"State\" ng-model=\"address.state\">\n" +
    "  <option></option>\n" +
    "  <option value=\"OH\">Ohio</option>\n" +
    "  <option value=\"KY\">Kentucky</option>\n" +
    "  <option value=\"AL\">Alabama</option>\n" +
    "  <option value=\"AK\">Alaska</option>\n" +
    "  <option value=\"AZ\">Arizona</option>\n" +
    "  <option value=\"AR\">Arkansas</option>\n" +
    "  <option value=\"CA\">California</option>\n" +
    "  <option value=\"CO\">Colorado</option>\n" +
    "  <option value=\"CT\">Connecticut</option>\n" +
    "  <option value=\"DE\">Delaware</option>\n" +
    "  <option value=\"DC\">District Of Columbia</option>\n" +
    "  <option value=\"FL\">Florida</option>\n" +
    "  <option value=\"GA\">Georgia</option>\n" +
    "  <option value=\"HI\">Hawaii</option>\n" +
    "  <option value=\"ID\">Idaho</option>\n" +
    "  <option value=\"IL\">Illinois</option>\n" +
    "  <option value=\"IN\">Indiana</option>\n" +
    "  <option value=\"IA\">Iowa</option>\n" +
    "  <option value=\"KS\">Kansas</option>\n" +
    "  <option value=\"LA\">Louisiana</option>\n" +
    "  <option value=\"ME\">Maine</option>\n" +
    "  <option value=\"MD\">Maryland</option>\n" +
    "  <option value=\"MA\">Massachusetts</option>\n" +
    "  <option value=\"MI\">Michigan</option>\n" +
    "  <option value=\"MN\">Minnesota</option>\n" +
    "  <option value=\"MS\">Mississippi</option>\n" +
    "  <option value=\"MO\">Missouri</option>\n" +
    "  <option value=\"MT\">Montana</option>\n" +
    "  <option value=\"NE\">Nebraska</option>\n" +
    "  <option value=\"NV\">Nevada</option>\n" +
    "  <option value=\"NH\">New Hampshire</option>\n" +
    "  <option value=\"NJ\">New Jersey</option>\n" +
    "  <option value=\"NM\">New Mexico</option>\n" +
    "  <option value=\"NY\">New York</option>\n" +
    "  <option value=\"NC\">North Carolina</option>\n" +
    "  <option value=\"ND\">North Dakota</option>\n" +
    "  <option value=\"OK\">Oklahoma</option>\n" +
    "  <option value=\"OR\">Oregon</option>\n" +
    "  <option value=\"PA\">Pennsylvania</option>\n" +
    "  <option value=\"RI\">Rhode Island</option>\n" +
    "  <option value=\"SC\">South Carolina</option>\n" +
    "  <option value=\"SD\">South Dakota</option>\n" +
    "  <option value=\"TN\">Tennessee</option>\n" +
    "  <option value=\"TX\">Texas</option>\n" +
    "  <option value=\"UT\">Utah</option>\n" +
    "  <option value=\"VT\">Vermont</option>\n" +
    "  <option value=\"VA\">Virginia</option>\n" +
    "  <option value=\"WA\">Washington</option>\n" +
    "  <option value=\"WV\">West Virginia</option>\n" +
    "  <option value=\"WI\">Wisconsin</option>\n" +
    "  <option value=\"WY\">Wyoming</option>\n" +
    "</select>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "<label for=\"Zip Code\">Zip Code</label>\n" +
    "<input autocomplete=\"on\" type=\"text\" class=\"form-control\" id=\"Zip Code\" placeholder=\"Zip Code\" ng-model=\"address.zipCode\">\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\">\n" +
    "    <div style=\"{'yada'}\">\n" +
    "        <span></span>\n" +
    "    </div>\n" +
    "</script>\n"
  );

}]);
