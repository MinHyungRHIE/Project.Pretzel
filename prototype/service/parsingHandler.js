//===== query 파라미터 존재 확인 =====//
var isQueryExist = function(queryJson){
    console.log("invoke isQueryExist()")
    var emptyJsonToString = JSON.stringify({})
    var checkJsonToString=JSON.stringify(queryJson)
    console.log(emptyJsonToString)
    console.log(checkJsonToString)
    if(emptyJsonToString === checkJsonToString){
        return false
    }else{
        return true
    }
}

//===== 로그인 하는데 필요한 객체 파싱 =====//
var loginParsing = function(req){
    console.log("invoke loginParsing()")
    let paramBody = {}
    paramBody.id = req.body.id
    paramBody.password = req.body.password
    return paramBody
}

//===== 학생 회원가입 하는데 필요한 객체 파싱 =====//
var registerStuParsing = function(req){
    console.log("invoke registerStuParsing()")
    let paramBody = {}
    paramBody.id = req.body.id
    paramBody.password = req.body.password    
    paramBody.name = req.body.name    
    paramBody.gender = req.body.gender  
    paramBody.birthday = req.body.birthday    
    paramBody.email = req.body.email   
    paramBody.phoneNum = req.body.phoneNum
    paramBody.schoolName =  req.body.schoolName  
    paramBody.major = req.body.major   
    paramBody.studentNo = req.body.studentNo
    paramBody.memberType = "stu"
    return paramBody
}

//===== 기업 회원가입 하는데 필요한 객체 파싱 =====//
var registerBizParsing = function(req){
    console.log("invoke registerBizParsing()")
    let paramBody = {}
    paramBody.bizLicenceNo = req.body.bizLicenceNo    
    paramBody.brandName = req.body.brandName   
    paramBody.repreName = req.body.repreName   
    paramBody.industry = req.body.industry
    paramBody.id = req.body.id
    paramBody.password = req.body.password    
    paramBody.name = req.body.name    
    paramBody.position = req.body.position
    paramBody.phoneNum = req.body.phoneNum
    paramBody.email = req.body.email
    paramBody.memberType = "biz"
    return paramBody
}

//===== 프로그램 등록 하는데 필요한 객체 파싱 =====//
var addProgramParsing = function(req){
    console.log("invoke registerBizParsing()")
    let paramBody = {}
    paramBody.bizLicenceNo = req.body.bizLicenceNo    
    paramBody.brandName = req.body.brandName    
    paramBody.address = req.body.address    
    paramBody.reprePhoneNum = req.body.reprePhoneNum    
    paramBody.repreName = req.body.repreName    
    paramBody.email = req.body.email    
    paramBody.pracTime = req.body.pracTime    
    paramBody.pracPeriod = req.body.pracPeriod    
    paramBody.pracDulation = req.body.pracDulation    
    paramBody.instructionPerPerson = req.body.instructionPerPerson    
    paramBody.pracFee = req.body.pracFee    
    paramBody.ptbName = req.body.ptbName
    paramBody.owner = Object.assign({}, req.session.user)
    return paramBody
}

//===== 프로그램 목록에  query가 필요한 객체 파싱 =====//
var programListParsing =function(req){
    console.log("invoke programListParsing()")
    let paramBody = {}
    if(isQueryExist(req.query)){
        paramBody = {brandName: { $regex: new RegExp(req.query.brandName)}}
    }
    return paramBody
}

//===== 프로그램 Details에 query가 필요한 객체 파싱 =====//
var programDetailsParsing =function(req){
    console.log("invoke programDetailsParsing()")
    let ObjectID = req.app.get("ObjectID")
    let paramBody = {}
    paramBody._id =new ObjectID(req.params.id)
    return paramBody
}

//===== 프로그램 Update 요소 객체 파싱 =====//
var updateProgramParsing = function(req){
    console.log("invoke updateProgramParsing()")
    let ObjectID = req.app.get("ObjectID")
    let paramBody = {}
    paramBody._id =new ObjectID(req.params.id)
    paramBody.bizLicenceNo = req.body.bizLicenceNo    
    paramBody.address = req.body.address    
    paramBody.reprePhoneNum = req.body.reprePhoneNum    
    paramBody.repreName = req.body.repreName    
    paramBody.email = req.body.email    
    paramBody.pracTime = req.body.pracTime    
    paramBody.pracPeriod = req.body.pracPeriod    
    paramBody.pracDulation = req.body.pracDulation    
    paramBody.instructionPerPerson = req.body.instructionPerPerson    
    paramBody.pracFee = req.body.pracFee    
    paramBody.ptbName = req.body.ptbName
    return paramBody
}

//===== 학생의 프로그램 신청 query에 필요한 객체 파싱 =====//
var processApplyParsing =function(req){
    console.log("invoke processApplyParsing()")
    let ObjectID = req.app.get("ObjectID")
    let paramBody = {}
    paramBody._id =new ObjectID(req.params.id)
    paramBody.matching = 
                    {
                        applyer : req.session.user.id,
                        isAccepted : false
                    }
    return paramBody
}

//===== 내가 등록한 프로그램 조회를 위한 Session에 있는 객체 파싱 =====//
var programBizMylistPageParsing = function(req){
    console.log("invoke programBizMylistParsing()")
    let paramBody = {}
    paramBody.owner = Object.assign({},req.session.user)
    return paramBody
}

//===== 학생 신청 수락에 필요한 query객체 파싱 =====//
var processAcceptStuParsing = function(req){
    console.log("invoke programBizMylistParsing()")
    let ObjectID = req.app.get("ObjectID")
     let paramBody = {
        _id : new ObjectID(req.params.id),
        "matching.applyer": req.params.applyer,
        addToPraclog :{
            programId : new ObjectID(req.params.id),
            stuId : req.params.applyer,
            bizId : req.session.user.id,
        }
    }
    return paramBody
}

//===== 내가 신청한 프로그램 조회를 위한 Session에 있는 객체 파싱 =====//
var programStuMylistPageParsing = function(req){
    console.log("invoke programStuMylistParsing()")
    let paramBody = {}
    paramBody = Object.assign({},{"matching.applyer": req.session.user.id}) 
    return paramBody
}

//===== 실습일지를 리스팅하기 위한 query 객체 파싱 =====//
var praclogListPageParsing = function(req){
    // /praclog/list/:userId/:programId
    console.log("invoke praclogListPageParsing()")
    let paramBody = {}
    
    return paramBody
}

module.exports.parsingHandler={
    loginParsing,
    registerStuParsing,
    registerBizParsing,
    addProgramParsing,
    programListParsing,
    programDetailsParsing,
    updateProgramParsing,
    processApplyParsing,
    programBizMylistPageParsing,
    processAcceptStuParsing,
    programStuMylistPageParsing,
    praclogListPageParsing
}