//===== DB query 모듈 =====//
var repository = require("../database/repository").repository

//===== Viewer 모듈 =====//
var viewer = require("../views/viewer")
var pickView = require("../views/viewer").pickView

//===== Service 모듈 =====//
var contextHandler = require("../service/contextHandler").contextHandler
var sessionHandler = require("../service/sessionHandler").sessionHandler
var parsingHandler = require("../service/parsingHandler").parsingHandler

//===== immutable, to protect original object =====//
var copy = function(obj){
    return Object.assign({},obj)
}

//===== 데이터베이스 연결 확인 =====//
var checkDatabaseAfter = function(req,res, callback){
    let database = req.app.get("database")
    if(database){
        console.log("database is no problem")
        callback(database,req,res)
    }else{
        viewer(
            req,res,
            "error",
            contextHandler.databaseError()
        )
    }
}

//===== main_page.js =====//
var  homepageController = function(req,res){
    console.log("invoke homepageController()")
    let isLogin = {}
    isLogin.TRUE = copy(req.session.user)
    isLogin.FALSE = copy(sessionHandler.noLogin)
    contextHandler.filterSessionAndSetContext(req,sessionHandler,isLogin, function(needless){
        viewer(
            req,res,
            "index",
            contextHandler.getContext()
        )
    })
}

var loginpageController = function(req,res){
    console.log("invoke loginpageController()")
    let isLogin = {}
    isLogin.TRUE = {errMsg:"이미 로그인 되어있습니다."}
    isLogin.FALSE = {result:""}
    contextHandler.filterSessionAndSetContext(req,sessionHandler,isLogin, function(situation){
        let viewName = new pickView()
                                            .thisIs(situation)
                                            .right("error")
                                            .wrong("login")
                                            .done()
        viewer(
        req,res,
        viewName,
        contextHandler.getContext()
        )
    })

}

var processLogoutController = function(req,res){
    console.log("invoke processLogoutController()")
    let isDestroy = {}
    isDestroy.TRUE = copy(sessionHandler.noLogin)
    isDestroy.FALSE = {errMsg:" 이미 로그아웃 되어있습니다."}
    contextHandler.destroySessionAndSetContext(req,sessionHandler,isDestroy,function(situation){
        let viewName = new pickView()
                                            .thisIs(situation)
                                            .right("index")
                                            .wrong("error")
                                            .done()

        viewer(
        req,res,
        viewName,
        contextHandler.getContext()
        )
    })
}

