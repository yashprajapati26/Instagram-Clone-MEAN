const { STATUSCODE } = require("../config/constant");
const { decodeAuthToken } = require("../helper/jwt")

verifyToken = async(req,res,next)=>{
   let token = req.headers['auth_token']
   if (!token) {
        return res.status(STATUSCODE.unauthorized).json({msg:'token not found'});
   }
   const decoded = await decodeAuthToken(token)
   if(decoded && decoded.id){
        req.user = decoded
        return next();
   }
   else{
        return res.status(STATUSCODE.unauthorized).json({"msg":"Invalid Token"})
   }

}