const {response} = require('express');
const {validationResult}=require('express-validator')


const loginUser= (req,res=response)=>{

    const {nameUser,password}=req.body

    //manejo de errores
    const errors =validationResult(req)
    if(!errors.isEmpty()){
         return res.status(400).json({
             ok:false,
            errors:errors.mapped()
         });
    }

    res.status.json({
        ok:true,
        msg:'login',
        nameUser,
        password
   })
}
const createUser= (req,res=response)=>{

    const {nameUser,email,password}=req.body

    const errors =validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    console.log(errors)

    res.status(201).json({
        ok:true,
        msg:'registered',
        nameUser,
        email,
        password
   })
}
const renewToken= (req,res=response)=>{
    res.json({
        ok:true,
        msg:'renew'
   })
}


module.exports={
    createUser,
    loginUser,
    renewToken
}