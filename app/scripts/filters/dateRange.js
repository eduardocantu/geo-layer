'use strict';
angular.module('FILTERS', []).filter("dateRange", function() {

  return function(items, from, to) {
        var arrayToReturn = []; 
        var itemDate;
        if (items) {
       		items.forEach(function(item) {
       			itemDate = new Date (item.data).getTime();
        		if (itemDate >= from.getTime() && itemDate <= to.getTime()) { 
        			arrayToReturn.push(item);
        		}
        	});    
        }       

        return arrayToReturn;
  	};
  });