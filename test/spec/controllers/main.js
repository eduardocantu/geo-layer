'use strict';

describe('Controller: FormMunicipioCtrl', function () {

  // load the controller's module
  beforeEach(module('geoLayerApp'));

  var FormMunicipioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormMunicipioCtrl = $controller('FormMunicipioCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
