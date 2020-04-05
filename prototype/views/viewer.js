//Viewer Rendering
var viewer = function(req,res,viewName, context){
    req.app.render(viewName,context, function(err,html){
        if(err){
            console.log("occured rendering error")
            console.log(err)
        }
        console.log("rendering : %s.ejs",viewName)
        res.end(html);
    })
}

var pickView =  function(){
    this.situation = false
    this.flag = true
    this.picked = ""

    this.thisIs = function(situation){
        if(situation === null){
            this.flag = false
        }else{
            this.situation = situation
        }
        return this
    }

    this.right = function(ifRight){
        if(this.situation && this.flag){
            this.picked = ifRight
        }
        return this
    }

    this.wrong = function(ifWrong){
        if(!this.situation && this.flag){
            this.picked = ifWrong
        }
        return this
    }

    this.done = function(){
        if(this.flag){
            return this.picked
        }else{
            return "error"
        }
    }
}


module.exports=viewer

module.exports.pickView = pickView