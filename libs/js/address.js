var mainapp = angular.module('mainapp', ['commonApp']);
mainapp.controller('maincontroller', function ($scope, $http) {
	 var _url = $('#province').data('url');
    $http.get(_url).success(function (resp) {
        $scope.province = resp;
    })

    $('#province,#city').on('change', function (e) {
        var _currobj = $(e.target);
        var _type = _currobj.data('next');
        $http({ url: _url, params: {type: _type}}).success(function (resp) {
            $scope[_type] = resp;
        })
    })
//  $http.get('login_info.php').success(function(response) {
//		if(response.state) {
//			$scope.account = response.account;
//			$scope.phone = response.phone;			
//		} else {
//			window.location.href = 'login.html';
//		}
//	})
	$scope.submit = function(){
		$http.post('address.php',{account: $scope.account,phone: $scope.phone,address: $scope.adderss}).success(function(response){
			window.location.href = "address.html";
		})
	}
});