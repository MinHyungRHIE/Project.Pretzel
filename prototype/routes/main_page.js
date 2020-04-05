//===== front-controller module =====//
var dispatcher = require("../config/dispatcher").dispatcher

//===== 홈 화면=====//
var homepage = function(req, res){
    console.log("invoke homepage()")
    dispatcher.homepageController(req,res)
}

//===== 로그인 화면=====//
var loginpage = function(req, res){
    console.log("invoke loginpage()")
    dispatcher.loginpageController(req,res)
}

//===== 로그아웃 하기=====//
var processLogout  = function(req, res){
    console.log("invoke logout()")
    dispatcher.processLogoutController(req,res)
}

module.exports.homepage = homepage
module.exports.loginpage = loginpage
module.exports.processLogout = processLogout