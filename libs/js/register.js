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
