var myApp = angular.module('myApp',['commonApp']);
		myApp.config(function($controllerProvider){
			myApp.register = {
				controller: $controllerProvider.register
			}
		})
myApp.controller('mycontroller',['$scope', '$http', '$compile',function($scope,$http,$compile){
	$http.get('login_info.php').success(function(data){
			if (data.state){
				$scope.account = data.account;
				$scope.img = data.img;
			} else{
				$('#name').html('<a href="login.html">请登陆</a>');
			}
	})
	$scope.resetimg = function(){
		$http.get('form_img.html').success(function(response){
			$compile($('.head_img').html(response))($scope);
			$('.head_img').fadeIn(100);
		})
	}
	
	$scope.resetname = function(){
		$('.name').fadeIn(100);
	}
	
	$scope.re_name = function(){
		if ($scope.account==" "||$scope.account==undefined) {
			$.alert("用户名不能为空");
			return false;
		}
		$http.post('modify_acc.php',{account:$scope.account}).success(function(response){
					if (response.state) {
						window.location.href="changeuser.html";
					} else{
						$.alert(response.message)
					}
		})
	}
	$scope.resetpassword = function(){
		$http.get('resetpassword.html').success(function(response){
			$compile($('.psw').html(response))($scope);
			$('.psw').fadeIn(100);
		})
	}	
}])

$(function(){
	$('#scroller>ul>li>a').on('click',function(){
		var _html = '<div class="pop_mask"></div>';
        $(_html).appendTo($('body'));
        $('.pop_mask').on('touchend',function(){
		$(this).hide()
		$('.pop').fadeOut(100)
	})
	})
})