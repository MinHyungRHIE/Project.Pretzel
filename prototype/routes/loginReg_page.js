//===== front-controller module =====//
var dispatcher = require("../config/dispatcher").dispatcher

//===== 로그인 진행 =====//
var processLogin = function(req, res){
    console.log("invoke processLogin()")
    dispatcher.processLoginController(req,res)
}


//===== 회원가입 화면_학생 =====//
var registerPageStu = function(req, res){
    console.log("invoke registerPageStu()")
    dispatcher.registerPageStuController(req,res)
}

//===== 회원가입 화면_기업 =====//
var registerPageBiz = function(req, res){
    console.log("invoke registerPageBiz()")
    dispatcher.registerPageBizController(req,res)
}

//===== 회원가입 처리_학생 =====//
var processRegisterStu=function(req,res){
    console.log("invoke processRegisterStu()")
    dispatcher.processRegisterStuController(req,res)
}

//===== 회원가입 처리_기업 =====//
var processRegisterBiz=function(req,res){
    console.log("invoke processRegisterBiz()")
    dispatcher.processRegisterBizController(req,res)
}



module.exports.processLogin = processLogin
module.exports.registerPageStu = registerPageStu
module.exports.registerPageBiz = registerPageBiz
module.exports.processRegisterStu = processRegisterStu
module.exports.processRegisterBiz = processRegisterBiz