//===== DB query 모듈 =====//
var repository = require("../database/repository").repository

//===== context 설정 =====//
let context={}

var setContext = function(context, json){
    console.log("invoke setContext()")
    Object.assign(context,json)
    console.log("#####      finish set context      #####")
    console.log(context)
}

//===== 최종 context 반환=====//
var getContext = function(){
    console.log("invoke getContext()")
    let giveContext = Object.assign({},context)
    console.log("#####      get context info      #####")
    console.log(giveContext)
    //초기화
    console.log("#####      initializing context      #####")
    context = {}
    console.log(context)
    return giveContext
}

//===== 데이터베이스 연결 오류 context 설정 =====//
var databaseError = function(){
    console.log("invoke databaseError()")
    setContext(context, {errMsg:"데이터베이스 연결안됨"})
    return getContext()
}

//===== err 객체가 발생할 시 context 설정 =====//
var catchError = function(err){
    console.log("invoke catchError()")
    if(err){
        console.log(err)
    }
    setContext(context,{errMsg:"오류가 발생하였습니다"})
}

//===== 학생 유저가 아닐 경우의 에러 context 설정 =====//
var catchNotStuError = function(req, sessionHandler){
    console.log("invoke catchNotStuError()")
    if(!(sessionHandler.isStuUser(req))){
        setContext(context,{errMsg:"학생 유저가 아닙니다"})
        return true
    }else{
        return false
    }
}

//===== 기업 유저가 아닐 경우의 에러 context 설정 =====//
var catchNotBizError = function(req, sessionHandler){
    console.log("invoke catchNotBizError()")
    if(!(sessionHandler.isBizUser(req))){
        setContext(context,{errMsg:"기업 유저가 아닙니다"})
        return true
    }else{
        return false
    }
}

//===== 해당 게시물 권한을 가진 유저가 아닐 경우의 에러 context 설정 =====//
var catchNotYours = function(req, situation){
    console.log("invoke catchNotYours()")
    let target = Object.assign({},context.docs[0])
    let nowLoginUser = Object.assign({},req.session.user)
    if(target.owner.id !== nowLoginUser.id && situation){
        setContext(context,{errMsg:"해당 게시물을 작성한 유저가 아닙니다"})
        return true
    }else{
        return false
    }
}

//===== 로그인된 상황과 비로그인된 상황에 따른 context 설정 =====//
var filterSessionAndSetContext = function(req, sessionHandler,isLogin, callback){
    console.log("invoke filterSessionAndSetContext()")
    if(sessionHandler.isUserSessionExist(req)){
        setContext(context, isLogin.TRUE)
        callback(true)
    }else{
        setContext(context, isLogin.FALSE)
        callback(false)
    }
}

//===== 로그아웃 진행 후 상황에 따른  context 설정 =====//
var destroySessionAndSetContext = function(req,sessionHandler, isDestroy, callback){
    console.log("invoke destroySessionAndSetContext()")
    if(sessionHandler.removeSession(req)){
        setContext(context, isDestroy.TRUE)
        callback(true)
    }else{
        setContext(context, isDestroy.FALSE)
        callback(false)
    }
}

//===== 로그인 진행 결과에 따른 context 설정 =====//
var processLoginAndSetContext = function(req, sessionHandler, database, paramBody, isSuccess, callback){
    console.log("invoke processLoginAndSetContext()")
     repository.authUser(database, paramBody, function(err, docs){
        if(err){
            catchError(err)
            callback("")
        }
        if(sessionHandler.setSession(req,docs)){
            setContext(context, isSuccess.TRUE)
            setContext(context, req.session.user)
            callback(true)
        }else{
            setContext(context, isSuccess.FALSE)
            callback(false) 
        }
    })
}

//===== 회원가입 진행 결과에 따른 context 설정 =====//
var processRegisterAndSetContext = function(database, paramBody, isSuccess, callback){
    console.log("invoke processRegisterAndSetContext()")
     repository.addUser(database, paramBody, function(err, result){
        if(err){
            catchError(err)
            callback("")
        }
        if(result && result.insertedCount > 0){
            setContext(context, isSuccess.TRUE)
            callback(true)
        }else{
            setContext(context, isSuccess.FALSE)
            callback(false) 
        }
    })
}

//===== 프로그램 추가 진행 결과에 따른 context 설정 =====//
var processProgramAddAndSetContext = function(database, paramBody, isSuccess, callback){
    console.log("invoke processRegisterAndSetContext()")
    repository.addProgram(database, paramBody, function(err, result){
        if(err){
            catchError(err)
            callback("")
        }
        if(result && result.insertedCount > 0){
            setContext(context, isSuccess.TRUE)
            callback(true)
        }else{
            setContext(context, isSuccess.FALSE)
            callback(false) 
        }
    })
}

