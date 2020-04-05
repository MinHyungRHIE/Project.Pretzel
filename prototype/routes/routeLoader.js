//===== 모듈 설정 =====//
var config = require("../config/config");
var path = require("path")
var routeLoader = {};

//===== 모듈화를 위한 함수 정의 =====//
routeLoader.init = function(app, router) {
    console.log("routeLoader.init() has been invoked --> return result of initRoutes()")
	return initRoutes(app, router);
}

//===== config에 정의된 라우팅 정보를 Router객체에 등록 후 express에 추가 =====//
function initRoutes(app, router) {
	console.log("initRoutes() has been invoked in routeLoader.js")
	var infoLen = config.route_info.length;
	console.log('route module num : %d', infoLen);
	
	for (var i = 0; i < infoLen; i++) {
		var curItem = config.route_info[i];
			
		// 모듈 파일에서 모듈 불러옴
		var curModule = require(path.join(__dirname, curItem.file));
		console.log('read route module from %s.js file.', curItem.file);
		
		//  라우팅 처리
		if (curItem.type == 'get') {
            router.route(curItem.path).get(curModule[curItem.method]);
		} else if (curItem.type == 'post') {
            router.route(curItem.path).post(curModule[curItem.method]);
		} else {
			router.route(curItem.path).post(curModule[curItem.method]);
		}
		
		
		console.log('route module [%s] is registered', curItem.method);
	}

    // 라우터 객체 등록
    app.use('/', router);
}

module.exports = routeLoader;