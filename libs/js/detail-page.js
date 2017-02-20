$(function() {
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 2000, //可选选项，自动滑动
		pagination: '.swiper-pagination',
		autoplayDisableOnInteraction: false,
		loop: true,
	})
})

var detailApp = angular.module('detailApp',['commonApp']);
		detailApp.controller('detailcontroller',['$scope','$http',function($scope,$http){
			$http.get('datalist.php').success(function(response){
				$scope.pName = response[0].proName;
				$scope.pri = response[0].price;
			})
			$('#bottom>a').on('touchend',function(){
		    	$http.get('login_info.php').success(function(response){
		    		
				  if(response.state){
						$http.get('buy.php').success(function(){
							window.location.href = 'shopcar.html';
						})
				  } else {
				   		window.location.href = 'login.html';
				  }

		    	})
		    })
			$scope.swichTag = function (_m, _event) {
		        $('a', $(_event.target).closest('div')).removeClass('active');
		        $(_event.target).addClass('active');
		        if (_m == 1) {
		            $('.detail').show()
		            $('.evaluate').hide();
		        } else {
		            $('.detail').hide()
		            $('.evaluate').show();
		        }
		    }
}])

var myScroll;

	function loaded() {
		myScroll = new IScroll('.wrapper', {
			mouseWheel: true,
			scrollbars: true
		});

	}

	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);
	
$(function(){
	var _obj = {
		baseDom: '.evaluate>.ng-scope',
		cloneSize: 20,
		url: 'libs/data/product.json'
	};
	var dis = new cloneDom(_obj);
})