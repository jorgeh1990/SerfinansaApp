angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})





.controller('ProdCtrl', function($scope, $stateParams, Products, $localstorage, $rootScope, $loading, $alert, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //var categorias = [{id: 0, name: 'Ahorro e Inversion', seg: ['01']},{id: 1, name: 'Cartera Financiera', seg: ['02','03']},{id: 2, name: 'Cartera Olimpica', seg: ['04']}];
  //$scope.catprods = categorias;

  var filterResults = $stateParams.catSeg.split('-');

  $scope.filterResults = $stateParams.catSeg;
  $scope.name = '';
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
    $scope.products = [];
    var prods = Products.all();
    if (prods.length > 0) {
      $scope.products = prods;
    } else {
      $loading.show();
      Products.loadProducts().then(function(response) {
        $loading.hide();
        if (!response.error) {
          $scope.products = response;
        } else {
          $alert.showAlert(response.mensaje);
        }
      });
    }

  });

  $scope.getTotalCdts = function() {
    var total = 0;
    for (var i = 0; i < $scope.products.length; i++) {
      if ($scope.products[i].Segmento == '01') {
        total = total + $scope.products[i].Valor;
      }
    }
    return total;
  };

  $scope.getTotalCTAH = function() {
    var total = 0;
    for (var i = 0; i < $scope.products.length; i++) {
      if ($scope.products[i].Segmento == '05') {
        total = total + $scope.products[i].Valor;
      }
    }
    return total;
  };

  $scope.filterFunction = function(element) {
    console.log('ele: ' + element.Segmento + filterResults.indexOf(element.Segmento));
    return filterResults.indexOf(element.Segmento) == -1 ? false : true;
  };

  $scope.viewProduct = function(id) {
    $loading.show();
    Products.get(id).then(function(response) {
      $loading.hide();
      if (response.nodata) {
        $alert.showAlert(response.mensaje);
        //$scope.mensaje = response.mensaje;
      } else {
        $state.go('tab.product-detail');
      }
    });
  };

  $scope.viewCdtList = function(cat) {
    $state.go('tab.products-ahorro',{catSeg: "01"});
  };

  $scope.viewAhorroList = function(cat) {
    $state.go('tab.products-ahorro',{catSeg: "05"});
  };
  //$scope.products = Products.all();

})

.controller('ProdAhorroCtrl', function($scope, $stateParams, Products, $localstorage, $rootScope, $loading, $alert, $state) {
  //$scope.filterResults = '01';
  var filterResults = $stateParams.catSeg.split('-');

  $scope.filterResults = $stateParams.catSeg;
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
    $scope.products = [];
    var prods = Products.all();
    if (prods.length > 0) {
      $scope.products = prods;
    } else {
      $loading.show();
      Products.loadProducts().then(function(response) {
        $loading.hide();
        if (!response.error) {
          $scope.products = response;

        } else {
          $alert.showAlert(response.mensaje);
        }
      });
    }
  });
  $scope.filterFunction = function(element) {
    console.log('ele: ' + element.Segmento + filterResults.indexOf(element.Segmento));
    return filterResults.indexOf(element.Segmento) == -1 ? false : true;
  };

  $scope.viewProduct = function(id) {
    $loading.show();
    Products.get(id).then(function(response) {
      $loading.hide();
      if (response.nodata) {
        $alert.showAlert(response.mensaje);
        //$scope.mensaje = response.mensaje;
      } else {
        $state.go('tab.product-detail');
      }
    });
  };
})


.controller('MapCtrl', function($scope, Oficinas, $localstorage, $ionicLoading, $compile, $rootScope, $loading, $alert) {

  $scope.$on('$ionicView.beforeEnter', function(e) {
    //$rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
    $loading.show();
    var ciudades = Oficinas.all();
    if (ciudades.length > 0) {
      $scope.ciudades = ciudades;
      $loading.hide();
    } else {
      Oficinas.LoadOficinas().then(function(response) {
        if (!response.error) {
          $scope.ciudades = response;
          $loading.hide();
        } else {
          $alert.showAlert(response.mensaje);
          $loading.hide();
        }
      });
    }

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };



  });

})

