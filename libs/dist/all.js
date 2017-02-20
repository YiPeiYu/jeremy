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
var cloneDom = function(opts){
	//默认配置
	var _default = {
		baseDom: null,
		url: null, // 权重次于 data， 如果 data 为空，url 不为空的情况下，则 ajax 请求 url 解析出 data
		data: [], // 权重最高，如果 data 不为空则直接当数据源使用
		cloneSize: 0,
		page: false, //如果 page = true 的情况，要实现分页
		pageContainer: null
	}
	var $this = this;
	//对象合并，生成一个全新的对象,
	//后面的对象属性替换前面对象已有的属性，如果是新属性，则添加
	//深度克隆	
	$this.newObj = $.extend(_default, opts);
	
	//确定数据源
	var init = function(_callback){
		//如果数据源为空则不执行其它操作
		if(!$this.newObj.data && !$this.newObj.url){
			return false;
		}
		//如果 baseDom为空 或者 cloneSize 小于 0， 则不执行其它操作
		if(!$this.newObj.baseDom || $this.newObj.cloneSize < 1){
			return false;
		}
		//如果 data 不为空则把 data 当数据源操作
		if($this.newObj.data[0]){
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
		} else if($this.newObj.url)	{
			$.get($this.newObj.url + '?_=' + Math.random(), function(_response){
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;
				//solution1
				if(_callback && typeof _callback == 'function'){
					_callback();
				}
			})
		}
		return true;
	}

	var generateHtml = function(_page){
		_page = _page || 1;
		//计算每页显示的数量
		var _pageSize = $this.newObj.cloneSize;
		//每页显示的数组最小下标
		var _min = (_page - 1) * _pageSize;
		//每页显示的数组最大下标
		var _max = _page * _pageSize -1;

		if(!$this.newObj.data[0]){
			return false;
		}
		
		$($this.newObj.baseDom).not(':first-child').remove();
		for(var i = _min; i <= _max; i++){
			if($this.newObj.data[i]){
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				$.each($('[dk-bind]', _cloneDom), function(_index, _element){
					if($(_element).is('img')){
						$(_element).attr('src', $this.newObj.data[i][$(_element).attr('dk-bind')]);
					} else {
						$(_element).text($this.newObj.data[i][$(_element).attr('dk-bind')]);
					}
				})
			}
		}
		$($this.newObj.baseDom).eq(0).remove();
	}

	var dkpage = function(){
		$($this.newObj.pageContainer).pagination({
            dataSource: $this.newObj.data,
            pageSize: $this.newObj.cloneSize,
            callback: function (response, pagination) {
            	$this.refresh(pagination.pageNumber);
                // window.console && console.log(response, pagination);
            }
        });

        $($this.newObj.pageContainer).addHook('beforePageOnClick', function(_event, _pagenumber){
        	// arguments 是调用函数时的参数集合
        	// console.log(arguments);
        	// $this.refresh(_pagenumber);
        })		
        $($this.newObj.pageContainer).addHook('beforeInit', function(_event, _pagenumber){
        	// arguments 是调用函数时的参数集合
        	// console.log(arguments);
        	// $this.refresh(123);
        })	        
	}

	this.refresh = function(_page){
		//如果数据源 data 为空，而且 url 不为空，则定为需要 ajax 请求数据源
		if(!this.newObj.data[0] && this.newObj.url){
			//调用初始化方法并把生成 html 方法当回调函数执行
			// init(generateHtml);
			init(function(){
				generateHtml(_page);
				if($this.newObj.page){
					dkpage();
				}					
			});
		} else if(this.newObj.data && !this.newObj.data instanceof Array){
			//直接调用数据初始化方法
			var _init = init();
			if(_init){
				//调用生成 html 的方法
				generateHtml(_page);
				if($this.newObj.page){
					dkpage();
				}
			}	
		} else if(this.newObj.data && this.newObj.data instanceof Array){
			generateHtml(_page);
		}
	}

	this.refresh(1);
}
//obj{
//nodeName   url     
//}
/*$.get('libs/data/navs.txt?_=' + Math.random(), function(response){
		dkScope.navs = window.eval('(' + response + ')');
		var _html = '';
		jQuery.each(dkScope.navs, function(_index, _obj){
			_html += '<ul>';
			$.each(_obj['nav'], function(_navIndex, _navObj){
				_html += '<li>';
				//<a href="jd.com">家居</a>
				_html += '<a href="' + _navObj.url + '">' + _navObj.title + '</a>';
				_html += '</li>';
			})
			_html += '</ul>';
		})
		$('.dk-banner>div>div').eq(0).html(_html);
	})*/

/**
 * [CreateHtml description]
 * @param {[type]} _baseDom [基础 dom 结构]
 * @param {[type]} _params  [对象]
 */
