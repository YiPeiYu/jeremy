var cartApp = angular.module('cartApp', ['commonApp']);
cartApp.controller('cartcontroller',['$scope','$http' ,function($scope, $http) {
	$http.get('login_info.php').success(function(response) {
		if(response.state) {

			$http.get('cart.php').success(function(response) {
				$scope.data = response;
				if($scope.data.length == 0) {
					$.alert({
						confirm: function() {

						},
						title: "",
						content: '购物车什么都没有！快去购买点商品吧！',

					});
				}
			})
		} else {
			window.location.href = 'login.html';
		}
	})
}])

$(document).on('touchstart',function(evt){
    	function togal(){
    		var togal = 0;
    		$('li .fa-check-square').each(function(index,obj){
    			var pri =parseInt( $(obj).closest('li').find('.item-content .pri em ').html())
    			var num =parseInt( $(obj).closest('li').find('.item-calc .num ').html())
    			togal += pri*num;
    		})   		
    		$('#bottom .pay').html('<a href="confirmorder.html">确认并支付('+togal+')</a>')	
    	}

    	if($(evt.target).is('.item-option>i')){
    		$(evt.target).toggleClass('fa-check-square')
    		togal()
    	}
    	if ($(evt.target).is('.item-calc .minu i')){
    		var num = $(evt.target).closest('li').find($('.item-calc .num')).html()
    		num--;
    		if (num<1) {
    			num=1;
    		}
    		$(evt.target).closest('li').find($('.item-calc .num')).html(num)
    		togal()
    	}
    	if ($(evt.target).is('.item-calc .plus i')) {
    		var num = $(evt.target).closest('li').find($('.item-calc .num')).html()
    		num++;
    		$(evt.target).closest('li').find($('.item-calc .num')).html(num)
    		togal()
    	}
    	if ($(evt.target).is('.item-content .fa-trash-o')) {
    		console.log($(evt.target).attr('ngID'))
    		$.get(common.baseUrl+'TRASH.php',{id:$(evt.target).attr('ngID')});
    		$(evt.target).closest('li').remove()
    		togal()
    	}
    	if ($(evt.target).is('#bottom .change i')) {
    		if ($(evt.target).hasClass('fa-check-square')) {
    			$('.fa-square-o').removeClass('fa-check-square')
    		}else{
    			$('.fa-square-o').addClass('fa-check-square')
    		}
    		togal()
    	}
    	
 })

var myScroll;
function loaded() {
    setTimeout(function () {
        myScroll = new IScroll('#wrapper', { mouseWheel: true,click:true});
    }, 200);
}
window.addEventListener('load', loaded, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


	
