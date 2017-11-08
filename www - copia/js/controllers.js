angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})



.controller('ProdCtrl', function($scope, Products) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.products = Products.all();
  Products.loadProducts().then(function(response){$scope.products = response});
  $scope.remove = function(prod) {
    Chats.remove(prod);
  };
})

.controller('ServCtrl', function($scope) {
	var services = [{id: 0, name: 'Bloqueo de Tarjetas de Credito'}];
	$scope.services = services;
})

.controller('DesemCtrl', function($scope) {
	var desembolsos = [{id: 0, name: 'Solicitar Credito Rotativo'}];
	$scope.desembolsos = desembolsos;
})

.controller('SeguridadCtrl', function($scope) {
	var seguridad = [{id: 0, name: 'Cambio de Contraseña'}];
	$scope.seguridad = seguridad;
})

.controller('ProdDetailCtrl', function($scope, $stateParams, Products) {
	Products.get($stateParams.prodId).then(function(response){$scope.prod = response});
   
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
