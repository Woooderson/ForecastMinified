app.factory('forecast', ['$http', function($http){
var url = 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/';    
var factory = {}; 

factory.weather = function(latitude, longitude){
    return $http.get(url+ latitude +'/lon/'+ longitude +'/data.json')
    .success(function(data) {
       return data;
     })
    .error(function(err) {
       return err;
     });
    };
return factory;
}]);