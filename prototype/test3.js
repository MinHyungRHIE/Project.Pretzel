let context={}

var setContext = function(context, key, value){
    switch(key){
        case "errMsg":
            Object.assign(context,{errMsg:value})
            break;
        case "result":
            Object.assign(context,{result:value})
            break;
    }
}

setContext(context,"hi","에러가 발생했습니다")
console.log(context)