const isAdminAuth = (req,res, next)=>{
    const token ="xyz";
    const isAuth = token ==="xyz";
    if(!isAuth){
         res.status(401).send('unauthroized');
    }else{
        next();
    }
}

module.exports = {isAdminAuth}