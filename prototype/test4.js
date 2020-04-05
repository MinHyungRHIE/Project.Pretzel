function pickView(){
    this.situation = false
    this.picked = ""

    this.is = function(situation){
        this.situation = situation
        return this
    }

    this.right = function(ifRight){
        if(this.situation){
            this.picked = ifRight
        }
        return this
    }

    this.wrong = function(ifWrong){
        if(!this.situation){
            this.picked = ifWrong
        }
        return this
    }

    this.done = function(){
        return this.picked
    }
}
