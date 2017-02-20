var myScroll;
function loaded() {
    setTimeout(function () {
        myScroll = new IScroll('#wrapper', { mouseWheel: true,click:true});
    }, 500);
}
window.addEventListener('load', loaded, false);
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

$(function() {
	
	$('.select>div').on("touchend",function(){
		$(this).siblings().removeClass('active')
		$(this).toggleClass('active');		
		if ($(this)[0].className == "col1 active") {
			$('.select-content').show()
			$('.select-content2').hide()
		}else if($(this)[0].className == "col2 active"){
			$('.select-content2').show()
			$('.select-content').hide()
		}else{
			$('.select-content').hide()
			$('.select-content2').hide()
		}
	})	
	$('.select-content').on('touchend','li',function(){
		var flag = $('a',this).attr('id')
		var id = $('a',this).attr('flag')
		var noD = $(this).add($(".select-content li>a[id = '"+id+"']").closest('li'))
		$('.select-content li').not(noD).removeClass('show')
		$(this).siblings().removeClass('active');		
		$(this).toggleClass('active');		
		$(".select-content li>a[flag = '"+flag+"']").closest('li').addClass('show')
	})
})

var  listapp = angular.module('listApp',['commonApp']);
		 listapp.controller('listcontroller',['$scope','$http',function($scope,$http){
			$http.get('list.php').success(function(response){
				$scope.data = response;
//				console.log(response);
			})
			$(document).on('click','.goods>a',function(){
				$http.post('pro_id.php',{pro_id:$(this).attr('pro_id')}).success(function(response){
					window.location.href="detail-page.html";
				})
			})
		}])

