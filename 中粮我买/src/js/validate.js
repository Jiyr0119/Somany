define(function() {
	return {
		checkPhone: function(phone) {
			var reg = /^1[35789]\d{9}/;
			if(reg.test(phone)) {
				return true;
			} else {
				return false;
			}
		},
		checkName: function(name) {
			var reg = /^\D\w{5,17}$/;
			if(reg.test(name)) {
				return true;
			} else {
				return false;
			}
		},
		checkPwd: function(password) {
			var reg = /^.{6,13}$/;
			if(reg.test(password)) {
				return true;
			} else {
				return false;
			}
		}
	}
})