.controller('ContactoCtrl', function($scope, Contactos, $localstorage, $ionicLoading, $compile, $rootScope, $loading, $alert) {

  $scope.$on('$ionicView.beforeEnter', function(e) {
    //$rootScope.checkIfUserIsLoged();
    $loading.show();
    var contactos = Contactos.all();
    if (contactos.length > 0) {
      $scope.contactos = contactos;
      $loading.hide();
    } else {
      Contactos.LoadContactos().then(function(response) {
        if (!response.error) {
          $scope.contactos = response;
          $loading.hide();
        } else {
          $alert.showAlert(response.mensaje);
          $loading.hide();
        }
      });
    }
  });

})

.controller('ProdCatCtrl', function($scope, $localstorage, Products, $rootScope, $loading, $alert, Products) {
  var categorias = [{
    id: 0,
    name: 'Ahorro e Inversión',
    seg: ['01','05']
  }, {
    id: 1,
    name: 'Crédito',
    seg: ['02', '03']
  }, {
    id: 2,
    name: 'Tarjeta Olimpica',
    seg: ['04']
  }];
  var filterCats = [];
  $scope.$on('$ionicView.beforeEnter', function(e) {
    filterCats = [];
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.catprods = [];
    $scope.extractos=[];
    $loading.show();
    Products.loadProducts().then(function(response) {

      if (!response.error) {
        $scope.products = response;
        // filter categorias
        for (var i = 0; i < response.length; i++) {
          if(response[i].Numero.match("^543280") || response[i].Numero.match("^542060") ){
            $localstorage.setObject('master_cta', response[i]);
          }
        }
        var prods = $scope.products;
        var flags = [],
          output = [],
          l = prods.length,
          i;
        for (i = 0; i < l; i++) {
          if (flags[prods[i].Segmento]) continue;
          flags[prods[i].Segmento] = true;
          output.push(prods[i].Segmento);
        }
        for (var i = 0; i < categorias.length; i++) {

          var segms = categorias[i].seg;
          for (var j = 0; j < segms.length; j++) {

            var seg = segms[j];

            if (output.indexOf(seg) != -1) {
              if(!existeCat(filterCats,categorias[i].id)){
                filterCats.push(categorias[i]);
              }

            }
          }
        }

        $scope.updateProducts();
        $loading.hide();
      } else {
        $loading.hide();
        $alert.showAlert(response.mensaje);
      }
    });

    Products.getExtractos($localstorage.getObject('user')).then(function(response){
          $localstorage.setObject('exts', response);
          console.log(response);
    });
  });

  function existeCat(filterCats,id){
    for(var i = 0; i < filterCats.length; i++){
      if(filterCats[i].id==id){
        return true;
      }
    }
    return false;
  }

  $scope.updateProducts = function() {
    test = filterCats;
    $scope.catprods = filterCats;
  }
})

.controller('ServCtrl', function($scope, $localstorage, Servicios, $rootScope) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });
  $scope.services = Servicios.getServices();
})

.controller('ServTCROCtrl', function($scope, $localstorage, $stateParams, Servicios, $rootScope, $alert, $ionicPopup) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });
  Servicios.getOptions(0).then(function(response) {
    if (response.length == 0) {
      $scope.mensaje = "No hay opciones disponibles";
    }
    $scope.bloqueables = response;
  });

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Bloquear',
      template: '¿Está seguro que desea bloquear la tarjeta?'
    });

    confirmPopup.then(function(res) {
      if (res) {
        console.log('You are sure');
        Servicios.bloqueoTar($localstorage.getObject('user')).then(function(response) {
          if (!response.error) {
            console.log(response.descripcion);
            $alert.showMessage(response.descripcion);
          }
        });
      } else {
        console.log('You are not sure');
      }
    });
  };

})

