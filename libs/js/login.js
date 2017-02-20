var loginAPP = angular.module('loginAPP', ['commonApp']);
loginAPP.controller('loginController', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function() {
		$http.post('login.php', {
			phone: $scope.phone,
			password: $scope.password
		}).success(function(response) {
			if(response.state) {
				window.location.href = 'index.html';
			} else {
				$.alert(response.message);
			}
		})
	}

}])