angular.module('starter.services', [])


.factory('Oficinas', function($http, $rootScope) {
  var oficinas = [];
  return {
    all: function() {
      return oficinas;
    },
    LoadOficinas: function() {
      var reqData = {
        url: $rootScope.urlBakcEnd + 'Oficinas/GetOficinas',
        method: 'GET',
        data: '',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
      var promise = $http(reqData).then(function(response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        //products = response.data;
        // The return value gets picked up by the then in the controller.
        oficinas = response.data;
        return oficinas;
      }, function(error) {
        if (!error.Message) {
          error.Message = "Ocurrio un error en el servidor";
        }
        return {
          error: true,
          mensaje: error.Message
        };
      });
      return promise;
    }
  }

})

.factory('Contactos', function($http, $rootScope) {
  var contactos = [];
  return {
    all: function() {
      return contactos;
    },
    LoadContactos: function() {
      var reqData = {
        url: $rootScope.urlBakcEnd + 'Oficina/getContactos',
        method: 'GET',
        data: '',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
      var promise = $http(reqData).then(function(response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        //products = response.data;
        // The return value gets picked up by the then in the controller.
        contactos = response.data;
        return contactos;
      }, function(error) {
        if (!error.Message) {
          error.Message = "Ocurrio un error en el servidor";
        }
        return {
          error: true,
          mensaje: error.Message
        };
      });
      return promise;
    }
  }

})

.factory('Products', function($http, $localstorage, $rootScope) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    //var ced = 72005948;

    var tipos = {
      '01': 'getDetalle',
      '02': 'getDetalle',
      '03': 'getDetalle',
      '04': 'getDetalle',
      '05': 'getDetalle'
    }
    var products = [];
    var currentProduct = {};
    return {
      all: function() {
        return products;
      },
      remove: function(product) {
        chats.splice(chats.indexOf(product), 1);
      },
      get: function(prodId) {
        var pitem = null;
        var user = $localstorage.getObject('user');
        for (var i = 0; i < products.length; i++) {
          if (products[i].Numero === prodId) {
            pitem = products[i];
            break;
          }
        }
        if (pitem) {

          var reqData = {
            url: $rootScope.urlBakcEnd + 'Producto/' + tipos[pitem.Segmento],
            method: 'POST',
            data: 'id=' + user.id + '&cuenta=' + pitem.Numero + '&segmento=' + pitem.Segmento,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          };
          var promise = $http(reqData).then(function(response) {
            // The then function here is an opportunity to modify the response
            console.log(response);
            if (response.data) {
              response.data.nodata = false;
              response.data.Segmento = pitem.Segmento;
              response.data.pitem = pitem;
            } else {
              response.data = {
                nodata: true,
                mensaje: 'No hubo respuesta del servidor'
              }
            }
            // The return value gets picked up by the then in the controller.
            currentProduct = response.data;
            return response.data;
          }, function() {
            var response = {};
            response.data = {
              nodata: true,
              mensaje: 'Ocurrio un error en el servidor. Intenta más tarde'
            };
            return response.data;
          });
          return promise;
        }
      },
      loadProducts: function() {
        var user = $localstorage.getObject('user');
        var reqData = {
          url: $rootScope.urlBakcEnd + 'Producto/Productos',
          method: 'POST',
          data: 'cedula=' + user.id,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        };
        var promise = $http(reqData).then(function(response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          products = response.data;
          test = products;
          // The return value gets picked up by the then in the controller.
          return response.data;
        }, function(error) {
          if (!error.Message) {
            error.Message = "Ocurrio un error en el servidor";
          }
          return {
            error: true,
            mensaje: error.Message
          };
        });
        return promise;
      },


      getCurrentProduct: function() {
        if (currentProduct) {
          return currentProduct;
        } else {
          return false;
        }
      },

      getExtractos: function(user) {
        var reqData = {
          url: $rootScope.urlBakcEnd + 'Extracto/Documentos',
          method: 'POST',
          data: 'id=' + user.id,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        };
        console.log("accediendo...");
        var promise = $http(reqData).then(function(response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          //seguridad = response.data;
          // The return value gets picked up by the then in the controller.
          return response.data;
        }, function(error) {
          if (!error.Message) {
            error.Message = "Ocurrio un error en el servidor"
          }
          var res = {
            error: true,
            mensaje: error.Message
          };
          return res;
        });
        return promise;
      },

      sendExtraMail: function(id, docID, fecha, tipo, email, folder) {
        var reqData = {
          url: $rootScope.urlBakcEnd + 'Extracto/EnviarExtMail',
          method: 'POST',
          data: 'id=' + id + '&docID=' + docID + '&fecha=' + fecha +'&tipo='+ tipo +'&email='+ email +'&folder='+folder ,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        };
        console.log("accediendo...");
        var promise = $http(reqData).then(function(response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          //seguridad = response.data;
          // The return value gets picked up by the then in the controller.
          return response.data;
        }, function(error) {
          if (!error.Message) {
            error.Message = "Ocurrio un error en el servidor"
          }
          var res = {
            error: true,
            mensaje: error.Message
          };
          return res;
        });
        return promise;
      }

    };
  })
  .factory('Servicios', function($http, $localstorage, $rootScope) {
    var services = [{
      id: 0,
      name: 'Bloqueo de tarjetas de crédito',
      endPoint: 'loadBloqueoTCRO',
      url: 'bloqueo'
    }, {
      id: 1,
      name: 'Activación de tarjeta',
      url: 'activacion'
    },{
      id: 2,
      name: 'Activación clave de avance tarjeta MasterCard',
      url: 'master-actpin'
    },{
      id: 3,
      name: 'Enviar giro',
      url: 'ColcarGiro'
    }];
    //,{id: 2, name: 'Bloqueo Tarjeta Débito'}
    var tcros = [];
    return {
      loadBloqueoTCRO: function() {
        var user = $localstorage.getObject('user');
        var reqData = {
          url: $rootScope.urlBakcEnd + 'Seguridad/BloqueoPro',
          method: 'POST',
          data: 'cedula=' + user.id,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        };

        var promise = $http(reqData).then(function(response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          seguridad = response.data;
          // The return value gets picked up by the then in the controller.
          return response.data;
        }, function() {});
        return promise;
      },



      activarTarjeta: function(tar_vieja, tar_nueva) {
        var user = $localstorage.getObject('user');
        var reqData = {
          url: $rootScope.urlBakcEnd + 'Tarjeta/ActivacionTarjeta',
          method: 'POST',
          data: 'tipo=' + user.tipodc + '&cedula=' + user.id + "&tarjeta=" + tar_vieja + "&tarjetaNue=" + tar_nueva,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        };
        console.log("activando...");
        var promise = $http(reqData).then(function(response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          var res = {
            error: false,
            data: response.data
          };
          // The return value gets picked up by the then in the controller.
          return res;
        }, function(response) {
          var res = {
            error: true,
            mensaje: "Ocurrio un error intentando activar la tarjeta. Pruebe de nuevo más tarde"
          };
          return res;
        });
        return promise;
      },



      getServices: function() {
        return services;
      },

      getOptions: function(serId) {
        var _self = this;
        test = this;
        var service = null

        for (var i = 0; i < services.length; i++) {
          if (services[i].id == serId) {
            service = services[i];
            break;
          }
        }
        if (service) {
          return _self[service.endPoint]();
        }
      },

      bloqueoTar: function(user) {
        var reqData = {
          url: $rootScope.urlBakcEnd + 'Seguridad/ConfirmaBlq',
          method: 'POST',
          data: 'cedula=' + user.id,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        };
        console.log("accediendo...");
        var promise = $http(reqData).then(function(response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          //seguridad = response.data;
          // The return value gets picked up by the then in the controller.
          return response.data;
        }, function(error) {
          if (!error.Message) {
            error.Message = "Ocurrio un error en el servidor"
          }
          var res = {
            error: true,
            mensaje: error.Message
          };
          return res;
        });
        return promise;
      },

      ActivarMasterPin: function(id, td, numtar, pin) {
        var reqData = {
          url: $rootScope.urlBakcEnd + 'Seguridad/MasterAsignaClave',
          method: 'POST',
          data: 'idCliente=' + id + '&tipoId=' + td + '&numTarjeta=' + numtar + '&pinBlock=' + pin,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        };
        console.log("accediendo...");
        var promise = $http(reqData).then(function(response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          //seguridad = response.data;
          // The return value gets picked up by the then in the controller.
          return response.data;
        }, function(error) {
          if (!error.Message) {
            error.Message = "Ocurrio un error en el servidor"
          }
          var res = {
            error: true,
            mensaje: error.Message
          };
          return res;
        });
        return promise;
      }

    }
  })

.factory('Desembolso', function($http, $localstorage, $rootScope) {
  service = {};
  var creditoData = {};
  service.checkCredRot = function(user) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Transacciones/ValidaCredRota',
      method: 'POST',
      data: 'tipoId=' + user.tipodc + '&id=' + user.id,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };

    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response
      console.log(response);
      //products = response.data;
      // The return value gets picked up by the then in the controller.
      var credito = {
        errorInfo: false
      };
      if (response.data) {
        if (response.data.codigo) { // no tiene credito rotativo disponible
          credito.tieneCred = false;

        } else {
          credito.tieneCred = true;

        }
        credito.responseData = response.data;
      } else {
        credito.errorInfo = true;
        credito.mensaje = "Error consultando información";
      }
      creditoData = credito;
      test = creditoData;
      return credito;
    }, function() {});
    return promise;

  };

  service.consultaDesembolso = function(user, num_tarjeta) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Transacciones/ConsultaDesembolso',
      method: 'POST',
      data: 'tipoId=' + user.tipodc + '&id=' + user.id + '&numtarjeta=' + num_tarjeta,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      var consultaCred = {
        errorInfo: false
      };
      if (response.data) {
        consultaCred.responseData = response.data;
      } else {
        consultaCred.errorInfo = true;
        consultaCred.mensaje = "No se pudo recuperar información del crédito rotativo";
      }
      return consultaCred;
    });
    return promise;
  };

  service.desembolsaCredito = function(user, num_tarjeta, monto) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Transacciones/DesemCredRota',
      method: 'POST',
      data: 'tipoId=' + user.tipodc + '&id=' + user.id + '&numtarjeta=' + num_tarjeta + '&monto=' + monto,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      var desemCred = {
        errorInfo: false
      };
      if (response.data) {
        desemCred.responseData = response.data;
      } else {
        desemCred.errorInfo = true;
        desemCred.mensaje = "No se pudo recuperar información del crédito rotativo";
      }
      return desemCred;
    });
    return promise;
  };

  service.getCreditoData = function() {
    if (creditoData) {
      return creditoData;
    } else {
      return false;
    }
  }

  return service;
})