.controller('ActivacionCtrl', function($scope, $localstorage, Servicios, $rootScope, $alert, $loading) {
  $scope.ip = null;
  $scope.tar_ant = '';
  $scope.tar_nue = '';

  $scope.$on('$ionicView.beforeEnter', function(e) {

    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });

  $scope.activar = function(tar_ant, tar_nue) {
    console.log("aqui ip: " + $scope.ip);
    if (tar_ant != '' && tar_nue != '') {
      Servicios.activarTarjeta(tar_ant, tar_nue).then(function(response) {
        if (!response.error) {
          $alert.showAlert("Transacción exitosa");
        } else {
          $alert.showAlert(response.mensaje);
        }
      });
    } else {
      $alert.showAlert("Ingrese los datos");
    }
    console.log("activate it");

  };
})

.controller('MasterPinCtrl', function($scope, $localstorage, Servicios, $rootScope, $alert, $loading) {
  $scope.$on('$ionicView.beforeEnter', function(e) {

    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });
  $scope.Activar = function(pin, pin2) {
    $loading.show();
    if (pin===pin2) {
      var id=$localstorage.getObject('user').id;
      var td=$localstorage.getObject('user').tipodc;
      var numTarjeta=$localstorage.getObject('master_cta').Numero;
      Servicios.ActivarMasterPin(id,td,numTarjeta,pin).then(function(response) {
        if (!response.error) {
          if(response.codigoRespuesta==='OK000'){
            $alert.showMessage(response.descripcionRespuesta);
          }else {
            $alert.showAlert(response.descripcionRespuesta);
          }
        } else {
          $alert.showAlert(response.mensaje);
        }
        $loading.hide();
      });
    } else {
      $alert.showAlert("No coinciden los pines");
      $loading.hide();
    }
  }
})

.controller('ExtractosCtrl', function($scope, $localstorage, Products, $rootScope, $alert, $loading, $stateParams) {
  $scope.ip = null;


  $scope.$on('$ionicView.beforeEnter', function(e) {

    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
    $scope.extractos=[];
    $scope.document=$localstorage.getObject('exts');
    $scope.extr=[];
    var extracto;
    var extra=$scope.document;
    for (var i = 0; i < extra.Extractos.length; i++) {
      console.log(extra.Extractos[i]);
      var extracto=extra.Extractos[i];
      if($stateParams.idCuenta===extracto.Numero ){
        $scope.extr=extracto;
      }
    }
  });

  $scope.EnviarExtMail = function(email, detalle) {
    $loading.show();
    if (email != '' && validateEmail(email)) {
      if(detalle!== undefined){
      var id=$localstorage.getObject('user').id;
      Products.sendExtraMail(id,detalle.docID,detalle.Fecha,detalle.Tipo,email,detalle.Folder).then(function(response) {
        if (!response.error) {

          $alert.showMessage("Transacción exitosa");
        } else {
          $alert.showAlert(response.mensaje);
        }
        $loading.hide();
      });
    }else {
      $alert.showAlert("Seleccione un mes");
      $loading.hide();
    }
    } else {
      $alert.showAlert("Ingrese un email valido");
      $loading.hide();
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

})

.controller('ServTCROBloqCtrl', function($scope, $localstorage, $stateParams, Servicios, $rootScope) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });

  Servicios.bloqueoTar($localstorage.getObject('user')).then(function(response) {
    if (response.length == 0) {
      $scope.mensaje = "No hay opciones disponibles";
    }
    $scope.respuesta = response;
  });
  $scope.services = Servicios.getServices();
})

