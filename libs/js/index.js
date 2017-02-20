$(function() {
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 2000, //可选选项，自动滑动
		pagination: '.swiper-pagination',
		autoplayDisableOnInteraction: false,
		loop: true,
	})
	
	
})
var indexapp = angular.module('indexapp',[])
	indexapp.controller('indexcontroller',['$scope','$http',function($scope,$http){
		$http.get('libs/data/product.json').success(function(response){
			$scope.data = response;
//			console.log(response)
		})

		$scope.closeSearch = function(){
	        $('.search-content').addClass('item-hidden');
	    }

	    $scope.showSearch = function(){
	        $('.search-content').removeClass('item-hidden');
	        $scope.keyword = "";
	    }
	}])

var myScroll;

function loaded() {
	setTimeout(function() {
		myScroll = new IScroll('.wrapper', {
			mouseWheel: true,
			useTransition: true,
			click: true,
			scrollbars: true
		});
		myScroll.on('scrollEnd', function() {
			if(myScroll.y < -260) {
				$("#top").fadeIn(100)
			} else {
				$("#top").fadeOut(100)
			}
			$("#top").on('touchstart', function() {
				myScroll.scrollTo(0, 0, 300)
			})
		});
	}, 200)

}

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);