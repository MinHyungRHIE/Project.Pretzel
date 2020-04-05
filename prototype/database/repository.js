//===== 데이터베이스의 find() 결과 docs 데이터 판단 =====//
var isDocsExist = function(docs){
    console.log("invoke isDocsExist()")
    var isExist=false
    try{
        if(docs){
            if(docs.length>0){
                isExist=true
            }else{
                console.log("docs : no data")
            }
        }else{
            console.log("docs is null")
        }
    }catch(err){ 
        console.log(err)
    }finally{
        return isExist
    }
}

//===== 로그인 =====//
var authUser = function(database, body, callback){
    console.log("invoke authUser()")
    var users = database.collection("users")
    users.find(body).toArray(function(err,docs){
        if(err){
            callback(err,null)
        }

        if(isDocsExist(docs)){
            console.log("success to get user info")
            callback(null, docs)
        }else{
            console.log("there is no user [%s]:[%s]",body.id,body.password)
            callback(null,null)
        }
    })
}

//===== 회원가입 함수 =====//
var addUser = function(database, body, callback){
    console.log("invoke addUser()")
    var users = database.collection("users")
    users.insertOne(body,function(err, result){
        if(err){
            callback(err,null);
            return
        }
        if(result.insertedCount > 0){
            console.log("added record : " + result.insertedCount);
        }else{
            console.log("no record")
        }
        callback(null,result)
    })
}

//===== 프로그램 추가 함수 =====//
var addProgram = function(database, body, callback){
    console.log("invoke addProgram()")
    var programs = database.collection("programs")
    programs.insertOne(body,function(err, result){
        if(err){
            callback(err,null);
            return
        }
        if(result.insertedCount > 0){
            console.log("added record : " + result.insertedCount);
        }else{
            console.log("no record")
        }
        callback(null,result)
    })
}

//===== 프로그램 검색 함수 =====//
var searchProgram = function(database, body, callback){
    console.log("invoke searchProgram()")
    var programs = database.collection("programs")
    programs.find(body).toArray(function (err, docs) {
        if (err) {
            callback(err, null)
            return
        }
        if (docs.length > 0) {
            console.log("found data")
            callback(null, docs)
        } else {
            console.log("no data")
            callback(null, null)
        }
    })
}

//===== 프로그램 수정 함수 =====//
var updateProgram = function(database, body, callback){
    console.log("invoke updateProgram()")
    console.log("## body")
    console.log(body)
    var programs = database.collection("programs")
    let myquery = {_id:body._id}
    console.log("## myquery")
    console.log(myquery)
    delete body._id
    console.log("## After delete body._id --> body")
    console.log(body)
    console.log("## body.matching")
    console.log(body.matching)
    let changeValue = {$set:body}
    console.log("## changeValue")
    console.log(changeValue)
    programs.updateOne(myquery, changeValue,function(err, result){
        if(err){
            callback(err,null);
            return
        }
        callback(null,result)
    })
}

//===== 프로그램에 신청 학생 명단 올리기 함수 =====//
var addMatchingPending = function(database, body, callback){
    console.log("invoke addMatchingPending()")
    var programs = database.collection("programs")
    let myquery = {_id:body._id}
    delete body._id
    let changeValue = {$addToSet:body}

    programs.updateOne(myquery, changeValue,{upsert:true},function(err, result){
        if(err){
            callback(err,null);
            return
        }
        callback(null,result)
    })
}

//===== 신청 학생이 받아지고 praclog라는 collection에 관련 내용을 추가하면서 매칭 완료 =====//
var updateMatchingFinish = function(database,body,callback){
    console.log("invoke updateMatchingFinish()")
    console.log("## body")
    console.log(body)
    var programs = database.collection("programs")
    var praclogs = database.collection("praclogs")

    let praclogObj = Object.assign({},body.addToPraclog)
    console.log("## praclogObj")
    console.log(praclogObj)

    delete body.addToPraclog 

    let myquery = body
    console.log("## myquery")
    console.log(myquery)

    let changeValue = {$set:{"matching.$.isAccepted":true}}
    console.log("## changeValue")
    console.log(changeValue)



    programs.updateOne(myquery, changeValue,function(err, result){
        if(err){
            callback(err,null);
            return
        }
        praclogs.insertOne(praclogObj,function(err, result){
            if(err){
                callback(err,null);
                return
            }
            if(result.insertedCount > 0){
                console.log("added record : " + result.insertedCount);
            }else{
                console.log("no record")
            }
            callback(null,result)
        })
    })
}


module.exports.repository={
    isDocsExist,
    authUser,
    addUser,
    addProgram,
    searchProgram,
    updateProgram,
    addMatchingPending,
    updateMatchingFinish
}