.controller('DesemCtrl', function($scope, $localstorage, Desembolso, $rootScope, $ionicPopup, $state, $loading, $alert) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });
  var desembolsos = [{
    id: 0,
    name: 'Solicitar Crédito Rotativo'
  }];
  $scope.desembolsos = desembolsos;


  $scope.checkCredRot = function() {
    $loading.show();
    Desembolso.checkCredRot($localstorage.getObject('user')).then(function(response) {
      $loading.hide();
      if (!response.errorInfo) {
        $scope.tieneCred = response.tieneCred;
        $state.go('tab.product-desembolsoDet');
        if (response.tieneCred) {
          $scope.credito = response.responseData;
        } else {
          $scope.credito = response.responseData;
        }
      } else {

        $scope.mensaje = response.mensaje;
        $scope.showAlert();
      }
    });
  };

  $scope.showAlert = function() {
    $alert.showAlert($scope.mensaje);
  };
})

.controller('DesemDetCtrl', function($scope, $localstorage, Desembolso, $rootScope, $state, $loading, $alert) {
  var credito = {};
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;

    credito = Desembolso.getCreditoData();
    console.log(credito.Numero_Tarjeta);
    if (!credito) {
      $state.go('tab.product-desembolso');

    } else {
      $scope.tieneCred = credito.tieneCred;
      $scope.credito = credito.responseData;
    }
  });

  $scope.solicitar = function(monto) {
    $loading.show();
    if (typeof monto !== "undefined" && monto !== null) {
      Desembolso.desembolsaCredito($localstorage.getObject('user'), $scope.credito.Numero_Tarjeta, monto).then(function(response) {
        $loading.hide();
        if (!response.errorInfo) {
          $alert.showMessage(response.responseData.descripcion);
        } else {
          $alert.showAlert(response.responseData.descripcion);
        }
      });
    } else {
      $loading.hide();
      $alert.showAlert("Debe Ingresar el monto a solicitar.")
    }

  };
  //$scope.checkCredRot =
  //$scope.mensaje= "No hay datos";
})

.controller('SolRotaCtrl', function($scope, $localstorage, $stateParams, $rootScope, Desembolso) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;

    Desembolso.desembolsaCredito($localstorage.getObject('user'), $stateParams.num_tarjeta, $stateParams.monto).then(function(response) {
      if (!response.errorInfo) {

        $scope.respuesta = response.responseData.descripcion;

      } else {
        $scope.mensaje = response.mensaje;
      }
    });

  });

  //$scope.mensaje= "No hay datos";
})

.controller('SeguridadCtrl', function($scope, $localstorage, $rootScope) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });
  var seguridad = [{
    id: 0,
    name: 'Cambio de contraseña',
    url: 'cambiopass'
  },
  {
    id: 1,
    name: 'Registro a clave dínamica',
    url: 'registroclavedinamica'
  }];
  $scope.seguridad = seguridad;

})

.controller('ChangePassCtrl', function($scope, UsrAuth, $localstorage, $rootScope, $alert, $state) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $rootScope.checkIfUserIsLoged();
    $scope.name = $localstorage.getObject('user').nombre;
    $scope.ip = $localstorage.getObject('user').ip;
    $scope.ingreso = $localstorage.getObject('user').ingreso;
  });
  $scope.usuario = '';
  $scope.pass = '';
  $scope.confirmPass = '';
  $scope.changePass = function(usuario, pass, confirmPass) {
    UsrAuth.changePass(usuario, pass, confirmPass).then(function(response) {
      if (!response.error) {
        switch (response.codigo) {
          case "00":
            $state.go('auth.login');
            $alert.showMessage(response.descripcion);
            break;
          default:
            $alert.showAlert(response.descripcion);
        }

      } else {
        $alert.showAlert(response.mensaje);
      }
    });
  }
})

