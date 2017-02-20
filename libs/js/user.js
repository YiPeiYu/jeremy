var userapp = angular.module('userapp', ['commonApp']);

userapp.controller('usercontroller', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
	$http.get('login_info.php').success(function(data){
				  if (data.state) {
				  	$scope.account = data.account;
					$('#menber').html('普通会员');
					$scope.img = data.img;
					$('#logout').on('touchend',function(){
						$http.get('out.php').success(function(){
					  	window.location.href = "login.html";
						})
					})
					$('#changedatu').on('touchend',function(){	
					  	window.location.href = "changeuser.html";
					})
				} else{
					$('#name').html('<a href="login.html">请登陆</a>');
					$('.user-head>a').on('touchend',function(){
						window.location.href = "login.html";
					})
				}
			})	
}])