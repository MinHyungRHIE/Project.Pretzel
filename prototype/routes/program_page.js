//===== front-controller module =====//
var dispatcher = require("../config/dispatcher").dispatcher

//===== 프로그램 등록 화면 =====//
var programAddPage = function(req, res){
    console.log("invoke programListPage()")
    dispatcher.programAddPageController(req,res)
}

//=== 프로그램 등록 진행 ===//
var processProgramAdd = function(req,res){
    console.log("invoke programListPage()")
    dispatcher.processProgramAddController(req,res)
}

//===== 프로그램 리스크 화면 =====//
var programListPage = function(req, res){
    console.log("invoke programListPage()")
    dispatcher.programListPageController(req,res)
}

//===== 프로그램  Details 화면 =====//
var programDetailsPage = function(req, res){
    console.log("invoke programDetailsPage()")
    dispatcher.programDetailsPageController(req,res)
}

//===== 프로그램 수정 화면 =====//
var programUpdatePage = function(req, res){
    console.log("invoke programUpdatePage()")
    dispatcher.programUpdatePageController(req,res)
}

//===== 프로그램 수정 진행 =====//
var processProgramUpdate = function(req,res){
    console.log("invoke processProgramUpdate()")
    dispatcher.processProgramUpdateController(req,res)
}

//=== 학생의 프로그램 신청 작업 수행 ===//
var processProgramApply = function(req,res){
    console.log("invoke processProgramApply()")
    dispatcher.processProgramApplyController(req,res)
}

//=== 내가 등록한 프로그램 조회(biz) ===//
var programBizMylistPage = function(req,res){
    console.log("invoke programBizMylistPage()")
    dispatcher.programBizMylistPageController(req,res)
}

//=== 특정 프로그램의 학생 목록 조회(biz) ===//
// {file:'./program_page',path:'/stulist/biz/manage/:id',method:'stulistManage',type:'get'}
var stulistManagePage = function(req,res){
    console.log("invoke stulistManagePage()")
    dispatcher.stulistManagePageController(req,res) 
}

//=== 학생 신청 받기(biz) ===//
var processAcceptStu = function(req,res){
    console.log("invoke processAcceptStu()")
    dispatcher.processAcceptStuController(req,res)
}

//=== 내가 신청한 프로그램 조회(stu) ===//
var programStuMylistPage = function(req,res){
    console.log("invoke programStuMylistPage()")
    dispatcher.programStuMylistPageController(req,res)
}

module.exports.programAddPage=programAddPage
module.exports.processProgramAdd=processProgramAdd
module.exports.programListPage=programListPage
module.exports.programDetailsPage=programDetailsPage
module.exports.programUpdatePage=programUpdatePage
module.exports.processProgramUpdate=processProgramUpdate
module.exports.processProgramApply=processProgramApply
module.exports.programBizMylistPage = programBizMylistPage
module.exports.stulistManagePage = stulistManagePage
module.exports.processAcceptStu = processAcceptStu
module.exports.programStuMylistPage = programStuMylistPage