.controller('PinCtrl', function($scope, UsrAuth, $stateParams, $localstorage, $rootScope, $alert, $state, $loading) {
  var ClientDoc = {};
  var idTran = $stateParams.idTran;
  if (idTran == 1) {
    ClientDoc = UsrAuth.getUserDocument();
  } else {
    ClientDoc = {
      tipo_doc: $stateParams.tipo_doc,
      documento: $stateParams.documento
    };
  }
  console.log(idTran);
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $loading.show();
    UsrAuth.generaPin(ClientDoc.tipo_doc, ClientDoc.documento).then(function(response) {
      if (!response.error) {
        $loading.hide();
        switch (response.codigo) {
          case "000":
            $alert.showMessage(response.descripcion);
            break;
          default:
            $alert.showAlert(response.descripcion);
        }

      } else {
        $alert.showAlert(response.mensaje);
      }
    });

    $scope.validar = function(pin) {
      UsrAuth.validaPin(ClientDoc.tipo_doc, ClientDoc.documento, pin).then(function(response) {
        if (!response.error) {
          switch (response.codigo) {
            case "040":
            case "029":
              if (idTran == 1) {
                $state.go('auth.resetpass');
              } else {
                $state.go('auth.createuser', ClientDoc);
              }
              break;
            case "012":
              $alert.showAlert('C\xF3digo inv\xE1lido');
              break;
            default:
              $alert.showAlert(response.descripcion);
          }

        } else {
          $alert.showAlert(response.mensaje);
        }
      });
    }
  });
})

.controller('RecUsuarioCtrl', function($scope, UsrAuth, $localstorage, $rootScope, $alert, $state, $loading) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $loading.show();
    UsrAuth.GetTipoDoc().then(function(response) {
      if (!response.error) {
        $loading.hide();
        $scope.TiposDocs = response;
      } else {
        $loading.hide();
        $alert.showAlert(response.mensaje);
      }
    });

    $scope.recuperar = function(input) {
      UsrAuth.recuperaUsuario(input.DocSelected, input.numdocu).then(function(response) {
        if (!response.error) {
          $loading.hide();
          switch (response.codigo) {
            case "000":
              $alert.showMessage(response.descripcion);
              $state.go('auth.login');
              break;
            default:
              $alert.showAlert(response.descripcion);
          }

        } else {
          $alert.showAlert(response.mensaje);
        }
      });

    };
  });
})

.controller('RegisValidarCtrl', function($scope, UsrAuth, $localstorage, $rootScope, $alert, $state, $loading) {


  $scope.$on('$ionicView.beforeEnter', function(e) {
    $loading.show();
    UsrAuth.GetTipoDoc().then(function(response) {
      if (!response.error) {
        $loading.hide();
        $scope.TiposDocs = response;
      } else {
        $loading.hide();
        $alert.showAlert(response.mensaje);
      }
    });
  });
  $scope.validar = function(input) {
    if (input !== undefined) {
      console.log(input);
      if (input.hasOwnProperty('DocSelected') && input.hasOwnProperty('numdocu')) {
        if (input.DocSelected != "") {
          if (input.numdocu != "") {
            $state.go("auth.validarpin", {
              idTran: 2,
              tipo_doc: input.DocSelected,
              documento: input.numdocu
            });

          } else {
            $alert.showAlert("Debe llenear todos los campos")
          }
        } else {
          $alert.showAlert("Debe llenear todos los campos")
        }
      } else {
        $alert.showAlert("Debe llenear todos los campos")
      }
    } else {
      $alert.showAlert("Debe llenear todos los campos")
    }
  };
})

.controller('ForgotPassCtrl', function($scope, UsrAuth, $localstorage, $rootScope) {
  $scope.$on('$ionicView.beforeEnter', function(e) {

  });

})

