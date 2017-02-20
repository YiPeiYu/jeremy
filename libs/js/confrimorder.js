var conApp = angular.module('conApp', ['commonApp']);
conApp.controller('concontroller',['$scope','$http' ,function($scope, $http) {
	$http.get('login_info.php').success(function(response) {
//		console.log(response)
		if(response.state) {
			$scope.account = response.account;
			$scope.phone = response.phone;
			$http.get('order.php').success(function(response) {
				$scope.data = response;
//				console.log($scope.data)
				var total = 0;
				var n = 0;
				for(var i = 0;i < $scope.data.length;i++){
					total = total + $scope.data[i].num * $scope.data[i].price;
					n = n + $scope.data[i].num;
				}
				$scope.total = total;
				$scope.Num = n;
			})
		} else {
			window.location.href = 'login.html';
		}
	})
	$scope.submit = function(){
		$http.get('sumitorder.php').success(function(response){
			window.location.href = "orderlist.html";
		})
	}
}])

