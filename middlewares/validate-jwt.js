const {response}=require('express')
const jwt = require('jsonwebtoken')



const validateJWT = (req,res=response,next)=>{
    
    //x-token
    const token =req.header('x-token')
   
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'no hay token en la peticion'
        })
    }

    try {

        const {uid,nameUser} = jwt.verify(
            token,process.env.SECRET_JWT_SEED
        )

        req.uid=uid
        req.nameUser=nameUser
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }

    next();
}

module.exports={
    validateJWT
}