.controller('ProdDetailCtrl', function($scope, $localstorage, $stateParams, Products, $rootScope, $state) {

    $scope.catnames = {
      '01': 'Ahorro e Inversión',
      '02': 'Cartera Financiera',
      '03': 'Cartera Financiera',
      '04': 'Cartera Olimpica',
      '05':'Ahorro e Inversión'
    }
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $rootScope.checkIfUserIsLoged();
      $scope.name = $localstorage.getObject('user').nombre;
      $scope.ip = $localstorage.getObject('user').ip;
      $scope.ingreso = $localstorage.getObject('user').ingreso;
      $scope.ext=false;
      var currentProd = Products.getCurrentProduct();
      if (currentProd) {
        $scope.prod = currentProd;
        var extra=$localstorage.getObject('exts');
        if(typeof extra != 'undefined'){
            for (var i = 0; i < extra.Extractos.length; i++) {
              console.log(extra.Extractos[i]);
              var extracto=extra.Extractos[i];
              if($scope.prod.pitem.Numero===extracto.Numero || currentProd.Referencia===extracto.Numero){
                $scope.ext=true;
              }
            }
        }
      } else {
        $state.go('tab.catprods');
      }
    });


  })
  .controller('BackControler', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $state, UsrAuth, $localstorage, $window, $loading, $alert, Idle, $rootScope, $ionicPush) {



  $scope.$on('$ionicView.beforeEnter', function(e) {

    console.log('at least' + $window.innerHeight);
    var styles = {
      'border-top': ($window.innerHeight / 2) + 'px solid #F3F3F3;',
      'border-right': ($window.innerWidth / 2) + 'px solid #F3F3F3;',
      'border-left': ($window.innerWidth / 2) + 'px solid #F3F3F3;',
      'border-bottom': ($window.innerHeight / 2) + 'px solid #F3F3F3;',
      'background-color': 'red'
    };
    //console.log(styles);
    $scope.borderStyles = JSON.stringify(styles);
    //console.log($scope.borderStyles);
    $scope.borStyles = $scope.borderStyles.substr(1, $scope.borderStyles.length - 1).replace(/[,"]+/g, '');

  });

  $scope.keypress = function($event) {
    $scope.lastKey = $event.keyCode
    console.log($scope.lastKey);
  };



  $scope.logResize = function() {
    var styles = {
      'border-top': ($window.innerHeight / 2) + 'px solid #F3F3F3;',
      'border-right': ($window.innerWidth / 2) + 'px solid #F3F3F3;',
      'border-left': ($window.innerWidth / 2) + 'px solid #F3F3F3;',
      'border-bottom': ($window.innerHeight / 2) + 'px solid #F3F3F3;',

    };
    console.log("log resize" + $window.innerHeight);
    //console.log(styles);
    $scope.borderStyles = JSON.stringify(styles);
    //console.log($scope.borderStyles);
    //$scope.borStyles =
    var myVar = $scope.borderStyles.substr(1, $scope.borderStyles.length - 1).replace(/[,"]+/g, '');
    $scope.$apply(function() {
      $scope.borStyles = myVar;
    });
  }
  $scope.usuario = '';
  $scope.pass = '';
  $scope.signin = function(usuario, pass) {
    $loading.show();
    //$localstorage.setObject('user', {tipoid: 1, id:72005948, nombre: 'Prueba Prueba'});
    //$state.go('tab.catprods');
    //alert (usuario);
    UsrAuth.login(usuario, pass).then(function(response) {
      $loading.hide();
      if (response.codigo == "00") {

        $localstorage.setObject('user', response);
        Idle.watch();
        $state.go('tab.catprods');
      } else {
        //$scope.mensaje = response.descripcion;
        $alert.showAlert(response.descripcion);
        //para pruebas
        //$localstorage.setObject('user', {tipoid: 1, id:72005948, nombre: 'Prueba Prueba'});
        //$state.go('tab.catprods');
      }
    });
  }
  $scope.validar = function(usuario) {
    if (usuario != "") {
      $loading.show();
      UsrAuth.ExisteUsuario(usuario).then(function(response) {
        if (!response.error) {
          $loading.hide();
          if (response.existe) {
            console.log(response.documento);
            $state.go("auth.validarpin", {
              idTran: 1
            });
          } else {
            $alert.showMessage("No existe el usuario");
          }
        } else {
          $loading.hide();
          $alert.showAlert(response.mensaje);
        }
      });
    } else {
      $alert.showAlert("Debe ingresar el usuario");
    }
  }

})

.controller('ResetPassCtrl', function($scope, $state, UsrAuth, $localstorage, $window, $loading, $alert) {
    $scope.resetPass = function(pass, confirmPass) {
      if (pass == confirmPass) {
        $loading.show();
        UsrAuth.resetPass(pass, confirmPass).then(function(response) {
          if (!response.error) {
            $loading.hide();
            if (response.codigo == '00') {
              $alert.showMessage(response.descripcion);
              $state.go('auth.login');
            }

          } else {
            $loading.hide();
            $alert.showAlert(response.mensaje);
          }
        });
      } else {
        $alert.showAlert("No coinciden las claves");
      }
    }

  })
  .controller('CreateUserCtrl', function($scope, $state, $stateParams, UsrAuth, $localstorage, $window, $loading, $alert) {

    $scope.create = function(user, pass, confirmPass) {
      var isValid = true;
      $loading.show();
      if (typeof user !== "undefined" && typeof pass !== "undefined" && typeof confirmPass !== "undefined") {
        $scope.$watch("user.$valid", function(val) {
          isValid = false;
        });
        $scope.$watch("pass.$valid", function(val) {
          isValid = false;
        });
        $scope.$watch("confirmPass.$valid", function(val) {
          isValid = false;
        });
        var tipo = $stateParams.tipo_doc;
        var cedula = $stateParams.documento;
        if (isValid) {
          if (pass == confirmPass) {
            UsrAuth.CreateUser(tipo, cedula, user, pass).then(function(response) {
              $loading.hide();
              if (!response.error) {

                if (response.codigo === "00") {
                  $alert.showMessage(response.descripcion);
                  $state.go('auth.login');
                } else {
                  $alert.showAlert(response.descripcion);
                }


              } else {
                $loading.hide();
                $alert.showAlert(response.mensaje);
              }

            });
          } else {
            $loading.hide();
            $alert.showAlert("No coinciden las claves")
          }
        } else {
          $loading.hide();
          $alert.showAlert("Debe llenar todos los campos");
        }
      } else {
        $loading.hide();
        $alert.showAlert("Debe llenar todos los campos");
      }
    }
  })
  .controller('PreguntasCtrl', function($scope, $state, $stateParams, UsrAuth, $localstorage, $window, $loading, $alert) {

    var ClientDoc = {};
    var preguntas = [];
    var idTran = $stateParams.idTran;
    if (idTran == 1) {
      ClientDoc = UsrAuth.getUserDocument();
    } else {
      ClientDoc = {
        tipo_doc: $stateParams.tipo_doc,
        documento: $stateParams.documento
      };
    }
    console.log(idTran);
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $loading.show();
      UsrAuth.getPreguntasVal(ClientDoc.tipo_doc, ClientDoc.documento).then(function(response) {
        if (!response.error) {
          $loading.hide();
          preguntas = response;
          if (preguntas.length > 0) {
            $scope.Preguntas = response;
          } else {
            $state.go('auth.login');
            $alert.showAlert(response.descripcion);
          }
        } else {
          $loading.hide();
          $alert.showAlert(response.mensaje);
        }
      });
    });

    $scope.ValidaResp = function(respts) {
      console.log(respts);
      if (respts !== undefined) {
        if (respts.hasOwnProperty('respuesta0') && respts.hasOwnProperty('respuesta1') && respts.hasOwnProperty('respuesta2') && respts.hasOwnProperty('respuesta2')) {
          if (preguntas[0].correcta == respts.respuesta0 && preguntas[1].correcta == respts.respuesta1 && preguntas[2].correcta == respts.respuesta2 && preguntas[3].correcta == respts.respuesta3) {
            console.log('todo correcto');
            if (idTran == 1) {
              $state.go('auth.resetpass');
            } else {
              $state.go('auth.createuser', ClientDoc);
            }

          } else {
            $alert.showAlert("No se ha podido verficar la indentidad");
            $state.go('auth.login');
          }
        } else {
          $alert.showAlert("Debe responder todas las preguntas");
        }
      } else {
        $alert.showAlert("Debe responder todas las preguntas");
      }
    }

  })

  .controller('GiroController', function($scope,$ionicModal, $rootScope, $state, $stateParams, $localstorage, $window, $loading, $alert, Giros) {
    $scope.$on('$ionicView.beforeEnter', function(e) {
      if(!$rootScope.otpValido){
        $rootScope.modal.show();
      }
    });

    $scope.submitted=false;
    $scope.continuar= function(beneficiario, isValid){
      $scope.submitted=true;
      if (typeof beneficiario != 'undefined' && isValid){
        $loading.show();
        var giro;
          Giros.Consultar(beneficiario).then(function(respuesta){
            if (respuesta.correcto){
              giro =  respuesta.giro;
              $state.go('tab.ConfirmarGiro', {giro:giro});
              $loading.hide();
            }else{
              $alert.showAlert(respuesta.descripcion);
              $loading.hide();
            }
          });
      }
    }

    $scope.back= function(){
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        historyRoot: true
        });
        $state.go('tab.servicios');
    }
  })

  .controller('ConfirGiroController', function($scope, $state, $stateParams,$ionicHistory , $localstorage, $window, $loading, $alert, $ionicPopup, Giros) {
    $scope.tarjeta=$localstorage.getObject('master_cta').Numero;
    var giro = {}
    $scope.submitted=false;
    $scope.$on('$ionicView.beforeEnter', function(e) {
        giro=$stateParams.giro;
        $scope.giro=giro;
    });

    $scope.confirmar= function(card, isValid){
      var data={};
      $scope.submitted=true;
      if (typeof card != 'undefined' && isValid){

      data.tarjeta=$scope.tarjeta;
      data.cvc2=card.cvc;
      data.fechadeVencimiento={};
      data.fechadeVencimiento.ano=card.expiration.year;
      data.fechadeVencimiento.mes=card.expiration.month;
      data.numCuotas=card.cuotas;
      data.canalNovedad='SerfinansaMovil';
      data.giro=$stateParams.giro;
      $loading.show();
      var giro;
        Giros.Confirmar(data).then(function(respuesta){
          if (typeof respuesta != 'undefined'){
            $loading.hide();
            var alertPopup = $ionicPopup.alert({
               title: 'Giramas',
               template: respuesta.descripcion
            });

            alertPopup.then(function(res) {
              $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
              });
               $state.go('tab.servicios')
            });
          }
        });
      }else{
        $alert.showAlert('Debe llenar los datos de la tarjeta');
      }
    }
  })


  .controller('ClaveDinamicaCtrl', function($scope, $state,$ionicHistory, $stateParams, $localstorage, $window, $loading, $alert) {
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $scope.name = $localstorage.getObject('user').nombre;
      $scope.ip = $localstorage.getObject('user').ip;
      $scope.ingreso = $localstorage.getObject('user').ingreso;

    });

    $scope.back = function(){
        $ionicHistory.nextViewOptions({
        disableAnimate: false,
        historyRoot: true
        });
        $state.go($stateParams.stateBack);
    }

    $scope.validar = function(claveDinamica){
      $ionicHistory.nextViewOptions({
      disableAnimate: false,
      historyRoot: true
      });
      $state.go($stateParams.stateForward,{autorizado:true});
    }


  })
  .controller('RegistroClaveDinamicaCtrl', function($scope, $state, $stateParams, $localstorage, $window, $loading, $alert,$ionicPopup) {
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $scope.name = $localstorage.getObject('user').nombre;
      $scope.ip = $localstorage.getObject('user').ip;
      $scope.ingreso = $localstorage.getObject('user').ingreso;

    });

    $scope.back = function(){
      $state.go($stateParams.state);
    }




  })

  ;
var testController;
