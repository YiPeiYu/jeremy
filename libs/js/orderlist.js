var mainapp = angular.module('mainapp', ['commonApp']);
mainapp.controller('maincontroller',['$scope','$http' ,function($scope, $http) {
	$http.get('login_info.php').success(function(response) {
//		console.log(response)
		if(response.state) {
			$http.get('order.php').success(function(response) {
				$scope.data = response;
//				console.log($scope.data)
				if($scope.data.length == 0){
					$('.order-content').hide();
					$.alert("你没有购买任何商品，快去购买吧！")
				}else{
					var total = 0;
					var n = 0;
					for(var i = 0;i < $scope.data.length;i++){
						total = total + $scope.data[i].num * $scope.data[i].price;
						n = n + $scope.data[i].num;
					}
					$scope.total = total;
					$scope.Num = n;
				}
			})
		} else {
			window.location.href = 'login.html';
		}
	})
	$scope.deleteorder = function(){
		$http.get('delete.php').success(function(response){
			
			window.location.href = "orderlist.html";
		})
	}
}])