app.factory('location', ['$http', function($http) {
var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='; 
var factory = {}; 
    
factory.name = function(latitude, longitude){
    return $http.get(url+ latitude +','+ longitude +'&key=AIzaSyAo4JbqRsbnPTEjo9GlG4_tOHxEGJFfGfA')
    .success(function(data) {
       return data;
     })
    .error(function(err) {
       return err;
     });
};
return factory;
}]);