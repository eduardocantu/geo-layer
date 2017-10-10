module.exports = function (roles) {	
	var _hasPermission = function (permissions) {
		return true;
	};

	return {
		hasPermission : _hasPermission
	}
};
