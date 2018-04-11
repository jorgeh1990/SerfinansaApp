// JavaScript Document

angular.module('starter.filters', [])

.filter('maskNumber', function() {
  return function(input) {
    var num_dig = 4;
    var len = input.length;
    var digits = input.substr(num_dig * -1, num_dig);
    return Array(4).join("*") + digits;
  };
})

.filter('filterProducts', function() {
  return function(items, query) {
    var filtered = [];
    var filterResults = query.split('-');
    for (var i = 0; i < items.length; i++) {
      var itemP = items[i];
      if (query) {
        if (filterResults.indexOf(itemP.Segmento) > -1) {
          filtered.push(itemP);
        }
      } else {
        filtered.push(itemP);
      }
    }
    return filtered;
  };
})

.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=1; i<=total; i++) {
      input.push(i);
    }

    return input;
  };
});
