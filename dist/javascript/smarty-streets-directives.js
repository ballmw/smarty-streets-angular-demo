angular.module('org.crossroads.smartyStreets.directives', ['org.crossroads.smartyStreets.controllers']);

/*
 * DIRECTIVES
 */

angular.module('org.crossroads.smartyStreets.directives').directive('crdsValidatedAddress', function(){
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    controller: 'AddressFormController',
    templateUrl: 'templates/address-form.tpl.html'
  };
});

angular.module('CrossroadsUserForm', ['org.crossroads.smartyStreets'])
.controller('CrossroadsUserFormController', function($scope){
  $scope.form = {
    address: {}
  };
  $scope.submit = function(){
    //Call Service to revalidate

  };
});
