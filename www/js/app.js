
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.cloud', 'ngIdle', 'starter.controllers', 'starter.services', 'starter.filters', 'ionic.utils', 'starter.directives'])

.run(function($ionicPlatform,$ionicModal, $ionicHistory,$window, $localstorage, $rootScope, $state, Idle, $ionicPopup,$ionicPush,$http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    setTimeout(function() {
      navigator.splashscreen.hide();
    }, 500);

  });


  $rootScope.logout = function() {
    console.log("loging out user");
    $rootScope.modal.hide();
    $state.go('auth.login');
    $localstorage.clear();
    Idle.unwatch();
  };

  $ionicModal.fromTemplateUrl('templates/clavedinamica.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
   $rootScope.modal = modal;
  });

  $rootScope.validar=function(){
    $rootScope.modal.hide();
  }


  $rootScope.events = [];

  $rootScope.$on('IdleStart', function() {
    // the user appears to have gone idle
    console.log("Idle started");
  });

  $rootScope.$on('IdleWarn', function(e, countdown) {
    // follows after the IdleStart event, but includes a countdown until the user is considered timed out
    // the countdown arg is the number of seconds remaining until then.
    // you can change the title or display a warning dialog from here.
    // you can let them resume their session by calling Idle.watch()
    console.log("Idle warning");
  });

  $rootScope.$on('IdleTimeout', function() {
    // the user has timed out (meaning idleDuration + timeout has passed without any activity)
    // this is where you'd log them
    console.log("Idle timeout");
    $rootScope.logout();
    $state.go('auth.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Sesión',
      template: 'Sesión cerrada por inactividad'
    });

    alertPopup.then(function(res) {
      console.log('Sesion cerrda');
    });

  });

  $rootScope.$on('IdleEnd', function() {
    // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    console.log("Idle end");
  });

  $rootScope.$on('Keepalive', function() {
    // do something to keep the user's session alive
    console.log("Idle Keepalive");
  });

$rootScope.urlBakcEnd = 'https://app.serfinansa.com.co/SerfiAppService/api/';


  $rootScope.checkIfUserIsLoged = function() {
    var user = $localstorage.getObject('user');
    if (user.id == 0) {
      //$state.go('auth.login');
    }
  };

     $ionicPush.register().then(function(t) {
           console.log(JSON.stringify(t));
           var reqData = {
                url: $rootScope.urlBakcEnd + 'Push/SaveToken',
                method: 'POST',
                data: t,
                headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                         }
            };
            console.log(JSON.stringify(reqData));
            $http(reqData).then(function(response) {
              // The then function here is an opportunity to modify the response
              console.log(JSON.stringify(response));
            }, function(error) {
              console.log(JSON.stringify(error));
            });
         $ionicPush.saveToken(t);

        }).then(function(t) {
         console.log(JSON.stringify(t));

    });


  $rootScope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    var alertPopup = $ionicPopup.alert({
        template: msg.text,
        title: msg.title
    });
     console.log(msg.title);
  });

