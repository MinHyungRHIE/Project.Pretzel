//===== front-controller module =====//
var dispatcher = require("../config/dispatcher").dispatcher

//===== 실습일지 리스트 화면 =====//
var praclogListPage = function(req, res){
    console.log("invoke praclogListPage()")
    dispatcher.praclogListPageController(req,res)
}
module.exports.praclogListPage = praclogListPage