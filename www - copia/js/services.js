angular.module('starter.services', [])

.factory('Products', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var ced = 72005948;
  
  var tipos = {'04': 'getDetalleCro', '01': 'getDetalleCDT', '02': 'getDetallePagare', '03': 'getDetalleDescuento'}
  var products = [];

  return {
    all: function() {
      return products;
    },
    remove: function(product) {
      chats.splice(chats.indexOf(product), 1);
    },
    get: function(prodId) {
		var pitem = null;
      for (var i = 0; i < products.length; i++) {
        if (products[i].Numero === prodId) {
          pitem = products[i];
		  break;
        }
      }
      if (pitem) {
		  
		  var reqData = {
			url:'https://vpc.serfinansa.com.co/SerfiAppService/api/Producto/' + tipos[pitem.Segmento], 
			method:'POST', 
			data: 'id=' + ced + '&cuenta=' + pitem.Numero, 
			headers : {'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} 
		};
		var promise = $http(reqData).then(function (response) {
			// The then function here is an opportunity to modify the response
			console.log(response);
			response.data.Segmento = pitem.Segmento;
			// The return value gets picked up by the then in the controller.
			return response.data;
		  }, function(){});
		return promise;
	  }
    },
	loadProducts: function(){
		var reqData = {
			url:'https://vpc.serfinansa.com.co/SerfiAppService/api/Producto/Productos', 
			method:'POST', 
			data: 'cedula=' + ced, 
			headers : {'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} 
		};
		var promise = $http(reqData).then(function (response) {
			// The then function here is an opportunity to modify the response
			console.log(response);
			products = response.data;
			// The return value gets picked up by the then in the controller.
			return response.data;
      }, function(){});
	  return promise;
	}
	
  };
});