$rootScope.onTabSelected=function(){
  $state.go('tab.servicios');
}




})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, IdleProvider, KeepaliveProvider, $ionicCloudProvider) {

  $ionicCloudProvider.init({
     "core": {
       "app_id": "c789e0e3"
     },
     "push": {
      "sender_id": "113587534845",
      "pluginConfig": {
        "ios": {
          "alert": true,
          "badge": true,
          "sound": true,
          "clearBadge": true
        },
        "android": {
          "iconColor": "#FFFFFF",
          "topics":["all_movil"]
        }
      }
    }
   });

  IdleProvider.idle(180); // in seconds
  IdleProvider.timeout(15); // in seconds
  KeepaliveProvider.interval(60); // in seconds

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    cache: false,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.catprods', {
    url: '/products/cat/',
    views: {
      'tab-products': {
        templateUrl: 'templates/tab-catprods.html',
        controller: 'ProdCatCtrl'
      }
    }
  })

  .state('tab.products', {
    url: '/products/cat/:catSeg',
    views: {
      'tab-products': {
        templateUrl: 'templates/tab-products.html',
        controller: 'ProdCtrl'
      }
    }
  })
  .state('tab.products-ahorro', {
    url: '/products/cat/ahorroinv/:catSeg',
    views: {
      'tab-products': {
        templateUrl: 'templates/tab-ahorroinv.html',
        controller: 'ProdAhorroCtrl'
      }
    }
  })

  .state('tab.product-detail', {
    url: '/products/cat/:catSeg/:prodId',
    views: {
      'tab-products': {
        templateUrl: 'templates/product-detail.html',
        controller: 'ProdDetailCtrl'
      }
    }
  })

  .state('tab.extractos', {
    url: '/products/extractos/:idCuenta',
    views: {
      'tab-products': {
        templateUrl: 'templates/extractos.html',
        controller: 'ExtractosCtrl'
      }
    }
  })

  .state('tab.servicios', {
    url: '/servicios',
    cache: false,
    views: {
      'tab-servicios': {
        templateUrl: 'templates/tab-servicios.html',
        controller: 'ServCtrl'
      }
    }
  })

  .state('tab.servicio-detail', {
    url: '/servicios/bloqueo',
    cache: false,
    views: {
      'tab-servicios': {
        templateUrl: 'templates/service-detail.html',
        controller: 'ServTCROCtrl'
      }
    }
  })

  .state('tab.activar-tarjeta', {
    url: '/servicios/activacion',
    cache: false,
    views: {
      'tab-servicios': {
        templateUrl: 'templates/activar-tarjeta.html',
        controller: 'ActivacionCtrl'
      }
    }
  })

  .state('tab.activar-masterpin', {
    url: '/servicios/master-actpin',
    cache: false,
    views: {
      'tab-servicios': {
        templateUrl: 'templates/master-actpin.html',
        controller: 'MasterPinCtrl'
      }
    }
  })

  .state('tab.ColcarGiro', {
    url: '/servicios/ColcarGiro',
    cache: false,
    views: {
      'tab-servicios': {
        templateUrl: 'templates/giros.html',
        controller: 'GiroController',
      }
    }
  })

  .state('tab.ConfirmarGiro', {
    url: '/servicios/ConfirmarGiro',
    cache: false,
    views: {
      'tab-servicios': {
        templateUrl: 'templates/confirmarGiro.html',
        controller: 'ConfirGiroController',
      }
    }
  })

  .state('tab.servdetail-opcion', {
    url: '/servicios/:servId/:ServOpc',
    cache: false,
    views: {
      'tab-servicios': {
        templateUrl: 'templates/service-bloqueo.html',
        controller: 'ServTCROBloqCtrl'
      }
    }
  })

  .state('tab.seguridad', {
    url: '/seguridad',
    cache: false,
    views: {
      'tab-seguridad': {
        templateUrl: 'templates/tab-seguridad.html',
        controller: 'SeguridadCtrl'
      }
    }
  })

  .state('tab.cambiopass', {
    cache: false,
    url: '/seguridad/cambiopass',
    views: {
      'tab-seguridad': {
        templateUrl: 'templates/cambio-pass.html',
        controller: 'ChangePassCtrl'
      }
    }
  })

  .state('tab.registroclavedinamica', {
    cache: false,
    url: '/seguridad/registroclavedinamica',
    views:{
        'tab-seguridad': {
          templateUrl: 'templates/registroclavedinamica.html',
          controller: 'RegistroClaveDinamicaCtrl'
        }
    }
  })

  .state('tab.product-desembolso', {
    url: '/desembolso',
    views: {
      'tab-desembolso': {
        templateUrl: 'templates/tab-desembolso.html',
        controller: 'DesemCtrl'
      }
    }
  })

  .state('tab.product-desembolsoDet', {
    url: '/desembolso/:desId',
    views: {
      'tab-desembolso': {
        templateUrl: 'templates/tab-detDesembolso.html',
        controller: 'DesemDetCtrl'
      }
    }
  })

  .state('tab.credito-rotativo', {
    url: '/solcredrota/:num_tarjeta/:monto',
    views: {
      'tab-desembolso': {
        templateUrl: 'templates/tab-solicitarCred.html',
        controller: 'SolRotaCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive
  .state('auth', {
    url: '/auth',
    abstract: true,
    templateUrl: 'templates/authentication.html'
  })

  .state('auth.olvidopass', {
    url: '/olvidopass',
    views: {
      'auth-login': {
        templateUrl: 'templates/olvidopass.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('auth.login', {
    url: '/login',
    views: {
      'auth-login': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('auth.preguntas', {
    url: '/preguntas/:idTran/:tipo_doc/:documento',
    views: {
      'auth-login': {
        templateUrl: 'templates/preguntas.html',
        controller: 'PreguntasCtrl'
      }
    }
  })

  .state('auth.validarpin', {
    url: '/validarpin/:idTran/:tipo_doc/:documento',
    views: {
      'auth-login': {
        templateUrl: 'templates/validarpin.html',
        controller: 'PinCtrl'
      }
    }
  })

  .state('auth.resetpass', {
    url: '/resetpass',
    views: {
      'auth-login': {
        templateUrl: 'templates/resetpass.html',
        controller: 'ResetPassCtrl'
      }
    }
  })

  .state('auth.registroval', {
      url: '/registroval',
      views: {
        'auth-login': {
          templateUrl: 'templates/registroval.html',
          controller: 'RegisValidarCtrl'
        }
      }
    })
    .state('auth.recusuario', {
        url: '/recusuario',
        views: {
          'auth-login': {
            templateUrl: 'templates/recusuario.html',
            controller: 'RecUsuarioCtrl'
          }
        }
      })
    .state('auth.createuser', {
      url: '/createuser/:tipo_doc/:documento',
      views: {
        'auth-login': {
          templateUrl: 'templates/createuser.html',
          controller: 'CreateUserCtrl'
        }
      }
    })

    .state('auth.oficinas', {
      url: '/oficinas',
      views: {
        'auth-login': {
          templateUrl: 'templates/oficinas.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('auth.contacto', {
      url: '/contacto',
      views: {
        'auth-login': {
          templateUrl: 'templates/contacto.html',
          controller: 'ContactoCtrl'
        }
      }
    })
    .state('auth.condiciones', {
      url: '/condiciones',
      views: {
        'auth-login': {
          templateUrl: 'templates/condiciones.html',
          controller: ''
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');
  //$urlRouterProvider.otherwise('/terminos');
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
  //$ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.navBar.alignTitle("center");
  $ionicConfigProvider.tabs.style("standard");

});
