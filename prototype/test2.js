var paramBody={}
var req ={}
req="네이버"
// paramBody.brandName ="/"+ req.body.brandName+"/"
paramBody.brandName = {brandName: { $regex: new RegExp(req)}}
console.log(paramBody.brandName)