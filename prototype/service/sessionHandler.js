//===== DB query 모듈 =====//
var repository = require("../database/repository").repository

//===== session에 user정보가 있는지 없는지 확인  : 로그인이 되어 있나 확인 =====//
var isUserSessionExist = function(req){
    console.log("invoke isUserSessionExist()")
    var isExist=false
    try{
        if(req.session.user && !(req.session.memberType === "unknown")){
            console.log("There are already session of user information")
            isExist=true
        }
    }catch(err){
        console.log(err)
    }finally{
        return isExist
    }
}

//===== session 설정 : 로그인 성공=====//
var setSession = function(req, docs){
    console.log("invoke setSession()")
    var isFail=false
    try{
        if(repository.isDocsExist(docs)&&(!isUserSessionExist(req))){
            var userInfo = docs[0]
            var sessInfo={
                id: userInfo.id,
                name:userInfo.name,
                memberType:userInfo.memberType,
                authorized:true
            }
            req.session.user=sessInfo
        }else{
            isFail=true
        }
    }catch(err){
        isFail=true
    }finally{
        console.log("is setSession() failed ? : " + isFail)
        return !isFail
    }
}

//===== session 설정 : 로그아웃 성공=====//
var removeSession = function(req){
    console.log("invoke removeSession()")
    var isFail=false
    try{
        if(isUserSessionExist(req)){
            req.session.destroy(function(err){
                if(err){
                    console.log("fail to remove user session")
                }else{
                    console.log("success to remove user session")
                }
            })
        }else{
            isFail=true
        }
    }catch(err){
        isFail=true
    }finally{
        console.log("is removeSession() failed ? : " + isFail)
        return !isFail
    }
}

//===== 학생 유저인지 판단 =====//
var isStuUser=function(req){
    console.log("invoke isStuUser()")
    var isStu = false
    try{
        if(isUserSessionExist(req)){
            if(req.session.user.memberType==="stu"){
                isStu = true
            }
        }
    }catch(err){}finally{
        console.log("is student user ? : " + isStu)
        return isStu
    }
}

//===== 기업 유저인지 판단 =====//
var isBizUser=function(req){
    console.log("invoke isBizUser()")
    var isBiz = false
    try{
        if(isUserSessionExist(req)){
            if(req.session.user.memberType==='biz'){
                isBiz = true
            }
        }
    }catch(err){}finally{
        console.log("is business user ? : " + isBiz)
        return isBiz
    }
}

//===== 비로그인 처리용 JSON 반환 =====//
var noLogin = {
    "id" : "null",
    "name" : "null",
    "memberType" : "unknown"
}

module.exports.sessionHandler={
    isUserSessionExist,
    setSession,
    removeSession,
    isStuUser,
    isBizUser,
    noLogin
}