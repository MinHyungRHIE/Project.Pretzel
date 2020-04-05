//===== 모듈 설정 =====//
var MongoClient = require("mongodb").MongoClient
var ObjectID = require("mongodb").ObjectID
var config = require("../config/config")
var database={}

//===== 모듈화를 위한 함수 정의 =====//
database.init = function connectDB(app) {
    console.log("database.init() has been invoked")
    var databaseURL =config. db_url
    var dbName = config.db_name

    const mongoClient = new MongoClient(databaseURL, { useUnifiedTopology: true })
    mongoClient.connect(function (err, client) {
        app.set("database",client.db(dbName))
        app.set("ObjectID",ObjectID)
        console.log("the database connection object has been saved in app[express] so that use query in /routes files")
    })
}

module.exports=database