//===== 프로그램 검색 화면의  context 설정 =====//
var programSearchListingAndSetContext = function(req, sessionHandler, database, paramBody, isLogin, callback){
    console.log("invoke programSearchListingAndSetContext()")
    repository.searchProgram(database, paramBody, function(err, docs){
        if(err){
            catchError(err)
            callback("")
        }
        if(docs){
            setContext(context,{result : "검색된 항목 수 : " + docs.length})
            setContext(context,{docs:docs})
        }else{
            setContext(context,{result : "검색 결과가 없습니다."})
            setContext(context,{docs:null})
        }

        if(sessionHandler.isUserSessionExist(req)){
            setContext(context, isLogin.TRUE)
            callback(true)
        }else{
            setContext(context, isLogin.FALSE)
            callback(false)
        }
    })
}

//===== 프로그램  Details 화면의  context 설정 =====//
var programDetailsAndSetContext = function(req, sessionHandler, database, paramBody, isLogin, callback){
    console.log("invoke programDetailsAndSetContext()")
    repository.searchProgram(database, paramBody, function(err, docs){
        if(err){
            catchError(err)
            callback("")
        }
        if(docs){
            setContext(context,{docs:docs})
        }else{
            setContext(context,{errMsg:"데이터를 로딩하는 중에 문제가 생겼습니다."})
            callback(null)
            return
        }

        if(sessionHandler.isUserSessionExist(req)){
            setContext(context, isLogin.TRUE)
            callback(true)
        }else{
            setContext(context, isLogin.FALSE)
            callback(false)
        }
    })
}

//===== 프로그램  update 결과에 따른  context 설정 =====//
var processProgramUpdateAndSetContext = function(database, paramBody, isSuccess, callback){
    console.log("invoke processProgramUpdateAndSetContext()")
    repository.updateProgram(database, paramBody, function(err, result){
        if(err){
            catchError(err)
            callback("")
        }
        if(result){
            setContext(context, isSuccess.TRUE)
            callback(true)
        }else{
            setContext(context, isSuccess.FALSE)
            callback(false) 
        }
    })
}

//===== 프로그램  apply 결과에 따른  context 설정 =====//
var processProgramApplyAndSetContext = function(database,paramBody, isSuccess, callback){
    console.log("invoke processProgramApplyAndSetContext()")
    repository.addMatchingPending(database, paramBody, function(err, result){
        if(err){
            catchError(err)
            callback("")
        }
        if(result){
            setContext(context, isSuccess.TRUE)
            callback(true)
        }else{
            setContext(context, isSuccess.FALSE)
            callback(false) 
        }
    })
}

//===== 내가 등록/신청한 프로그램 목록 조회 결과에 따른  context 설정 =====//
var programMylistPageAndSetContext = function(req, sessionHandler, database, paramBody, isLogin, callback){
    console.log("invoke programBizMylistPageAndSetContext()")
    
    repository.searchProgram(database, paramBody, function(err, docs){
        if(err){    
            catchError(err)
            callback("")
        }

        if(docs){
            setContext(context,{docs:docs})
        }else{
            setContext(context,{docs:null})
        }

        if(sessionHandler.isUserSessionExist(req)){
            setContext(context, isLogin.TRUE)
            callback(true)
        }else{
            setContext(context, isLogin.FALSE)
            callback(false)
        }
    })
}

//===== 학생 신청 수락 결과에 따른  context 설정 =====//
var processAcceptStuAndSetContext = function(database,paramBody, isSuccess, callback){
    console.log("invoke programBizMylistPageAndSetContext()")
    
    repository.updateMatchingFinish(database, paramBody, function(err, result){
        if(err){
            catchError(err)
            callback("")
        }
        if(result){
            setContext(context, isSuccess.TRUE)
            callback(true)
        }else{
            setContext(context, isSuccess.FALSE)
            callback(false) 
        }
    })
}

module.exports.contextHandler={
    setContext,
    getContext,
    databaseError,
    catchError,
    catchNotStuError,
    catchNotBizError,
    catchNotYours,
    filterSessionAndSetContext,
    destroySessionAndSetContext,
    processLoginAndSetContext,
    processRegisterAndSetContext,
    processProgramAddAndSetContext,
    programSearchListingAndSetContext,
    programDetailsAndSetContext,
    processProgramUpdateAndSetContext,
    processProgramApplyAndSetContext,
    programMylistPageAndSetContext,
    processAcceptStuAndSetContext
}