function CreateHtml(_baseDom){
	var frm = this;
	var _defaluts = {
		url: '',
		data: null,
	};
	var _response = [
		{"caption": "农资", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家居", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家具", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家装", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "厨具", "subNav": [{"id": 1609},{"id": 1606}]},	
	];
	// _response = '[{"caption": "农资", "url": "jd.com", "id": 1}]';
	var _data = null;
	if(typeof _response == 'string'){
		_data = JSON.parse(_response);
	} else if(typeof _response == 'object'){
		_data = _response;
	} else{
		return false;
	}

	if(_data && typeof _data == 'object'){
		_defaluts.data = _data instanceof Array ? _data : [_data];
	}

	//把 _baseDom 转成 jQuery 对象
	var $baseDom = $(_baseDom);


	var dkScope = new Object();

	this.dkFor = function(_paramDom, _paramData){
		_paramDom = $(_paramDom);
		var _dkFors = _paramDom.attr('dk-for').split('=>');
		var _dkForFirst = $.trim(_dkFors[0]);
		var _dkForLast = $.trim(_dkFors[_dkFors.length - 1]);
		var _dkForLastSplit = _dkForLast.split('.')[_dkForLast.split('.').length - 1];
		var _domData = _paramData || _defaluts[_dkForLast];
		if(_paramData){
			$.each(_dkForLast.split('.'), function(_index, _split){
				_domData = _domData[_split];
			})
			console.log(_domData);
		}

		$.each(_domData, function(_index, _data){
			var _cloneDom = _paramDom.clone(true).appendTo(_paramDom.parent());
			var _obj = {};
			_obj[_dkForFirst] = _data;
			_cloneDom.data('data', _obj);
			if($('[dk-for]', _paramDom)[0]){
				frm.dkFor($('[dk-for]', _cloneDom)[0], _obj);
			}
		})
		_paramDom.remove();
	};
	if($baseDom.attr('dk-for') || $('[dk-for]', $baseDom)[0]){
		this.dkFor($baseDom);
	}
}

$(function(){
	var $dkHeader = $('dk-header');
	if($($dkHeader).attr('replace') === 'true'){
		$('<div></div>').load($dkHeader.attr('url') + '?_' + Math.random()).insertAfter($dkHeader);
		$dkHeader.remove();
	}else{
		$dkHeader.load($dkHeader.attr('url') + '?_' + Math.random());
	}	
})

//深度克隆
var obj1 = {
  name: '1000phone',
  teacher: 10,
  classes:{
    h5: 11,
    android: 10,
    dk: 1
  }
};

var obj2 = {
  name: '1001year',
  teacher: 101,
  classes:{
    h5: 111,
    android: 101,
    ios: 99
  }
};

$.extend(obj1, obj2);



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
			console.log(response)
			window.location.href = "orderlist.html";
		})
	}
}])


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
	
	$(".tag").click(function(){
		$(".detail").hide()
		$(".evaluate").show()
		$(this).css("background-color","#ffffff");
		$(".active").css("background-color","#e85a90");
	})
	$(".active").click(function(){
		$(".detail").show()
		$(".evaluate").hide()
		$(".tag").css("background-color","#e85a90");
		$(this).css("background-color","#ffffff");
	})
})
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
var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.state = $.getparams('state');
});
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
var registerApp = angular.module('registerApp', ['commonApp']);
registerApp.controller('registerController',['$scope','$http', function($scope, $http) {

	submit = function() {
		$http.post('register.php', {
			account: $scope.account,
			phone: $scope.phone,
			password: $scope.password
		}).success(function(response) {
			if (response.state) {
				window.location.href = 'login.html';
			} else {
				$.alert(response.message);
			}

		})
	}
}])


$(function(){
!function(){
        var checkAccountExist = false;
        newFormCheck($("#register_form")[0], checkAccountExist, submit);      
}();
function checkAccountExist(failCallback, successCallback){
    var input = this;
    util.ajax("/register/hasUser", {account: this.value}, function(data){
        if(data.isUser === true){
            failCallback();
        }
        else{
            successCallback();
        }
    });
}

function checkPwdIdentity(){
    if(this.form["password"].value !== this.form["confirm-pwd"].value){
        return false;
    }
    return true;
}

    function newFormCheck(form, checkAccountExist, submitHandler){
        var checkRule = {
            "confirm-pwd": {
                check: checkPwdIdentity,
                msg: "两次密码输入不一致"
            }
   	};
        if(checkAccountExist){
            checkRule.account = {
                check: checkAccountExist,
                msg: "账户已存在!",
                async: true
            };
        }

        return new Form(form, {
            errorMsgClass: "error",         
            errorInputClass: "invalid",     
            rule: checkRule,
            lang: "cn",
            disableBrowserMsg: !(navigator.language || navigator.userLanguage).match(/cn/i)
        }, submitHandler);
   }
})

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
$(function() {
	var _obj = {
		baseDom: '.layout-body>.product>ul>li',
		cloneSize: 30,
		url: 'libs/data/user.txt',
	};
	var products2 = new cloneDom(_obj);
})