.factory('Giros', function($http, $rootScope, $localstorage) {


  return {
    Consultar: function(data) {
      var usuario = $localstorage.getObject('user');
      data.tipo_id_girador=usuario.tipodc;
      data.id_girador=usuario.id;
      data.nombre_girador=usuario.nombre;
      var reqData = {
        url: $rootScope.urlBakcEnd + 'Giros/Consultar',
        method: 'POST',
        cache: false,
        data: data,
        headers: {
          'Authorization': 'Bearer '+ usuario.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      var promise = $http(reqData).then(function(response) {
        return response.data;
      }, function(error) {
        if (!error.Message) {
          error.Message = JSON.stringify(error);
        }
        return {
          error: true,
          mensaje: error.Message
        };
      });
      return promise;
    },

    Confirmar: function(data) {
      var usuario = $localstorage.getObject('user');
      var reqData = {
        url: $rootScope.urlBakcEnd + 'Giros/Confirmar',
        method: 'POST',
        cache: false,
        data: data,
        headers: {
          'Authorization': 'Bearer '+ usuario.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      var promise = $http(reqData).then(function(response) {
        return response.data;
      }, function(error) {
        if (!error.Message) {
          error.Message = JSON.stringify(error);
        }
        return {
          error: true,
          mensaje: error.Message
        };
      });
      return promise;
    }

  }
})

.factory('ClaveDinamica', function($http, $rootScope, $localstorage) {
  return{
    Registrar: function(data) {
      var usuario = $localstorage.getObject('user');
      var registro={};
      registro.id=usuario.id;
      registro.tipoId=usuario.tipodc;
      registro.celular=data.celular;
      registro.usuario=usuario.usuario;
      registro.email=data.email;
      var reqData = {
        url: $rootScope.urlBakcEnd + 'ClaveDinamica/Registrar',
        method: 'POST',
        cache: false,
        data: registro,
        headers: {
          'Authorization': 'Bearer '+ usuario.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      var promise = $http(reqData).then(function(response) {
        return response.data;
      }, function(error) {
        if (!error.Message) {
          error.Message = JSON.stringify(error);
        }
        return {
          error: true,
          mensaje: error.Message
        };
      });
      return promise;
    },
    Generar: function(){
      var usuario = $localstorage.getObject('user');
      var generar={};
      generar.id=usuario.id;
      generar.tipoId=usuario.tipodc;
      generar.canal=4;
      var reqData = {
        url: $rootScope.urlBakcEnd + 'ClaveDinamica/Generar',
        method: 'POST',
        cache: false,
        data: generar,
        headers: {
          'Authorization': 'Bearer '+ usuario.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      var promise = $http(reqData).then(function(response) {
        return response.data;
      }, function(error) {
        if (!error.Message) {
          error.Message = JSON.stringify(error);
        }
        return {
          error: true,
          mensaje: error.Message
        };
      });
      return promise;
    },
    Validar: function(otp){
      var usuario = $localstorage.getObject('user');
      var generar={};
      generar.id=usuario.id;
      generar.tipoId=usuario.tipodc;
      generar.canal=4;
      generar.otp=otp;
      var reqData = {
        url: $rootScope.urlBakcEnd + 'ClaveDinamica/Validar',
        method: 'POST',
        cache: false,
        data: generar,
        headers: {
          'Authorization': 'Bearer '+ usuario.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      var promise = $http(reqData).then(function(response) {
        return response.data;
      }, function(error) {
        if (!error.Message) {
          error.Message = JSON.stringify(error);
        }
        return {
          error: true,
          mensaje: error.Message
        };
      });
      return promise;
    }
  }
})

.factory('UsrAuth', function($http, $rootScope) {
  service = {};
  var UserDocument = {};

  service.login = function(user, pass) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/validatePass',
      method: 'POST',
      data: 'usuario=' + user + '&clave=' + pass,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    console.log($rootScope.urlBakcEnd);
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response
      console.log(response);
      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(err) {
      var res = {
        codigo: 'error',
        descripcion: 'Ocurrio un error en el servidor. Intenta más tarde'
      };
      return res;
    });
    return promise;
  };
  service.changePass = function(user, pass, confirmPass) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/changePass',
      method: 'POST',
      data: 'usuario=' + user + '&clave=' + pass + '&clave2=' + confirmPass,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response
      console.log(response.data);
      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };
  service.ExisteUsuario = function(usuario) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/ExisteUsuario',
      method: 'POST',
      data: 'usuario=' + usuario,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    console.log(usuario);
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response

      //products = response.data;
      // The return value gets picked up by the then in the controller.
      UserDocument = response.data;
      console.log(UserDocument);
      return UserDocument;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };
  service.getUserDocument = function() {
    return UserDocument;
  };
  service.generaPin = function(tipoId, nit) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/GeneraPin/' + tipoId + "/" + nit,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response

      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };

  service.validaPin = function(tipoId, nit, pin) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/ValidarPin',
      method: 'POST',
      data: 'tipo_doc=' + tipoId + '&cedula=' + nit + '&pin=' + pin,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response

      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };

  service.recuperaUsuario=function(tipoId, nit){
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/getUserbyId',
      method: 'POST',
      data: 'tipo_id=' + tipoId + '&id=' + nit,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response

      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };


  service.getPreguntasVal = function(tipoId, nit) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/GetPreguntasVal',
      method: 'POST',
      data: 'tipoId=' + tipoId + '&cedula=' + nit,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response

      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };

  service.resetPass = function(pass, confirmPass) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/ResetearClave',
      method: 'POST',
      data: 'tipoId=' + UserDocument.tipo_doc + '&cedula=' + UserDocument.documento + '&clave=' + pass,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response
      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };

  service.GetTipoDoc = function() {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'User/GetTipoDoc',
      method: 'GET',
      data: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response
      //products = response.data;
      // The return value gets picked up by the then in the controller.
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };

  service.CreateUser = function(tipo_doc, documento, usuario, clave) {
    var reqData = {
      url: $rootScope.urlBakcEnd + 'Seguridad/CrearUsuarioClave',
      method: 'POST',
      data: 'tipoId=' + tipo_doc + '&cedula=' + documento + '&usuario=' + usuario + '&clave=' + clave,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    var promise = $http(reqData).then(function(response) {
      // The then function here is an opportunity to modify the response
      //products = response.data;
      // The return value gets picked up by the then in the controller.
      console.log(JSON.stringify(response.data));
      return response.data;
    }, function(error) {
      if (!error.Message) {
        error.Message = "Ocurrio un error en el servidor"
      }
      var res = {
        error: true,
        mensaje: error.Message
      };
      return res;
    });
    return promise;
  };
  return service;
})



angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    clear: function (){
      $window.localStorage.clear();
    }
  }
}])

.factory('$loading', ['$ionicLoading', function($ionicLoading) {
  return {
    show: function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="dots" style:"z-index:99"></ion-spinner><br />',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 500,
        showDelay: 100
      });
    },
    hide: function() {
      $ionicLoading.hide();
    }
  }
}])

.factory('$alert', ['$ionicPopup', function($ionicPopup) {
  return {
    showAlert: function(mensaje) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: mensaje
      });

      alertPopup.then(function(res) {

        console.log('bye');
      });
    },

    showMessage: function(mensaje) {
      var alertPopup = $ionicPopup.alert({
        title: 'Mensaje',
        template: mensaje
      });

      alertPopup.then(function(res) {

        console.log('bye');
      });
    }
  }
}]);

var test;