//===== loginReg_page.js =====//
var processLoginController = function(req,res){
    console.log("invoke processLoginController()")

    let paramBody = parsingHandler.loginParsing(req)

    checkDatabaseAfter(req,res,function(database,req,res){
        let isSuccess = {}
        isSuccess.TRUE = {} //authUser() 완료 이 후 setSession()이 동작되면 그 때 seesion으로부터 req.session.user를 받는다
        isSuccess.FALSE = {result:"아이디 또는 비밀번호가 맞지 않습니다"}
        contextHandler.processLoginAndSetContext(req,sessionHandler,database,paramBody,isSuccess,function(situation){
            let viewName = new pickView()
                                            .thisIs(situation)
                                            .right("index")
                                            .wrong("login")
                                            .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

var registerPageStuController = function(req,res){
    console.log("invoke registerPageStuController()")
    let isLogin = {}
    isLogin.TRUE = {errMsg:"이미 로그인 되어있습니다"}
    isLogin.FALSE = null
    contextHandler.filterSessionAndSetContext(req,sessionHandler,isLogin, function(situation){
        let viewName = new pickView()
                                                .thisIs(situation)
                                                .right("error")
                                                .wrong("register-stu")
                                                .done()
        viewer(
            req,res,
            viewName,
            contextHandler.getContext()
        )
    })
}

var registerPageBizController = function(req,res){
    console.log("invoke registerPageBizController()")
    let isLogin = {}
    isLogin.TRUE = {errMsg:"이미 로그인 되어있습니다"}
    isLogin.FALSE = null
    contextHandler.filterSessionAndSetContext(req,sessionHandler,isLogin, function(situation){
        let viewName = new pickView()
                                                .thisIs(situation)
                                                .right("error")
                                                .wrong("register-biz")
                                                .done()
        viewer(
            req,res,
            viewName,
            contextHandler.getContext()
        )
    })
}

var processRegisterStuController =function(req,res){
    console.log("invoke processRegisterStu()")
    
    let paramBody = parsingHandler.registerStuParsing(req)

    checkDatabaseAfter(req,res, function(database, req, res){
        let isSuccess={}
        isSuccess.TRUE = {result:""}
        isSuccess.FALSE = {errMsg:"사용자 추가 실패"}
        contextHandler.processRegisterAndSetContext(database,paramBody,isSuccess,function(situation){
            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("login")
                                                    .wrong("error")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

var processRegisterBizController =function(req,res){
    console.log("invoke processRegisterStu()")
    
    let paramBody = parsingHandler.registerBizParsing(req)

    checkDatabaseAfter(req,res, function(database, req, res){
        let isSuccess={}
        isSuccess.TRUE = {result:""}
        isSuccess.FALSE = {errMsg:"사용자 추가 실패"}
        contextHandler.processRegisterAndSetContext(database,paramBody,isSuccess,function(situation){
            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("login")
                                                    .wrong("error")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

//===== program_page.js =====//
var programAddPageController = function(req,res){
    console.log("invoke programAddPageController()")
    let isLogin = {}
    isLogin.TRUE = copy(req.session.user)
    isLogin.FALSE = copy(sessionHandler.noLogin)
    isLogin.FALSE = Object.assign(isLogin.FALSE, {result:""})
    contextHandler.filterSessionAndSetContext(req,sessionHandler,isLogin,function(situation){
        if(contextHandler.catchNotBizError(req,sessionHandler)&&situation){
            situation=null
        }
        let viewName = new pickView()
                                                .thisIs(situation)
                                                .right("program-biz-add")
                                                .wrong("login")
                                                .done()
        viewer(
            req,res,
            viewName,
            contextHandler.getContext()
        )
    })
}

var processProgramAddController = function(req,res){
    console.log("invoke processProgramAddController()")

    var paramBody=parsingHandler.addProgramParsing(req)

    checkDatabaseAfter(req,res,function(database, req,res){
        let isSuccess={}
        isSuccess.TRUE= {} //프로그램 추가가 성공하면 바로 프로그램 검색 리스트 화면으로 간다
        isSuccess.FALSE={errMsg:"프로그램 추가 실패"}
        contextHandler.processProgramAddAndSetContext(database, paramBody, isSuccess, function(situation){
            if(situation){
                programListPageController(req,res)
            }else{
                viewer(
                    req,res,
                    "error",
                    contextHandler.getContext()
                )
            }
        })
    })
}

var programListPageController = function(req,res){
    console.log("invoke programListPageController()")

    let paramBody= parsingHandler.programListParsing(req)
    
    checkDatabaseAfter(req,res,function(database,req,res){
        let isLogin ={}
        isLogin.TRUE = copy(req.session.user)
        isLogin.FALSE = copy(sessionHandler.noLogin)
        
        contextHandler.programSearchListingAndSetContext(req,sessionHandler,database,paramBody,isLogin,function(situation){
            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("program-list")
                                                    .wrong("program-list")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

var programDetailsPageController = function(req,res){
    console.log("invoke programDetailsPageController()")
    
    let paramBody = parsingHandler.programDetailsParsing(req)

    checkDatabaseAfter(req,res,function(database,req,res){
        let isLogin ={}
        isLogin.TRUE = copy(req.session.user)
        isLogin.FALSE = copy(sessionHandler.noLogin)
        
        contextHandler.programDetailsAndSetContext(req,sessionHandler,database,paramBody,isLogin,function(situation){

            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("program-details")
                                                    .wrong("program-details")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

var programUpdatePageController = function(req,res){
    console.log("invoke programUpdatePageController()")
    
    let paramBody = parsingHandler.programDetailsParsing(req)

    checkDatabaseAfter(req,res,function(database,req,res){
        let isLogin ={}
        isLogin.TRUE = copy(req.session.user)
        isLogin.FALSE = copy(sessionHandler.noLogin)
        isLogin.FALSE = Object.assign(isLogin.FALSE, {result:""})
        
        contextHandler.programDetailsAndSetContext(req,sessionHandler,database,paramBody,isLogin,function(situation){
            //해당 게시물이 유저의 것이 맞는지 확인
            if(contextHandler.catchNotYours(req,situation)){
                situation = null
            }

            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("program-biz-update")
                                                    .wrong("login")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

var processProgramUpdateController = function(req,res){
    console.log("invoke processProgramUpdateController()")

    var paramBody=parsingHandler.updateProgramParsing(req)

    checkDatabaseAfter(req,res,function(database, req,res){
        let isSuccess={}
        isSuccess.TRUE= {} //프로그램 수정이 성공하면 바로 프로그램 검색 리스트 화면으로 간다
        isSuccess.FALSE={errMsg:"프로그램 수정 실패"}
        contextHandler.processProgramUpdateAndSetContext(database, paramBody, isSuccess, function(situation){
            if(situation){
                programListPageController(req,res)
            }else{
                viewer(
                    req,res,
                    "error",
                    contextHandler.getContext()
                )
            }
        })
    })
}

var processProgramApplyController = function(req,res){
    console.log("invoke processProgramApplyController()")

    var paramBody=parsingHandler.processApplyParsing(req)

    checkDatabaseAfter(req,res,function(database, req,res){
        let isSuccess={}
        isSuccess.TRUE= {} //프로그램 신청이 성공하면 바로 프로그램 검색 리스트 화면으로 간다
        isSuccess.FALSE={errMsg:"프로그램 신청 실패"}
        contextHandler.processProgramApplyAndSetContext(database, paramBody, isSuccess, function(situation){
            if(situation){
                programListPageController(req,res)
            }else{
                viewer(
                    req,res,
                    "error",
                    contextHandler.getContext()
                )
            }
        })
    })
}

var programBizMylistPageController = function(req,res){
    console.log("invoke programBizMylistPageController()")
    
    let paramBody = parsingHandler.programBizMylistPageParsing(req)

    checkDatabaseAfter(req,res,function(database,req,res){
        let isLogin ={}
        isLogin.TRUE = copy(req.session.user)
        isLogin.FALSE = copy(sessionHandler.noLogin)
        isLogin.FALSE = Object.assign(isLogin.FALSE, {result:""})
        
        contextHandler.programMylistPageAndSetContext(req, sessionHandler, database, paramBody, isLogin, function(situation){

            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("program-biz-mylist")
                                                    .wrong("login")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

var stulistManagePageController = function(req,res){
    console.log("invoke stulistManagePageController()")
    
    let paramBody = parsingHandler.programDetailsParsing(req)

    checkDatabaseAfter(req,res,function(database,req,res){
        let isLogin ={}
        isLogin.TRUE = copy(req.session.user)
        isLogin.FALSE = copy(sessionHandler.noLogin)
        isLogin.FALSE = Object.assign(isLogin.FALSE, {result:""})
        
        contextHandler.programDetailsAndSetContext(req,sessionHandler,database,paramBody,isLogin,function(situation){

            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("stulist-biz-manage")
                                                    .wrong("login")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })
}

var processAcceptStuController = function(req,res){
    console.log("invoke processAcceptStuController()")
    
    let paramBody = parsingHandler.processAcceptStuParsing(req)

    checkDatabaseAfter(req,res,function(database, req,res){
        let isSuccess={}
        isSuccess.TRUE= {} //학생 신청 수락이 성공하면 바로 학생관리 페이지로 간다
        isSuccess.FALSE={errMsg:"학생 신청 수락 실패"}
        contextHandler.processAcceptStuAndSetContext(database, paramBody, isSuccess, function(situation){
            if(situation){
                stulistManagePageController(req,res)
            }else{
                viewer(
                    req,res,
                    "error",
                    contextHandler.getContext()
                )
            }
        })
    })
}

var programStuMylistPageController = function(req,res){
    console.log("invoke programStuMylistPageController()")
    
    let paramBody = parsingHandler.programStuMylistPageParsing(req)

    checkDatabaseAfter(req,res,function(database,req,res){
        let isLogin ={}
        isLogin.TRUE = copy(req.session.user)
        isLogin.FALSE = copy(sessionHandler.noLogin)
        isLogin.FALSE = Object.assign(isLogin.FALSE, {result:""})
        
        contextHandler.programMylistPageAndSetContext(req, sessionHandler, database, paramBody, isLogin, function(situation){

            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("program-stu-mylist")
                                                    .wrong("login")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })    
}

var praclogListPageController = function(req,res){
    console.log("invoke praclogListPageController()")
    
    let paramBody = parsingHandler. (req)

    checkDatabaseAfter(req,res,function(database,req,res){
        let isLogin ={}
        isLogin.TRUE = copy(req.session.user)
        isLogin.FALSE = copy(sessionHandler.noLogin)
        isLogin.FALSE = Object.assign(isLogin.FALSE, {result:""})
        
        contextHandler.programMylistPageAndSetContext(req, sessionHandler, database, paramBody, isLogin, function(situation){

            let viewName = new pickView()
                                                    .thisIs(situation)
                                                    .right("program-stu-mylist")
                                                    .wrong("login")
                                                    .done()
            viewer(
                req,res,
                viewName,
                contextHandler.getContext()
            )
        })
    })    
}

module.exports.dispatcher={
    //===== main_page.js =====//
    homepageController,
    loginpageController,
    processLogoutController,

    //===== program_page.js =====//
    processLoginController,
    registerPageStuController,
    registerPageBizController,
    processRegisterStuController,
    processRegisterBizController,

    //===== program_page.js =====//
    programAddPageController,
    processProgramAddController,
    programListPageController,
    programDetailsPageController,
    programUpdatePageController,
    processProgramUpdateController,
    processProgramApplyController,
    programBizMylistPageController,
    stulistManagePageController,
    processAcceptStuController,
    programStuMylistPageController,

    //===== praclog_page.js =====//
    praclogListPageController
}