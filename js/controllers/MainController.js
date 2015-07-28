app.controller('MainController', ['$scope', '$filter', 'forecast', 'location', function($scope, $filter, forecast, location) { 
    $scope.$on('assignCoords', function (event, data) {
        var latitude = $filter('number')(data.coords.latitude, 6);
        var longitude = $filter('number')(data.coords.longitude, 6);
        
        forecast.weather(latitude, longitude).success(function(response) {
        $scope.weatherData = response;
        fetchWeatherArray($scope.weatherData);
        });
        location.name(latitude, longitude).success(function(response) {
        $scope.heading = response;
        });
    });
    
    var fetchDate = function (incrementDate) {
        var today = new Date();
        return $scope.newDate = $filter('date')(today.setDate(today.getDate() + incrementDate), 'shortDate').toString();
    };
    
    $scope.weatherForecast = {
        today: {atNine: {}, atThree:{}, atTwentyOne:{}},
        tomorrow: [],
        list: []
    };
    var fetchWeatherArray = function (weatherData) {
       for (i=0;i<weatherData.timeseries.length;i++) {
            if ($filter('date')(weatherData.timeseries[i].validTime).toString() == $filter('date')(new Date)) {
                if ($filter('date')(weatherData.timeseries[i].validTime, 'HH') == 09)
                    $scope.weatherForecast.today.atNine = weatherData.timeseries[i+2];
                else if ($filter('date')(weatherData.timeseries[i].validTime, 'HH') == 15)
                    $scope.weatherForecast.today.atThree = weatherData.timeseries[i+2];
                else if ($filter('date')(weatherData.timeseries[i].validTime, 'HH') == 21)
                    $scope.weatherForecast.today.atTwentyOne = weatherData.timeseries[i+2];
            }
        };
        for (i=0;i<weatherData.timeseries.length;i++) {
            var dateTime = $filter('date')(weatherData.timeseries[i].validTime, 'shortDate').toString();
            if (dateTime === fetchDate(1))
                $scope.weatherForecast.list.push(weatherData.timeseries[i+2]);
        };
        for (i=0;i<$scope.weatherForecast.list.length;i++) {
            if ($filter('date')($scope.weatherForecast.list[i].validTime, 'HH') == 09 || $filter('date')($scope.weatherForecast.list[i].validTime, 'HH') == 15 || $filter('date')($scope.weatherForecast.list[i].validTime, 'HH') == 21)
                $scope.weatherForecast.tomorrow.push($scope.weatherForecast.list[i+2]); 
        };
    };
    
    if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(
        displayPosition, 
        displayError,
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
      );
    }
    else {
      alert("Geolocation is not supported by this browser");
    }
    
    function displayPosition(position) {
        $scope.$emit('assignCoords', position);
    }; 
    
    function displayError(error) {
      var errors = { 
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
      };
      alert("Error: " + errors[error.code]);
    };
        
}]);