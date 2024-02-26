/**
 * 
 */


let map;

(function (global, $) {

	
	
    var base = {

            getMapFromCitizen: function (citizen_map) {
            	map = citizen_map;
            	alert(map);

            }

    }

    global.featureManagement = base;


})(window, jQuery);
