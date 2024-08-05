const jwt=require("jsonwebtoken")

function checkAuth(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decodedToken=jwt.verify(token,"secret");
        req.userData=decodedToken
        next()
    }
    catch(e){
        return res.status(400).json({
            "message":"Invalid or expired token provided"
        })
    }
}
module.exports = {
    checkAuth: checkAuth
};