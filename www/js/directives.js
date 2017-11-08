// JavaScript Document

'use strict';

angular.module('starter.directives', [])

.directive('onSizeChanged', ['$window', function($window) {
  return {
    restrict: 'A',
    scope: {
      onSizeChanged: '&'
    },
    link: function(scope, $element, attr) {
      var element = $element[0];

      cacheElementSize(scope, element);
      $window.addEventListener('resize', onWindowResize);

      function cacheElementSize(scope, element) {
        scope.cachedElementWidth = element.offsetWidth;
        scope.cachedElementHeight = element.offsetHeight;
      }

      function onWindowResize() {
        var isSizeChanged = scope.cachedElementWidth != element.offsetWidth || scope.cachedElementHeight != element.offsetHeight;
        if (isSizeChanged) {
          var expression = scope.onSizeChanged();
          expression();
        }
      };
    }
  }
}])

.directive('keyboardHandler', function($window, $timeout) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      angular.element($window).bind('native.keyboardshow', function() {
        element.addClass('tabs-item-hide'); // tries to hide tab but becomes blank space instead
        $timeout(function() {
          element.addClass('tabs-item-hide'); //remove blank space quickly
        }, 0);
      });

      angular.element($window).bind('native.keyboardhide', function() {
        element.removeClass('tabs-item-hide');
      });
    }
  };
})

.directive('ionSelect', function() {
  'use strict';
  return {
    restrict: 'EAC',
    scope: {
      label: '@',
      labelField: '@',
      provider: '=',
      ngModel: '=?',
      ngValue: '=?',

    },
    require: '?ngModel',
    transclude: false,
    replace: false,
    template: '<div class="selectContainer">' + '<label class="item item-input item-stacked-label">' + '<span class="input-label">{{label}}</span>' + '<div class="item item-input-inset">' + '<label class="item-input-wrapper">' + '<i class="icon ion-ios7-search placeholder-icon"></i>' + '<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>' + '</label>' + '<button class="button button-small button-clear" ng-click="open()">' + '<i class="icon ion-chevron-down"></i>' + '</button>' + '</div>' + '</label>' + '<div class="optionList padding-left padding-right" ng-show="showHide">' + '<ion-scroll>' + '<ul class="list">' + '<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>' + '</ul>' + '</ion-scroll>' + '</div>' + '</div>',
    link: function(scope, element, attrs, ngModel) {
      scope.ngValue = scope.ngValue !== undefined ? scope.ngValue : 'item';

      scope.selecionar = function(item) {
        ngModel.$setViewValue(item);
        scope.showHide = false;
      };

      element.bind('click', function() {
        element.find('input').focus();
      });

      scope.open = function() {

        scope.ngModel = "";
        return scope.showHide = !scope.showHide;
      };

      scope.onKeyDown = function() {
        scope.showHide = true;
        if (!scope.ngModel) {
          scope.showHide = false;
        }
      }

      scope.$watch('ngModel', function(newValue) {
        if (newValue)
          element.find('input').val(newValue[scope.labelField]);

      });
    },
  };
});
