//===== 모듈 설정 =====//
var express = require("express")
var http = require("http")
var path = require("path")
var static = require("serve-static")
var fs = require("fs")
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var expressSession = require("express-session")
var cors = require("cors")
var expressErrorHandler = require("express-error-handler")

//===== config  module =====//
var config=require("./config/config")

//===== 데이터베이스 module =====//
var database=require("./database/database")

//===== 라우터 module =====//
var routeLoader = require("./routes/routeLoader")

//===== express  =====//
var app = express()
var router = express.Router()

//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//===== 미들웨어 설정  =====//
app.set("port",config.server_port)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/public", static(path.join(__dirname, "public")))

app.use(expressSession({
    secret: "my key",
    resave: false,
    saveUninitialized: false
}))
app.use(cookieParser("my key"))
app.use(cors())

//===== multipart 설정  module --> 파싱 관련 미들웨어와 라우터 사이에 위치해야함=====//
var upload = require("./database/multipart-config")
app.set("upload",upload)

//===== router =====//
routeLoader.init(app,router) //route정보 app에 등록

//===== 모든 router 처리 끝난 후 404 오류 페이지 처리 =====//
var errorPath = path.join(__dirname,'public','404.html')
var errorHandler = expressErrorHandler({
    static:{
        '404' : errorPath
    }
})
app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

//===== 서버 시작 =====//
http.createServer(app).listen(app.get("port"), function () {
    console.log("server is opened : " + app.get("port"))
    database.init(app) //데이터베이스 connection 객체 app에 등록
})